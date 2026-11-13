"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrollKit } from "@/lib/scroll-kit";

/**
 * Titular que sube línea por línea desde una máscara cuando entra en pantalla.
 * Se usa poco y a propósito (ver DESIGN.md §4). Sin JavaScript o con
 * movimiento reducido, el texto simplemente está.
 */
export function MaskReveal({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h2" | "p";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let split: { revert: () => void } | undefined;
    let cancelled = false;
    Promise.all([scrollKit(), document.fonts.ready]).then(([{ gsap, SplitText }]) => {
      if (cancelled) return;
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "sl",
        // Sin aria-label automático: en un <p> no está permitido, y el texto
        // partido en líneas se lee igual.
        aria: "none",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 112,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        },
      });
    });
    return () => {
      cancelled = true;
      split?.revert();
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
