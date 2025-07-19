import { z } from "zod"
import { ReservationSchema } from "@/prisma/zod"
import { SportKey } from "@/types/enumerates";
import { ReservationState, TimeSlot } from "@prisma/client";

export type Reservation = z.infer<typeof ReservationSchema>
export const ReservationValidatingSchema = ReservationSchema.omit({
    timeSlot: true, state: true
}).extend(
  {
      timeSlot: z.nativeEnum(TimeSlot).refine((value) => value !== undefined, { message: "Por favor, seleccione un horario para la reserva." }),
      state: z.nativeEnum(ReservationState).refine((value) => value !== undefined, { message: "Por favor, seleccione un estado para la reserva." })
  }
)

export const EditableReservationSchema = ReservationValidatingSchema.omit({ id: true, createdAt: true, updatedAt: true })
export type ReservationData = z.infer<typeof EditableReservationSchema>

export type ReservationCardData = Reservation &
  {
    courtImage: (string | null),
    courtName: string,
    courtSport: SportKey,
    courtRating: number,
    courtAddress: string,
    clubLocation: string,
    userEmail: string
  }

export type ReservationResume = {
  id: string;
  courtName: string;
  clubName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  sport: string;
  state: ReservationState;
  image: string;
}

