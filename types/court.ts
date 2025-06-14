import { z } from "zod"
import {CourtSchema} from "@/prisma/zod"

export type Court =  z.infer<typeof CourtSchema>

export const CourtDataSchema = CourtSchema.omit({id: true, createdAt: true, updatedAt: true})
const EditableCourtSchema = CourtDataSchema.omit({rating: true, image: true})
export type CourtData = z.infer<typeof EditableCourtSchema>

export const CourtZodSchema = CourtSchema.omit({id: true, clubId: true}).extend({
  id: z.string().uuid(),
  clubId: z.string().uuid(),
})