import { site } from "@/config/site";
import { briefSchema, isEmail, MIN_ELAPSED_MS } from "@/lib/contact";

export const dynamic = "force-dynamic";

/**
 * Límite por IP en memoria del proceso: 5 envíos cada 10 minutos. Es una
 * primera barrera compatible con Workers; ante abuso real conviene sumar el
 * binding de Rate Limiting de Cloudflare.
 */
const LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const attempts = new Map<string, { count: number; resetAt: number }>();

function limited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT.max;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const escape = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

/** El formulario pregunta si el envío por email está conectado. */
export async function GET() {
  return json({ email: Boolean(process.env.RESEND_API_KEY) });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, code: "invalid" }, 400);
  }
  const parsed = briefSchema.safeParse(payload);
  if (!parsed.success) return json({ ok: false, code: "invalid" }, 400);
  const brief = parsed.data;

  // Bots: completaron el campo trampa o enviaron demasiado rápido. Se les
  // responde que salió bien, y no se envía nada.
  if (brief.website !== "" || brief.elapsed < MIN_ELAPSED_MS) return json({ ok: true });

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "desconocida";
  if (limited(ip)) return json({ ok: false, code: "rate_limited" }, 429);

  const key = process.env.RESEND_API_KEY;
  if (!key) return json({ ok: false, code: "not_connected" }, 503);

  const rows: [string, string][] = [
    ["Nombre", brief.name],
    ["Contacto", brief.contact],
    ["Necesita", brief.needs.join(", ")],
    ["Etapa", brief.stage],
    ["Para cuándo", brief.when],
    ["Problema", brief.problem],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n\n");
  const html = `<table cellpadding="8" style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#67683d;vertical-align:top;white-space:nowrap"><strong>${k}</strong></td><td style="white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("")}</table>`;

  // Resend por fetch: sin SDK, anda igual en el runtime de Workers.
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "FluxWeb <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      subject: `Consulta web de ${brief.name}`,
      text,
      html,
      ...(isEmail(brief.contact) ? { reply_to: brief.contact.trim() } : {}),
    }),
  }).catch(() => null);

  if (!response?.ok) return json({ ok: false, code: "send_failed" }, 502);
  return json({ ok: true });
}
