"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/config/site";

const format = new Intl.DateTimeFormat("es-AR", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

/** La hora de Córdoba, en vivo. En el servidor muestra un guion fijo para no desfasar la hidratación. */
export function CordobaClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(new Date()),
    () => "--:--",
  );
  return (
    <time className={className} suppressHydrationWarning aria-label={`Hora en Córdoba: ${time}`}>
      {time}
    </time>
  );
}
