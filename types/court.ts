import { z } from "zod"
import {CourtSchema} from "@/prisma/zod"
import { Amenitie, CourtState, Sport, TimeSlot } from "@prisma/client";

const CourtValidatingEnums = CourtSchema.omit({}).extend({
  sport: z.nativeEnum(Sport).refine((value) => value !== undefined, {
    message: "Por favor, seleccione un deporte válido para la cancha",
  }),
  amenities: z.array(z.nativeEnum(Amenitie)).min(1, {
    message: "Por favor, seleccione al menos un servicio para la cancha",
  }),
  state: z.nativeEnum(CourtState).refine((value) => value !== undefined, {
    message: "Por favor, seleccione un estado válido para la cancha",
  }),
  timeSlots: z.array(z.nativeEnum(TimeSlot)).min(1, {
    message: "Por favor, seleccione al menos un horario para la cancha",
  }),
})

export type Court =  z.infer<typeof CourtValidatingEnums>

export const CourtDataSchema = CourtSchema.omit({id: true, createdAt: true, updatedAt: true})
const EditableCourtSchema = CourtDataSchema.omit({rating: true, image: true})
export type CourtData = z.infer<typeof EditableCourtSchema>

const CourtNameIdSchema = CourtSchema.pick({id: true, name: true})
export type CourtNameId = z.infer<typeof CourtNameIdSchema>

export type CourtCardData = Court & {clubLocation: string, clubName:string}