"use server";

import { Court, Club } from "@prisma/client";
import { Reservation } from "@/types/reservation";
import { prisma } from "@/prisma/prismaClientSingleton";

//Returns a court by its ID
export const getCourtById: (id: string) => Promise<Court | null> = async (id: string): Promise<Court | null> => {
  const court = await prisma.court.findUnique({
    where: { id }
  });

  if (!court) return null;

  return court;
};

// Returns a club by its ID
export const getClubById: (id: string) => Promise<Club | null> = async (id: string): Promise<Club | null> => {
  const club = await prisma.club.findUnique({
    where: { id }
  });

  if (!club) return null;

  return club;
};

// Returns a club's name by its ID
export const getClubNameById: (id: string) => Promise<string | null> = async (id: string): Promise<string | null> => {
  const club = await prisma.club.findUnique({
    where: { id },
    select: { name: true }
  });

  return club ? club.name : null;
};

// Returns a club's location by its ID
export const getClubLocationById: (id: string) => Promise<string | null> = async (id: string): Promise<string | null> => {
  const club = await prisma.club.findUnique({
    where: { id },
    select: { location: true }
  });

  return club ? club.location : null;
};

// Returns all clubs
export const getAllClubs: () => Promise<Club[]> = async (): Promise<Club[]> => {
  return prisma.club.findMany();
};

// Returns all courts
export const getAllCourts: () => Promise<Court[]> = async (): Promise<Court[]> => {
  return prisma.court.findMany();
};

// Returns all the courts for a given club
export const getCourtsByClubId: (clubId: string) => Promise<Court[]> = async (clubId: string): Promise<Court[]> => {
  return prisma.court.findMany({
    where: { clubId }
  });
};

// Returns the number of available courts for a given club
export const getAvailableCourtsCount: (clubId: string) => Promise<number> = async (clubId: string): Promise<number> => {
  return prisma.court.count({
    where: {
      clubId,
      reservations: {
        none: {}
      }
    }
  });
};

// Returns all the reservations
export const getAllReservations: () => Promise<Reservation[]> = async (): Promise<Reservation[]> => {
  return prisma.reservation.findMany({
    include: {
      court: true,
      user: true
    }
  });
};







