/**
 * This interface defines the structure of a reservation object.
 * It includes properties for the reservation ID, court name, client name, date, time slot, price, and status.
 * @interface Reservation
 *
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
