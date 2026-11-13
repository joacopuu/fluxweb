# PROGRESO

Hora de inicio: **viernes 13/11/2026, 02:16:58** (reloj de la máquina).

## El reloj, con honestidad

La sesión se cortó dos veces por el límite de uso de la cuenta. No son tiempo de trabajo, pero sí son reloj:

| Tramo | Reloj | Trabajando |
|---|---|---|
| 1 | 02:17 a 02:37 | 20 min |
| Pausa por límite de uso | 02:37 a 05:51 | |
| 2 | 05:51 a 06:28 | 37 min |
| Pausa por límite de uso | 06:28 a 11:07 | |
| 3 | 11:07 a 11:55 | 48 min |

**Tiempo trabajado: 1 hora y 45 minutos**, de las 4 y media del encargo. **Reloj de pared: casi 10 horas**, por las pausas. El tope original (06:47) se pasó por las pausas, no por el trabajo.

## Fases

| Fase | Cierre | Qué quedó hecho |
|---|---|---|
| Inmersión | 02:30 | Leídas todas las fuentes locales (perfil, `brand.json`, voz, sitios, audiencia, competencia, isotipo). Portfolio anterior clonado en `_referencia/portfolio-anterior`, sin tocar. Mirande y BeClean recorridos con un script: 140 capturas nuevas a 2x, la secuencia del logo de Mirande partiéndose y 7 s del hero de BeClean. Recorridas exoscode, rejouice, malvah y 14islands. Código original de Glyph Portal y Tilted Grid Hero bajado del registro de 21st.dev. |
| Dirección | 02:33 | Tres conceptos, uno elegido ("Cambio de piel") en `DESIGN.md`. Copy completo en `COPY.md`. Recursos en `public/work/`. |
| Base | 05:52 | Proyecto, tokens, tipografías, nav, footer y hero. Primer commit y push. **Sin deploy:** no hay sesión de Wrangler. |
| Construcción | 06:05 | Home completa (portal, casos, servicios, público, proceso, estudio, preguntas, contacto), páginas de caso, privacidad, 404, `og:image`, sitemap, robots, íconos. Formulario y ruta de envío. |
| Motion, pulido y performance | 11:30 | De 52 a 100 en performance de Lighthouse en la home. Prueba en WebKit. Revisión de marca, de página y de robustez. |
| QA y entrega | 11:55 | Tercer caso (`/trabajos/fluxweb`), Lighthouse final, documentación. |

## Hallazgos de la inmersión

- **Mirande tiene hoy 33 propiedades publicadas, no 31.** Es una base viva. El copy dice "más de 30".
- **Instagram:** el conector no conectó.
- **Wrangler no tiene sesión iniciada.** No hice login ni usé `--temporary`.
- **Los cuatro componentes pegados en el encargo** (Spline, Scroll Morph, Arc Carousel, Background Paths) quedaron afuera, con su porqué en `DESIGN.md` §5.

## Resultados de QA

### Lighthouse, mobile

Medido sobre el build de producción servido en local con compresión (`next start`), con la caché de imágenes tibia.

| Página | Performance | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | **100** | 100 | 100 | 100 | 0,9 s | 0 | 60 ms |
| `/trabajos/mirande-aybar` | **92** | 100 | 100 | 100 | 3,3 s | 0 | 90 ms |
| `/trabajos/beclean` | **92** | 100 | 100 | 100 | 3,3 s | 0 | 80 ms |
| `/trabajos/fluxweb` | **91** | 100 | 100 | 100 | 3,5 s | 0 | 60 ms |
| `/privacidad` | **100** | 100 | 100 | 100 | 0,8 s | 0 | 80 ms |

Lo que **no** cumple el criterio: en las páginas de caso el LCP **simulado** da 3,3 a 3,5 s (el criterio pedía menos de 2,5 s). El LCP **observado** en la misma corrida es de 0,5 s: la diferencia la pone la simulación de red lenta de Lighthouse sobre la captura principal. Hay que volver a medir sobre la URL publicada.

Sobre el runtime de Workers en local (`npm run preview`), que sirve sin comprimir: home 97, caso Mirande 86. En Cloudflare real va con Brotli y caché de borde.

**INP** no se puede medir en laboratorio. El indicador de laboratorio que lo anticipa (TBT) quedó entre 60 y 90 ms.

### Lo demás

