"use client";

import { useSyncExternalStore } from "react";
import { isWaContext, type WaContext } from "@/config/whatsapp";

/**
 * Zonas de la página. Cada sección puede declarar:
 *   data-zone-skin="crema"   la piel que toma el sitio mientras se la mira
 *   data-zone-wa="mirande"   el mensaje de WhatsApp del botón del nav
 * El observador (ZoneWatcher) aplica la de la sección que cruza el centro de
 * la pantalla.
 */

export function setSkin(skin: string) {
  const root = document.documentElement;
  if (root.dataset.skin !== skin) root.dataset.skin = skin;
}

let current: WaContext = "general";
const listeners = new Set<() => void>();

export function setWaContext(value: string | undefined) {
  const next = isWaContext(value) ? value : "general";
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** El contexto de WhatsApp de la sección que se está mirando. */
export function useWaContext(): WaContext {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "general",
  );
}
