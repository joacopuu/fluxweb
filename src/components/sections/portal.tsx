"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { setSkin } from "@/lib/zones";

const FALLBACK = "Georgia, 'Times New Roman', serif";
/** Recorrido del portal, en alturas de pantalla. */
const SCROLL_LENGTH = 2.6;

/**
 * El portal tipográfico: «Diseñamos proyectos que FLUYEN». Al bajar, la cámara
 * entra por la tinta de una letra y del otro lado están los trabajos.
 * Mientras se atraviesa, este componente decide la piel del sitio: tinta
 * afuera de la letra, crema adentro.
 */
export function Portal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // El portal mide la tinta con la tipografía ya cargada: hasta entonces usa
  // una serif del sistema, y se vuelve a montar cuando Playfair está lista.
  const [family, setFamily] = useState(FALLBACK);
  // El portal mide tipografía y arma un clip SVG: no hace falta pagar eso al
  // cargar la página. Se monta con el primer scroll (está justo debajo del
  // hero, así que el cambio pasa fuera de pantalla).
  const [near, setNear] = useState(false);

  useEffect(() => {
    // Reserva desde el arranque el alto que va a ocupar el portal (su recorrido
    // más la pantalla de contenido), para que montarlo no corra lo que sigue:
    // si alguien salta a "Servicios" desde arriba, el destino no se mueve. Sin
    // JavaScript o con movimiento reducido el portal es corto y no se reserva.
    if (ref.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current.style.minHeight = `${(SCROLL_LENGTH + 1) * 100}svh`;
    }
    const mount = () => {
      if (window.scrollY < 4) return;
      setNear(true);
      window.removeEventListener("scroll", mount);
    };
    window.addEventListener("scroll", mount, { passive: true });
    mount();
    return () => window.removeEventListener("scroll", mount);
  }, []);

  useEffect(() => {
    const declared = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--font-playfair");
    const first = declared.split(",")[0]?.trim();
    if (!first) return;
    let cancelled = false;
    document.fonts
      .load(`500 100px ${first}`, "FLUYEN")
      .then((faces) => {
        if (!cancelled && faces.length > 0) setFamily(first);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const onProgress = (progress: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const middle = window.innerHeight / 2;
    // Solo manda mientras el centro de la pantalla está dentro del portal.
    if (rect.top > middle || rect.bottom < middle) return;
    setSkin(progress >= 0.72 ? "crema" : "tinta");
    // Ya adentro, el campo deja de ser crema fija y sigue a la piel: así no
    // queda un borde duro cuando el caso siguiente cambia el color.
    el.dataset.inside = String(progress >= 0.9);
  };

  return (
    <div
      ref={ref}
      id="trabajos"
      tabIndex={-1}
      data-zone-wa="trabajos"
      className="group/portal outline-none"
    >
      {!near ? (
        // Versión quieta: lo que se ve sin JavaScript y antes de montar el portal.
        <section className="wrap py-[var(--section)]">
          <p className="t-sub">Diseñamos proyectos que</p>
          <p className="t-mega">FLUYEN</p>
          <div className="mt-[var(--section)]">{children}</div>
        </section>
      ) : (
        <GlyphPortal
          key={family}
          word="FLUYEN"
          interactive={false}
          scrollLength={SCROLL_LENGTH}
          fontFamily={family}
          fontWeight={500}
          enterLabel="Ir directo a los trabajos"
          hint="Seguí bajando. Se entra por la letra."
          onProgress={onProgress}
          className="!font-sans"
          style={{
            "--gp-paper": "var(--bg)",
            "--gp-ink": "var(--ink)",
            "--gp-field": "#f0e9d6",
            "--gp-foreground": "var(--ink)",
          }}
          background={
            <div className="absolute inset-0 bg-[#f0e9d6] group-data-[inside=true]/portal:bg-bg" />
          }
          front={
            <p
              className="t-sub absolute left-[8%] right-[8%]"
              style={{
                bottom:
                  "calc(100% - var(--gp-word-top, 30%) + clamp(0.75rem, 2vw, 1.75rem))",
              }}
            >
              Diseñamos proyectos que
            </p>
          }
        >
          {children}
        </GlyphPortal>
      )}
    </div>
  );
}
