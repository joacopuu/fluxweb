import Link from "next/link";
import { navLinks, site, team } from "@/config/site";
import { waLink, waMessages } from "@/config/whatsapp";
import { cases } from "@/content/cases";
import { Mark, WhatsAppGlyph } from "@/components/brand/mark";
import { CordobaClock } from "@/components/ui/cordoba-clock";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { WaLink } from "@/components/ui/wa-link";

function Column({ title, children, wide }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "max-md:col-span-2" : undefined}>
      <h3 className="t-small mb-4 font-medium text-muted">{title}</h3>
      <ul className="flex flex-col gap-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Footer() {
  return (
    <footer data-zone-skin="oliva" data-zone-wa="contacto" data-fab-hide className="cv pb-8 pt-[var(--section)]">
      <div className="wrap">
        <MaskReveal as="p" className="t-mega !text-[clamp(2.6rem,10.4vw,9.5rem)]">
          Tenés la idea. Falta <em>escribirnos</em>.
        </MaskReveal>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic>
            <WaLink context="contacto" className="btn btn-primary !min-h-14 !px-7 !text-base">
              <WhatsAppGlyph className="h-5 w-5" />
              Abrir WhatsApp
            </WaLink>
          </Magnetic>
          <Link href="/#contacto" className="link link-on text-[0.9375rem]">
            o contanos el proyecto en cinco preguntas
          </Link>
        </div>

        <div className="mt-[clamp(4rem,10vw,8rem)] grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-10 md:grid-cols-4">
          <Column title="Sitio">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacidad" className="link">
                Privacidad
              </Link>
            </li>
          </Column>
          <Column title="Trabajos en línea">
            {cases.map((item) =>
              item.live ? (
                <li key={item.slug}>
                  <a href={item.live.url} className="link" {...ext}>
                    {item.live.host}
                  </a>
                </li>
              ) : null,
            )}
          </Column>
          <Column title="Estudio" wide>
            <li>
              <a href={site.instagram.url} className="link" {...ext}>
                Instagram {site.instagram.handle}
              </a>
            </li>
            {team.map((person) => (
              <li key={person.name}>
                <a href={person.instagram.url} className="link" {...ext}>
                  {person.name}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Contacto" wide>
            <li>
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </li>
            <li>
              <a href={waLink(waMessages.contacto, "main")} className="link" {...ext}>
                WhatsApp {site.whatsapp.main.display}
              </a>
            </li>
            <li>
              <a href={waLink(waMessages.contacto, "alt")} className="link" {...ext}>
                WhatsApp {site.whatsapp.alt.display}
              </a>
            </li>
          </Column>
        </div>

        <div className="mt-14 flex flex-col gap-4 text-[0.875rem] md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2.5">
            <Mark className="h-5 w-auto" />
            <span className="font-display text-[1.0625rem] italic">{site.tagline}</span>
          </p>
          <p className="text-muted">
            Córdoba, Argentina. Acá son las <CordobaClock className="t-mono text-ink" />
          </p>
          <p className="text-muted">© 2026 FluxWeb. Este sitio también lo hicimos nosotros.</p>
        </div>
      </div>
    </footer>
  );
}
