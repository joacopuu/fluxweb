"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { form } from "@/content/home";
import { site } from "@/config/site";
import { briefMessage, waLink } from "@/config/whatsapp";
import { isContact } from "@/lib/contact";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

type Answers = {
  needs: string[];
  stage: string;
  problem: string;
  when: string;
  name: string;
  contact: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; via: "email" | "whatsapp" }
  | { kind: "error"; message: string };

const TOTAL = 5;
const empty: Answers = { needs: [], stage: "", problem: "", when: "", name: "", contact: "" };
const questions = [
  "¿Qué necesitás?",
  "¿En qué etapa estás?",
  "¿Qué problema querés resolver?",
  "¿Para cuándo?",
  "¿Cómo te contactamos?",
];

/** Qué falta en un paso, dicho con amabilidad. `null` si está bien. */
function validate(step: number, a: Answers): string | null {
  if (step === 0 && a.needs.length === 0) return "Elegí al menos una. Si no sabés, hay una opción para eso.";
  if (step === 1 && !a.stage) return "Elegí la que más se parezca.";
  if (step === 2 && a.problem.trim().length < 5) return "Escribí aunque sea una línea. No hace falta que esté prolija.";
  if (step === 3 && !a.when) return "Elegí una, aunque sea aproximada.";
  if (step === 4) {
    if (a.name.trim().length < 2) return "Decinos cómo te llamás.";
    if (!a.contact.trim()) return "Dejanos un email o un WhatsApp para poder responderte.";
    if (!isContact(a.contact)) return "Eso no parece un email ni un teléfono. Revisalo.";
  }
  return null;
}

const pill =
  "cursor-pointer rounded-full border px-4 py-2.5 text-[0.9375rem] transition-colors duration-200 active:scale-[0.98] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";
const pillOn = "border-ink bg-ink text-bg";
const pillOff = "border-line-strong hover:border-ink";
const field =
  "w-full rounded-[var(--radius-s)] border border-line-strong bg-transparent px-4 py-3.5 text-base text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * El proyecto en cinco preguntas. Se puede volver atrás sin perder nada, se
 * navega con teclado, y termina en dos salidas: email o WhatsApp con el
 * resumen ya escrito.
 */
