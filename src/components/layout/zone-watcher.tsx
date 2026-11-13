"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { setSkin, setWaContext } from "@/lib/zones";

/**
 * Aplica la piel y el contexto de WhatsApp de la sección que cruza el centro
 * de la pantalla.
 *
 * Lleva la cuenta de qué zonas están sobre el centro y, en cada cambio, elige
 * la que de verdad lo contiene. No alcanza con quedarse con "la última que
 * entró": después de un salto de scroll (un ancla, el botón atrás, una sección
 * que recién se renderiza) los avisos llegan en cualquier orden.
 */
export function ZoneWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const zones = Array.from(
      document.querySelectorAll<HTMLElement>("[data-zone-skin], [data-zone-wa]"),
    );
    if (zones.length === 0) {
      setSkin("tinta");
      setWaContext(undefined);
      return;
    }

    const active = new Set<HTMLElement>();
    const pick = (attr: "zoneSkin" | "zoneWa") => {
      const middle = window.innerHeight / 2;
      let fallback: HTMLElement | null = null;
      for (const zone of zones) {
        if (!active.has(zone) || !zone.dataset[attr]) continue;
        fallback = zone;
        const rect = zone.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom >= middle) return zone;
      }
      return fallback;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(el);
          else active.delete(el);
        }
        const skin = pick("zoneSkin");
        if (skin?.dataset.zoneSkin) setSkin(skin.dataset.zoneSkin);
        const wa = pick("zoneWa");
        if (wa?.dataset.zoneWa) setWaContext(wa.dataset.zoneWa);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
