"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { facts, stages } from "@/content/home";
import { WaLink } from "@/components/ui/wa-link";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cómo trabajamos. Una línea (el cauce) se dibuja con el scroll y enciende
 * cada etapa cuando la alcanza. Es una secuencia de verdad, así que la línea
 * y los números informan: no decoran.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const svg = svgRef.current;
    const base = baseRef.current;
    const draw = drawRef.current;
    if (!list || !svg || !base || !draw) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-stage]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let triggers: ScrollTrigger[] = [];

    const build = () => {
      triggers.forEach((t) => t.kill());
      triggers = [];
      const box = list.getBoundingClientRect();
      const W = box.width;
      const H = box.height;
      const wide = W >= 900;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      // Un punto por etapa: en escritorio la línea serpentea entre columnas.
      const points = items.map((item, i) => {
        const r = item.getBoundingClientRect();
        const y = r.top - box.top + (wide ? r.height / 2 : 18);
        const x = wide ? (i % 2 === 0 ? W * 0.6 : W * 0.4) : 7;
        return { x, y };
      });
      const start = { x: wide ? W * 0.5 : 7, y: 0 };
      const end = { x: wide ? W * 0.5 : 7, y: H };
      const all = [start, ...points, end];
      let d = `M${all[0].x} ${all[0].y}`;
      for (let i = 1; i < all.length; i++) {
        const a = all[i - 1];
        const b = all[i];
        const mid = (a.y + b.y) / 2;
        d += ` C${a.x} ${mid} ${b.x} ${mid} ${b.x} ${b.y}`;
      }
      base.setAttribute("d", d);
      draw.setAttribute("d", d);
      svg.querySelectorAll("circle").forEach((c, i) => {
        c.setAttribute("cx", String(points[i]?.x ?? 0));
        c.setAttribute("cy", String(points[i]?.y ?? 0));
      });
      const length = draw.getTotalLength();
      draw.style.strokeDasharray = String(length);

      if (reduce) {
        draw.style.strokeDashoffset = "0";
        items.forEach((item) => (item.dataset.on = "true"));
        return;
      }
      draw.style.strokeDashoffset = String(length);
      const tween = gsap.to(draw, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: list, start: "top 62%", end: "bottom 62%", scrub: 0.5 },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      items.forEach((item, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: list,
            start: () => `top+=${points[i].y} 62%`,
            onEnter: () => (item.dataset.on = "true"),
            onLeaveBack: () => (item.dataset.on = "false"),
          }),
        );
      });
    };

    build();
    const observer = new ResizeObserver(() => {
      build();
      ScrollTrigger.refresh();
    });
    observer.observe(list);
    return () => {
      observer.disconnect();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="proceso"
      tabIndex={-1}
      data-zone-skin="tinta"
      data-zone-wa="proceso"
      className="section outline-none"
      aria-labelledby="proceso-titulo"
    >
      <div className="wrap">
        <h2 id="proceso-titulo" className="t-display max-w-[14ch]">
          Cuatro etapas, cada una con <em>fecha</em>.
        </h2>

        <ol ref={listRef} className="relative mt-[clamp(3rem,7vw,6rem)]">
          <svg
            ref={svgRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            fill="none"
          >
            <path ref={baseRef} stroke="var(--line)" strokeWidth="1.5" />
            <path ref={drawRef} stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            {stages.map((stage) => (
              <circle key={stage.name} r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
            ))}
          </svg>

          {stages.map((stage, i) => (
            <li key={stage.name} className="grid-12 relative py-[clamp(2rem,5vw,4.5rem)]">
              <div
                data-stage
                data-on="false"
                className={cn(
                  "col-span-12 pl-9 opacity-40 transition-opacity duration-500 data-[on=true]:opacity-100 min-[900px]:pl-0",
                  i % 2 === 0
                    ? "min-[900px]:col-span-6 min-[900px]:pr-[8%]"
                    : "min-[900px]:col-span-6 min-[900px]:col-start-7 min-[900px]:pl-[8%]",
                )}
              >
                <p className="t-small text-muted">
                  Etapa {i + 1} de {stages.length}. <span className="text-accent">{stage.time}.</span>
                </p>
                <h3 className="t-title mt-2">{stage.name}</h3>
                <p className="t-lead mt-4 max-w-[36ch]">{stage.body}</p>
                <p className="t-body mt-5 max-w-[40ch] border-t border-line pt-4 text-muted">
                  <span className="font-medium text-ink">Recibís:</span> {stage.get}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <dl className="mt-[clamp(4rem,9vw,8rem)] grid gap-x-[clamp(2rem,6vw,6rem)] border-t border-line md:grid-cols-2">
          {facts.map((item) => (
            <div key={item.fact} className="border-b border-line py-7 last:md:col-span-2">
              <dt className="t-sub max-w-[24ch]">{item.fact}</dt>
              <dd className="t-body mt-3 max-w-[48ch] text-muted">{item.note}</dd>
            </div>
          ))}
        </dl>

        <WaLink context="proceso" className="group mt-[clamp(3rem,6vw,5rem)] inline-flex items-center gap-3">
          <span className="t-sub link">Empezá por la etapa uno: media hora de charla.</span>
          <ArrowUpRight
            className="h-7 w-7 shrink-0 text-accent transition-transform duration-300 ease-ui group-hover:-translate-y-1 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </WaLink>
      </div>
    </section>
  );
}
