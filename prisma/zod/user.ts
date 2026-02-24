import * as z from "zod"
import { Role } from "@/prisma/generated/browser"

export const UserSchema = z.object({
  id: z.string(),
  password: z.string().min(1, 'Por favor, proporcione una contraseña').nullish(),
  email: z.string().min(1, 'Por favor, proporcione un correo electrónico único').email('Por favor, proporcione un correo electrónico válido'),
  name: z.string().min(1, 'Por favor, proporcione un nombre de usuario'),
  phone: z.string().regex(/^\+[1-9]\d{1,3}\s\d{1,4}\s\d{3}-\d{4}$/, 'Por favor, proporcione un número de teléfono válido en formato +CódigoPais CódigoÁrea XXX-XXXX').nullish(),
  role: z.nativeEnum(Role),
})
