import { TimeSlot } from "@/lib/definitions";
import { timeSlots } from "@/lib/data";

export const getTimeSlots: (date: Date) => Promise<TimeSlot[]> = (date: Date): Promise<TimeSlot[]> => {
  return new Promise((resolve: (value: TimeSlot[]) => void): void => {
    setTimeout((): void => resolve(timeSlots), 500);
  });
};
