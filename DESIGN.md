# DESIGN · el nuevo portfolio de FluxWeb

## 1. Concepto

### Los tres que evaluamos

| Concepto | Idea | Por qué sí / por qué no |
|---|---|---|
| **A. El cauce** | Una sola línea (el trazo del isotipo) recorre toda la página y conecta las secciones. | Es fiel al lema, pero la línea termina siendo decoración: no prueba nada sobre nuestro trabajo. Se rescata para el proceso, donde sí cuenta una secuencia. |
| **B. Cambio de piel** (elegido) | El sitio cambia de piel según de quién habla. En tinta y oliva cuando habla FluxWeb, en pizarra y crema cuando entra Mirande, en verde petróleo y menta cuando entra BeClean. | Demuestra el diferencial n.º 1 del perfil ("cada sitio se parece a su cliente, no a nosotros") sin decirlo. Nadie más puede copiarlo porque depende de nuestros clientes reales. |
| **C. La revista del estudio** | Un número impreso: índice, piezas numeradas, columnas. | Es el camino que hoy toma cualquier sitio "editorial" generado. Filetes finos, columnas densas y numeración por todos lados: se reconoce como plantilla. Descartado. |

### Las pieles, sección por sección

Hero (tinta) → portal (tinta, y crema al entrar) → Mirande (pizarra) → BeClean (verde petróleo) → cierre de trabajos (tinta) → qué hacemos (crema) → para quién (oliva noche) → proceso (tinta) → quiénes somos (crema) → preguntas (tinta) → contacto (oliva noche) → footer (oliva). El oliva pleno aparece una sola vez, en el cierre.

### El elegido, en una frase

**La página es un camaleón: se parece a quien está mostrando.** Eso ordena todo lo demás:

- El **hero** no nos muestra a nosotros: muestra las pantallas de los clientes corriendo por dentro de un cilindro.
- El **portal** entra por la palabra FLUYEN del lema y sale del otro lado, en los trabajos.
- Cada **caso** toma el fondo, el texto, el acento y hasta la voz tipográfica de su cliente (los dos clientes titulan en sans, así que dentro de un caso los titulares pasan de Playfair a Geist).
- El resto del sitio es sobrio a propósito, para que esos tres momentos sean lo que se recuerda.

### Momentos firma (tres, no más)

1. **El cilindro de trabajos** en el hero. Capturas reales, arrastrable, con marco de navegador propio.
2. **El portal tipográfico.** La cámara entra por la tinta de una letra de FLUYEN y del otro lado está la sección de trabajos.
3. **El cambio de piel.** Fondo, texto, acento, nav y cursor cambian juntos al entrar a cada caso, en la home y en su página.

## 2. Orden de las secciones

Hero → Portal → Trabajos → Qué hacemos → Para quién → Cómo trabajamos → Quiénes somos (con el stack adentro) → Preguntas → Contacto → Footer.

Dos cambios respecto del brief, con su porqué:

- **El portal va entre el hero y los trabajos.** Es la bisagra: el lema ("Diseñamos proyectos que fluyen") literalmente abre la puerta a los proyectos.
- **El stack vive dentro de "Quiénes somos"**, como un colofón. Solo no alcanzaba para una sección y terminaba siendo el muro de logos que el brief pide evitar.

## 3. Sistema de diseño

### Color

Tokens semánticos en `src/app/globals.css`. Los valores salen de `brand.json`.

| Token | Tinta (base) | Crema | Oliva noche | Mirande | BeClean | Oliva |
|---|---|---|---|---|---|---|
| `--bg` | `#14150e` | `#f0e9d6` | `#23251a` | `#2c3d45` | `#06100f` | `#b9bd7a` |
| `--bg-raise` | `#1e1f16` | `#f7f2e4` | `#2c2f21` | `#364a54` | `#0c1c1a` | `#cdd18d` |
| `--ink` | `#f0e9d6` | `#1b1c12` | `#f0e9d6` | `#f0e4d4` | `#eaf5f1` | `#14150e` |
| `--muted` | `#a3a58c` | `#5a5b45` | `#b0b29a` | `#b6c2c4` | `#8fb0a8` | `#3a3c2b` |
| `--accent` | `#b9bd7a` | `#5a5b34` | `#cdd18d` | `#d9b382` | `#5fe3c6` | `#14150e` |
| `--line` | crema 14 % | tinta 14 % | crema 14 % | crema 16 % | menta 16 % | tinta 20 % |

