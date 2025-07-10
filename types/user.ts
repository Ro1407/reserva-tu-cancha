import {z} from "zod"
import {UserSchema} from "@/prisma/zod"

export type User = z.infer<typeof UserSchema>

export const UserDataSchema = UserSchema.omit({externalId: true, createdAt: true, updatedAt: true})
export type UserData = z.infer<typeof UserDataSchema>

export const UserZodSchema = UserSchema.omit({id: true, phone: true, email: true}).extend({
    id: z.string().uuid(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    email: z.string().email(),
})