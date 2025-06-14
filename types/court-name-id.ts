import { z } from "zod"
import { CourtSchema } from "@/prisma/zod"

const CourtNameIdSchema = CourtSchema.pick({id: true, name: true})

export type CourtNameId = z.infer<typeof CourtNameIdSchema>