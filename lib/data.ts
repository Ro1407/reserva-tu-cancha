import { Role, Sport, Amenitie, ReservationState, TimeSlot, CourtState } from "@prisma/client"
import { TimeSlotValues } from "@/types/enumerates";

/**
 * Data for the application, used by seed scripts
 * This file contains the placeholder data used in the application:
 * @Clubs with their details
 * @Courts with their specifications
 * @Reservations made by users
 *
 * @module lib/data
 */

export const users = [
    {
        id: "ff62bb55-4d73-4bbb-9d8c-d4dae9680e30",
        email: "juan.perez@email.com",
        name: "Juan Pérez",
        phone: "+54 11 1234-5678",
        role: Role.USER,
    },
    {
        id: "1a169a2c-cac0-4870-82f2-4e9f2a1a79e9",
        email: "maria.garcia@email.com",
        name: "María García",
        phone: "+54 11 2345-6789",
        role: Role.USER,
    },
    {
        id: "9704d91f-0dbf-46f4-9280-02877132168b",
        email: "carlos.lopez@email.com",
        name: "Carlos López",
        phone: "+54 11 3456-7890",
        role: Role.USER,
    },
    {
        id: "d8668c4d-a11e-4b05-be55-f17eff0042b0",
        email: "ana.martinez@email.com",
        name: "Ana Martínez",
        phone: "+54 11 4567-8901",
        role: Role.USER,
    },
    {
        id: "f64f67d1-eacf-468c-b3d3-a8e8e9c1998d",
        email: "admin@clubsystem.com",
        name: "Administrador",
        phone: "+54 11 5678-9012",
        role: Role.ADMIN,
    },
];

export const clubs = [
    {
        id: "aa35a45b-090e-4746-86f1-f0bad700c920",
        name: "Club Deportivo Central",
        description: "Un club con instalaciones de primer nivel, ideal para practicar diversos deportes.",
        location: "Palermo, CABA",
        phone: "1134567890",
        address: "Av. Scalabrini Ortiz 1234",
        sports: [Sport.Futbol, Sport.Tennis, Sport.Paddle],
        rating: 45,
        image: "/placeholder.svg",
    },
    {
        id: "e85cdcdd-b050-4fac-bc2a-b252ed546eb5",
        name: "Complejo Atlético Norte",
        description: "Complejo con canchas de tenis y pádel, ideal para los amantes del deporte.",
        location: "Belgrano, CABA",
        phone: "1141234567",
        address: "Av. Cabildo 3200",
        sports: [Sport.Basketball, Sport.Volleyball, Sport.Futbol],
        rating: 42,
        image: "/placeholder.svg",
    },
    {
        id: "66ed26cd-37e8-4b5c-b492-e28533bd3011",
        name: "Centro Deportivo Sur",
        description: "Centro con canchas de pádel y hockey, perfecto para disfrutar en familia.",
        location: "San Telmo, CABA",
        phone: "1133345566",
        address: "Defensa 800",
        sports: [Sport.Hockey, Sport.Tennis, Sport.Paddle],
        rating: 38,
        image: "/placeholder.svg",
    },
    {
        id: "67ae5369-9593-48b5-a9c4-56245c3d3304",
        name: "Polideportivo Oeste",
        description: "Polideportivo con canchas de básquet y fútbol, ideal para eventos deportivos.",
        location: "Caballito, CABA",
        phone: "1144456677",
        address: "Av. La Plata 220",
        sports: [Sport.Futbol, Sport.Basketball, Sport.Volleyball, Sport.Tennis],
        rating: 40,
        image: "/placeholder.svg",
    },
    {
        id: "446333ce-a4af-4f57-a978-94385499b57e",
        name: "Club Parque Este",
        description: "Un club con amplias instalaciones para hockey y rugby, con un ambiente familiar.",
        location: "Recoleta, CABA",
        phone: "1167890123",
        address: "Av. Las Heras 2700",
        sports: [Sport.Hockey, Sport.Futbol, Sport.Paddle],
        rating: 43,
        image: "/placeholder.svg",
    },
];