| Criterio | Resultado |
|---|---|
| Sin scroll horizontal | 6 páginas en 10 anchos (320, 360, 375, 414, 768, 1024, 1280, 1440, 1920 y 2560 px): ninguno desborda. |
| Consola | Cero errores y cero avisos de hidratación en Chromium y WebKit. |
| Navegadores | Chromium: todo bien. WebKit (Playwright para Windows): todo funciona, pero el cilindro se ve plano porque esa versión no tiene 3D acelerado. Falta Safari real. |
| Formulario | Probado de punta a punta con datos de prueba: validación por paso, volver atrás sin perder lo escrito, teclado, campo trampa, control de tiempo, salida por WhatsApp con el resumen, y los tres casos de la ruta (sin clave, datos inválidos, bot). No se envió ningún mensaje. |
| Datos feos a 320 px | Nombre de 44 caracteres, email de 64, una URL de 110 y texto de 1.400: sin desborde. |
| Enlaces | Los dos sitios de clientes, los cuatro Instagram y los dos WhatsApp responden. |
| Movimiento reducido | Titular sin animación, Lenis apagado, portal quieto, cilindro en pausa. |
| Teclado | Orden lógico desde "Saltar al contenido". Foco visible. |
| Build | `npm run build` y el build de OpenNext pasan. Lint y typecheck limpios. |
| Runtime de Workers | Páginas, `og:image` (incluida la dinámica), imágenes por el binding IMAGES y ruta del formulario: todo responde en `npm run preview`. |

### Como cliente que llega de Instagram, en el celular

- **Qué hacemos:** en la primera pantalla, sin scrollear. "Tenés la idea. Nosotros la convertimos en una web que se siente tuya." y "estudio de diseño y desarrollo web de Córdoba". Menos de 5 segundos.
- **Si le sirve:** las pantallas del cilindro ya muestran dos trabajos. A dos scrolls están los casos.
- **Cómo escribirnos:** un toque. El botón de WhatsApp está en la navegación desde el primer cuadro, y otro en el hero.

## Autocrítica

Mis puntajes suelen quedar altos: tómenlos como techo, no como piso.

| Sección | Originalidad | Claridad | Terminación | Lo que hice después de puntuar |
|---|---|---|---|---|
| Hero | 8 | 9 | 8 | En mobile el cilindro quedaba chico y cortado: achiqué la bajada y agrandé las baldosas. |
| Portal | 8 | 8 | 8 | Dejaba un borde duro crema al llegar a Mirande: ahora el campo sigue a la piel. |
| Casos en la home | 8 | 8 | 7 | El teléfono tapaba texto en BeClean: lo moví al borde de afuera. Sigue tapando una esquina del clip. |
| Qué hacemos | 7 | 9 | 8 | La captura del ejemplo ocupaba media pantalla: pasó a su columna. |
| Para quién | 7 | 9 | 8 | Sin cambios. |
| Proceso | 7 | 8 | 7 | Las etapas tenían un rótulo arriba del título: pasó abajo. |
| Quiénes somos | 6 | 8 | 7 | Sin fotos no llega a 8. Está resuelto con tipografía y queda anotado en `PENDIENTES.md`. |
| Contacto | 7 | 9 | 8 | El foco no iba a la pregunta nueva al cambiar de paso: corregido. |
| Página de caso | 7 | 8 | 8 | Títulos chiquitos arriba del título: corregido. |

### Las tres cosas que más olían a genérico, y qué pasó con cada una

1. **Rótulos chicos arriba de los títulos** (en casos, etapas y 404). Es justo lo que el encargo prohíbe y se me había colado. Los pasé debajo del título.
2. **Tres columnas iguales en el equipo.** Las escaloné en altura y les saqué cualquier caja o ícono. Sin fotos, sigue siendo la sección más débil.
3. **Una lista de tres por reflejo** en el caso de BeClean ("oscura, precisa y con un solo acento"). Corregida.

### Lo que encontraron las skills

- **`/marketing:brand-review`:** cuatro desvíos (rótulos arriba de títulos, una lista de tres, un dato vivo en un texto alternativo y la mención a Wix). Tres corregidos; la mención a Wix quedó como decisión en `PENDIENTES.md`.
- **`/break-ui`:** el formulario aguantó. Endurecí lo frágil: titulares con una palabra muy larga, el titular "Dos sitios en línea" (ahora cuenta los casos), "Siguiente caso" cuando hay uno solo, y el largo del enlace de WhatsApp.
- **`/website-design:review-page`:** footer apretado en tablet, textos chicos en monitores grandes y metadatos demasiado largos. Corregidos.
- **SEO:** revisado a mano contra la lista habitual (títulos, descripciones, encabezados, canónicas, sitemap, robots, JSON-LD, textos alternativos). Lighthouse SEO: 100 en todas. No cargué la skill `/marketing:seo-audit`.
- **Skills de animación:** apliqué `/emil-design-eng` y `/frontend-design`. Las otras de la lista (`/animate`, `/choreograph`, `/improve-animations`, etc.) no las cargué: prioricé medir y corregir la performance real.
