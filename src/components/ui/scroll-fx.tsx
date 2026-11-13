"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrollKit } from "@/lib/scroll-kit";
import { cn } from "@/lib/utils";

/** Destapa a su hijo con clip-path la primera vez que entra en pantalla. */
export function Unveil({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.seen = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("unveil", className)}>
      {children}
    </div>
  );
}

/**
 * Mueve a su hijo en vertical mientras pasa por la pantalla.
 * `from` y `to` son porcentajes de su propio alto. Con movimiento reducido
 * queda quieto.
 */
export function Drift({
  children,
  from = 8,
  to = -8,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    let cancelled = false;
    scrollKit().then(({ gsap }) => {
      if (cancelled) return;
      const tween = gsap.fromTo(
        el,
        { yPercent: from },
        {
          yPercent: to,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [from, to]);
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
