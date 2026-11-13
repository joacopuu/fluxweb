import type { WaContext } from "@/config/whatsapp";

/**
 * Los casos de estudio. Para agregar uno: sumar un objeto a `cases`, sus
 * imágenes en `public/work/<slug>/` y su piel en `globals.css`
 * (`[data-skin="<slug>"]`). El README lo explica paso a paso.
 */

export type Shot = {
  src: string;
  /** Texto alternativo: qué se ve, no "captura de". */
  alt: string;
  width: number;
  height: number;
};

export type CaseDetail = {
  title: string;
  body: string;
  shot: Shot;
  /** Una segunda captura para comparar con la primera (antes y después). */
  compare?: Shot;
  /** Cómo se compone el bloque en escritorio. */
  layout: "ancho" | "izquierda" | "derecha";
};

export type CaseStudy = {
  slug: string;
  /** Piel del sitio mientras se mira este caso. Coincide con el CSS. */
  skin: string;
  /** Titulares en serif (la voz de FluxWeb). Por defecto van en sans, como titulan los clientes. */
  serif?: boolean;
  wa: WaContext;
  name: string;
  /** Qué es el cliente, en una línea. */
  kind: string;
  place: string;
  year: string;
  /** Sitio en línea. `null` si el caso es este mismo sitio. */
  live: { url: string; host: string } | null;
  /** Para la home: el problema y lo que cambió, en dos frases. */
  summary: string;
  /** Para la home: tres cosas que se pueden ver. */
  highlights: string[];
  /** Puerta al contacto, con texto propio. */
  cta: string;
  /** Pieza que se mueve: clip del sitio. */
  clip?: { src: string; poster: string; alt: string; width: number; height: number };
  /** Captura de celular que acompaña al clip en la home. */
  phone?: Shot;
  // Página del caso
  lead: string;
  problem: string;
  hero: Shot;
  decisions: { title: string; body: string }[];
  details: CaseDetail[];
  mobile: { title: string; body: string; shots: Shot[] } | null;
  deliverables: string[];
  seo: { title: string; description: string };
};

const desk = (src: string, alt: string): Shot => ({ src, alt, width: 2400, height: 1500 });
const phone = (src: string, alt: string): Shot => ({ src, alt, width: 780, height: 1688 });

