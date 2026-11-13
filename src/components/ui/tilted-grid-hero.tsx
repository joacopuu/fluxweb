"use client";

/**
 * Tilted Grid Hero, de ruixen.ui (21st.dev, @ruixen.ui/tilted-grid-hero).
 * El original sin tocar está en `_referencia/21st/tilted-grid-hero.original.tsx`.
 *
 * Qué le cambiamos para FluxWeb (ver DESIGN.md §5):
 *  - Se puede arrastrar. El original solo corre: acá el arrastre mueve el
 *    tiempo de las animaciones (Web Animations API) y suelta con inercia.
 *  - Arranca rápido y frena hasta su velocidad de crucero.
 *  - Se pausa cuando sale de pantalla.
 *  - Las baldosas son capturas reales con marco de navegador horneado.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── la fila curva ───────────────────────────────────────────────
 * Una fila de imágenes corre de derecha a izquierda por dentro de un
 * cilindro. El centro mira de frente, los extremos se curvan hacia quien
 * mira y se desvanecen.
 *
 * Una caja CSS no se dobla, así que cada baldosa se corta en SLICES tiras
 * verticales, cada una una faceta plana del cilindro con su parte de la
 * imagen. Las tiras quedan quietas dentro de su baldosa, y la baldosa
 * (preserve-3d) es lo que se mueve: un rotateY sobre el eje la lleva por el
 * arco. Una baldosa es una sola animación, así que sus tiras no se separan.
 * Todo corre en el compositor: solo transform.
 * ─────────────────────────────────────────────────────────────── */

// Tiras por baldosa. Menos, y se ven las esquinas arriba y abajo.
const SLICES = 16;

// Distancia de la cámara, en radios del cilindro. Apenas pasando el eje, para
// que los extremos se vengan encima.
const CAMERA = 1.6;

// Vueltas de ventaja que se le dan al reloj de las animaciones, para poder
// arrastrar hacia atrás sin llegar nunca a tiempo negativo.
const HEADROOM_LAPS = 400;

/**
 * Radio del cilindro, como parte del ancho, que pone el borde del cuadro a
 * `bend` radianes del arco visto desde la cámara:
 * r·sinθ · CAMERA / (CAMERA − 1 + cosθ) = ancho / 2, despejando r.
 */
function arc(bend: number) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

// Una baldosa nunca ocupa más que esta parte del ancho. En un teléfono se
// siguen viendo las vecinas; en escritorio entran tres o cuatro de frente.
function maxTileWidth(width: number) {
  if (width < 640) return 84;
  if (width < 1100) return 46;
  return 34;
}

function measure(
  width: number,
  height: number,
  tile: number,
  aspect: number,
  gap: number,
  bend: number,
) {
  const maxW = maxTileWidth(width);
  const h = Math.min((tile / 100) * height, ((maxW / 100) * width) / aspect);
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0, pitchPx: 1, maxW };
  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const round = (n: number) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);
  return {
    columns,
    sweep,
    unit: round(unit),
    limit: round(Math.min(sweep, limit)),
    // Lo que avanza una baldosa en pantalla, en el centro, por cada paso.
    pitchPx: h * (aspect + gap / 100),
    maxW,
  };
}

export type TiltedGridImage = {
  src: string;
  alt?: string;
};

export type TiltedGridHeroProps = {
  /** Las imágenes corren en orden. Cada baldosa toma la siguiente al dar la vuelta, fuera de vista. */
  images: TiltedGridImage[];
  /** Segundos que tarda la fila en avanzar una baldosa. @default 4 */
  speed?: number;
  /** Alto de la baldosa, en porcentaje del alto del contenedor. @default 26 */
  tileHeight?: number;
  /** Ancho sobre alto de la baldosa. @default 16 / 9 */
  aspectRatio?: number;
  /** Espacio entre baldosas, en porcentaje del alto de una. @default 6 */
  gap?: number;
  /** Centro vertical de la fila, en porcentaje del alto. @default 56 */
  axis?: number;
  /** Cuánto se curvó la fila al llegar al borde, en grados (5 a 85). @default 80 */
  curve?: number;
  /** Ancho del desvanecido en cada extremo, en porcentaje. @default 12 */
  fade?: number;
  /** Texto del cursor mientras se pasa por encima (solo puntero fino). */
  cursorLabel?: string;
  children?: React.ReactNode;
  className?: string;
};

