import * as z from "zod"
import { TimeSlot, ReservationState } from "@prisma/client"

export const ReservationSchema = z.object({
  id: z.string(),
  date: z.string(),
  timeSlot: z.nativeEnum(TimeSlot),
  price: z.number().int(),
  state: z.nativeEnum(ReservationState),
  createdAt: z.date(),
  updatedAt: z.date(),
  courtId: z.string(),
  userId: z.string(),
})
