import { z } from "zod/v4"
import { ReservationSchema } from "@/prisma/zod"

export type Reservation = z.infer<typeof ReservationSchema>

export const ReservationDataSchema = ReservationSchema.omit({ id: true, createdAt: true, updatedAt: true })
export type ReservationData = z.infer<typeof ReservationDataSchema>

export const ReservationZodSchema = ReservationSchema.omit({ date: true, courtId: true, id: true, userId: true }).extend(
    {
        id: z.uuid(),
        date: z.iso().date(),
        courtId: z.uuid(),
        userId: z.uuid(),
    }
)

