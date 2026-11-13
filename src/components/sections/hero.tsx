import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { Magnetic } from "@/components/ui/magnetic";
import { WaLink } from "@/components/ui/wa-link";
import { WhatsAppGlyph } from "@/components/brand/mark";

/** Las diez baldosas del cilindro: capturas reales, con el marco horneado. */
const tiles = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/work/cilindro/${n}.webp`,
    srcSet: `/work/cilindro/${n}-s.webp 640w, /work/cilindro/${n}.webp 1120w`,
  };
});

/** Palabras que suben desde una máscara, en CSS puro (no espera a JavaScript). */
function Rise({
  text,
  from = 0,
  delay = 0,
  peek,
}: {
  text: string;
  from?: number;
  delay?: number;
  /** Arranca ya asomando, para que el titular exista desde el primer cuadro. */
  peek?: boolean;
}) {
  return text.split(" ").map((word, i) => (
    <span key={i}>
      <span className="rise">
        <span
          style={
            { "--i": from + i, "--d": `${delay}ms`, ...(peek ? { "--from": "58%" } : {}) } as React.CSSProperties
          }
        >
          {word}
        </span>
      </span>{" "}
    </span>
  ));
}

export function Hero() {
  return (
    <section
      data-zone-skin="tinta"
      data-zone-wa="hero"
      className="relative flex min-h-svh flex-col pt-[var(--nav-h)]"
    >
      <div className="wrap pt-[clamp(1.25rem,4.5svh,3.5rem)]">
        <h1 className="grid-12 gap-y-[clamp(0.75rem,2svh,1.5rem)]">
          <span className="t-mega col-span-12 block">
            <Rise text="Tenés la idea." peek />
          </span>
          <span className="t-sub col-span-12 block lg:col-span-7 lg:col-start-6">
            <Rise text="Nosotros la convertimos en una web que se siente" from={3} delay={120} />
            <span className="rise">
              <span style={{ "--i": 13, "--d": "120ms" } as React.CSSProperties}>
                <em>tuya</em>.
              </span>
            </span>
          </span>
        </h1>

        <div className="grid-12 mt-[clamp(1.5rem,4svh,3rem)] items-end gap-y-6">
          <p
            className="t-body fade-in col-span-12 max-w-[34rem] text-muted md:col-span-6 lg:col-span-4"
            style={{ "--d": "700ms" } as React.CSSProperties}
          >
            FluxWeb es un estudio de diseño y desarrollo web de Córdoba.{" "}
            <span className="max-sm:hidden">
              Somos tres, y cada sitio lo diseñamos y lo programamos desde cero.
            </span>
          </p>
          <div
            className="fade-in col-span-12 flex flex-wrap items-center gap-2.5 max-sm:[&_.btn]:px-4 max-sm:[&_.btn]:text-[0.9375rem] md:col-span-6 md:justify-end lg:col-span-7 lg:col-start-6 lg:justify-start"
            style={{ "--d": "850ms" } as React.CSSProperties}
          >
            <Magnetic>
              <WaLink context="hero" className="btn btn-primary">
                <WhatsAppGlyph className="h-[1.125rem] w-[1.125rem]" />
                Contanos tu idea
              </WaLink>
            </Magnetic>
            <a href="#trabajos" className="btn btn-ghost">
              Ver los trabajos
            </a>
          </div>
        </div>
      </div>

      <TiltedGridHero
        images={tiles}
        speed={7}
        tileHeight={78}
        aspectRatio={1120 / 736}
        gap={5}
        axis={50}
        curve={74}
        fade={10}
        cursorLabel="Arrastrá"
        className="fade-in mt-[clamp(1.25rem,4svh,3rem)] min-h-[15rem] w-full flex-1 basis-[clamp(15rem,40svh,30rem)]"
        style={{ "--d": "500ms" } as React.CSSProperties}
      />

      <p className="wrap t-small pb-6 pt-3 text-muted">
        Estas pantallas son de sitios nuestros que están en línea. Arrastralas.
      </p>
    </section>
  );
}
