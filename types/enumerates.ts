import { TimeSlot, CourtState, Sport, Amenitie, ReservationState } from "@/prisma/generated/browser";

// Enum values and types
export const TimeSlotValues = Object.values(TimeSlot);
export type TimeSlotKey = keyof typeof TimeSlot;

export const CourtStateValues = Object.values(CourtState);
export type CourtStateKey = keyof typeof CourtState;

export const SportValues = Object.values(Sport);
export type SportKey = keyof typeof Sport;

export const AmenitieValues = Object.values(Amenitie);
export type AmenitieKey = keyof typeof Amenitie;

export const ReservationStateValues = Object.values(ReservationState);
export type ReservationStateKey = keyof typeof ReservationState;

