import { ArrowUpRight } from "lucide-react";
import { form } from "@/content/home";
import { site } from "@/config/site";
import { waLink, waMessages } from "@/config/whatsapp";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { CopyEmail } from "@/components/ui/copy-email";
import { Magnetic } from "@/components/ui/magnetic";
import { WaLink } from "@/components/ui/wa-link";
import { LazyForm } from "./lazy-form";

/** Contacto: tres niveles de compromiso, del más rápido al más completo. */
export function Contact() {
  return (
    <section
      id="contacto"
      tabIndex={-1}
      data-zone-skin="noche"
      data-zone-wa="contacto"
      data-fab-hide
      className="section cv outline-none"
      aria-labelledby="contacto-titulo"
    >
      <div className="wrap">
        <h2 id="contacto-titulo" className="t-display max-w-[13ch]">
          Contanos qué querés <em>construir</em>.
        </h2>

        <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-10 border-t border-line pt-8 md:grid-cols-3">
          <div>
            <h3 className="font-medium">Lo más rápido</h3>
            <p className="t-body mt-1.5 text-muted">Te contesta alguno de los tres.</p>
            <div className="mt-5">
              <Magnetic>
                <WaLink context="contacto" className="btn btn-primary">
                  <WhatsAppGlyph className="h-[1.125rem] w-[1.125rem]" />
                  Abrir WhatsApp
                </WaLink>
              </Magnetic>
            </div>
            <p className="t-small mt-4 text-muted">
              ¿No contesta? Probá el{" "}
              <a
                href={waLink(waMessages.contacto, "alt")}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-on text-ink"
              >
                {site.whatsapp.alt.display}
              </a>
              .
            </p>
          </div>
          <div>
            <h3 className="font-medium">Por escrito</h3>
            <p className="t-body mt-1.5 text-muted">Para mandarnos algo largo o un archivo.</p>
            <CopyEmail className="mt-5" />
          </div>
          <div>
            <h3 className="font-medium">Por Instagram</h3>
            <p className="t-body mt-1.5 text-muted">Ahí también mostramos lo que vamos haciendo.</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-on mt-5 inline-flex items-center gap-1.5"
            >
              {site.instagram.handle}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          </div>
        </div>

        <div className="grid-12 mt-[clamp(3rem,7vw,6rem)] gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <h3 className="t-sub mb-6">O el proyecto entero, en cinco preguntas.</h3>
            <div className="rounded-[var(--radius-m)] bg-raise p-[clamp(1.25rem,3.5vw,3rem)]">
              <LazyForm />
              <noscript>
                <p className="t-body text-muted">
                  El formulario necesita JavaScript. Escribinos por WhatsApp o por email, que llega igual.
                </p>
              </noscript>
            </div>
          </div>
          <aside className="col-span-12 lg:col-span-3 lg:col-start-10 lg:pt-[4.5rem]">
            <h3 className="font-medium">Qué pasa después</h3>
            <ol className="mt-4 border-t border-line">
              {form.after.map((line, i) => (
                <li key={line} className="flex gap-4 border-b border-line py-4">
                  <span className="t-mono pt-1 text-accent">{i + 1}</span>
                  <span className="t-body text-muted">{line}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
