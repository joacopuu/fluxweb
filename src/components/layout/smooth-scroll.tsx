"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollKit } from "@/lib/scroll-kit";

type Gsap = typeof import("gsap").gsap;

let lenis: Lenis | null = null;
let wakeLoop: (() => void) | null = null;

/** Desplaza hasta un ancla con Lenis si está activo, o con scroll nativo. */
export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  wakeLoop?.();
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  else el.scrollIntoView({ behavior: "auto", block: "start" });
}

/** ¿Hay alguna animación de GSAP corriendo en este momento? */
function gsapBusy(gsap: Gsap | null) {
  return !!gsap && gsap.globalTimeline.getChildren(true, true, true).some((child) => child.isActive());
}

/**
 * Scroll suave con Lenis, sincronizado con ScrollTrigger. El scroll sigue
 * siendo nativo (sin scroll-jacking), y con movimiento reducido Lenis no se
 * inicia.
 *
 * También administra el reposo: un bucle perpetuo de requestAnimationFrame
 * obliga al hilo principal a producir un cuadro por vsync aunque la página
 * esté quieta. El de Lenis se despierta con la interacción y se duerme cuando
 * ya no hay nada moviéndose.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const instance = reduce ? null : new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
    lenis = instance;
    let alive = true;
    let gsap: Gsap | null = null;
    scrollKit().then((kit) => {
      if (!alive) return;
      gsap = kit.gsap;
      instance?.on("scroll", kit.ScrollTrigger.update);
    });

    let raf = 0;
    let idle = 0;
    const loop = (time: number) => {
      instance?.raf(time);
      idle = instance?.isScrolling || gsapBusy(gsap) ? 0 : idle + 1;
      if (idle < 30) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    const wake = () => {
      idle = 0;
      if (raf) return;
      raf = requestAnimationFrame(loop);
    };
    wakeLoop = wake;
    const events = ["wheel", "touchstart", "touchmove", "keydown", "scroll", "pointerdown", "pointermove", "resize"];
    events.forEach((name) => window.addEventListener(name, wake, { passive: true, capture: true }));
    wake();

    // Anclas dentro de la misma página: las lleva Lenis.
    const onClick = (event: MouseEvent) => {
      if (!instance || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      wake();
      instance.scrollTo(target, { offset: -72, duration: 1.2 });
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      events.forEach((name) => window.removeEventListener(name, wake, { capture: true }));
      cancelAnimationFrame(raf);
      alive = false;
      wakeLoop = null;
      instance?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
