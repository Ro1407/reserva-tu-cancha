import * as z from "zod"
import { Sport } from "@prisma/client"

export const ClubSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  phone: z.string(),
  location: z.string(),
  address: z.string(),
  rating: z.number().int().max(5, 'The club rating must be an integer between 0 and 5'),
  image: z.string().nullish(),
  sports: z.nativeEnum(Sport).array(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
