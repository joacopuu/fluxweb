import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos pedimos en fluxweb, para qué los usamos y cómo pedir que los borremos. Corto y sin letra chica.",
  alternates: { canonical: "/privacidad" },
};

const sections = [
  {
    title: "Qué datos pedimos",
    body: [
      "Solo los que escribís vos en el formulario de contacto: tu nombre, un email o un número de WhatsApp, y lo que nos cuentes sobre tu proyecto.",
      "Si nos escribís por WhatsApp, por email o por Instagram, recibimos lo que nos mandes por ahí, con las reglas de cada servicio.",
    ],
  },
  {
    title: "Para qué los usamos",
    body: [
      "Para responderte esa consulta y, si avanzamos, para armarte un presupuesto. No los usamos para mandarte publicidad ni los vendemos a nadie.",
    ],
  },
  {
    title: "Con quién se comparten",
    body: [
      "Si elegís «Enviar por email», el mensaje viaja por Resend, el servicio que usamos para mandar correos, y llega a nuestra casilla. Si elegís «Seguir por WhatsApp», el resumen se abre en tu WhatsApp y lo mandás vos.",
      "El sitio está alojado en Cloudflare, que procesa datos técnicos de cada visita (como la dirección IP) para servir las páginas y protegerlas.",
    ],
  },
  {
    title: "Cookies y mediciones",
    body: [
      "No usamos cookies de seguimiento ni de publicidad, por eso no ves un cartel de cookies. Si medimos visitas, lo hacemos con Cloudflare Web Analytics, que no usa cookies ni identifica a las personas.",
    ],
  },
  {
    title: "Cuánto tiempo los guardamos",
    body: [
      "Mientras dure la conversación y, si trabajamos juntos, mientras dure el proyecto. Si la consulta no avanza, los borramos cuando nos lo pidas.",
    ],
  },
  {
    title: "Tus derechos",
    body: [
      "Podés pedirnos en cualquier momento que te mostremos, corrijamos o borremos tus datos, como establece la Ley 25.326 de Protección de Datos Personales de Argentina. La Agencia de Acceso a la Información Pública es el órgano de control ante el que podés reclamar.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main
      id="contenido"
      data-skin="crema"
      data-zone-skin="crema"
      data-zone-wa="general"
      className="bg-bg pb-[var(--section)] pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))] text-ink"
    >
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <h1 className="t-display">
            Privacidad, sin letra <em>chica</em>.
          </h1>
          <p className="t-lead mt-6 max-w-[36ch] text-muted">
            Esta página es corta a propósito: pedimos pocos datos y los usamos para una sola cosa.
          </p>
          <p className="t-small mt-6 text-muted">Última actualización: 13 de noviembre de 2026.</p>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-line py-8 first:border-t-0 first:pt-0">
              <h2 className="t-sub">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="t-body measure mt-4 text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <section className="border-t border-line py-8">
            <h2 className="t-sub">Cómo escribirnos por este tema</h2>
            <p className="t-body measure mt-4 text-muted">
              A{" "}
              <a href={`mailto:${site.email}`} className="link link-on text-ink">
                {site.email}
              </a>
              . Somos {site.name}, un estudio de diseño y desarrollo web de Córdoba, Argentina.{" "}
              <Link href="/#contacto" className="link link-on text-ink">
                Volver al contacto
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
