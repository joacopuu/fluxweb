"use client";

import { useEffect, useState } from "react";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { WaLink } from "@/components/ui/wa-link";
import { cn } from "@/lib/utils";

/**
 * Botón flotante de WhatsApp, solo en mobile. Aparece después del hero y se
 * va cuando el contacto o el footer ya están en pantalla, para no tapar nada
 * ni repetir un botón que ya se ve.
 */
export function WhatsAppFab() {
  const [past, setPast] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = document.querySelectorAll("[data-fab-hide]");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCovered(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const show = past && !covered;

  return (
    <WaLink
      context="auto"
      aria-label="Escribinos por WhatsApp"
      tabIndex={show ? 0 : -1}
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_6px_24px_rgba(0,0,0,0.28)] lg:hidden",
        "transition-[transform,opacity] duration-300 ease-ui active:scale-95",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppGlyph className="h-5 w-5" />
    </WaLink>
  );
}
