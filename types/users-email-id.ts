import { z } from 'zod'
import { UserSchema } from '@/prisma/zod'

const UsersEmailIdSchema = UserSchema.pick({ id: true, email: true })
export type UsersEmailId = z.infer<typeof UsersEmailIdSchema>