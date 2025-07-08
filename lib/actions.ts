"use server";

import { Court, Club } from "@prisma/client";
import { Reservation } from "@/types/reservation";
import { prisma } from "@/prisma/prismaClientSingleton";

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

// Returns all clubs
export async function getAllClubs(): Promise<Club[]> {
  return prisma.club.findMany();
}

// Returns all courts
export async function getAllCourts(): Promise<Court[]> {
  return prisma.court.findMany();
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







