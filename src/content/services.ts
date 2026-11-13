import type { Shot } from "./cases";

/**
 * Los servicios, de lo más pedido a lo más específico (el orden importa).
 * Para agregar uno: sumar un objeto. `plazo` es orientativo y solo se promete
 * lo que figura en el perfil de marca.
 */
export type Service = {
  id: string;
  name: string;
  what: string;
  who: string;
  example: string;
  /** `true` si el ejemplo es un trabajo nuestro en línea. */
  real?: { label: string; href: string; shot: Shot };
  plazo: string;
  /** El bloque «¿Qué te está comiendo el día?» vive dentro de este servicio. */
  automation?: boolean;
};

export const services: Service[] = [
  {
    id: "landing",
    name: "Landing pages",
    what: "Una página que cuenta una sola cosa muy bien: un lanzamiento, un producto, un evento, una campaña.",
    who: "Para quien lanza algo y necesita que se entienda rápido. Si recién arrancás, capaz que con esto te alcanza.",
    example: "BeClean: la tableta en 3D, el problema en tres capítulos y la evidencia de laboratorio.",
    real: {
      label: "Ver el caso BeClean",
      href: "/trabajos/beclean",
      shot: {
        src: "/work/beclean/pasos.webp",
        alt: "Sección del sitio de BeClean que explica el uso en tres pasos: preparación, dilución y uso.",
        width: 2400,
        height: 1500,
      },
    },
    plazo: "2 a 3 semanas",
  },
  {
    id: "catalogo",
    name: "Sitios con base de datos propia",
    what: "Catálogos que actualizás vos, con filtros, fichas y consultas.",
    who: "Inmobiliarias y negocios con un catálogo que cambia seguido.",
    example:
      "Mirande Aybar: más de 30 propiedades, filtros por tipo y precio, ficha con galería y consulta por WhatsApp con el mensaje armado.",
    real: {
      label: "Ver el caso Mirande",
      href: "/trabajos/mirande-aybar",
      shot: {
        src: "/work/mirande/tarjetas.webp",
        alt: "Tarjetas de propiedades del catálogo de Mirande Aybar, con fotos de lotes y casas, localidad y precio.",
        width: 2400,
        height: 1500,
      },
    },
    plazo: "4 a 8 semanas",
  },
  {
    id: "institucional",
    name: "Sitios institucionales y de marca",
    what: "La web seria de una empresa, un profesional o un estudio.",
    who: "Estudios, consultorios, pymes y ONG.",
    example: "Lo típico: te recomiendan, te googlean, y en una pantalla entienden quién sos y cómo escribirte.",
    plazo: "Te lo decimos en la primera charla",
  },
  {
    id: "tienda",
    name: "Tiendas y catálogos de producto",
    what: "Para vender o mostrar productos con su identidad, sin la cara de plantilla.",
    who: "Marcas de ropa, cerámica, deco, alimentos.",
    example: "Lo típico: una marca que vende por Instagram y quiere un catálogo que se parezca a ella.",
    plazo: "4 a 8 semanas",
  },
  {
    id: "portfolio",
    name: "Portfolios",
    what: "Sitios donde el trabajo es el protagonista.",
    who: "Creativos, fotógrafos, arquitectos y artistas.",
    example: "Este sitio es uno: el nuestro.",
    plazo: "Te lo decimos en la primera charla",
  },
  {
    id: "marca",
    name: "Marca y contenido",
    what: "Logo, paleta, tono y textos, cuando todavía no existen.",
    who: "Emprendimientos que arrancan de cero.",
    example: "Lo típico: tenés el producto y el nombre, y falta todo lo demás.",
    plazo: "Se cotiza aparte, para que veas cada cosa",
  },
  {
    id: "automatizaciones",
    name: "Turnos, reservas y automatizaciones",
    what: "Reservas online, formularios que llenan planillas, respuestas automáticas e integraciones con IA.",
    who: "Negocios que hoy gestionan todo por WhatsApp. No lo dejes: hacé que el pedido te llegue ordenado.",
    example: "Elegí abajo lo que más te suene.",
    plazo: "Depende de lo que haya que conectar",
    automation: true,
  },
  {
    id: "mantenimiento",
    name: "Mantenimiento",
    what: "Cambios, copias de seguridad y monitoreo, mes a mes.",
    who: "Cualquier sitio después del lanzamiento.",
    example: "Los cambios del mes los hacemos nosotros, y vos no tocás nada.",
    plazo: "Mes a mes",
  },
];

/** «¿Qué te está comiendo el día?»: un dolor y el flujo que armaríamos. */
export const automations = [
  {
    id: "consultas",
    pain: "Respondo las mismas preguntas todo el día",
    title: "Respuestas y derivación automática",
    flow: [
      "Alguien consulta desde el sitio o Instagram",
      "El sistema responde al instante y clasifica el pedido",
      "Te llega solo lo que necesita una respuesta humana",
    ],
    result: "Menos mensajes repetidos y ninguna consulta perdida a la madrugada.",
  },
  {
    id: "presupuestos",
    pain: "Armo cada presupuesto a mano",
    title: "Presupuestos que se generan solos",
    flow: [
      "El cliente completa un formulario con su pedido",
      "Se calcula el precio con tus reglas y tu lista actualizada",
      "Sale el PDF a su correo y queda registrado",
    ],
    result: "Del presupuesto armado a mano a una revisión rápida.",
  },
  {
    id: "turnos",
    pain: "Coordino turnos por WhatsApp",
    title: "Agenda que se completa sola",
    flow: [
      "La persona elige día y horario disponible",
      "Se bloquea en tu calendario y se cobra la seña",
      "Recibe el recordatorio antes de la cita",
    ],
    result: "Menos ausencias y una agenda que siempre dice la verdad.",
  },
  {
    id: "reportes",
    pain: "No sé qué está funcionando",
    title: "Reporte semanal en tu correo",
    flow: [
      "Se juntan visitas, consultas y ventas del sitio",
      "Se comparan con la semana anterior",
      "Llega un resumen corto todos los lunes",
    ],
    result: "Decisiones con datos, sin abrir cinco paneles distintos.",
  },
] as const;

export const flowLabels = ["Entra", "Sucede", "Sale"] as const;
