/**
 * This interface defines the structure of a court object.
 * It includes properties for the court's ID, name, club affiliation, sport type, price per hour, status, and an optional image.
 * @interface Court
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
