"use client";

import { useState } from "react";
import { audiences } from "@/content/audiences";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { WaLink } from "@/components/ui/wa-link";
import { cn } from "@/lib/utils";

/** «Para quién»: elegís quién sos y cambia la objeción, la respuesta y el mensaje de WhatsApp. */
export function Audiences() {
  const [active, setActive] = useState(audiences[0].id);
  const current = audiences.find((a) => a.id === active) ?? audiences[0];

  return (
    <section
      data-zone-skin="noche"
      data-zone-wa="publico"
      className="section"
      aria-labelledby="publico-titulo"
    >
      <div className="wrap">
        <h2 id="publico-titulo" className="t-title max-w-[20ch]">
          Decinos quién sos. Te contestamos lo que ya estás <em>pensando</em>.
        </h2>

        <fieldset className="mt-[clamp(2.5rem,5vw,4rem)]">
          <legend className="t-lead mb-4">Soy…</legend>
          <div className="flex flex-wrap gap-2">
            {audiences.map((item) => (
              <label
                key={item.id}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2.5 text-[0.9375rem] transition-colors duration-200 active:scale-[0.98]",
                  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                  item.id === active ? "border-ink bg-ink text-bg" : "border-line-strong hover:border-ink",
                )}
              >
                <input
                  type="radio"
                  name="soy"
                  value={item.id}
                  checked={item.id === active}
                  onChange={() => setActive(item.id)}
                  className="sr-only"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div aria-live="polite" className="mt-[clamp(3rem,6vw,5rem)] border-t border-line pt-[clamp(2rem,4vw,3.5rem)]">
          <div key={current.id} className="swap-in grid-12 gap-y-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="t-small text-muted">Y pienso:</p>
              <p className="mt-3 font-display text-[clamp(1.5rem,2.5vw,2.25rem)] italic leading-[1.2] text-muted">
                «{current.objection}»
              </p>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <p className="t-display">{current.answer}</p>
              <p className="t-lead mt-8 max-w-[46ch] text-muted">
                <span className="text-ink">Te mostramos:</span> {current.show}
              </p>
              <WaLink message={current.wa} className="btn btn-primary mt-8">
                <WhatsAppGlyph className="h-[1.125rem] w-[1.125rem]" />
                Escribinos como {current.as}
              </WaLink>
            </div>
          </div>
        </div>

        <p className="t-small mt-[clamp(3rem,6vw,5rem)] max-w-[60ch] text-muted">
          Si buscás una web en Wix por dos pesos, o alguien que te publique en redes todos los días,
          hoy no somos la mejor opción. Preferimos decírtelo antes.
        </p>
      </div>
    </section>
  );
}