export function ContactForm() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>(empty);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [emailReady, setEmailReady] = useState<boolean | null>(null);
  const [website, setWebsite] = useState("");
  const openedAt = useRef(0);
  const moved = useRef(false);
  // Al cambiar de paso, el foco va a la pregunta nueva en cuanto se monta
  // (no al cargar la página, para no robar el foco ni mover el scroll).
  const focusQuestion = (el: HTMLLegendElement | null) => {
    if (el && moved.current) el.focus({ preventScroll: true });
  };

  useEffect(() => {
    openedAt.current = Date.now();
    // ¿Está conectado el envío por email? Si no, se ofrece solo WhatsApp.
    fetch("/api/contacto")
      .then((r) => r.json())
      .then((data: { email?: boolean }) => setEmailReady(Boolean(data.email)))
      .catch(() => setEmailReady(false));
  }, []);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };
  const toggleNeed = (need: string) =>
    set("needs", answers.needs.includes(need) ? answers.needs.filter((n) => n !== need) : [...answers.needs, need]);

  const go = (next: number) => {
    moved.current = true;
    setDir(next > step ? 1 : -1);
    setError(null);
    setStep(next);
  };
  const next = () => {
    const problem = validate(step, answers);
    if (problem) return setError(problem);
    if (step < TOTAL - 1) go(step + 1);
  };

  const viaWhatsApp = () => {
    const problem = validate(4, answers);
    if (problem) return setError(problem);
    window.open(waLink(briefMessage(answers)), "_blank", "noopener,noreferrer");
    setStatus({ kind: "sent", via: "whatsapp" });
  };

  const viaEmail = async () => {
    const problem = validate(4, answers);
    if (problem) return setError(problem);
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, website, elapsed: Date.now() - openedAt.current }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; code?: string };
      if (response.ok && data.ok) return setStatus({ kind: "sent", via: "email" });
      const messages: Record<string, string> = {
        not_connected: "El envío por email todavía no está conectado. Mandalo por WhatsApp, que llega igual.",
        rate_limited: `Recibimos varios mensajes desde este dispositivo. Escribinos a ${site.email}.`,
        invalid: "Hay algún dato que no pudimos leer. Revisá las respuestas y probá de nuevo.",
      };
      setStatus({
        kind: "error",
        message: messages[data.code ?? ""] ?? "No pudimos enviar el mensaje. Probá de nuevo o seguí por WhatsApp.",
      });
    } catch {
      setStatus({ kind: "error", message: "No pudimos enviar el mensaje. Probá de nuevo o seguí por WhatsApp." });
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step < TOTAL - 1) return next();
    if (emailReady) void viaEmail();
    else viaWhatsApp();
  };

  if (status.kind === "sent") {
    const firstName = answers.name.trim().split(" ")[0];
    return (
      <div role="status" className="swap-in flex min-h-[26rem] flex-col justify-center">
        <p className="t-title">
          Listo, {firstName}. <em>Ya lo tenemos.</em>
        </p>
        <p className="t-lead mt-5 max-w-[40ch] text-muted">
          {status.via === "email"
            ? "Te respondemos dentro de las próximas 24 horas hábiles, con preguntas concretas."
            : "Se abrió WhatsApp con el resumen ya escrito. Mandalo y te respondemos por ahí."}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {status.via === "whatsapp" ? (
            <a
              href={waLink(briefMessage(answers))}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-on"
            >
              ¿No se abrió? Tocá acá
            </a>
          ) : null}
          <Link href="/trabajos/mirande-aybar" className="link link-on">
            Mientras tanto, mirá el caso de Mirande
          </Link>
        </div>
      </div>
    );
  }

  const errorId = `${uid}-error`;
  const sending = status.kind === "sending";
  const shift = reduce ? 0 : 28;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Contanos tu proyecto">
      <div className="flex items-center gap-4">
        <div
          role="progressbar"
          aria-label="Avance del formulario"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={step + 1}
          className="h-px flex-1 bg-line"
        >
          <div
            className="h-px origin-left bg-accent transition-transform duration-500 ease-expo"
            style={{ transform: `scaleX(${(step + 1) / TOTAL})` }}
          />
        </div>
        <p className="t-mono text-muted">
          Pregunta {step + 1} de {TOTAL}
        </p>
      </div>

      <div className="mt-8 min-h-[19rem]">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.fieldset
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * shift, filter: "blur(2px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: dir * -shift, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            aria-describedby={error ? errorId : undefined}
            className="min-w-0"
          >
            <legend ref={focusQuestion} tabIndex={-1} className="t-sub mb-6 outline-none">
              {questions[step]}
            </legend>

            {step === 0 ? (
              <>
                <p className="t-small -mt-3 mb-5 text-muted">Podés elegir más de una.</p>
                <div className="flex flex-wrap gap-2">
                  {[...form.needs, form.unsure].map((need) => {
                    const on = answers.needs.includes(need);
                    return (
                      <label key={need} className={cn(pill, on ? pillOn : pillOff)}>
                        <input type="checkbox" checked={on} onChange={() => toggleNeed(need)} className="sr-only" />
                        {need}
                      </label>
                    );
                  })}
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <div className="flex flex-wrap gap-2">
                {form.stages.map((option) => (
                  <label key={option} className={cn(pill, answers.stage === option ? pillOn : pillOff)}>
                    <input
                      type="radio"
                      name="etapa"
                      checked={answers.stage === option}
                      onChange={() => set("stage", option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <>
                <label htmlFor={`${uid}-problema`} className="sr-only">
                  {questions[2]}
                </label>
                <textarea
                  id={`${uid}-problema`}
                  rows={5}
                  maxLength={1500}
                  value={answers.problem}
                  onChange={(e) => set("problem", e.target.value)}
                  placeholder="Por ejemplo: explico mi producto por DM veinte veces por día. O: en los portales mis propiedades se pierden."
                  aria-invalid={Boolean(error)}
                  className={cn(field, "resize-y leading-relaxed")}
                />
                <p className="t-small mt-2 text-muted">Con dos o tres líneas alcanza.</p>
              </>
            ) : null}

            {step === 3 ? (
              <div className="flex flex-wrap gap-2">
                {form.whens.map((option) => (
                  <label key={option} className={cn(pill, answers.when === option ? pillOn : pillOff)}>
                    <input
                      type="radio"
                      name="cuando"
                      checked={answers.when === option}
                      onChange={() => set("when", option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-nombre`} className="t-small mb-2 block text-muted">
                    Nombre
                  </label>
                  <input
                    id={`${uid}-nombre`}
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={answers.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Tu nombre"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-contacto`} className="t-small mb-2 block text-muted">
                    Email o WhatsApp
                  </label>
                  <input
                    id={`${uid}-contacto`}
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={120}
                    value={answers.contact}
                    onChange={(e) => set("contact", e.target.value)}
                    placeholder="nombre@correo.com o 351 000 0000"
                    className={field}
                  />
                </div>
                {/* Campo trampa: invisible para personas y lectores de pantalla. */}
                <div className="hp" aria-hidden="true">
                  <label>
                    Sitio web
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            ) : null}
          </motion.fieldset>
        </AnimatePresence>

        <p id={errorId} role="alert" className="mt-4 min-h-6 text-[0.9375rem] text-danger">
          {error ?? (status.kind === "error" ? status.message : "")}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0 || sending}
          className={cn("btn btn-ghost", step === 0 && "invisible")}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Volver
        </button>

        {step < TOTAL - 1 ? (
          <button type="submit" className="btn btn-primary">
            Seguir
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            {emailReady ? (
              <button type="button" onClick={viaEmail} disabled={sending} className="btn btn-ghost">
                {sending ? "Enviando…" : "Enviar por email"}
              </button>
            ) : null}
            <button type="button" onClick={viaWhatsApp} disabled={sending} className="btn btn-primary">
              <WhatsAppGlyph className="h-[1.125rem] w-[1.125rem]" />
              Seguir por WhatsApp
            </button>
          </div>
        )}
      </div>

      {step === TOTAL - 1 ? (
        <p className="t-small mt-5 text-muted">
          {emailReady === false
            ? "Por WhatsApp te llevás el resumen ya escrito. "
            : "Elegí por dónde seguimos. Por WhatsApp te llevás el resumen ya escrito. "}
          Usamos tus datos solo para responderte esta consulta.{" "}
          <Link href="/privacidad" className="link link-on">
            Privacidad
          </Link>
          .
        </p>
      ) : null}
    </form>
  );
}
