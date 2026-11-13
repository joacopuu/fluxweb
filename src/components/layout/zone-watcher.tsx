"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { setSkin, setWaContext } from "@/lib/zones";

/** Aplica la piel y el contexto de WhatsApp de la sección que cruza el centro. */
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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.zoneSkin) setSkin(el.dataset.zoneSkin);
          if (el.dataset.zoneWa) setWaContext(el.dataset.zoneWa);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
