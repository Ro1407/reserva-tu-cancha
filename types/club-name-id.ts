import { z } from "zod"
import { ClubSchema } from "@/prisma/zod"

const ClubNameIdSchema = ClubSchema.pick({id: true, name: true})

export type ClubNameId = z.infer<typeof ClubNameIdSchema>