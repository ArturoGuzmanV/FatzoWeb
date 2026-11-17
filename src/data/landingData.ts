export interface MockupCategory {
  id: string;
  name: string;
  imageUrl: string;
  alt: string;
}

export interface MockupDish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  alt: string;
  dietary?: string;
}

export interface BankOption {
  id: string;
  name: string;
  shortCode: string;
  bgHex: string;
  textHex: string;
}

export interface CaseStudy {
  id: string;
  restaurant: string;
  locationMeta: string;
  metricHeadline: string;
  metricContext: string;
  quote: string;
  authorName: string;
  authorRole: string;
  imageUrl: string;
  imageAlt: string;
}

export interface PaymentChannel {
  id: string;
  name: string;
  settlementMeta: string;
  description: string;
}

export const HERO_METRICS = [
  {
    value: '-14 min',
    label: 'Tiempo ahorrado por mesa',
    detail: 'Cierre de cuenta sin esperar terminales POS físicas',
  },
  {
    value: '+22%',
    label: 'Ticket promedio en sala',
    detail: 'Más postres, cócteles y extras con carta fotográfica',
  },
  {
    value: '+18%',
    label: 'Propinas para el equipo',
    detail: 'Selección sugerida en un toque al confirmar el pago',
  },
  {
    value: '12 seg',
    label: 'Cobro medio por comensal',
    detail: 'Transferencia Fintoc directa o Face ID con Apple Pay',
  },
] as const;

export const MOCKUP_CATEGORIES: MockupCategory[] = [
  {
    id: 'pizzas',
    name: 'Pizzas al Horno',
    imageUrl: '/assets/aistudio/pizza_quesos_3228e564.jpg',
    alt: 'Pizza artesanal horneada a la piedra con albahaca fresca',
  },
  {
    id: 'fondos',
    name: 'Platos de Fondo',
    imageUrl: '/assets/aistudio/plato_risotto_d897312d.jpg',
    alt: 'Risotto cremoso con hongos y queso parmesano rallado',
  },
  {
    id: 'tablas',
    name: 'Tablas y Entradas',
    imageUrl: '/assets/aistudio/tabla_picar_c5b29085.jpg',
    alt: 'Tabla de quesos artesanales, charcutería, aceitunas y baguette',
  },
  {
    id: 'cocteles',
    name: 'Coctelería',
    imageUrl: '/assets/aistudio/trago_cocktail_4589fda1.jpg',
    alt: 'Cóctel de autor ahumado con romero servido sobre bandeja de madera',
  },
];

export const MOCKUP_DISHES: MockupDish[] = [
  {
    id: 'margherita',
    name: 'Pizza Margherita Napolitana',
    description: 'Masa madre de 48h, tomate San Marzano, mozzarella fior di latte y albahaca.',
    price: 12900,
    imageUrl: '/assets/aistudio/pizza_quesos_3228e564.jpg',
    alt: 'Pizza Margherita artesanal servida en plato de cerámica',
    dietary: 'Vegetariano',
  },
  {
    id: 'risotto',
    name: 'Risotto de Hongos Trufado',
    description: 'Arroz Carnaroli cremoso con mix de setas salteadas y parmesano reggiano.',
    price: 15400,
    imageUrl: '/assets/aistudio/plato_risotto_d897312d.jpg',
    alt: 'Risotto de hongos trufado en plato hondo blanco',
    dietary: 'Sin gluten',
  },
  {
    id: 'volcan',
    name: 'Brownie Tibio de Chocolate',
    description: 'Cacao 70% belga con salsa caliente de ganache y toque de sal de mar.',
    price: 7800,
    imageUrl: '/assets/aistudio/postre_volcan_4942e420.jpg',
    alt: 'Porción de brownie de chocolate tibio con salsa fundida',
  },
];

export const CHILEAN_BANKS: BankOption[] = [
  { id: 'bch', name: 'Banco de Chile', shortCode: 'BCH', bgHex: '#002464', textHex: '#FFFFFF' },
  { id: 'san', name: 'Banco Santander', shortCode: 'SAN', bgHex: '#EC0000', textHex: '#FFFFFF' },
  { id: 'bci', name: 'Banco BCI', shortCode: 'BCI', bgHex: '#15803D', textHex: '#FFFFFF' },
  { id: 'est', name: 'BancoEstado', shortCode: 'EST', bgHex: '#EA580C', textHex: '#FFFFFF' },
];

