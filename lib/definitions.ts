import { Clock, CreditCard, Shield, Users } from "lucide-react";

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
];

/**
 * This array contains the names of the days of the week in Spanish.
 * @constant {string[]}
 */
export const daysOfWeek: string[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
