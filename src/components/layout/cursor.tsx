"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Cursor con estados. Aparece solo sobre elementos con `data-cursor="Texto"`
 * y dice qué va a pasar ("Ver caso", "Arrastrá", "Abrir"). Solo existe con
 * puntero fino: en touch no se monta nada.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const text = label.current;
    if (!el || !text) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let shown = false;

    const show = (value: string) => {
      text.textContent = value;
      if (shown) return;
      shown = true;
      gsap.to(el, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
    };
    const hide = () => {
      if (!shown) return;
      shown = false;
      gsap.to(el, { scale: 0.6, opacity: 0, duration: 0.18, ease: "power2.out", overwrite: "auto" });
    };
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      if (target?.dataset.cursor) show(target.dataset.cursor);
      else hide();
    };
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-24 w-24 items-center justify-center rounded-full bg-accent text-center text-on-accent opacity-0 will-change-transform [@media(hover:hover)_and_(pointer:fine)]:flex"
    >
      <span ref={label} className="px-2 text-[0.8125rem] font-medium leading-tight" />
    </div>
  );
}
