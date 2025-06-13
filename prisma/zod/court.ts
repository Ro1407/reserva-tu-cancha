import * as z from "zod"
import { Sport, Amenitie, CourtState, TimeSlot } from "@prisma/client"

export const CourtSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  sport: z.nativeEnum(Sport),
  description: z.string(),
  rating: z.number().int().max(5, 'Rating must be an integer between 0 and 5'),
  price: z.number().int(),
  amenities: z.nativeEnum(Amenitie).array(),
  image: z.string().nullish(),
  state: z.nativeEnum(CourtState),
  createdAt: z.date(),
  updatedAt: z.date(),
  clubId: z.string(),
  TimeSlot: z.nativeEnum(TimeSlot).array(),
})