- Los seis colores principales están registrados con `@property`, así que **el cambio de piel se interpola** (700 ms) en lugar de saltar.
- Cada sección declara su piel con `data-skin`. Un observador decide cuál manda según qué sección cruza el centro de la pantalla, y la escribe en `<html>`.
- Las pieles de los clientes se muestrearon de sus sitios publicados (capturas del 13/11/2026).
- Contraste: todas las combinaciones texto/fondo cumplen AA (verificado en QA, ver `PROGRESO.md`).

### Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Titulares | **Playfair Display** 500 (variable, normal e itálica) | `clamp()` de 2.4 a 11 rem según nivel, tracking de -0.02 a -0.035 em, interlínea 0.95 a 1.05. Una palabra clave en cursiva y en acento por titular. |
| Texto | **Geist** 400 a 600 | 1 a 1.25 rem, medida de 60 a 70 caracteres. |
| Etiquetas | **Geist Mono** 500 | Solo en datos reales: la hora de Córdoba, el contador del formulario, las URL de los marcos. Nunca arriba de un título. |
| Dentro de un caso | **Geist** 600 en titulares | Parte del cambio de piel: los dos clientes titulan en sans. |

Todo con `next/font` (se descarga en el build y se sirve desde nuestro dominio), subset latino y `display: swap`. La base tipográfica crece de 16 a 20 px entre 1280 y 2560 px de ancho, para que el texto chico no quede diminuto en monitores grandes.

#### Comparativo de display (lo que pedía el brief)

| Opción | A favor | En contra | Veredicto |
|---|---|---|---|
| **Playfair Display** | Es la del logo, las redes y los videos. Itálica con carácter. | A tamaños gigantes los trazos finos quedan algo gruesos. | **Se queda.** |
| **Playfair** (2023, con eje óptico) | Misma familia, con finos más delicados a tamaño grande. Es la mejora natural. | El portal mide la tinta con `canvas`, que no aplica el eje óptico igual que el SVG: la cámara podía caer fuera de la letra. | **Propuesta para una segunda vuelta**, probando el portal en WebKit. Cambiarla es una línea en `src/app/fonts.ts`. |
| Fraunces | Mucho carácter, itálica expresiva. | Es más blanda y juguetona. Rompe lo sobrio del logo. | Descartada. |
| Instrument Serif | Elegante, condensada. | Un solo peso, y hoy está en la mitad de los sitios generados. | Descartada. |

### Grilla y espacio

- 12 columnas, con márgenes de `clamp(1.25rem, 5vw, 5rem)`. Clase `.wrap`.
- Escala de espaciado: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 px.
- Las secciones respiran con `clamp(6rem, 14vw, 12rem)` arriba y abajo.
- Las composiciones son asimétricas: titulares anclados a la izquierda que ocupan 8 o 9 columnas, texto que arranca en la columna 7, capturas que se salen del margen derecho. Lo único centrado es el portal.

### Imágenes

- **Capturas reales** (13/11/2026, 1440×900 a 2x en escritorio y 390×844 a 2x en celular), en AVIF/WebP vía `next/image`.
- **Marco de navegador propio** (`BrowserFrame`): una barra de 30 px con el dominio en mono y un punto con el acento de la piel. Sin semáforos de macOS, sin MacBooks.
- **Marco de teléfono propio** (`PhoneFrame`): un rectángulo redondeado con borde fino.
- **Cada captura se usa una sola vez.** Los videos del hero de Mirande y de BeClean son clips del sitio en movimiento, no la misma captura repetida.
- **Grano** global al 6 %, en una capa fija con `mix-blend-mode`.

### Íconos

`lucide-react`, trazo 1.5, con moderación (flechas, copiar, menú). El único logo ajeno es el de WhatsApp, dibujado a mano en SVG para el botón.

## 4. Sistema de motion

### Principios

- Cada animación cuenta algo o guía la mirada. Si no, se va.
- La UI responde en 150 a 300 ms. Los reveals grandes duran de 600 a 1200 ms.
- Nada bloquea el scroll ni los clics. Las dos secciones fijadas (portal y proceso) usan `position: sticky` sobre scroll nativo: no hay scroll-jacking.
- Solo se animan `transform`, `opacity` y `clip-path`.

### Tokens (`globals.css`)

