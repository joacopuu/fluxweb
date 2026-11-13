"use client";

/**
 * ScrollTrigger y SplitText se cargan recién con el primer scroll.
 *
 * Por qué: ScrollTrigger mantiene un bucle permanente de
 * requestAnimationFrame. Con el hero en pantalla, cada uno de esos cuadros
 * obliga al navegador a recalcular en el hilo principal las animaciones del
 * cilindro, que si no corren enteras en el compositor. Al cargar la página no
 * hay nada que dependa del scroll, así que hasta que alguien scrollea no se
 * descarga ni se ejecuta.
 */
type Kit = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
};

let kit: Promise<Kit> | null = null;
let scrolled: Promise<void> | null = null;

function load(): Promise<Kit> {
  kit ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(
    ([core, st, split]) => {
      core.gsap.registerPlugin(st.ScrollTrigger, split.SplitText);
      return { gsap: core.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: split.SplitText };
    },
  );
  return kit;
}

function firstScroll(): Promise<void> {
  scrolled ??= new Promise((resolve) => {
    const check = () => {
      if (window.scrollY < 4) return;
      window.removeEventListener("scroll", check);
      resolve();
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
  });
  return scrolled;
}

/** Resuelve con GSAP, ScrollTrigger y SplitText después del primer scroll. */
export function scrollKit(): Promise<Kit> {
  return firstScroll().then(load);
}
