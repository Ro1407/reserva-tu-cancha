import { Club } from "@/types/club";

export type ClubWithCourts = Club & {
  courts: string[];  // Array of court names associated with the club
};