| Token | Valor | Para qué |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Titulares desde máscara, reveals. La curva de la marca. |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | UI: botones, acordeones, menús. |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Cosas que se mueven en pantalla: el menú mobile, los pasos del formulario. |
| `--ease-skin` | `cubic-bezier(0.4, 0, 0.2, 1)` | El cambio de piel. |
| `--dur-press` | 140 ms | Feedback al apretar. |
| `--dur-ui` | 220 ms | Hovers, acordeón, estados. |
| `--dur-move` | 480 ms | Menú, pasos del formulario. |
| `--dur-reveal` | 1000 ms | Titulares e imágenes. |
| `--dur-skin` | 700 ms | Cambio de piel. |

### Coreografía por sección (ninguna entra igual que la anterior)

| Sección | Cómo entra | Por qué |
|---|---|---|
| Hero | Palabras que suben desde una máscara, en CSS puro. El cilindro arranca rápido y frena hasta su velocidad de crucero. El párrafo que dice qué somos no se anima: está desde el primer cuadro. | Es el único momento orquestado al cargar. En CSS, para no esperar a JavaScript: el hero anterior tardaba 2 s en mostrar el titular en mobile. |
| Portal | Lo maneja el scroll: la cámara entra por la letra. | Momento firma. |
| Casos | La captura se destapa con `clip-path` de abajo hacia arriba. El texto no se anima. | La imagen es la prueba, así que es lo único que se mueve. |
| Qué hacemos | Nada al entrar. Las filas se abren con un acordeón de 220 ms. | Es una lista para escanear: el movimiento responde a la acción del usuario. |
| Para quién | La respuesta cambia con un fundido corto y desenfoque de 2 px. | Es un cambio de estado, no una entrada. |
| Proceso | Una línea se dibuja con el scroll y enciende cada etapa. | Es una secuencia de verdad, así que la línea informa. |
| Equipo, preguntas, contacto | Sin animación de entrada. | Para que lo que sí se mueve se note. |
| Footer | El titular final sube desde la máscara. | Cierra como abrió el hero. |

### Microinteracciones

- **Cursor con estados** ("Ver caso", "Arrastrar", "Abrir"). Solo con puntero fino. En touch no existe.
- **Links**: subrayado que se dibuja de izquierda a derecha.
- **Botones**: `scale(0.97)` al apretar. El principal es magnético, con resorte, y solo en puntero fino.
- **Copiar email**: el botón cambia de texto con desenfoque y avisa por `aria-live`.
- **Nav**: se esconde al bajar y vuelve al subir.

### `prefers-reduced-motion`

- El portal se queda quieto y muestra la palabra y el contenido uno debajo del otro.
- El cilindro se pausa como una imagen fija.
- Los reveals pasan a un fundido de 200 ms y todo el contenido queda visible.
- Lenis no se inicia.

## 5. Componentes externos

| Componente | Origen y licencia | Qué le cambiamos |
|---|---|---|
| **Glyph Portal** | Christian Katzmann, MIT. Bajado del registro de 21st.dev (`@Legacy/glyph-portal`). El original está en `_referencia/21st/` y el aviso de licencia se conserva en `src/components/ui/glyph-portal.tsx`. | El selector de letra queda apagado (`interactive={false}`): acá la entrada es una sola. Paleta por tokens: el papel sigue a `--bg`, el campo es crema y, una vez adentro, sigue a la piel. Playfair en lugar de Arial Black, cargada antes de montar (el portal mide la tinta con la tipografía real). Prop `hint` y rótulos en español. Se monta con el primer scroll y reserva su alto desde el arranque. Mientras se atraviesa, decide la piel del sitio: tinta afuera de la letra, crema adentro. |
| **Tilted Grid Hero** | ruixen.ui, vía 21st.dev (`@ruixen.ui/tilted-grid-hero`). Original en `_referencia/21st/`. | Capturas reales con marco de navegador horneado en la imagen. **Arrastrable** (el original solo corre): el arrastre mueve el tiempo de las animaciones con la Web Animations API, con inercia. Arranque acelerado que frena. Se pausa fuera de pantalla. Ancho de baldosa por tamaño de pantalla (84 % en teléfono, 34 % en escritorio) y 10 tiras en lugar de 16 en teléfono. `srcset` con una versión de 640 px. **Dos correcciones al original:** animaba `visibility` junto con `transform`, lo que sacaba la animación del compositor y hacía trabajar al hilo principal en cada cuadro (ahora las baldosas fuera de cuadro se ocultan revisando el reloj de la animación cinco veces por segundo); y su pausa para movimiento reducido no funcionaba, porque el `animation` en línea pisaba la regla. `next/image` no aplica acá (cada baldosa se pinta en tiras desplazadas), así que las imágenes van pre-optimizadas en WebP. |
| Spline Scene, Scroll Morph Hero, Arc Carousel, Background Paths | Venían pegados en el encargo. | **No se usaron.** Spline suma un runtime 3D pesado para un robot de stock. Scroll Morph secuestra la rueda del mouse. Background Paths es el fondo animado que tiene medio internet. Arc Carousel compite con el cilindro. |

