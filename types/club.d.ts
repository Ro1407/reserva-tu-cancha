/**
 * This interface defines the structure of a club object.
 * It includes properties for the club's ID, name, location, courts, rating, image, sports offered, and state.
 * @interface Club
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
