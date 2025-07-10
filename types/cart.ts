import { TimeSlot } from './time-slot';
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
  time: TimeSlot;
  price: number;
  sport: string;
  image: string;
}

/**
 * This interface defines the structure of the cart state object.
 * It includes properties for the cart ID, an array of cart items, and the total price of the items in the cart.
 * @interface CartState
 *  @property {string} id - The unique identifier for the cart, typically a UUID.
 *  @property {CartItem[]} items - An array of items in the cart, each represented by a CartItem object.
 *  @property {number} total - The total price of all items in the cart, calculated as the sum of the prices of each CartItem.
 */
export interface CartState {
  id: string;
  items: CartItem[];
  total: number;
}
