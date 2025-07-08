import { z } from "zod"
import { ReservationSchema } from "@/prisma/zod"
import { SportKey } from "@/types/enumerates";

export type Reservation = z.infer<typeof ReservationSchema>

export const ReservationDataSchema = ReservationSchema.omit({ id: true, createdAt: true, updatedAt: true })
export type ReservationData = z.infer<typeof ReservationDataSchema>

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


