import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cases, type CaseStudy } from "@/content/cases";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { LazyClip } from "@/components/ui/lazy-clip";
import { Drift, Unveil } from "@/components/ui/scroll-fx";
import { WaLink } from "@/components/ui/wa-link";
import { cn } from "@/lib/utils";

/** Lo que se ve al salir del portal: la tesis de la sección. */
export function WorkIntro() {
  return (
    <div className="mx-auto w-full max-w-[110rem]">
      <h2 className="t-display max-w-[16ch]">
        Dos sitios en línea. No se parecen entre sí, y ninguno se parece a <em>nosotros</em>.
      </h2>
      <p className="t-lead mt-8 max-w-[44ch] lg:ml-[41.666%]">
        Mirande es pizarra y crema, con fotos del valle. BeClean es verde petróleo y menta, con una
        tableta en 3D. Fijate cómo cambia esta página cuando entrás a cada uno.
      </p>
    </div>
  );
}

function Chapter({ item, flip }: { item: CaseStudy; flip: boolean }) {
  const href = `/trabajos/${item.slug}`;
  return (
    <section data-zone-skin={item.skin} data-zone-wa={item.wa} className="section cv" aria-labelledby={`caso-${item.slug}`}>
      <div className="wrap grid-12 items-center gap-y-14">
        <div className={cn("col-span-12 lg:col-span-5", flip ? "lg:order-2 lg:col-start-8" : "")}>
          <h3 id={`caso-${item.slug}`} className="t-client">
            {item.name}
          </h3>
          <p className="t-small mt-4 text-muted">
            {item.kind}. {item.place}.
          </p>
          <p className="t-lead mt-6 max-w-[38ch]">{item.summary}</p>
          <ul className="mt-8 border-t border-line">
            {item.highlights.map((line) => (
              <li key={line} className="t-body border-b border-line py-3.5 text-muted">
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href={href} className="btn btn-primary">
              Ver el caso completo
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
            {item.live ? (
              <a
                href={item.live.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-on inline-flex items-center gap-1.5 text-[0.9375rem]"
              >
                {item.live.host}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
            ) : null}
          </div>
        </div>

        <div className={cn("relative col-span-12 lg:col-span-7", flip ? "lg:order-1" : "lg:col-start-6")}>
          <Unveil>
            <Link href={href} data-cursor="Ver caso" className="block">
              <span className="sr-only">Ver el caso de {item.name}: </span>
              <ViewTransition name={`caso-${item.slug}`} share="morph" default="none">
                <BrowserFrame host={item.live?.host ?? "fluxweb"}>
                  {item.clip ? (
                    <LazyClip {...item.clip} className="block h-auto w-full bg-raise" />
                  ) : (
                    <Image
                      src={item.hero.src}
                      alt={item.hero.alt}
                      width={item.hero.width}
                      height={item.hero.height}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="block h-auto w-full"
                    />
                  )}
                </BrowserFrame>
              </ViewTransition>
            </Link>
          </Unveil>
          {item.phone ? (
            <div
              className={cn(
                "pointer-events-none absolute bottom-[-14%] w-[22%] min-w-[5.5rem] max-w-[12rem]",
                flip ? "left-[5%]" : "right-[5%]",
              )}
            >
              <Drift from={14} to={-14}>
                <PhoneFrame>
                  <Image
                    src={item.phone.src}
                    alt={item.phone.alt}
                    width={item.phone.width}
                    height={item.phone.height}
                    sizes="(min-width: 1024px) 14vw, 24vw"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </PhoneFrame>
              </Drift>
            </div>
          ) : null}
        </div>
      </div>

      <div className="wrap mt-[clamp(5rem,10vw,9rem)]">
        <WaLink context={item.wa} className="group inline-flex max-w-full items-baseline gap-4">
          <span className="t-client-sub link">{item.cta}</span>
          <ArrowUpRight
            className="h-[clamp(1.25rem,2.2vw,2rem)] w-[clamp(1.25rem,2.2vw,2rem)] shrink-0 self-center text-accent transition-transform duration-300 ease-ui group-hover:-translate-y-1 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </WaLink>
      </div>
    </section>
  );
}

export function WorkChapters() {
  return (
    <>
      {cases
        .filter((item) => item.clip)
        .map((item, i) => (
          <Chapter key={item.slug} item={item} flip={i % 2 === 1} />
        ))}
    </>
  );
}

/** El tercer trabajo es el sitio que se está recorriendo. */
export function WorkOutro({ hasCase }: { hasCase: boolean }) {
  return (
    <section data-zone-skin="tinta" data-zone-wa="fluxweb" className="wrap cv py-[clamp(5rem,11vw,10rem)]">
      <p className="t-title max-w-[22ch]">
        El tercero lo estás recorriendo. Este sitio también lo hicimos <em>nosotros</em>.
      </p>
      {hasCase ? (
        <Link href="/trabajos/fluxweb" className="link link-on mt-8 inline-flex items-center gap-2">
          Ver cómo está hecho
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </Link>
      ) : null}
    </section>
  );
}
