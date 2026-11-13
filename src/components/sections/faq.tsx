"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/content/home";
import { Collapse } from "@/components/ui/collapse";
import { WaLink } from "@/components/ui/wa-link";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section data-zone-skin="tinta" data-zone-wa="preguntas" className="section cv" aria-labelledby="preguntas-titulo">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="preguntas-titulo" className="t-title max-w-[12ch]">
              Preguntas que siempre nos <em>hacen</em>.
            </h2>
            <p className="t-body mt-6 text-muted">
              ¿La tuya no está?{" "}
              <WaLink context="preguntas" className="link link-on text-ink">
                Hacela por WhatsApp
              </WaLink>
              .
            </p>
          </div>
        </div>
        <ul className="col-span-12 border-t border-line lg:col-span-7 lg:col-start-6">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`pregunta-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`respuesta-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[clamp(1.0625rem,1.5vw,1.3125rem)] font-medium leading-snug"
                  >
                    {item.q}
                    <Plus
                      className={cn("h-5 w-5 shrink-0 transition-transform duration-300 ease-ui", isOpen && "rotate-45")}
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <Collapse open={isOpen} id={`respuesta-${i}`} labelledBy={`pregunta-${i}`}>
                  <p className="t-body max-w-[62ch] pb-6 text-muted">{item.a}</p>
                </Collapse>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
