/* NOTE: This is a server-side action file used by client components to interact with the database. Is separated from the actions.ts
* because it returns types used by the frontend rather than the one's defined for the backend */
"use server";

import { TimeSlot } from "@/types/time-slot";
import { ClubWithCourts, ClubCardData } from "@/types/club";
import { TimeSlotValues } from "@/types/enumerates";
import { ClubNameId } from "@/types/club";
import { CourtNameId, CourtCardData } from "@/types/court";
import { UsersEmailId } from "@/types/users-email-id";
import { formatDateToISO } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClientSingleton";
import { ReservationCardData } from "@/types/reservation";

//Returns all the time slots for a given date and court
export async function getTimeSlots(date: Date, courtId: string): Promise<TimeSlot[]> {
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
}

// Returns all the clubs with their associated court's names
export async function getAllClubsWithCourts(): Promise<ClubWithCourts[]> {
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
}

// Returns all clubs names and IDs
export async function getAllClubsNamesAndIds(): Promise<ClubNameId[]> {
  return prisma.club.findMany({
    select: {
      id: true,
      name: true
    }
  });
}

// Returns all courts names and IDs
export async function getAllCourtsNamesAndIds(): Promise<CourtNameId[]> {
  return prisma.court.findMany({
    select: {
      id: true,
      name: true
    }
  });
}

// Returns all users emails and IDs
export async function getAllUsersEmailsAndIds(): Promise<UsersEmailId[]> {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true
    }
  });
}

//Returns all the clubs's data to populate a card
export async function getAllClubsCardData(): Promise<ClubCardData[]> {
  const clubs = await prisma.club.findMany({
    include: {
      courts: {
        where: {
          reservations: {
            none: {}
          }
        },
        select: { id: true }
      }
    }
  });

  return clubs.map((data) => (
    {
      id: data.id,
      name: data.name,
      location: data.location,
      address: data.address,
      description: data.description,
      phone: data.phone,
      sports: data.sports,
      image: data.image,
      rating: data.rating,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      availableCourtsCount: data.courts.length
    }));
}

//Returns all the court's data to populate a card
export async function getAllCourtsCardData(): Promise<CourtCardData[]> {
  const courts = await prisma.court.findMany({
    include: {
      club: {
        select: {
          location: true,
          name: true
        }
      }
    }
  });

  return courts.map((court) => ({
    id: court.id,
    name: court.name,
    address: court.address,
    clubId: court.clubId,
    sport: court.sport,
    description: court.description,
    price: court.price,
    amenities: court.amenities,
    state: court.state,
    timeSlots: court.timeSlots,
    image: court.image,
    rating: court.rating,
    createdAt: court.createdAt,
    updatedAt: court.updatedAt,
    clubLocation: court.club.location,
    clubName: court.club.name
  }));
}

// Returns all reservation's data to populate a card
export async function getAllReservationsCardData(): Promise<ReservationCardData[]> {
  const reservations = await prisma.reservation.findMany({
    include: {
      court: {
        select: {
          name: true,
          image: true,
          sport: true,
          rating: true,
          address: true,
          club: {
            select: {
              location: true
            }
          }
        }
      },
      user: {
        select: {
          email: true // Incluye el email del usuario
        }
      }
    }
  });

  return reservations.map((reservation) => ({
    id: reservation.id,
    date: reservation.date,
    timeSlot: reservation.timeSlot,
    state: reservation.state,
    courtId: reservation.courtId,
    userId: reservation.userId,
    userEmail: reservation.user.email,
    price: reservation.price,
    createdAt: reservation.createdAt,
    updatedAt: reservation.updatedAt,
    courtImage: reservation.court.image,
    courtName: reservation.court.name,
    courtSport: reservation.court.sport,
    courtRating: reservation.court.rating,
    courtAddress: reservation.court.address,
    clubLocation: reservation.court.club.location
  }));
}