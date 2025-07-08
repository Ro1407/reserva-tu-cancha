import { Clock, CreditCard, Mail, MapPin, MessageCircle, Phone, Shield, Users } from "lucide-react";

/**
 * This interface defines the structure of a sport object.
 * It includes properties for the sport's name, icon, and a link to more information.
 * @interface Sport
 *
 * @property {string} name - The name of the sport.
 * @property {string} icon - The icon representing the sport.
 */
export const sports = [
  { name: "Fútbol", icon: "⚽" },
  { name: "Tenis", icon: "🎾" },
  { name: "Pádel", icon: "🏓" },
  { name: "Básquet", icon: "🏀" },
  { name: "Vóley", icon: "🏐" },
  { name: "Hockey", icon: "🏑" },
] as const;
export type Sport = (typeof sports)[number];

/**
 * This interface defines the structure of a benefit object.
 * It includes properties for the benefit's icon, title, and description.
 * @interface Benefit
 *
 * @property {React.ComponentType<React.SVGProps<SVGSVGElement>>} icon - The icon component representing the benefit.
 * @property {string} title - The title of the benefit.
 * @property {string} description - A brief description of the benefit.
 */
export const benefits = [
  {
    icon: Clock,
    title: "Reserva Instantánea",
    description: "Reserva tu cancha en segundos, disponible 24/7",
  },
  {
    icon: Shield,
    title: "Pago Seguro",
    description: "Transacciones protegidas con la mejor tecnología",
  },
  {
    icon: CreditCard,
    title: "Precios Transparentes",
    description: "Sin costos ocultos, precios claros desde el inicio",
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Conecta con otros deportistas y forma equipos",
  },
] as const;
export type Benefit = (typeof benefits)[number];

/**
 * This interface defines the structure of a coupon object.
 * It includes properties for the coupon code and the discount percentage.
 * @interface Coupon
 */
export const coupons = [
  { code: "PRIMERA10", discount: 10 },
  { code: "VERANO20", discount: 20 },
  { code: "AMIGO15", discount: 15 },
] as const;
export type Coupon = (typeof coupons)[number];

/**
 * This array contains the names of the months in Spanish.
 * @constant {string[]}
 */
export const monthNames: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

/**
 * This array contains the names of the days of the week in Spanish.
 * @constant {string[]}
 */
export const daysOfWeek: string[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/**
 * This array defines the contact methods available for customer support.
 * It includes properties for the icon, title, content, description, and action link.
 */
export const contactMethods = [
  {
    icon: Phone,
    title: "Teléfono",
    content: "+54 11 1234-5678",
    description: "Lunes a Viernes: 9:00 - 20:00",
    action: "tel:+541112345678",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@reservatucancha.com",
    description: "Respuesta en 24 horas",
    action: "mailto:info@reservatucancha.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    content: "+54 9 11 1234-5678",
    description: "Chat directo",
    action: "https://wa.me/5491112345678",
  },
  {
    icon: MapPin,
    title: "Oficina",
    content: "Av. Corrientes 1234, CABA",
    description: "Buenos Aires, Argentina",
    action: "https://maps.google.com/?q=Av.+Corrientes+1234,+CABA",
  },
] as const;
export type ContactMethod = (typeof contactMethods)[number];

/**
 * This array contains frequently asked questions (FAQs) and their answers.
 * Each FAQ item includes a question and a corresponding answer.
 * @constant {Array<{question: string, answer: string}>}
 * @property {string} question - The frequently asked question.
 * @property {string} answer - The answer to the question.
 */
export const faqData = [
  {
    question: "¿Cómo puedo cancelar una reserva?",
    answer:
      "Puedes cancelar tu reserva hasta 2 horas antes del horario programado sin costo alguno. Para cancelar, ingresa a tu cuenta, ve a 'Mis Reservas' y selecciona la opción 'Cancelar'. Los reembolsos se procesan automáticamente.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express), transferencias bancarias y pagos a través de MercadoPago. Todos los pagos son procesados de forma segura.",
  },
  {
    question: "¿Puedo modificar mi reserva después de confirmarla?",
    answer:
      "Sí, puedes modificar tu reserva (fecha, horario o duración) hasta 4 horas antes del horario original, sujeto a disponibilidad. Las modificaciones pueden tener costo adicional según la diferencia de precio.",
  },
  {
    question: "¿Qué pasa si llueve el día de mi reserva?",
    answer:
      "Para (overview) al aire libre, ofrecemos cancelación gratuita por lluvia hasta 1 hora antes del horario reservado. Para (overview) techadas, las reservas se mantienen independientemente del clima.",
  },
  {
    question: "¿Necesito llevar algún equipamiento especial?",
    answer:
      "Cada club tiene sus propias políticas sobre equipamiento. Generalmente necesitarás ropa deportiva y calzado adecuado. Algunos clubes alquilan equipos como raquetas o pelotas. Consulta los detalles en la página de cada cancha.",
  },
  {
    question: "¿Cómo funciona el sistema de puntuación y reviews?",
    answer:
      "Después de cada reserva, puedes calificar la cancha y el club del 1 al 5 estrellas y dejar un comentario. Esto ayuda a otros usuarios a tomar mejores decisiones y a los clubes a mejorar sus servicios.",
  },
  {
    question: "¿Hay descuentos para reservas frecuentes?",
    answer:
      "Sí, ofrecemos un programa de fidelidad donde acumulas puntos por cada reserva. También tenemos descuentos especiales para reservas múltiples y promociones estacionales. Suscríbete a nuestro newsletter para recibir ofertas exclusivas.",
  },
  {
    question: "¿Puedo reservar para un grupo grande?",
    answer:
      "Por supuesto. Para grupos de más de 10 personas o eventos especiales, contáctanos directamente para obtener tarifas preferenciales y asegurar disponibilidad. Ofrecemos paquetes especiales para torneos y eventos corporativos.",
  },
] as const;
export type FAQItem = (typeof faqData)[number];
