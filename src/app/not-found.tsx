import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/brand/mark";
import { WaLink } from "@/components/ui/wa-link";

export const metadata: Metadata = {
  title: "Esta página no existe",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="contenido"
      data-zone-skin="tinta"
      data-zone-wa="notFound"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-16 pt-[calc(var(--nav-h)+2rem)]"
    >
      <Mark className="pointer-events-none absolute -right-[12%] top-1/2 h-[120%] w-auto -translate-y-1/2 text-raise" />
      <div className="wrap relative">
        <p className="t-mono text-muted">Error 404</p>
        <h1 className="t-mega mt-4 max-w-[9ch]">
          Esta página no <em>existe</em>.
        </h1>
        <p className="t-lead mt-8 max-w-[38ch] text-muted">
          Nadie mira la página de error. Nosotros sí. Ya que estás acá, desde el inicio llegás a todo.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/" className="btn btn-primary">
            Volver al inicio
          </Link>
          <Link href="/#trabajos" className="link link-on">
            Ver los trabajos
          </Link>
          <WaLink context="notFound" className="link link-on">
            Avisarnos por WhatsApp
          </WaLink>
        </div>
      </div>
    </main>
  );
}
