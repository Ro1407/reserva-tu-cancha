import { z } from "zod/v4"
import { ClubSchema } from "@/prisma/zod"

export type Club = z.infer<typeof ClubSchema>

export const ClubDataSchema = ClubSchema.omit({id: true, createdAt: true, updatedAt: true})
export type ClubData = z.infer<typeof clubDataSchema>

export const ClubZodSchema = ClubSchema.omit({id: true, phone: true}).extend({
    id: z.uuid(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
})