export const cases: CaseStudy[] = [
  {
    slug: "mirande-aybar",
    skin: "mirande",
    wa: "mirande",
    name: "Mirande Aybar",
    kind: "Inmobiliaria",
    place: "Villa General Belgrano, Valle de Calamuchita",
    year: "2026",
    live: { url: "https://mirandeaybar.com/", host: "mirandeaybar.com" },
    summary:
      "En los portales eran uno más entre cien. Ahora tienen un catálogo propio, con más de 30 propiedades que actualizan ellos.",
    highlights: [
      "Tocás «Casa» y la lista se reacomoda sin recargar.",
      "Cada ficha arma el WhatsApp con el nombre y el precio de la propiedad.",
      "El logo se parte en dos para abrir el valle. Es el video de acá al lado.",
    ],
    cta: "¿Tenés un catálogo así en la cabeza?",
    clip: {
      src: "/work/mirande/logo.mp4",
      poster: "/work/mirande/logo-poster.webp",
      alt: "Portada de Mirande Aybar: al bajar, la palabra MIRANDE se va hacia la izquierda, AYBAR hacia la derecha, y en el medio se abre una foto del valle entre nubes.",
      width: 1040,
      height: 650,
    },
    phone: phone(
      "/work/mirande/m-tarjetas.webp",
      "El catálogo de Mirande Aybar en un celular: tarjetas de propiedades con foto, localidad y precio en dólares.",
    ),
    lead: "Una inmobiliaria con quince años en el valle, que trabajaba por teléfono y por recomendación.",
    problem:
      "En los portales eran uno más entre cien, y las propiedades buenas se perdían en el scroll. Necesitaban un catálogo propio, que pudieran actualizar ellos.",
    hero: desk(
      "/work/mirande/valle.webp",
      "Portada de Mirande Aybar con el valle abierto: sierras cubiertas de niebla a pantalla completa y dos botones, Ver propiedades y Escribinos.",
    ),
    decisions: [
      {
        title: "Que el valle sea la entrada",
        body: "El sitio abre con el logo sobre una foto de Villa General Belgrano. Al scrollear, MIRANDE se va a la izquierda, AYBAR a la derecha, y en el medio se abre el valle entre nubes. Antes de ver una sola propiedad ya sabés dónde estás.",
      },
      {
        title: "Una base de datos, no una página armada a mano",
        body: "Las propiedades viven en una base de datos que actualiza el equipo de Mirande. El sitio cuenta solo cuántas hay publicadas hoy.",
      },
      {
        title: "Que la consulta llegue decidida",
        body: "Cada ficha tiene galería y un botón que abre WhatsApp con el nombre y el precio de la propiedad ya escritos. El que escribe ya sabe qué quiere ver.",
      },
      {
        title: "Pizarra y crema",
        body: "La paleta sale del lugar. No se parece a FluxWeb, y esa es la idea.",
      },
    ],
    details: [
      {
        title: "Tocás Casa y quedan 7",
        body: "Cada filtro muestra cuántas propiedades hay de ese tipo. Al tocarlo, la lista se reacomoda sin recargar la página. Así se ve una base de datos sin decir «base de datos».",
        shot: desk(
          "/work/mirande/catalogo.webp",
          "Catálogo de Mirande Aybar sin filtros: buscador, tipos de propiedad con su cantidad, rango de precio en dólares y el texto 33 propiedades publicadas.",
        ),
        compare: desk(
          "/work/mirande/filtro-casa.webp",
          "El mismo catálogo con el filtro Casa activo: el contador dice 7 de 33 propiedades y aparece el enlace Limpiar filtros.",
        ),
        layout: "ancho",
      },
      {
        title: "Doce fotos y un botón",
        body: "La ficha abre con la galería completa. El botón de consulta escribe el mensaje por vos: el nombre de la propiedad y su precio ya están en el WhatsApp.",
        shot: desk(
          "/work/mirande/ficha.webp",
          "Ficha de una propiedad en Mirande Aybar: foto grande de una casa con jardín, doce miniaturas, el precio USD 420.000 y el botón Consultar por WhatsApp.",
        ),
        layout: "derecha",
      },
      {
        title: "Un formulario con dos salidas",
        body: "Cuatro campos numerados y dos botones: enviar por WhatsApp o por email. La persona elige por dónde le queda más cómodo, y el mensaje llega armado igual.",
        shot: desk(
          "/work/mirande/formulario.webp",
          "Sección de contacto de Mirande Aybar sobre fondo pizarra: el título Toda gran dirección empieza con un hola y un formulario con los botones Enviar por WhatsApp y Enviar por Email.",
        ),
        layout: "izquierda",
      },
      {
        title: "La página que nadie mira",
        body: "El error 404 tiene la marca y tres salidas: inicio, propiedades y WhatsApp. Si alguien llega por un enlace viejo, no se pierde.",
        shot: desk(
          "/work/mirande/404.webp",
          "Página de error de Mirande Aybar: el logo centrado sobre pizarra, el texto Esta página no existe y tres botones de salida.",
        ),
        layout: "derecha",
      },
    ],
    mobile: {
      title: "En el celular pega igual",
      body: "El logo se parte con el pulgar, los filtros entran en una mano y el formulario se completa sin hacer zoom.",
      shots: [
        phone(
          "/work/mirande/m-portada.webp",
          "Portada de Mirande Aybar en un celular: el logo en blanco sobre una foto de Villa General Belgrano entre árboles.",
        ),
        phone(
          "/work/mirande/m-filtros.webp",
          "Filtros del catálogo de Mirande Aybar en un celular: buscador, tipos de propiedad y rango de precio.",
        ),
        phone(
          "/work/mirande/m-formulario.webp",
          "Formulario de contacto de Mirande Aybar en un celular, con los botones Enviar por WhatsApp y Enviar por Email.",
        ),
      ],
    },
    deliverables: [
      "Identidad y dirección de arte",
      "Catálogo con base de datos propia",
      "Filtros, fichas y consultas por WhatsApp",
      "Página 404 diseñada",
    ],
    seo: {
      title: "Caso Mirande Aybar: catálogo inmobiliario a medida",
      description:
        "Un catálogo propio para una inmobiliaria de Villa General Belgrano: filtros en vivo, fichas con galería y consultas por WhatsApp con el mensaje armado.",
    },
  },
  {
    slug: "beclean",
    skin: "beclean",
    wa: "beclean",
    name: "BeClean",
    kind: "Tabletas de limpieza y desinfección",
    place: "Laboratorio Pyam, Argentina",
    year: "2026",
    live: { url: "https://becleanflux.vercel.app/", host: "becleanflux.vercel.app" },
    summary:
      "Una tableta efervescente que reemplaza al bidón. Había que lograr que un producto técnico se entienda y convenza en 30 segundos.",
    highlights: [
      "La tableta efervesce en 3D apenas entrás.",
      "El problema está contado en tres capítulos que se apilan al scrollear.",
      "La evidencia está en pantalla: el ensayo bajo norma EN 13697, con su tabla.",
    ],
    cta: "¿Un producto que nadie entiende en 30 segundos?",
    clip: {
      src: "/work/beclean/tableta.mp4",
      poster: "/work/beclean/tableta-poster.webp",
      alt: "Portada de BeClean: una tableta blanca en 3D efervesce dentro de una esfera de agua, con burbujas que suben, junto al titular Limpiemos hoy, cuidando el mañana.",
      width: 1280,
      height: 800,
    },
    phone: phone(
      "/work/beclean/m-comparador.webp",
      "El comparador de BeClean en un celular: barras que comparan el rendimiento por envase contra una primera marca.",
    ),
    lead: "Un producto técnico que necesitaba explicarse en treinta segundos.",
    problem:
      "BeClean reemplaza el bidón por una tableta, y el agua la pone el cliente. La idea es simple pero el producto es técnico, y quien compra limpieza para una institución quiere evidencia, no adjetivos.",
    hero: desk(
      "/work/beclean/ecuacion.webp",
      "Sección del sitio de BeClean sobre verde petróleo: el titular BeClean saca el agua de la ecuación, con las últimas palabras en menta.",
    ),
    decisions: [
      {
        title: "Que el producto se vea funcionando",
        body: "La página abre con la tableta en 3D, efervesciendo en el agua. No hay foto de envase: hay producto en acción.",
      },
      {
        title: "El problema, en tres capítulos",
        body: "La industria de la limpieza transporta agua. La envasa en plástico de un solo uso. Y después se dosifica a ojo. Los tres capítulos se apilan al scrollear, y recién ahí aparece la solución.",
      },
      {
        title: "La evidencia, en pantalla",
        body: "El ensayo de poder bactericida bajo norma EN 13697 está en la página, con institución, protocolo y resultados. No hay que pedir un PDF para creerlo.",
      },
      {
        title: "Verde petróleo y menta",
        body: "Una paleta de laboratorio: oscura y con un solo acento. Tampoco se parece a FluxWeb.",
      },
    ],
    details: [
      {
        title: "Una barra que lo dice todo",
        body: "El primer capítulo cierra con una barra casi llena que dice «95 % agua». Lo blanco es lo único que limpia. Se entiende sin leer el párrafo.",
        shot: desk(
          "/work/beclean/capitulo.webp",
          "Capítulo 01 del sitio de BeClean: un número enorme, el titular La industria de la limpieza transporta agua y una barra que marca 95 % agua.",
        ),
        layout: "ancho",
      },
      {
        title: "El mismo trabajo, en barras",
        body: "Para cada producto, una barra de BeClean contra la de una primera marca. El multiplicador queda a la derecha, grande. No hace falta explicar qué significa.",
        shot: desk(
          "/work/beclean/comparador.webp",
          "Comparador de rendimiento de BeClean: barras menta largas contra barras naranjas cortas, con multiplicadores como por 9 y por 50.",
        ),
        layout: "derecha",
      },
      {
        title: "No es una promesa, está medido",
        body: "La tabla del ensayo va entera: institución, número de protocolo, fecha y la reducción para cada microorganismo.",
        shot: desk(
          "/work/beclean/evidencia.webp",
          "Sección de evidencia de BeClean: el titular No es una promesa, está medido y la tabla del ensayo de poder bactericida bajo norma EN 13697.",
        ),
        layout: "izquierda",
      },
      {
        title: "Un contador para el camión",
        body: "¿Cuántos usos entran en un camión? El número sube mientras lo mirás. Es la forma más corta de mostrar qué significa dejar de transportar agua.",
        shot: desk(
          "/work/beclean/camion.webp",
          "Final del comparador de BeClean con un contador de usos por camión de alrededor de tres millones, en menta.",
        ),
        layout: "derecha",
      },
      {
        title: "Protocolos sin cálculo intermedio",
        body: "El nivel de riesgo del área define cuántas tabletas van. La página lo muestra con fotos de cada tipo de espacio.",
        shot: desk(
          "/work/beclean/protocolos.webp",
          "Sección Protocolos de dilución de BeClean, con fotos de áreas de distinto nivel de riesgo y la cantidad de tabletas para cada una.",
        ),
        layout: "izquierda",
      },
    ],
    mobile: {
      title: "En el celular pega igual",
      body: "La tableta sigue en 3D, los capítulos se leen de corrido y la tabla del ensayo no obliga a girar el teléfono.",
      shots: [
        phone(
          "/work/beclean/m-portada.webp",
          "Portada de BeClean en un celular: el titular Limpiemos hoy, cuidando el mañana y la tableta efervescente debajo.",
        ),
        phone(
          "/work/beclean/m-capitulo.webp",
          "Capítulo 01 de BeClean en un celular, con la barra que marca 95 % agua.",
        ),
        phone(
          "/work/beclean/m-ensayo.webp",
          "Tabla del ensayo bajo norma EN 13697 del sitio de BeClean, vista en un celular.",
        ),
      ],
    },
    deliverables: [
      "Arquitectura del argumento",
      "Landing de producto con 3D",
      "Evidencia y protocolos en pantalla",
      "Pedido de cotización",
    ],
    seo: {
      title: "Caso BeClean: landing de un producto técnico",
      description:
        "Cómo armamos la landing de las tabletas efervescentes de Laboratorio Pyam: la tableta en 3D, el problema en tres capítulos y el ensayo EN 13697 en pantalla.",
    },
  },
  {
    slug: "fluxweb",
    skin: "tinta",
    serif: true,
    wa: "fluxweb",
    name: "FluxWeb",
    kind: "Estudio de diseño y desarrollo web",
    place: "Córdoba, Argentina",
    year: "2026",
    live: null,
    summary:
      "El portfolio anterior decía que cada sitio se parece a su cliente. Este lo tenía que demostrar.",
    highlights: [
      "La página cambia de piel cuando entrás a cada caso.",
      "Se entra a los trabajos por una letra del lema.",
      "WhatsApp está siempre a mano, con el mensaje ya escrito.",
    ],
    cta: "¿Querés un sitio con este nivel de detalle?",
    lead: "El portfolio del estudio, hecho como les hacemos los sitios a los clientes.",
    problem:
      "El portfolio anterior decía que cada sitio se parece a su cliente. Este lo tenía que demostrar. Y faltaban cosas básicas: WhatsApp a mano, casos contados en serio y una imagen al compartir el link.",
    hero: desk(
      "/work/fluxweb/portada.webp",
      "Portada de este sitio: el titular Tenés la idea sobre fondo tinta y, debajo, una fila curva con pantallas de BeClean y de Mirande Aybar.",
    ),
    decisions: [
      {
        title: "Que la página cambie de piel",
        body: "Cuando entrás a Mirande, el sitio entero pasa a pizarra y crema. En BeClean, a verde petróleo y menta. Fondo, texto, acento y navegación cambian juntos. Es el argumento del estudio, mostrado en vez de dicho.",
      },
      {
        title: "Los trabajos primero",
        body: "El hero no nos muestra a nosotros. Muestra pantallas de sitios que están en línea, corriendo por dentro de un cilindro que se puede arrastrar.",
      },
      {
        title: "WhatsApp a mano, sin molestar",
        body: "Un botón en la navegación y uno flotante en el celular. El mensaje ya viene escrito según la sección desde la que lo tocás. Sin ventanas emergentes.",
      },
      {
        title: "Rápido antes que vistoso",
        body: "Lo que no hace falta al cargar, no se carga. El portal, el formulario y las animaciones de scroll llegan cuando se necesitan.",
      },
    ],
    details: [
      {
        title: "Se entra por una letra",
        body: "El lema dice «Diseñamos proyectos que fluyen». Al bajar, la cámara entra por la tinta de una letra de FLUYEN, y del otro lado están los proyectos.",
        shot: desk(
          "/work/fluxweb/portal.webp",
          "El portal de este sitio a mitad de camino: las letras de FLUYEN, enormes y en crema, ocupan toda la pantalla sobre fondo tinta.",
        ),
        layout: "ancho",
      },
      {
        title: "La piel de cada cliente",
        body: "Acá la página ya es de Mirande: pizarra, crema y titulares en sans, como en su sitio. Un poco más abajo va a ser de BeClean.",
        shot: desk(
          "/work/fluxweb/piel.webp",
          "La home de este sitio con la piel de Mirande Aybar: fondo pizarra, el nombre del cliente en letras grandes y su portada dentro de un marco de navegador.",
        ),
        layout: "derecha",
      },
      {
        title: "Las automatizaciones, en su lugar",
        body: "En el portfolio anterior, «¿Qué te está comiendo el día?» era protagonista. Ahora vive dentro de su servicio: elegís un dolor y ves qué entra, qué sucede y qué sale.",
        shot: desk(
          "/work/fluxweb/servicios.webp",
          "La lista de servicios de este sitio con Turnos, reservas y automatizaciones abierto, y adentro el selector Qué te está comiendo el día.",
        ),
        layout: "izquierda",
      },
      {
        title: "Te contestamos lo que ya estás pensando",
        body: "Elegís quién sos y cambian la objeción, la respuesta y hasta el mensaje de WhatsApp del botón.",
        shot: desk(
          "/work/fluxweb/publico.webp",
          "La sección Para quién de este sitio con la opción una inmobiliaria elegida: la objeción Ya estoy en los portales y la respuesta en letras grandes.",
        ),
        layout: "derecha",
      },
    ],
    mobile: {
      title: "Pensado desde el celular",
      body: "La mayoría llega desde Instagram, con el pulgar. El hero, el proceso y el formulario se diseñaron primero para esa pantalla.",
      shots: [
        phone(
          "/work/fluxweb/m-portada.webp",
          "Portada de este sitio en un celular: el titular, los dos botones y el cilindro de trabajos debajo.",
        ),
        phone(
          "/work/fluxweb/m-proceso.webp",
          "La sección Cómo trabajamos en un celular: las etapas a la derecha de una línea que se dibuja al bajar.",
        ),
        phone(
          "/work/fluxweb/m-formulario.webp",
          "El formulario de contacto de este sitio en un celular, en la primera de cinco preguntas.",
        ),
      ],
    },
    deliverables: [
      "Concepto y dirección de arte",
      "Sistema de diseño y de motion",
      "Todo el texto del sitio",
      "Desarrollo y performance",
    ],
    seo: {
      title: "Caso FluxWeb: cómo hicimos nuestro propio sitio",
      description:
        "El detrás de escena del portfolio de FluxWeb: un sitio que cambia de piel según el cliente que muestra, con un portal tipográfico y un cilindro de trabajos.",
    },
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