export const PAYMENT_CHANNELS: PaymentChannel[] = [
  {
    id: 'fintoc',
    name: 'Transferencia directa Fintoc',
    settlementMeta: 'Bancos de Chile · Sin tarjetas físicas',
    description:
      'Tus clientes pagan desde Banco de Chile, Santander, BCI, BancoEstado o Itaú en segundos, con menores comisiones que los adquirentes tradicionales.',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay con Face ID',
    settlementMeta: 'Cobro biométrico · 1 toque',
    description:
      'Sin escribir números de tarjeta ni esperar que el garzón acerque el terminal. Confirmación inmediata desde el teléfono del comensal.',
  },
  {
    id: 'webpay',
    name: 'Tarjetas Redcompra y Webpay',
    settlementMeta: 'Débito y crédito · Encriptación 256-bit',
    description:
      'Acepta Visa, Mastercard y Redcompra de forma fluida dentro del mismo flujo móvil, sin redirecciones lentas que frenan la mesa.',
  },
  {
    id: 'mesa',
    name: 'Opción híbrida: Pagar en mesa',
    settlementMeta: 'Efectivo o POS tradicional',
    description:
      'Mantén el control total del servicio: si un comensal prefiere efectivo o factura física, notifica al garzón directamente desde el menú.',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'lastarria',
    restaurant: 'Bistró Lastarria',
    locationMeta: 'Santiago Centro · 42 mesas · Cocina de autor',
    metricHeadline: '+1,4 rotaciones por turno nocturno',
    metricContext: 'Medido en servicios de jueves a sábado durante 90 días',
    quote:
      'Antes perdíamos hasta 20 minutos por mesa los viernes esperando que quedara libre la máquina de tarjetas. Con Gustō, el 74% de las cuentas se paga por Fintoc o Apple Pay antes de pedir el café.',
    authorName: 'Cristián Morales',
    authorRole: 'Socio Fundador',
    imageUrl: '/assets/aistudio/plato_plateada_0bd07d7d.jpg',
    imageAlt: 'Plato principal a las brasas servido en tabla de madera en Bistró Lastarria',
  },
  {
    id: 'fornace',
    restaurant: 'Pizzería La Fornace',
    locationMeta: 'Providencia · 28 mesas · Masa madre y barra',
    metricHeadline: '+24% en venta de postres y coctelería',
    metricContext: 'Comparación de ticket promedio tras 60 días con carta fotográfica',
    quote:
      'Al mostrar fotografías reales de nuestras pizzas y tragos con la opción de pedir una segunda ronda sin llamar al mozo, el consumo adicional subió desde la primera semana sin saturar la sala.',
    authorName: 'Valentina Riquelme',
    authorRole: 'Directora de Operaciones',
    imageUrl: '/assets/aistudio/pizza_artesanal_af6ee8d0.jpg',
    imageAlt: 'Pizza artesanal horneada a la piedra de Pizzería La Fornace',
  },
  {
    id: 'mar-brasas',
    restaurant: 'Casa Mar & Brasas',
    locationMeta: 'Viña del Mar · 65 mesas · Terraza y salón',
    metricHeadline: '18 horas semanales liberadas en sala',
    metricContext: 'Reducción de tiempos de cobro y división de cuentas en grupos',
    quote:
      'En fines de semana largos, las mesas de ocho o diez personas frenaban toda la caja dividiendo la cuenta. Hoy cada comensal escanea el QR, selecciona su parte con propina y se retira sin filas.',
    authorName: 'Rodrigo Alarcón',
    authorRole: 'Gerente General',
    imageUrl: '/assets/aistudio/trago_spritz_1be5e1c7.jpg',
    imageAlt: 'Cócteles frescos servidos en la barra de Casa Mar y Brasas',
  },
];

export const ACTIVATION_STEPS = [
  {
    index: '01.',
    title: 'Cargamos tu carta y fotografía actual',
    description:
      'Estructuramos categorías, precios en CLP, filtros dietarios y modificadores sin que tu equipo pierda horas en planillas.',
  },
  {
    index: '02.',
    title: 'Configuramos tus mesas, zonas y códigos QR',
    description:
      'Generamos los enlaces únicos por mesa (Salón Principal, Terraza, Barra) listos para imprimir en acrílico, madera o mesa.',
  },
  {
    index: '03.',
    title: 'Conectamos Fintoc, Apple Pay y tu subdominio',
    description:
      'Activamos pagos con acreditación a tu cuenta bancaria chilena y enlazamos tu acceso comercial directo al menú digital.',
  },
] as const;
