import * as z from "zod"
import { Sport, Amenitie, CourtState, TimeSlot } from "@prisma/client"

export const CourtSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  sport: z.nativeEnum(Sport),
  description: z.string(),
  rating: z.number().int().max(50, 'The court rating must be a one point decimal between 0.0 and 5.0'),
  price: z.number().int(),
  amenities: z.nativeEnum(Amenitie).array(),
  image: z.string().nullish(),
  state: z.nativeEnum(CourtState),
  createdAt: z.date(),
  updatedAt: z.date(),
  clubId: z.string(),
  timeSlots: z.nativeEnum(TimeSlot).array(),
})
