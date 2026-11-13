import type { Metadata, Viewport } from "next";
import { display, mono, sans } from "./fonts";
import { site, team } from "@/config/site";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { Cursor } from "@/components/layout/cursor";
import { ZoneWatcher } from "@/components/layout/zone-watcher";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "FluxWeb · Estudio de diseño y desarrollo web en Córdoba",
    template: "%s · FluxWeb",
  },
  description:
    "Estudio de diseño y desarrollo web de Córdoba. Diseñamos y programamos desde cero landings, catálogos con base de datos, tiendas y portfolios.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.name,
    url: "/",
    title: "FluxWeb · Tenés la idea. Nosotros la convertimos en una web que se siente tuya.",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#14150e",
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#estudio`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: `+${site.whatsapp.main.number}`,
  image: `${site.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Córdoba",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
  areaServed: [
    { "@type": "City", name: "Córdoba" },
    { "@type": "Country", name: "Argentina" },
  ],
  knowsLanguage: "es-AR",
  sameAs: [site.instagram.url],
  founder: team.map((person) => ({
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    sameAs: person.instagram.url,
  })),
  makesOffer: [
    "Landing pages",
    "Sitios con base de datos propia",
    "Sitios institucionales",
    "Tiendas y catálogos de producto",
    "Portfolios",
    "Marca y contenido",
    "Turnos, reservas y automatizaciones",
    "Mantenimiento web",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

const beacon = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <a href="#contenido" className="skip">
          Saltar al contenido
        </a>
        <Nav />
        {children}
        <Footer />
        <WhatsAppFab />
        <Cursor />
        <ZoneWatcher />
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {beacon ? (
          /* Cloudflare Web Analytics: sin cookies, así que no hace falta banner. */
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: beacon })}
          />
        ) : null}
      </body>
    </html>
  );
}
