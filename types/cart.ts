/**
 * This interface defines the structure of a cart item object.
 * It includes properties for the item ID, court ID, court name, club name, date, time, price, sport type, and an image URL.
 * @interface CartItem
 *
 * @property {string} id - The unique identifier for the cart item, typically a combination of court ID, date, and time.
 * @property {number} courtId - The unique identifier for the court associated with the item.
 * @property {string} courtName - The name of the court associated with the item.
 * @property {string} clubName - The name of the club where the court is located.
 * @property {string} date - The date of the reservation in YYYY-MM-DD format.
 * @property {string} time - The time of the reservation in HH:mm format.
 * @property {number} price - The price of the reservation in the local currency.
 * @property {string} sport - The type of sport played on the court (e.g., "Fútbol", "Tenis").
 * @property {string} image - The URL of the court's image.
 *
 */
export interface CartItem {
  id: string;
  courtId: string;
  courtName: string;
  clubName: string;
  date: string;
  time: string;
  price: number;
  sport: string;
  image: string;
}
