/* NOTE: This is a server-side action file used by client components to interact with the database. Is separated from the actions.ts
* because it returns types used by the frontend rather than the one's defined for the backend */
"use server";

import { TimeSlot } from "@/types/time-slot";
import { ClubWithCourts } from "@/types/club-with-courts";
import { TimeSlotValues } from "@/types/enumerates";
import { ClubNameId } from "@/types/club-name-id";
import { CourtNameId } from "@/types/court-name-id";
import { UsersEmailId } from "@/types/users-email-id";
import { formatDateToISO } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClientSingleton";

//Returns all the time slots for a given date and court
export const getTimeSlots: (date: Date, courtId:string) => Promise<TimeSlot[]> =
  async (date: Date, courtId:string): Promise<TimeSlot[]> => {
  const isoDate = formatDateToISO(date);
  const dateReservations = await prisma.reservation.findMany({
    where: {
      date: isoDate,
      courtId: courtId
    }
  });

  const unavailableTimeSlots = dateReservations.map((reservation) => ({
    time: reservation.timeSlot,
    available: false
  }));

  return TimeSlotValues.map((timeSlot) => ({
      time: timeSlot,
      available: !unavailableTimeSlots.some(slot => slot.time === timeSlot)
    }
  ));
};

// Returns all the clubs with their associated court's names
export const getAllClubsWithCourts: () => Promise<ClubWithCourts[]> = async (): Promise<ClubWithCourts[]> => {
  const clubs = await prisma.club.findMany(
    {
      include: {
        courts: {
          select: {
            name: true
          }
        }
      }
    }
  );

  return clubs.map((club) => ({
    ...club,
    courts: club.courts.map((court) => court.name) // Extract court names
  }));
};

// Returns all clubs names and IDs
export const getAllClubsNamesAndIds: () => Promise<ClubNameId[]> = async (): Promise<ClubNameId[]> => {
  return prisma.club.findMany({
    select: {
      id: true,
      name: true
    }
  });
}

// Returns all courts names and IDs
export const getAllCourtsNamesAndIds: () => Promise<CourtNameId[]> = async (): Promise<CourtNameId[]> => {
  return prisma.court.findMany({
    select: {
      id: true,
      name: true
    }
  });
};

// Returns all users emails and IDs
export const getAllUsersEmailsAndIds: () => Promise<UsersEmailId[]> = async (): Promise<UsersEmailId[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true
    }
  });
};