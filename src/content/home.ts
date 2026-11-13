/** Texto de la home que no pertenece a una lista. Ver COPY.md. */

export const stages = [
  {
    name: "Entender",
    time: "Media hora de charla",
    body: "Nos contás qué vendés, a quién y qué te está frenando hoy.",
    get: "Un presupuesto cerrado, con etapas y fechas.",
  },
  {
    name: "Diseñar",
    time: "Antes de programar una línea",
    body: "Te mostramos cómo se va a ver y cómo se va a usar, pantalla por pantalla, en escritorio y en celular.",
    get: "El diseño completo para aprobar. Lo que aprobás es lo que se publica.",
  },
  {
    name: "Construir",
    time: "El grueso del plazo",
    body: "Programamos desde cero, con código propio. Vas viendo avances reales, no capturas.",
    get: "Un enlace de prueba que queda siempre abierto.",
  },
  {
    name: "Lanzar y sostener",
    time: "El día del lanzamiento y los meses que siguen",
    body: "Publicamos, medimos las visitas y seguimos al lado tuyo.",
    get: "El sitio en línea y el dominio a tu nombre.",
  },
] as const;

export const facts = [
  {
    fact: "El precio se cierra antes de empezar.",
    note: "Si algo cambia en el camino, lo hablamos antes de tocarlo.",
  },
  {
    fact: "El dominio queda a tu nombre.",
    note: "Siempre. Si mañana seguís con otro equipo, te lo llevás.",
  },
  {
    fact: "Hablás con quien hace el trabajo.",
    note: "Sin intermediarios ni tickets.",
  },
  {
    fact: "Todo en remoto.",
    note: "Desde Córdoba, para cualquier lugar.",
  },
  {
    fact: "Una landing, 2 a 3 semanas. Un catálogo o una tienda, 4 a 8.",
    note: "El plazo real depende sobre todo de qué tan rápido lleguen las fotos, los textos y las aprobaciones.",
  },
] as const;

export const faq = [
  {
    q: "¿Cuánto cuesta un sitio?",
    a: "Depende del alcance: no es lo mismo una landing de una página que una tienda con pagos y panel. Después de la primera charla te pasamos un presupuesto cerrado, con etapas y fechas. Ese número no se mueve a mitad de camino.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Una landing suele estar lista en dos a tres semanas. Un sitio con catálogo o una tienda, entre cuatro y ocho. El plazo real depende sobre todo de qué tan rápido lleguen las fotos, los textos y las aprobaciones de tu lado.",
  },
  {
    q: "¿Qué necesito tener antes de empezar?",
    a: "Con que tengas claro qué vendés y a quién, alcanza. Si ya tenés logo, fotos y textos, los usamos. Si no, los hacemos nosotros y lo cotizamos aparte, para que veas cada cosa.",
  },
  {
    q: "¿A nombre de quién queda el dominio?",
    a: "Al tuyo, siempre. La publicación la resolvemos en infraestructura moderna, con costo bajo o nulo según el proyecto, y te explicamos qué se paga y a quién.",
  },
  {
    q: "¿Puedo cambiar cosas después del lanzamiento?",
    a: "Sí. Dejamos el contenido editable donde tiene sentido. Y si preferís no tocar nada, el plan de mantenimiento incluye los cambios del mes. No quedás atado a nosotros para modificar un texto.",
  },
  {
    q: "¿Hacen automatizaciones sin rehacer mi web?",
    a: "Sí. Muchas veces el sitio está bien y lo que falta es conectar el formulario con la planilla, el correo o WhatsApp. Podemos trabajar solo sobre eso, sin tocar el diseño.",
  },
  {
    q: "¿Y si recién arranco?",
    a: "Capaz que no necesitás una web entera. Una landing de una página que explique bien lo que hacés puede ser el primer paso, y se amplía cuando el proyecto crece. Si creemos que todavía no es momento, te lo decimos en la primera charla.",
  },
  {
    q: "¿Hay proyectos que no toman?",
    a: "Si buscás una web en Wix por dos pesos, o en realidad necesitás un community manager que publique todos los días, hoy no somos la mejor opción. Preferimos decírtelo antes de empezar.",
  },
] as const;

export const form = {
  needs: [
    "Landing page",
    "Sitio con catálogo o base de datos",
    "Sitio institucional",
    "Tienda online",
    "Portfolio",
    "Marca y contenido",
    "Turnos o automatizaciones",
    "Mantenimiento",
  ],
  unsure: "No sé, ayudame a decidir",
  stages: ["Tengo la idea", "Tengo la marca armada", "Ya tengo web y quiero mejorarla"],
  whens: ["Lo antes posible", "En uno o dos meses", "Este año, sin apuro", "Todavía estoy averiguando"],
  after: [
    "Leemos tu mensaje y respondemos con preguntas concretas.",
    "Charlamos media hora, por videollamada o por donde te quede cómodo.",
    "Te pasamos un presupuesto cerrado, con etapas y fechas.",
  ],
} as const;
