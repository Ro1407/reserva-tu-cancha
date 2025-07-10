import { z } from "zod";
import { ClubSchema } from "@/prisma/zod"
import { Sport } from "@prisma/client";

const ClubValidatingEnums = ClubSchema.omit({ sports: true }).extend({
  sports: z.array(z.nativeEnum(Sport)).min(1, {
    message: "Por favor, seleccione al menos un deporte para el club",
  }),
});

export type Club = z.infer<typeof ClubValidatingEnums>

export const ClubDataSchema = ClubValidatingEnums.omit({id: true, createdAt: true, updatedAt: true})
export const EditableClubSchema = ClubDataSchema.omit({rating: true, image: true})
export type ClubData = z.infer<typeof EditableClubSchema>


const ClubNameIdSchema = ClubSchema.pick({id: true, name: true})
export type ClubNameId = z.infer<typeof ClubNameIdSchema>

export type ClubWithCourts = Club & {
  courts: string[];  // Array of court names associated with the club
};

export type ClubCardData = Club & {availableCourtsCount: number};




