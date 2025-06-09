/**
 * This interface defines the structure of a time slot object.
 * It includes properties for the time and availability status.
 * @interface TimeSlot
 *
 * @property {string} time - The time of the slot in HH:mm format.
 * @property {boolean} available - Indicates whether the time slot is available for booking.
 */
export interface TimeSlot {
  time: string;
  available: boolean;
}
