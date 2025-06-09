import { Sport, Club, Court, Reservation, Benefit, TimeSlot } from "@/lib/definitions";
import { Clock, CreditCard, Shield, Users } from "lucide-react";

/**
 * Data for the application
 * This file contains the data used in the application:
 * @Sports available
 * @Clubs with their details
 * @Courts with their specifications
 * @Reservations made by users
 * @Benefits of using the platform
 *
 * @module lib/data
 */

export const sports: Sport[] = [
  { name: "Fútbol", icon: "⚽" },
  { name: "Tenis", icon: "🎾" },
  { name: "Pádel", icon: "🏓" },
  { name: "Básquet", icon: "🏀" },
  { name: "Vóley", icon: "🏐" },
  { name: "Hockey", icon: "🏑" },
];

export const clubs: Club[] = [
  {
    id: 1,
    name: "Club Deportivo Central",
    description: "Un club con instalaciones de primer nivel, ideal para practicar diversos deportes.",
    location: "Palermo, CABA",
    phone: 1134567890,
    address: "Av. Scalabrini Ortiz 1234",
    courts: [],
    sports: ["Fútbol", "Tenis", "Pádel"],
    state: "Activo",
    rating: 4.5,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Complejo Atlético Norte",
    description: "Complejo con canchas de tenis y pádel, ideal para los amantes del deporte.",
    location: "Belgrano, CABA",
    phone: 1141234567,
    address: "Av. Cabildo 3200",
    courts: [],
    sports: ["Básquet", "Vóley", "Fútbol"],
    state: "Activo",
    rating: 4.2,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Centro Deportivo Sur",
    description: "Centro con canchas de pádel y hockey, perfecto para disfrutar en familia.",
    location: "San Telmo, CABA",
    phone: 1133345566,
    address: "Defensa 800",
    courts: [],
    sports: ["Tenis", "Pádel", "Hockey"],
    state: "Inactivo",
    rating: 3.8,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Polideportivo Oeste",
    description: "Polideportivo con canchas de básquet y fútbol, ideal para eventos deportivos.",
    location: "Caballito, CABA",
    phone: 1144456677,
    address: "Av. La Plata 220",
    courts: [],
    sports: ["Fútbol", "Básquet", "Vóley", "Tenis"],
    state: "Activo",
    rating: 4.0,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Club Parque Este",
    description: "Un club con amplias instalaciones para hockey y rugby, con un ambiente familiar.",
    location: "Recoleta, CABA",
    phone: 1167890123,
    address: "Av. Las Heras 2700",
    courts: [],
    sports: ["Hockey", "Fútbol", "Rugby"],
    state: "Activo",
    rating: 4.3,
    image: "/placeholder.svg",
  },
];

export const courts: Court[] = [
  {
    id: 1,
    name: "Cancha Fútbol 5 - Central",
    location: "Av. San Martín 1234, Bahía Blanca",
    club: 1,
    sport: "Fútbol",
    description: "Cancha de fútbol 5 con césped sintético de última generación e iluminación LED.",
    rating: 4.5,
    price: 8500,
    amenities: ["Césped sintético", "Iluminación LED", "Vestuarios", "Duchas", "Estacionamiento", "Buffet"],
    image: "/images/courts/futbol-central-1.jpg",
    status: "Activa",
    available: true,
  },
  {
    id: 2,
    name: "Cancha Tenis - Norte",
    location: "Ruta 3 Km 5, Complejo Norte",
    club: 2,
    sport: "Tenis",
    description: "Cancha profesional de tenis con superficie de polvo de ladrillo y excelente mantenimiento.",
    rating: 4.2,
    price: 6000,
    amenities: ["Iluminación LED", "Estacionamiento", "Vestuarios", "Pro Shop"],
    image: "/images/courts/tenis-norte-1.jpg",
    status: "Activa",
    available: true,
  },
  {
    id: 3,
    name: "Cancha Pádel - Sur",
    location: "Calle Alem 245, Centro Sur",
    club: 3,
    sport: "Pádel",
    description: "Cancha de pádel con paredes de vidrio templado e iluminación LED para juegos nocturnos.",
    rating: 3.9,
    price: 7000,
    amenities: ["Iluminación LED", "Estacionamiento", "Vestuarios"],
    image: "/images/courts/padel-sur-1.jpg",
    status: "Inactiva",
    available: false,
  },
  {
    id: 4,
    name: "Cancha Básquet - Oeste",
    location: "Blvd. Cerri 980, Polideportivo Oeste",
    club: 4,
    sport: "Básquet",
    description: "Gimnasio techado con cancha profesional de básquet, ideal para entrenamientos y torneos.",
    rating: 4.7,
    price: 5500,
    amenities: ["Iluminación LED", "Buffet", "Vestuarios", "Estacionamiento"],
    image: "/images/courts/basket-oeste-1.jpg",
    status: "Activa",
    available: true,
  },
  {
    id: 5,
    name: "Cancha Hockey - Este",
    location: "Av. Colón 2700, Parque Este",
    club: 5,
    sport: "Hockey",
    description: "Campo de hockey de césped sintético, utilizado por equipos locales y regionales.",
    rating: 4.0,
    price: 7800,
    amenities: ["Césped sintético", "Iluminación LED", "Estacionamiento", "Vestuarios"],
    image: "/images/courts/hockey-este.jpg",
    status: "Activa",
    available: true,
  },
];

export const reservations: Reservation[] = [
  {
    id: 1,
    court: "Cancha Fútbol 5 - Central",
    client: "Juan Pérez",
    date: "2024-01-15",
    hours: "18:00-19:00",
    price: 8000,
    state: "Confirmada",
  },
  {
    id: 2,
    court: "Cancha Tenis - Norte",
    client: "María García",
    date: "2024-01-15",
    hours: "10:00-11:00",
    price: 6000,
    state: "Pendiente",
  },
  {
    id: 3,
    court: "Cancha Pádel - Sur",
    client: "Carlos López",
    date: "2024-01-16",
    hours: "20:00-21:00",
    price: 7000,
    state: "Cancelada",
  },
  {
    id: 4,
    court: "Cancha Básquet - Oeste",
    client: "Ana Martínez",
    date: "2024-01-16",
    hours: "16:00-17:00",
    price: 5500,
    state: "Confirmada",
  },
];

export const benefits: Benefit[] = [
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
];

export const timeSlots: TimeSlot[] = [
  { time: "08:00", available: false },
  { time: "09:00", available: true },
  { time: "10:00", available: false },
  { time: "11:00", available: true },
  { time: "12:00", available: true },
  { time: "13:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
  { time: "18:00", available: true },
  { time: "19:00", available: true },
  { time: "20:00", available: true },
  { time: "21:00", available: true },
];

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

export const daysOfWeek: string[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
