import { ArrowUpRight } from "lucide-react";
import { site, stack, team } from "@/config/site";
import { CordobaClock } from "@/components/ui/cordoba-clock";
import { cn } from "@/lib/utils";

const offsets = ["", "lg:mt-16", "lg:mt-32"];

/** Quiénes somos, con el stack adentro a modo de colofón. */
export function Studio() {
  return (
    <section
      id="estudio"
      tabIndex={-1}
      data-zone-skin="crema"
      data-zone-wa="estudio"
      className="section cv outline-none"
      aria-labelledby="estudio-titulo"
    >
      <div className="wrap">
        <h2 id="estudio-titulo" className="t-display max-w-[17ch]">
          Somos tres. Vas a hablar siempre con quien hace el <em>trabajo</em>.
        </h2>

        <ul className="mt-[clamp(3rem,7vw,6rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-14 lg:grid-cols-3">
          {team.map((person, i) => (
            <li key={person.name} className={cn("border-t border-ink pt-6", offsets[i])}>
              <h3 className="font-display text-[clamp(1.9rem,3vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.025em]">
                {person.name}
              </h3>
              <p className="mt-2 font-medium text-accent">{person.role}</p>
              <p className="t-body mt-5 max-w-[34ch]">{person.focus}</p>
              <p className="t-small mt-6 text-muted">Su detalle favorito de nuestros sitios</p>
              <p className="mt-1.5 max-w-[30ch] font-display text-[1.25rem] italic leading-[1.3]">
                {person.favorite}
              </p>
              <a
                href={person.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-on mt-6 inline-flex items-center gap-1.5 text-[0.9375rem]"
              >
                Instagram {person.instagram.handle}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(4rem,9vw,8rem)] flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <p className="t-title">
            Córdoba, Argentina.
            <br />
            Acá son las <CordobaClock className="font-mono text-[0.82em] tracking-[-0.04em] text-accent" />.
          </p>
          <p className="t-body max-w-[30ch] text-muted">
            Trabajamos en remoto, con clientes de cualquier lugar.{" "}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link link-on text-ink">
              Escribile al estudio en Instagram
            </a>
            .
          </p>
        </div>

        <div className="grid-12 mt-[clamp(4rem,9vw,8rem)] gap-y-10 border-t border-line pt-[clamp(2.5rem,5vw,4rem)]">
          <div className="col-span-12 lg:col-span-5">
            <h3 className="t-sub max-w-[18ch]">
              Herramientas conocidas, no inventos <em>nuestros</em>.
            </h3>
            <p className="t-body mt-5 max-w-[42ch] text-muted">
              Todo lo que usamos es estándar y está documentado. Si mañana querés llevarte el
              proyecto a otro equipo, cualquier persona que programe para la web va a entender el
              código.
            </p>
          </div>
          <dl className="col-span-12 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {stack.map((tool) => (
              <div key={tool.name} className="border-b border-line py-3">
                <dt className="font-medium">{tool.name}</dt>
                <dd className="t-small text-muted">{tool.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
