import React from "react";

/**
 * This interface defines the structure of a sport object.
 * It includes properties for the sport's name, icon, and a link to more information.
 *
 * @interface Sport
 * @property {string} name - The name of the sport.
 * @property {string} icon - The icon representing the sport.
 */
export interface Sport {
  name: string;
  icon: string;
}

/**
 * This interface defines the structure of a club object.
 * It includes properties for the club's ID, name, location, courts, rating, image, sports offered, and state.
 * * @interface Club
 *
 * @property {number} id - The unique identifier for the club.
 * @property {string} name - The name of the club.
 * @property {string} description - A brief description of the club, highlighting its features and offerings.
 * @property {string} location - The location of the club.
 * @property {number} phone - The contact phone number of the club.
 * @property {string} address - The physical address of the club.
 * @property {string[]} courts - An array of court names associated with the club.
 * @property {number} rating - The average rating of the club, typically on a scale from 1 to 5.
 * @property {string} image - The URL of the club's image.
 * @property {string[]} sports - An array of sports offered by the club.
 * @property {"Activo" | "Inactivo"} state - The operational status of the club, which can be either "Activo" (Active) or "Inactivo" (Inactive).
 */
export interface Club {
  id: number;
  name: string;
  description: string;
  location: string;
  phone: number;
  address: string;
  courts: string[];
  rating: number;
  image: string;
  sports: string[];
  state: "Activo" | "Inactivo";
}

/**
 * This interface defines the structure of a court object.
 * It includes properties for the court's ID, name, club affiliation, sport type, price per hour, status, and an optional image.
 * * @interface Court
 *
 * @property {number} id - The unique identifier for the court.
 * @property {string} name - The name of the court.
 * @property {string} location - The location of the court.
 * @property {number} club - The ID of the club that owns the court.
 * @property {string} sport - The type of sport played on the court (e.g., "Fútbol", "Tenis").
 * @property {string} description - A brief description of the court.
 * @property {number} rating - The average rating of the court, typically on a scale from 1 to 5.
 * @property {number} price - The price to rent the court per hour, in the local currency.
 * @property {string[]} amenities - An array of amenities available at the court (e.g., "Césped sintético", "Iluminación LED").
 * @property {string} image - The URL of the court's image
 * @property {"Activa" | "Inactiva"} status - The operational status of the court, which can be either "Activa" (Active) or "Inactiva" (Inactive).
 */
export interface Court {
  id: number;
  name: string;
  location: string;
  club: number;
  sport: string;
  description: string;
  rating: number;
  price: number;
  amenities: string[];
  image: string;
  status: "Activa" | "Inactiva";
  available?: boolean /* TODO: esto se debe calcular */;
}

/**
 * This interface defines the structure of a reservation object.
 * It includes properties for the reservation ID, court name, client name, date, time slot, price, and status.
 *
 * @interface Reservation
 * @property {number} id - The unique identifier for the reservation.
 * @property {string} court - The name of the court reserved.
 * @property {string} client - The name of the client who made the reservation.
 * @property {string} date - The date of the reservation in YYYY-MM-DD format.
 * @property {string} hours - The time slot of the reservation in HH:mm-HH:mm format.
 * @property {number} price - The price of the reservation in the local currency.
 * @property {string} state - The status of the reservation, which can be one of the following:
 *   - "Confirmada" (Confirmed)
 *   - "Pendiente" (Pending)
 *   - "Cancelada" (Cancelled)
 */
export interface Reservation {
  id: number;
  court: string;
  client: string;
  date: string;
  hours: string;
  price: number;
  state: "Confirmada" | "Pendiente" | "Cancelada";
}

/**
 * This interface defines the structure of a weather report object.
 * It includes properties for the weather description, date, rain probability, wind speed, and cloud cover.
 *
 * @interface WeatherReport
 * @property {string} date - The date of the weather report in YYYY/MM/DD format.
 * @property {string} state - The weather state, which can be one of the following:
 *   - "Soleado" (Sunny)
 *   - "Nublado" (Cloudy)
 *   - "Lluvioso" (Rainy)
 *   - "Tormentoso" (Stormy)
 *   - "Ventoso" (Windy)
 * @property {number} temperature - The temperature in degrees Celsius.
 * @property {number} rain - The probability of rain as a percentage.
 * @property {number} wind - The wind speed in kilometers per hour.
 * @property {number} clouds - The percentage of cloud cover.
 * @property {string} description - A brief description of the weather conditions.
 */
export interface WeatherReport {
  date: string;
  state: "Soleado" | "Nublado" | "Lluvioso" | "Tormentoso" | "Ventoso";
  temperature: number;
  rain: number;
  wind: number;
  clouds: number;
  description: string;
}

/**
 * This interface defines the structure of a benefit object.
 * It includes properties for the benefit's icon, title, and description.
 * * @interface Benefit
 *
 * @property {React.ComponentType<React.SVGProps<SVGSVGElement>>} icon - The icon component representing the benefit.
 * @property {string} title - The title of the benefit.
 * @property {string} description - A brief description of the benefit.
 */
export interface Benefit {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

/**
 * This interface defines the structure of a time slot object.
 * It includes properties for the time and availability status.
 * * @interface TimeSlot
 *
 * @property {string} time - The time of the slot in HH:mm format.
 * @property {boolean} available - Indicates whether the time slot is available for booking.
 */
export interface TimeSlot {
  time: string;
  available: boolean;
}
