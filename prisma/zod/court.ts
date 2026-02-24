import * as z from "zod"
import { Sport, CourtState, Amenitie, TimeSlot } from "@/prisma/generated/browser"

export const CourtSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Por favor, proporcione un nombre único para la cancha'),
  address: z.string().min(1, 'Por favor, proporcione una dirección para la cancha'),
  sport: z.nativeEnum(Sport),
  description: z.string().min(1, 'Por favor, proporcione una descripción de la cancha'),
  rating: z.number().int().max(50, 'El rating de la cancha debe estar entre 0.0 y 5.0'),
  price: z.number().int().min(1, 'Por favor, proporcione un precio por hora de la cancha'),
  amenities: z.nativeEnum(Amenitie).array(),
  image: z.string().nullish(),
  state: z.nativeEnum(CourtState),
  createdAt: z.date(),
  updatedAt: z.date(),
  clubId: z.string().min(1, 'Por favor, proporcione el club al que pertenece la cancha'),
  timeSlots: z.nativeEnum(TimeSlot).array(),
})
