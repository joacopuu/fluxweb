/**
 * Datos del estudio que no son "texto": nombres propios, enlaces y teléfonos.
 * El texto que se lee en pantalla vive en `src/content/`.
 */

export const site = {
  name: "FluxWeb",
  tagline: "Diseñamos proyectos que fluyen.",
  description:
    "Estudio de diseño y desarrollo web de Córdoba. Diseñamos y programamos desde cero landings, catálogos con base de datos propia, tiendas y portfolios.",
  /**
   * URL pública. Se lee en el build (queda escrita en la canónica, Open Graph
   * y el sitemap). Con dominio propio: definir NEXT_PUBLIC_SITE_URL y volver a
   * publicar.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fluxweb-v2.joaquinpugatrossero.workers.dev").replace(/\/$/, ""),
  locale: "es-AR",
  city: "Córdoba",
  country: "Argentina",
  timeZone: "America/Argentina/Cordoba",
  email: "fluxwebpages@gmail.com",
  instagram: {
    handle: "@fluxwebpages",
    url: "https://www.instagram.com/fluxwebpages/",
  },
  /**
   * WhatsApp del estudio. No están asignados a ninguna persona del equipo.
   * `main` es el que usan el botón, los CTAs y el formulario.
   * `alt` aparece solo en contacto y en el footer.
   */
  whatsapp: {
    main: { number: "5493517684187", display: "351 768 4187" },
    alt: { number: "5493516518107", display: "351 651 8107" },
  },
} as const;

export const navLinks = [
  { label: "Trabajos", href: "/#trabajos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Estudio", href: "/#estudio" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  /** Borrador: cada integrante lo confirma o lo cambia (ver PENDIENTES.md). */
  favorite: string;
  instagram: { handle: string; url: string };
};

export const team: TeamMember[] = [
  {
    name: "Francisco Aybar",
    role: "Desarrollo fullstack",
    focus: "Arquitectura, interfaz y performance de cada proyecto.",
    favorite: "El logo de Mirande que se parte en dos para abrir el valle.",
    instagram: {
      handle: "@franciscoaybarr",
      url: "https://www.instagram.com/franciscoaybarr/",
    },
  },
  {
    name: "Joaquín Puga",
    role: "Desarrollo fullstack",
    focus: "Integraciones, mantenimiento y atención después del lanzamiento.",
    favorite: "El botón de cada ficha que arma el WhatsApp con el nombre y el precio.",
    instagram: {
      handle: "@joacopugaa",
      url: "https://www.instagram.com/joacopugaa/",
    },
  },
  {
    name: "Joaquín Castellano",
    role: "Marketing",
    focus: "Posicionamiento, contenido y campañas para que el sitio traiga gente.",
    favorite: "La barra de BeClean que dice «95 % agua». Se entiende sin leer nada más.",
    instagram: {
      handle: "@joacocastellanoo",
      url: "https://www.instagram.com/joacocastellanoo/",
    },
  },
];

/** Con qué construimos. El orden es el del perfil de marca. */
export const stack = [
  { name: "Next.js", role: "estructura del sitio" },
  { name: "React", role: "interfaz" },
  { name: "TypeScript", role: "tipos y errores" },
  { name: "Tailwind", role: "estilos" },
  { name: "Motion", role: "animación" },
  { name: "GSAP", role: "scroll" },
  { name: "Three.js", role: "3D" },
  { name: "Cloudflare", role: "publicación" },
  { name: "Vercel", role: "publicación" },
  { name: "Resend", role: "correo" },
  { name: "Figma", role: "diseño" },
] as const;
