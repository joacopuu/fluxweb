"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Atrae apenas a su hijo hacia el puntero. Solo con puntero fino y sin
 * movimiento reducido; en touch no hace nada (ni descarga GSAP).
 */
export function Magnetic({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let cleanup = () => {};
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.6)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.6)" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanup = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}
