import { site } from "./site";

/**
 * Mensajes de WhatsApp ya armados. Cada puerta al contacto usa el suyo, y el
 * botón del nav y el flotante toman el de la sección que se está mirando
 * (ver `data-zone-wa` en las secciones y `src/lib/zones.ts`).
 *
 * Los que terminan en dos puntos o en una frase abierta son a propósito: la
 * persona completa la oración con lo suyo.
 */
export const waMessages = {
  general: "Hola FluxWeb, vi el sitio y quiero contarles un proyecto:",
  hero: "Hola FluxWeb, tengo una idea y quiero convertirla en una web. Les cuento:",
  trabajos: "Hola FluxWeb, vi sus trabajos y quiero algo así para mi proyecto:",
  mirande: "Hola FluxWeb, vi el caso de Mirande y quiero algo parecido para",
  beclean: "Hola FluxWeb, vi el caso de BeClean. Tengo un producto que cuesta explicar:",
  fluxweb: "Hola FluxWeb, vi cómo hicieron su propio sitio y quiero uno con ese nivel de detalle para",
  servicios: "Hola FluxWeb, no sé bien qué tipo de sitio necesito. Lo que quiero lograr es",
  publico: "Hola FluxWeb, quiero saber si lo que hacen sirve para mi caso:",
  proceso: "Hola FluxWeb, quiero coordinar la charla de media hora para contarles mi proyecto.",
  estudio: "Hola FluxWeb, quiero hablar con alguno de los tres sobre un proyecto:",
  preguntas: "Hola FluxWeb, tengo una pregunta que no está en el sitio:",
  contacto: "Hola FluxWeb, quiero contarles mi proyecto:",
  notFound: "Hola FluxWeb, caí en una página que no existe en su sitio:",
} as const;

export type WaContext = keyof typeof waMessages;

export function isWaContext(value: string | undefined | null): value is WaContext {
  return !!value && value in waMessages;
}

/** Arma el enlace wa.me con el mensaje ya escrito. */
export function waLink(message: string, which: "main" | "alt" = "main") {
  return `https://wa.me/${site.whatsapp[which].number}?text=${encodeURIComponent(message)}`;
}

export function waLinkFor(context: WaContext) {
  return waLink(waMessages[context]);
}

export function waAutomation(pain: string) {
  return waLink(`Hola FluxWeb, me está comiendo el día esto: "${pain}". ¿Cómo lo resolverían?`);
}

export type BriefAnswers = {
  needs: string[];
  stage: string;
  problem: string;
  when: string;
  name: string;
  contact: string;
};

/** Resumen del formulario, para seguir la charla por WhatsApp. */
export function briefMessage(a: BriefAnswers) {
  // El enlace de WhatsApp tiene un largo práctico: el problema va resumido.
  const problem = a.problem.trim();
  const short = problem.length > 700 ? `${problem.slice(0, 700).trimEnd()}…` : problem;
  return [
    `Hola FluxWeb, soy ${a.name}. Completé el formulario del sitio:`,
    "",
    `Necesito: ${a.needs.join(", ")}.`,
    `Etapa: ${a.stage}.`,
    `Para cuándo: ${a.when}.`,
    "",
    `El problema que quiero resolver: ${short}`,
    "",
    `Mi contacto: ${a.contact}`,
  ].join("\n");
}
