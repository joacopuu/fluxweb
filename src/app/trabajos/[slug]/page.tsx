import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cases, getCase, type CaseDetail, type Shot } from "@/content/cases";
import { site } from "@/config/site";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { Unveil } from "@/components/ui/scroll-fx";
import { WaLink } from "@/components/ui/wa-link";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return {
    title: item.seo.title,
    description: item.seo.description,
    alternates: { canonical: `/trabajos/${item.slug}` },
    openGraph: {
      type: "article",
      url: `/trabajos/${item.slug}`,
      title: item.seo.title,
      description: item.seo.description,
    },
  };
}

function Framed({ shot, host, sizes, priority }: { shot: Shot; host: string; sizes: string; priority?: boolean }) {
  return (
    <BrowserFrame host={host}>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        // Next 16: `preload` reemplaza a `priority`. Solo la captura principal.
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : undefined}
        quality={priority ? 70 : 80}
        className="block h-auto w-full"
      />
    </BrowserFrame>
  );
}

function Detail({ detail, host, serif }: { detail: CaseDetail; host: string; serif?: boolean }) {
  const text = (
    <>
      <h3
        className={
          serif
            ? "t-sub"
            : "text-[clamp(1.375rem,2.2vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
        }
      >
        {detail.title}
      </h3>
      <p className="t-lead mt-5 max-w-[40ch] text-muted">{detail.body}</p>
    </>
  );

  if (detail.layout === "ancho") {
    return (
      <li className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-6">{text}</div>
        <div className={cn("col-span-12 grid gap-5", detail.compare && "md:grid-cols-2")}>
          <Unveil>
            <Framed shot={detail.shot} host={host} sizes={detail.compare ? "(min-width: 768px) 50vw, 100vw" : "100vw"} />
          </Unveil>
          {detail.compare ? (
            <Unveil>
              <Framed shot={detail.compare} host={host} sizes="(min-width: 768px) 50vw, 100vw" />
            </Unveil>
          ) : null}
        </div>
      </li>
    );
  }

  const left = detail.layout === "izquierda";
  return (
    <li className="grid-12 items-center gap-y-8">
      <div className={cn("col-span-12 lg:col-span-4", left ? "lg:order-2 lg:col-start-9" : "")}>{text}</div>
      <div className={cn("col-span-12 lg:col-span-7", left ? "lg:order-1" : "lg:col-start-6")}>
        <Unveil>
          <Framed shot={detail.shot} host={host} sizes="(min-width: 1024px) 58vw, 100vw" />
        </Unveil>
      </div>
    </li>
  );
}

export default async function CasePage({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const host = item.live?.host ?? "este sitio";
  // La voz tipográfica del caso: sans para los clientes, serif para el estudio.
  const big = item.serif ? "t-mega !text-[clamp(2.8rem,8vw,7.5rem)]" : "t-client";
  const mid = item.serif ? "t-title" : "t-client-sub";
  const index = cases.findIndex((c) => c.slug === item.slug);
  const next = cases[(index + 1) % cases.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.seo.title,
    description: item.seo.description,
    url: `${site.url}/trabajos/${item.slug}`,
    dateCreated: item.year,
    creator: { "@id": `${site.url}/#estudio` },
    about: item.name,
    ...(item.live ? { isBasedOn: item.live.url } : {}),
  };

  return (
    <main
      id="contenido"
      data-skin={item.skin}
      data-zone-skin={item.skin}
      data-zone-wa={item.wa}
      className="bg-bg text-ink"
    >
      <header className="wrap pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--nav-h)+clamp(1.5rem,5vw,4rem))]">
        <Link href="/#trabajos" className="link inline-flex items-center gap-2 text-[0.9375rem] text-muted">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Todos los trabajos
        </Link>
        <div className="grid-12 mt-[clamp(2rem,5vw,4rem)] items-end gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <h1 className={big}>{item.name}</h1>
            <p className="t-small mt-4 text-muted">
              {item.kind}. {item.place}. {item.year}.
            </p>
          </div>
          <p className="t-lead col-span-12 text-muted lg:col-span-4">{item.lead}</p>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)]">
          <ViewTransition name={`caso-${item.slug}`} share="morph" default="none">
            <Framed shot={item.hero} host={host} sizes="100vw" priority />
          </ViewTransition>
        </div>
      </header>

      <section className="wrap grid-12 gap-y-12 pb-[var(--section)]" aria-labelledby="problema">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="problema" className="t-small text-muted">
            El problema
          </h2>
          <p className={cn(mid, "mt-4 max-w-[26ch]")}>{item.problem}</p>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <h2 className="t-small text-muted">Qué hicimos</h2>
          <ul className="mt-4 border-t border-line">
            {item.deliverables.map((line) => (
              <li key={line} className="t-body border-b border-line py-3">
                {line}
              </li>
            ))}
          </ul>
          {item.live ? (
            <a
              href={item.live.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Abrir"
              className="btn btn-primary mt-8"
            >
              Abrir {item.live.host}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          ) : null}
        </div>
      </section>

      <section className="wrap pb-[var(--section)]" aria-labelledby="decisiones">
        <h2 id="decisiones" className={mid}>
          Qué decidimos y por qué
        </h2>
        <ul className="mt-10 grid gap-x-[clamp(2rem,6vw,6rem)] border-t border-line md:grid-cols-2">
          {item.decisions.map((decision) => (
            <li key={decision.title} className="border-b border-line py-8">
              <h3 className="text-[1.3125rem] font-semibold leading-snug tracking-[-0.02em]">{decision.title}</h3>
              <p className="t-body mt-3 max-w-[48ch] text-muted">{decision.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap pb-[var(--section)]" aria-labelledby="detalles">
        <h2 id="detalles" className={cn(mid, "max-w-[20ch]")}>
          Los detalles de los que estamos orgullosos
        </h2>
        <ul className="mt-[clamp(3rem,7vw,6rem)] flex flex-col gap-[clamp(5rem,12vw,10rem)]">
          {item.details.map((detail) => (
            <Detail key={detail.title} detail={detail} host={host} serif={item.serif} />
          ))}
        </ul>
      </section>

      {item.mobile ? (
        <section className="wrap grid-12 items-center gap-y-12 pb-[var(--section)]" aria-labelledby="celular">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="celular" className={mid}>
              {item.mobile.title}
            </h2>
            <p className="t-lead mt-5 max-w-[36ch] text-muted">{item.mobile.body}</p>
          </div>
          <ul className="col-span-12 grid grid-cols-3 items-start gap-[clamp(0.75rem,3vw,2.5rem)] lg:col-span-7 lg:col-start-6">
            {item.mobile.shots.map((shot, i) => (
              <li key={shot.src} className={cn(i === 1 && "mt-[18%]", i === 2 && "mt-[8%]")}>
                <PhoneFrame>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 1024px) 18vw, 30vw"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </PhoneFrame>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="wrap border-t border-line py-[var(--section)]">
        <p className={cn(item.serif ? "t-display" : "t-client !text-[clamp(2.2rem,6vw,5.5rem)]", "max-w-[14ch]")}>
          {item.cta}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <WaLink context={item.wa} className="btn btn-primary !min-h-14 !px-7 !text-base">
            <WhatsAppGlyph className="h-5 w-5" />
            Contanos el tuyo
          </WaLink>
          {next.slug !== item.slug ? (
            <Link href={`/trabajos/${next.slug}`} className="link link-on inline-flex items-center gap-2">
              Siguiente caso: {next.name}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