export function TiltedGridHero({
  images,
  speed = 4,
  tileHeight = 26,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 56,
  curve = 80,
  fade = 12,
  cursorLabel,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & TiltedGridHeroProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const bandRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `tgh-o-${id}`;
  const tile = `tgh-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

  // Nulo hasta que el observador midió el contenedor. La fila queda oculta
  // hasta entonces, así nunca se ve un primer cuadro armado para otro tamaño.
  const [layout, setLayout] = React.useState<ReturnType<typeof measure> | null>(null);

  // La imagen que muestra cada baldosa. Solo cambia cuando la baldosa da la
  // vuelta, que es fuera de vista.
  const [shown, setShown] = React.useState<Record<number, number>>({});

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((prev) =>
        prev?.columns === next.columns &&
        prev.sweep === next.sweep &&
        prev.unit === next.unit &&
        prev.maxW === next.maxW
          ? prev
          : next,
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  // Se piden todas de entrada: una baldosa toma la suya justo antes de volver
  // a verse, tarde para empezar a cargarla ahí.
  React.useEffect(() => {
    for (const { src } of images) new Image().src = src;
  }, [images]);

  const { columns, sweep, unit, limit, pitchPx, maxW } =
    layout ?? measure(1200, 560, tileHeight, aspectRatio, gap, bend);
  const duration = columns * speed;

  /* ── arrastre, arranque y pausa (lo que sumamos al original) ──── */
  React.useEffect(() => {
    const band = bandRef.current;
    if (!band || !layout) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiles = () =>
      band
        .getAnimations({ subtree: true })
        .filter((a) => (a as CSSAnimation).animationName === orbit);

    // Ventaja en el reloj, para poder arrastrar hacia atrás.
    const lapMs = duration * 1000;
    for (const a of tiles()) a.currentTime = Number(a.currentTime ?? 0) + HEADROOM_LAPS * lapMs;
    if (reduce) return;

    const msPerPx = (speed * 1000) / Math.max(1, pitchPx);
    let raf = 0;
    let dragging = false;
    let lastX = 0;
    let velocity = 0; // ms de reloj por cuadro
    let rate = 1;

    const setRate = (value: number) => {
      rate = value;
      for (const a of tiles()) a.playbackRate = value;
    };
    const shift = (ms: number) => {
      for (const a of tiles()) a.currentTime = Math.max(lapMs, Number(a.currentTime ?? 0) + ms);
    };

    // Arranque: llega rápido y frena hasta la velocidad de crucero.
    const started = performance.now();
    const intro = (now: number) => {
      const t = Math.min(1, (now - started) / 1900);
      const eased = 1 - Math.pow(1 - t, 3);
      setRate(7 - 6 * eased);
      if (t < 1 && !dragging) raf = requestAnimationFrame(intro);
    };
    raf = requestAnimationFrame(intro);

    const coast = () => {
      velocity *= 0.94;
      if (Math.abs(velocity) > 0.6) {
        shift(velocity);
        raf = requestAnimationFrame(coast);
        return;
      }
      // Vuelve de a poco a su velocidad.
      const from = performance.now();
      const resume = (now: number) => {
        const t = Math.min(1, (now - from) / 700);
        setRate(t);
        if (t < 1 && !dragging) raf = requestAnimationFrame(resume);
      };
      raf = requestAnimationFrame(resume);
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      cancelAnimationFrame(raf);
      setRate(0);
      band.setPointerCapture(e.pointerId);
      band.dataset.dragging = "true";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const ms = -dx * msPerPx;
      velocity = velocity * 0.6 + ms * 0.4;
      shift(ms);
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      band.dataset.dragging = "false";
      if (band.hasPointerCapture(e.pointerId)) band.releasePointerCapture(e.pointerId);
      raf = requestAnimationFrame(coast);
    };
    band.addEventListener("pointerdown", down);
    band.addEventListener("pointermove", move);
    band.addEventListener("pointerup", up);
    band.addEventListener("pointercancel", up);

    // Fuera de pantalla no gasta batería.
    const visibility = new IntersectionObserver(([entry]) => {
      for (const a of tiles()) {
        if (entry.isIntersecting) a.play();
        else a.pause();
      }
      if (entry.isIntersecting) setRate(rate);
    });
    visibility.observe(band);

    return () => {
      cancelAnimationFrame(raf);
      visibility.disconnect();
      band.removeEventListener("pointerdown", down);
      band.removeEventListener("pointermove", move);
      band.removeEventListener("pointerup", up);
      band.removeEventListener("pointercancel", up);
    };
  }, [layout, orbit, duration, speed, pitchPx]);

  // Toda medida es un múltiplo del alto de la baldosa.
  const u = (n: number) =>
    `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(maxW / aspectRatio).toFixed(4)}cqw))`;

  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;
  // Hasta el eje, girar, y volver: una caja queda sobre el cilindro en el
  // ángulo que le da rotateY.
  const turn = (deg: number) =>
    `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

  // Más allá de `limit` la baldosa está entera fuera de cuadro: ahí se oculta.
  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const css =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
    `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
    // Con movimiento reducido se pausa en vez de quitarse: cada baldosa ya
    // está ubicada por su retraso negativo, así que queda una imagen fija.
    `@media(prefers-reduced-motion:reduce){.${tile}{animation-play-state:paused}}`;

  const share = aspectRatio / SLICES;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "size", ...props.style }}
    >
      <style>{css}</style>

      <div
        ref={bandRef}
        aria-hidden
        data-cursor={cursorLabel}
        className="absolute inset-0 cursor-grab touch-pan-y select-none transition-opacity duration-700 data-[dragging=true]:cursor-grabbing"
        style={{
          opacity: layout ? 1 : 0,
          // Un punto de fuga compartido sobre la línea central de la fila.
          perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, t) => {
          // La baldosa `columns - 1` arranca más cerca de la salida.
          const first = columns - 1 - t;
          const img = images[(shown[t] ?? first) % Math.max(images.length, 1)];
          return (
            <div
              key={t}
              className={cn(tile, "pointer-events-none absolute")}
              style={{
                left: `calc(50% - ${u(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${u(0.5)})`,
                width: u(aspectRatio),
                height: u(1),
                transformStyle: "preserve-3d",
                animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
              }}
              onAnimationIteration={(e) => {
                // elapsedTime cuenta vueltas enteras, incluso las salteadas.
                const lap = Math.round(e.elapsedTime / duration);
                setShown((prev) => {
                  const next = lap * columns + first;
                  return prev[t] === next ? prev : { ...prev, [t]: next };
                });
              }}
            >
              {Array.from({ length: SLICES }, (_, k) => (
                <div
                  key={k}
                  className={cn(
                    "absolute top-0 overflow-hidden bg-raise",
                    k === 0 && "rounded-l-[10px]",
                    k === SLICES - 1 && "rounded-r-[10px]",
                  )}
                  style={{
                    left: u((aspectRatio - share) / 2),
                    // Un píxel más ancha que su parte, para que no se abra una
                    // línea entre facetas. La última no tiene vecina que tapar.
                    width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                    height: u(1),
                    transform: turn((aspectRatio / 2 - (k + 0.5) * share) * unit),
                  }}
                >
                  {img ? (
                    /* next/image no aplica: la misma imagen se pinta en 16 tiras
                       desplazadas. Van pre-optimizadas en WebP. */
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.src}
                      alt=""
                      draggable={false}
                      decoding="async"
                      className="absolute top-0 max-w-none object-cover"
                      style={{
                        left: u(-k * share),
                        width: u(aspectRatio),
                        height: u(1),
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
}

export default TiltedGridHero;
