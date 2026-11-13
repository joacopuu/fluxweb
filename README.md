# FluxWeb · portfolio

El sitio del estudio. Next.js 16 (App Router), TypeScript estricto, Tailwind 4, GSAP, Lenis y Motion, publicado en Cloudflare Workers con `@opennextjs/cloudflare`.

Documentos que acompañan al código:

- [`DESIGN.md`](DESIGN.md): concepto, sistema de diseño, sistema de motion, referencias y componentes.
- [`COPY.md`](COPY.md): todo el texto del sitio.
- [`PENDIENTES.md`](PENDIENTES.md): lo que necesita una acción del equipo.
- [`PROGRESO.md`](PROGRESO.md): bitácora de la construcción y resultados de QA.

## Correrlo

Hace falta Node 20 o más nuevo.

```bash
npm install
```

```bash
npm run dev
```

Abre en http://localhost:3000.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo con recarga. |
| `npm run build` | Build de producción de Next. |
| `npm run lint` | ESLint. |
| `npm run typecheck` | TypeScript sin emitir. |
| `npm run preview` | Build con OpenNext y vista previa local **con el runtime de Workers** (http://localhost:8787). Es la prueba que vale antes de publicar. |
| `npm run deploy` | Build con OpenNext y publicación en Cloudflare. |
| `npm run cf-typegen` | Genera los tipos de los bindings de Cloudflare. |

## Variables de entorno

Están descritas en [`.env.example`](.env.example). Para desarrollo van en `.env.local`; para `npm run preview`, en `.dev.vars`; en producción se cargan como secretos:

```bash
npx wrangler secret put RESEND_API_KEY
```

```bash
npx wrangler secret put CONTACT_FROM_EMAIL
```

| Variable | Para qué | Si falta |
|---|---|---|
| `RESEND_API_KEY` | Enviar el formulario por email. | El formulario ofrece solo la salida por WhatsApp. No se rompe nada. |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend. | Usa `onboarding@resend.dev`, que solo entrega a la casilla dueña de la cuenta de Resend. |
| `CONTACT_TO_EMAIL` | A dónde llegan las consultas. | Van a `fluxwebpages@gmail.com`. |
| `NEXT_PUBLIC_SITE_URL` | URL pública. **Se lee en el build** (canónica, Open Graph, sitemap). | Usa el valor por defecto de `src/config/site.ts`. |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | Cloudflare Web Analytics (sin cookies). | No se carga ningún script de medición. |

## Publicar en Cloudflare

El Worker se llama **`fluxweb-v2`** (en `name` y en `WORKER_SELF_REFERENCE` de [`wrangler.jsonc`](wrangler.jsonc)). El sitio anterior es el Worker `fluxweb`: no cambiar el nombre, porque lo pisaría.

```bash
npx wrangler login
```

```bash
npm run deploy
```

Después del primer deploy, copiar la URL de `workers.dev` a `NEXT_PUBLIC_SITE_URL` y volver a publicar, para que la canónica y las `og:image` apunten al lugar correcto.

## Estructura

```
src/
  app/
    layout.tsx              layout raíz: fuentes, metadatos, JSON-LD, nav y footer
    page.tsx                la home
    globals.css             tokens, pieles, tipografía y motion
    fonts.ts                tipografías (next/font)
    trabajos/[slug]/        página de cada caso y su og:image
    privacidad/             política de privacidad
    not-found.tsx           404
    api/contacto/route.ts   envío del formulario (zod, Resend por fetch, límite por IP)
    opengraph-image.tsx     og:image de la home
    sitemap.ts, robots.ts
  config/
    site.ts                 datos del estudio: enlaces, WhatsApp, equipo, stack
    whatsapp.ts             mensajes de WhatsApp de cada sección
  content/
    cases.ts                los casos de estudio
    services.ts             los servicios y el bloque de automatizaciones
    audiences.ts            «Para quién»: público, objeción y respuesta
    home.ts                 etapas, hechos, preguntas y opciones del formulario
  components/
    sections/               una sección de la home por archivo
    layout/                 nav, footer, cursor, scroll suave, zonas
    ui/                     piezas reutilizables (marcos, cilindro, portal, etc.)
    brand/                  isotipo
  lib/
    zones.ts                piel del sitio y contexto de WhatsApp según la sección
    scroll-kit.ts           carga de ScrollTrigger y SplitText con el primer scroll
    contact.ts              validación del formulario (la usan cliente y servidor)
    og.tsx, og-fonts.ts     og:image con next/og
public/work/                capturas y clips de los trabajos
```

## Cómo agregar un caso

1. **Imágenes.** Guardarlas en `public/work/<slug>/`, en WebP. Escritorio: 2400×1500. Celular: 780×1688. Cada captura se usa una sola vez en todo el sitio.
2. **Contenido.** Sumar un objeto al array `cases` de [`src/content/cases.ts`](src/content/cases.ts). El tipo `CaseStudy` dice qué lleva cada campo; copiar un caso existente es lo más rápido.
3. **Piel.** En [`src/app/globals.css`](src/app/globals.css), agregar un bloque `[data-skin="<nombre>"]` con los seis colores del cliente (fondo, fondo elevado, texto, apagado, acento y línea) y usar ese nombre en el campo `skin` del caso. Sumar la misma paleta a `ogPalettes` en [`src/lib/og.tsx`](src/lib/og.tsx) para su `og:image`.
4. **Mensaje de WhatsApp.** Agregar una clave en `waMessages` de [`src/config/whatsapp.ts`](src/config/whatsapp.ts) y usarla en el campo `wa`.

Con eso el caso aparece solo en la home (si tiene `clip`), en `/trabajos/<slug>`, en el sitemap y en el footer. El titular «Dos sitios en línea» cuenta los casos con sitio publicado, así que se actualiza solo.

Para el clip de la home: un MP4 H.264 sin audio, de hasta 1 MB, más un póster WebP del primer cuadro.

## Cómo agregar un servicio

Sumar un objeto al array `services` de [`src/content/services.ts`](src/content/services.ts). El orden del array es el orden en pantalla (de lo más pedido a lo más específico). Si el ejemplo es un trabajo real, completar `real` con el enlace al caso y una captura que no se use en otro lado. Agregar la misma opción a `form.needs` en [`src/content/home.ts`](src/content/home.ts) para que aparezca en el formulario.

## Cómo cambiar un texto

Todo el texto vive en `src/content/` y `src/config/`. [`COPY.md`](COPY.md) es la versión para leer de corrido: conviene mantenerlo al día cuando se cambia algo.

## Dos decisiones técnicas que conviene conocer

- **Las pieles.** Cada sección declara `data-zone-skin`. Un observador (`ZoneWatcher`) aplica en `<html>` la de la sección que cruza el centro de la pantalla, y los colores, registrados con `@property`, se interpolan.
- **Qué se carga y cuándo.** El hero no depende de JavaScript para mostrarse. ScrollTrigger, SplitText, el portal y el formulario se cargan cuando hacen falta (primer scroll o cercanía a la pantalla), y las secciones debajo del pliegue usan `content-visibility: auto`. El porqué está en `DESIGN.md` §7.

## Licencias de terceros

- **Glyph Portal** © 2026 Christian Katzmann, MIT. El aviso está en [`src/components/ui/glyph-portal.tsx`](src/components/ui/glyph-portal.tsx).
- **Tilted Grid Hero**, de ruixen.ui (21st.dev), adaptado en [`src/components/ui/tilted-grid-hero.tsx`](src/components/ui/tilted-grid-hero.tsx).
- Tipografías Playfair Display, Geist y Geist Mono: SIL Open Font License 1.1.
