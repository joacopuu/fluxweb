/**
 * «Para quién»: público, lo que ya piensa y lo que le contestamos.
 * Sale tal cual de la tabla del §3 del perfil de marca.
 */
export type Audience = {
  id: string;
  /** Completa la frase «Soy…». */
  label: string;
  /** Completa «Escribinos como…». */
  as: string;
  objection: string;
  answer: string;
  show: string;
  /** Mensaje de WhatsApp adaptado a quien eligió. */
  wa: string;
};

export const audiences: Audience[] = [
  {
    id: "emprendedor",
    label: "un emprendedor que lanza un producto",
    as: "emprendedor",
    objection: "Con Instagram me alcanza.",
    answer: "Instagram muestra. La web explica y convence.",
    show: "BeClean: cómo se cuenta un producto en 30 segundos.",
    wa: "Hola FluxWeb, estoy lanzando un producto y quiero que se entienda desde el día uno. Les cuento:",
  },
  {
    id: "inmobiliaria",
    label: "una inmobiliaria",
    as: "inmobiliaria",
    objection: "Ya estoy en los portales.",
    answer: "Ahí sos uno más entre cien. En tu web sos el único.",
    show: "Mirande: filtros, fichas y consulta directa.",
    wa: "Hola FluxWeb, tengo una inmobiliaria y quiero un catálogo propio, sin depender de los portales. Les cuento:",
  },
  {
    id: "marca",
    label: "una marca",
    as: "marca",
    objection: "Una plantilla es más barata.",
    answer: "Y se parece a otras mil.",
    show: "Tres sitios nuestros con tres identidades que no tienen nada que ver.",
    wa: "Hola FluxWeb, tengo una marca y quiero que la web se parezca a ella, no a una plantilla. Les cuento:",
  },
  {
    id: "profesional",
    label: "un profesional",
    as: "profesional",
    objection: "Me llegan por recomendación.",
    answer: "El recomendado igual te googlea.",
    show: "Sitios sobrios, rápidos y con tu nombre.",
    wa: "Hola FluxWeb, soy profesional y quiero que el que me googlea me tome en serio. Les cuento:",
  },
  {
    id: "comercio",
    label: "un comercio",
    as: "comercio",
    objection: "No vendo online.",
    answer: "La web también te vende cuando estás cerrado.",
    show: "Catálogo, horarios y pedidos claros.",
    wa: "Hola FluxWeb, tengo un comercio y quiero mostrar catálogo, horarios y pedidos. Les cuento:",
  },
  {
    id: "creativo",
    label: "un estudio creativo",
    as: "estudio creativo",
    objection: "Lo hago con Wix.",
    answer: "Se nota.",
    show: "Animaciones, transiciones y microdetalles. Este sitio, por ejemplo.",
    wa: "Hola FluxWeb, tenemos un estudio creativo y queremos un portfolio a la altura del trabajo. Les cuento:",
  },
  {
    id: "whatsapp",
    label: "un negocio que vive en WhatsApp",
    as: "negocio",
    objection: "Con WhatsApp me alcanza.",
    answer: "No lo dejes. Hacé que el pedido te llegue ordenado.",
    show: "Turnos y automatizaciones que se conectan con lo que ya usás.",
    wa: "Hola FluxWeb, gestiono todo por WhatsApp y quiero ordenar turnos y consultas. Les cuento:",
  },
];
