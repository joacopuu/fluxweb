"use client";

import type { ComponentProps } from "react";
import { waLink, waMessages, type WaContext } from "@/config/whatsapp";
import { useWaContext } from "@/lib/zones";

type Props = Omit<ComponentProps<"a">, "href"> & {
  /** `auto` usa el mensaje de la sección que se está mirando. */
  context?: WaContext | "auto";
  /** Mensaje a medida. Tiene prioridad sobre `context`. */
  message?: string;
};

/** Enlace a WhatsApp con el mensaje ya armado. */
export function WaLink({ context = "general", message, children, ...rest }: Props) {
  const zone = useWaContext();
  const text = message ?? waMessages[context === "auto" ? zone : context];
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
