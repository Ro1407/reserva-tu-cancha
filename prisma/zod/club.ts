import * as z from "zod"
import { Sport } from "@/prisma/generated/client"

export const ClubSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Por favor, proporcione un nombre único para el club'),
  description: z.string().min(1, 'Por favor, proporcione una descripción del club'),
  phone: z.string().min(1, 'Por favor, proporcione un número de teléfono del club').regex(/^\+[1-9]\d{1,3}\s\d{1,4}\s\d{3}-\d{4}$/, 'Por favor, proporcione un número de teléfono válido en formato +CódigoPais CódigoÁrea XXX-XXXX'),
  location: z.string().min(1, 'Por favor, proporcione la ubicación del club'),
  address: z.string().min(1, 'Por favor, proporcione la dirección del club'),
  rating: z.number().int().max(50, 'El rating del club debe estar entre 0.0 y 5.0'),
  image: z.string().nullish(),
  sports: z.nativeEnum(Sport).array(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
