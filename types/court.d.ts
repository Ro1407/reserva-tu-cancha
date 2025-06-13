import { z } from "zod/v4"
import {CourtSchema} from "@/prisma/zod"

export type Court =  z.infer<typeof CourtSchema>

export const CourtDataSchema = CourtSchema.omit({id: true, createdAt: true, updatedAt: true})
export type CourtData = z.infer<typeof CourtDataSchema>

export const CourtZodSchema = CourtSchema.omit({id: true, clubId: true}).extend({
  id: z.uuid(),
  clubId: z.uuid(),
})