"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { automations, flowLabels, services, type Service } from "@/content/services";
import { waAutomation } from "@/config/whatsapp";
import { BrowserFrame } from "@/components/ui/frames";
import { Collapse } from "@/components/ui/collapse";
import { cn } from "@/lib/utils";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="t-small mb-2 text-muted">{label}</p>
      <div className="t-body">{children}</div>
    </div>
  );
}

/** «¿Qué te está comiendo el día?»: vive dentro del servicio de automatizaciones. */
function AutomationPicker() {
  const [active, setActive] = useState<string>(automations[0].id);
  const current = automations.find((a) => a.id === active) ?? automations[0];

  return (
    <div className="mt-10 rounded-[var(--radius-m)] bg-raise p-[clamp(1.25rem,3vw,2.5rem)]">
      <h4 className="t-sub">¿Qué te está comiendo el día?</h4>
      <p className="t-body mt-2 text-muted">Elegí lo que más te suene. Del otro lado está lo que armaríamos.</p>

      <div role="tablist" aria-label="Tareas para automatizar" className="mt-6 flex flex-wrap gap-2">
        {automations.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`auto-tab-${item.id}`}
            aria-selected={item.id === active}
            aria-controls="auto-panel"
            onClick={() => setActive(item.id)}
            className={cn(
              "rounded-full border px-4 py-2.5 text-left text-[0.9375rem] transition-colors duration-200 active:scale-[0.98]",
              item.id === active ? "border-ink bg-ink text-bg" : "border-line-strong text-ink hover:border-ink",
            )}
          >
            {item.pain}
          </button>
        ))}
      </div>

      <div id="auto-panel" role="tabpanel" aria-labelledby={`auto-tab-${current.id}`} key={current.id} className="swap-in mt-8">
        <p className="t-small text-muted">Armaríamos</p>
        <p className="mt-1 text-[1.25rem] font-medium leading-snug">{current.title}</p>
        <ol className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-s)] border border-line bg-line md:grid-cols-3">
          {current.flow.map((step, i) => (
            <li key={step} className="bg-raise p-5">
              <p className="t-small font-medium text-accent">{flowLabels[i]}</p>
              <p className="t-body mt-2">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="t-body max-w-[46ch] text-muted">{current.result}</p>
          <a
            href={waAutomation(current.pain)}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-on inline-flex items-center gap-2 text-[0.9375rem]"
          >
            Preguntar por esto en WhatsApp
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ service, open, onToggle }: { service: Service; open: boolean; onToggle: () => void }) {
  const panel = `servicio-${service.id}`;
  const header = `${panel}-titulo`;
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          id={header}
          aria-expanded={open}
          aria-controls={panel}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-[clamp(1.1rem,2.2vw,1.9rem)] text-left"
        >
          <span
            className={cn(
              "font-display text-[clamp(1.55rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.025em] transition-[color,transform] duration-300 ease-ui",
              "[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-2",
              open && "italic text-accent",
            )}
          >
            {service.name}
          </span>
          <span className="flex shrink-0 items-center gap-6">
            <span className="t-small hidden text-muted lg:block">{service.plazo}</span>
            <Plus
              className={cn("h-6 w-6 transition-transform duration-300 ease-ui", open && "rotate-45")}
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </span>
        </button>
      </h3>
      <Collapse open={open} id={panel} labelledBy={header}>
        <div className="grid-12 gap-y-8 pb-[clamp(2rem,4vw,3.5rem)] pt-2">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <Field label="Qué es">{service.what}</Field>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <Field label="Para quién">{service.who}</Field>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Field label="Ejemplo">{service.example}</Field>
            <p className="t-small mt-4 text-muted lg:hidden">Plazo orientativo: {service.plazo}</p>
            {service.real ? (
              <Link href={service.real.href} data-cursor="Ver caso" className="mt-6 block max-w-[30rem]">
                <BrowserFrame host={service.real.href.replace("/trabajos/", "")}>
                  <Image
                    src={service.real.shot.src}
                    alt={service.real.shot.alt}
                    width={service.real.shot.width}
                    height={service.real.shot.height}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
                <span className="link link-on mt-4 inline-flex items-center gap-2 text-[0.9375rem]">
                  {service.real.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            ) : null}
          </div>
          {service.automation ? (
            <div className="col-span-12">
              <AutomationPicker />
            </div>
          ) : null}
        </div>
      </Collapse>
    </li>
  );
}

export function Services() {
  const [open, setOpen] = useState<string | null>(services[0].id);
  return (
    <section
      id="servicios"
      tabIndex={-1}
      data-zone-skin="crema"
      data-zone-wa="servicios"
      className="section cv outline-none"
      aria-labelledby="servicios-titulo"
    >
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 id="servicios-titulo" className="t-display col-span-12 lg:col-span-8">
            Qué hacemos, de lo más pedido a lo más <em>específico</em>.
          </h2>
          <p className="t-body col-span-12 text-muted lg:col-span-3 lg:col-start-10">
            Todo se diseña y se programa desde cero. Sin constructores visuales y sin plantillas de
            por medio.
          </p>
        </div>

        <ul className="mt-[clamp(2.5rem,6vw,5rem)] border-t border-line">
          {services.map((service) => (
            <Row
              key={service.id}
              service={service}
              open={open === service.id}
              onToggle={() => setOpen((cur) => (cur === service.id ? null : service.id))}
            />
          ))}
        </ul>

        <p className="t-sub mt-[clamp(3rem,6vw,5rem)] max-w-[28ch]">
          ¿No encontrás el tuyo?{" "}
          <Link href="/#contacto" className="link link-on text-accent">
            Contanos qué querés lograr
          </Link>{" "}
          y te decimos por dónde arrancar.
        </p>
      </div>
    </section>
  );
}
