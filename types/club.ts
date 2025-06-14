import { z } from "zod"
import { ClubSchema } from "@/prisma/zod"

export type Club = z.infer<typeof ClubSchema>

export const ClubDataSchema = ClubSchema.omit({id: true, createdAt: true, updatedAt: true})
const EditableClubSchema = ClubDataSchema.omit({rating: true, image: true})
export type ClubData = z.infer<typeof EditableClubSchema>

export const ClubZodSchema = ClubSchema.omit({id: true, phone: true}).extend({
    id: z.string().uuid(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
})

