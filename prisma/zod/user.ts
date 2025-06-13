import * as z from "zod"
import {Role} from "@prisma/client"

export const UserSchema = z.object({
    id: z.string(),
    externalId: z.string().nullish(),
    password: z.string().nullish(),
    email: z.string(),
    name: z.string(),
    phone: z.string().nullish(),
    role: z.nativeEnum(Role),
    createdAt: z.date(),
    updatedAt: z.date(),
})
