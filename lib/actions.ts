"use server";

import { Court, Club } from "@prisma/client";
import { Reservation } from "@/types/reservation";
import { prisma } from "@/prisma/prismaClientSingleton";
import { ITEMS_PER_PAGE } from "@/lib/definitions";

interface PaginationAndQueryProps {
  query?: string;
  currentPage?: number;
}

//Returns a court by its ID
export async function getCourtById(id: string): Promise<Court | null> {
  const court = await prisma.court.findUnique({
    where: { id }
  });

  if (!court) return null;

  return court;
}

// Returns a club by its ID
export async function getClubById(id: string): Promise<Club | null> {
  const club = await prisma.club.findUnique({
    where: { id }
  });

  if (!club) return null;

  return club;
}

// Returns a reservation by its ID
export async function getReservationById(id: string): Promise<Reservation | null> {
  const reservation = await prisma.reservation.findUnique({
    where: { id },
  });

  return reservation? reservation : null;
}

// Returns a club's name by its ID
export async function getClubNameById(id: string): Promise<string | null> {
  const club = await prisma.club.findUnique({
    where: { id },
    select: { name: true }
  });

  return club ? club.name : null;
}

// Returns a club's location by its ID
export async function getClubLocationById(id: string) : Promise<string | null> {
  const club = await prisma.club.findUnique({
    where: { id },
    select: { location: true }
  });

  return club ? club.location : null;
}

// Returns all clubs, allows query and pagination
export async function getAllClubs(currentPage: number): Promise<[Club[], number]> {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const [clubs, totalClubs] = await Promise.all([
    prisma.club.findMany(
    {
      skip: skip,
      take: ITEMS_PER_PAGE
    }
  ),
    prisma.club.count()
  ]);

  const totalPages = Math.ceil(totalClubs / ITEMS_PER_PAGE);

  return [clubs, totalPages]
}

// Returns all courts, allows query and pagination
export async function getAllCourts(currentPage: number): Promise<[Court[], number]> {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE
  const [courts, totalCourts] = await Promise.all([
    prisma.court.findMany(
    {
      skip: skip,
      take: ITEMS_PER_PAGE
    }
  ),
    prisma.court.count()
  ]);

  const totalPages = Math.ceil(totalCourts / ITEMS_PER_PAGE);

  return [courts, totalPages]
}

// Returns all the courts for a given club
export async function getCourtsByClubId(clubId: string): Promise<Court[]> {
  return prisma.court.findMany({
    where: { clubId }
  });
}

// Returns all the reservations
export async function getAllReservations(): Promise<Reservation[]> {
  return prisma.reservation.findMany({
    include: {
      court: true,
      user: true
    }
  });
}