## 6. Referencias: qué tomamos de cada una

| Referencia | Qué tomamos | Qué dejamos |
|---|---|---|
| **exoscode.com** | El formulario por pasos que termina en un WhatsApp armado. Los links legales en el footer. | La marca tres veces en el hero, el copy de "estándares internacionales" y un formulario que no pide nombre: el nuestro pide nombre y contacto. |
| **rejouice.com** | Tipografía gigante con aire, y secciones que cambian de color de fondo enteras. | El logotipo como hero: nuestro hero es una frase y los trabajos. |
| **14islands.com** | Titulares en dos tonos (una parte apagada, otra plena) y calidez de estudio chico. | El banner de cookies: no usamos cookies, así que no hay banner. |
| **malvah.studio** | "Confianza sin decoración": pocas cosas, bien hechas. | La pantalla de "Enter site": acá se entra directo. |
| **locomotive.ca** | Scroll suave (Lenis) y continuidad entre páginas. | — |
| **cuberto.com** | El cursor como etiqueta que dice qué va a pasar. | El cursor siempre presente: el nuestro aparece solo donde suma. |
| **obys.agency** | Titulares que entran desde una máscara. | — |
| **Codrops (Roccas, Spitzer, Bisous)** | Un sistema de motion con tokens antes que animaciones sueltas. Transiciones compartidas entre la lista y el detalle. | WebGL fluido: no lo justifica ningún momento del sitio. |

## 7. Decisiones técnicas que afectan al diseño

- **Transiciones de página** con `<ViewTransition>` de React (Next 16): el marco de la captura de cada caso se transforma en el hero de su página.
- **Sin Three.js.** El cilindro es CSS 3D y el portal es un `clipPath` SVG. Ningún momento firma justificaba cargar WebGL.
- **`og:image`** generadas con `next/og`, una por página, con la piel de cada caso. Las fuentes van embebidas en base64 para no depender del sistema de archivos en Workers.
- **El tercer caso es este sitio** (`/trabajos/fluxweb`). Es el único que titula en serif: los clientes hablan en sans, el estudio en Playfair.

### Performance: qué se carga y cuándo

La primera medición de Lighthouse en mobile dio 52. Una traza del hilo principal mostró tres causas, y ninguna era "demasiadas animaciones":

| Causa | Qué hacía | Qué cambiamos |
|---|---|---|
| ScrollTrigger mantiene un bucle permanente de `requestAnimationFrame` | Con el hero en pantalla, cada cuadro obligaba a recalcular en el hilo principal las animaciones del cilindro (145 recálculos de estilo por segundo). | ScrollTrigger y SplitText se cargan con el primer scroll (`src/lib/scroll-kit.ts`). Al cargar la página no hay nada que dependa del scroll. |
| El cilindro original animaba `visibility` | Esa propiedad no corre en el compositor: arrastraba a toda la animación al hilo principal. | Keyframes solo con `transform`. El ocultado se hace aparte, sin animación. |
| Toda la página se calculaba y se hidrataba de una vez | Una tarea de layout de 300 ms y varias de hidratación de 100 a 200 ms (con el procesador frenado 4 veces). | `content-visibility: auto` en las secciones debajo del pliegue, las secciones interactivas en trozos separados (`next/dynamic`), y el portal y el formulario montados cuando hacen falta. |

Un efecto secundario bueno: con `content-visibility`, el cambio de piel (que recalcula el estilo de todo lo renderizado) solo trabaja sobre lo que está cerca de la pantalla.

Además: Lenis duerme su bucle cuando no hay scroll, GSAP se descarga solo si hay puntero fino o después del primer scroll, y Motion solo se usa en el formulario (viaja en su trozo).
