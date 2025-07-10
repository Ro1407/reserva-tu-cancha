import * as z from "zod"
import { TimeSlot, ReservationState } from "@prisma/client"

export const ReservationSchema = z.object({
  id: z.string(),
  date: z.string().min(1, 'Por favor, proporcione una fecha para la reserva').date('Por favor, proporcione una fecha válida'),
  timeSlot: z.nativeEnum(TimeSlot),
  price: z.number().int().min(1, 'Por favor, proporcione un precio para la reserva'),
  state: z.nativeEnum(ReservationState),
  createdAt: z.date(),
  updatedAt: z.date(),
  courtId: z.string().min(1, 'Por favor, proporcione la cancha para la reserva'),
  userId: z.string().min(1, 'Por favor, proporcione el usuario que realiza la reserva'),
})