export const courts = [
    {
        id: "a555445c-8a9c-447f-9780-ff6fe1b9d05f",
        clubId: "aa35a45b-090e-4746-86f1-f0bad700c920",
        name: "Cancha Fútbol 5 - Central",
        address: "Av. San Martín 1234, Bahía Blanca",
        sport: Sport.Futbol,
        description: "Cancha de fútbol 5 con césped sintético de última generación e iluminación LED.",
        rating: 45,
        price: 850000,
        amenities: [Amenitie.CespedSintetico, Amenitie.Iluminacion, Amenitie.Vestuarios, Amenitie.Estacionamiento, Amenitie.Buffet],
        image: "/images/courts/futbol-central-1.jpg",
        state: CourtState.Activa,
        timeSlots: TimeSlotValues,
    },
    {
        id: "00f2281e-b39a-4b9a-be41-c9ac96c09b73",
        clubId: "e85cdcdd-b050-4fac-bc2a-b252ed546eb5",
        name: "Cancha Tenis - Norte",
        address: "Ruta 3 Km 5, Complejo Norte",
        sport: Sport.Tennis,
        description: "Cancha profesional de tenis con superficie de polvo de ladrillo y excelente mantenimiento.",
        rating: 42,
        price: 600000,
        amenities: [Amenitie.Iluminacion, Amenitie.Estacionamiento, Amenitie.Vestuarios, Amenitie.Buffet],
        image: "/images/courts/tenis-norte-1.jpg",
        state: CourtState.Activa,
        timeSlots: TimeSlotValues,
    },
    {
        id: "c8c221a2-2ee0-44c3-beb9-1379ce79b142",
        clubId: "66ed26cd-37e8-4b5c-b492-e28533bd3011",
        name: "Cancha Pádel - Sur",
        address: "Calle Alem 245, Centro Sur",
        sport: Sport.Paddle,
        description: "Cancha de pádel con paredes de vidrio templado e iluminación LED para juegos nocturnos.",
        rating: 50,
        price: 700000,
        amenities: [Amenitie.Iluminacion, Amenitie.Estacionamiento, Amenitie.Vestuarios],
        image: "/images/courts/padel-sur-1.jpg",
        state: CourtState.Activa,
        timeSlots: TimeSlotValues,
    },
    {
        id: "ae7eec76-baf9-4c9b-91ee-1ca13f376ce0",
        clubId: "67ae5369-9593-48b5-a9c4-56245c3d3304",
        name: "Cancha Básquet - Oeste",
        address: "Blvd. Cerri 980, Polideportivo Oeste",
        sport: Sport.Basketball,
        description: "Gimnasio techado con cancha profesional de básquet, ideal para entrenamientos y torneos.",
        rating: 47,
        price: 550000,
        amenities: [Amenitie.Iluminacion, Amenitie.Buffet, Amenitie.Vestuarios, Amenitie.Estacionamiento],
        image: "/images/courts/basket-oeste-1.jpg",
        state: CourtState.Activa,
        timeSlots: TimeSlotValues,
    },
    {
        id: "e34a0fa9-e2fc-40f1-a920-e00dc575af1b",
        clubId: "446333ce-a4af-4f57-a978-94385499b57e",
        name: "Cancha Hockey - Este",
        address: "Av. Colón 2700, Parque Este",
        sport: Sport.Hockey,
        description: "Campo de hockey de césped sintético, utilizado por equipos locales y regionales.",
        rating: 0,
        price: 780000,
        amenities: [Amenitie.CespedSintetico, Amenitie.Iluminacion, Amenitie.Estacionamiento, Amenitie.Vestuarios],
        image: "/images/courts/hockey-este.jpg",
        state: CourtState.Activa,
        timeSlots: TimeSlotValues,
    },
];

export const reservations = [
    {
        id: "39093033-67fc-4522-9105-ce03e3100195",
        courtId: "a555445c-8a9c-447f-9780-ff6fe1b9d05f",
        userId: "ff62bb55-4d73-4bbb-9d8c-d4dae9680e30",
        date: "2024-01-15",
        timeSlot: TimeSlot.H1800,
        price: 800000,
        state: ReservationState.Confirmada
    },
    {
        id: "f9e763d0-acdb-4222-9b52-d0c91cae1d82",
        courtId: "a555445c-8a9c-447f-9780-ff6fe1b9d05f",
        userId: "ff62bb55-4d73-4bbb-9d8c-d4dae9680e30",
        date: "2024-01-15",
        timeSlot: TimeSlot.H1000,
        price: 600000,
        state: ReservationState.Pendiente,
    },
    {
        id: "6e4863ef-6671-4901-87ca-0b59cb949eb9",
        courtId: "a555445c-8a9c-447f-9780-ff6fe1b9d05f",
        userId: "ff62bb55-4d73-4bbb-9d8c-d4dae9680e30",
        date: "2024-01-16",
        timeSlot: TimeSlot.H1600,
        price: 700000,
        state: ReservationState.Cancelada,
    },
    {
        id: "e47145db-7e25-4121-aaa1-e28f4691fe5b",
        courtId: "a555445c-8a9c-447f-9780-ff6fe1b9d05f",
        userId: "ff62bb55-4d73-4bbb-9d8c-d4dae9680e30",
        date: "2024-01-16",
        timeSlot: TimeSlot.H1600,
        price: 550000,
        state: ReservationState.Confirmada,
    },
    {
        id: "e752de4b-5c9e-4c4c-9fe8-4b3207d6d290",
        courtId: "a555445c-8a9c-447f-9780-ff6fe1b9d05f",
        userId: "f64f67d1-eacf-468c-b3d3-a8e8e9c1998d",
        date: "2024-01-16",
        timeSlot: TimeSlot.H1600,
        price: 990000,
        state: ReservationState.Mantenimiento,
    },
];

