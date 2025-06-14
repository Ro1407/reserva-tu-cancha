import * as z from "zod"
import { Sport } from "@prisma/client"

export const ClubSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  phone: z.string(),
  location: z.string(),
  address: z.string(),
  rating: z.number().int().max(50, 'The club rating must be a one point decimal between 0.0 and 5.0'),
  image: z.string().nullish(),
  sports: z.nativeEnum(Sport).array(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
