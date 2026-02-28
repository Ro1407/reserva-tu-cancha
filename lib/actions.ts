"use server";

import { Court, Club, User, Role, TimeSlot, ReservationState } from "@/prisma/generated/client";
import { Reservation } from "@/types/reservation";
import { UserData, NewUser } from "@/types/user";
import { prisma } from "@/prisma/prismaClientSingleton";
import { ITEMS_PER_PAGE } from "@/lib/definitions";
import { CartItem } from "@/types/cart";
import { convertTimeToTHHMM } from "@/lib/utils";
import { TimeSlotKey } from "@/types/enumerates";
import bcrypt from "bcrypt";

//Returns a court by its ID
export async function getCourtById(id: string): Promise<Court | null> {
  const court = await prisma.court.findUnique({
    where: { id }
  });

  if (!court) return null;

  return court;
}

// Returns a club by its ID
export async function getClubById(id: string | null): Promise<Club | null> {
  if (id) {
    const club = await prisma.club.findUnique({
      where: { id }
    });

    if (!club) return null;

    return club;
  }
  return null;
}

// Returns a reservation by its ID
export async function getReservationById(id: string): Promise<Reservation | null> {
  const reservation = await prisma.reservation.findUnique({
    where: { id }
  });

  return reservation ? reservation : null;
}

// Returns a club's name by its ID
export async function getClubNameById(id: string): Promise<string | null> {
  const club = await prisma.club.findUnique({
    where: { id },
    select: { name: true }
  });

  return club ? club.name : null;
}

// Returns a club's location by one of it's courts id
export async function getClubLocationByCourtId(id: string): Promise<string | null> {
  const court = await prisma.court.findUnique({
    where: { id },
    select: { club: { select: { location: true } } }
  });

  return court ? court.club.location : null;
}

// Returns all clubs, allows query and pagination
export async function getAllClubs(currentPage: number): Promise<[Club[], number]> {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

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

  return [clubs, totalPages];
}

// Checks if a court item is still available for reservation
export async function isItemAvailable(item: CartItem): Promise<boolean> {
  const formattedTime: string = convertTimeToTHHMM(item.time.time);

  const reservation = await prisma.reservation.findFirst({
    where: {
      courtId: item.courtId,
      date: item.date,
      timeSlot: formattedTime as TimeSlot,
      state: ReservationState.Confirmada
    }
  });

  return !reservation;
}

// ACTIONS FOR THE FILTER COMPONENTS

// Returns the minimum price of all courts
export async function getMinCourtPrice(): Promise<number> {
  const minPrice = await prisma.court.aggregate({
    _min: {
      price: true
    }
  });

  return minPrice._min.price || 0;
}

//Returns the maximum price of all courts
export async function getMaxCourtPrice(): Promise<number> {
  const maxPrice = await prisma.court.aggregate({
    _max: {
      price: true
    }
  });

  return maxPrice._max.price || 0;
}

// Returns all the court's club locations
export async function getAllCourtLocations(): Promise<string[]> {
  const locations = await prisma.club.findMany({
    where: { courts: { some: {} } },
    select: { location: true },
    distinct: ["location"]
  });

  return locations.map((club) => club.location);
}

// Returns true if a user with that email exist
export async function existsUserByEmail(email: string): Promise<boolean> {
  try {
    return await prisma.user.findUnique({
      where: { email }
    }) !== null;
  } catch (_) {
    return false;
  }
}

//Returns a user by its email
export async function getUserByEmail(email: string | null): Promise<User | null> {
  try {
    return email? await prisma.user.findUnique({
      where: { email }
    }) : null;
  } catch (_) {
    return null;
  }
}


export async function registerUser(user: UserData): Promise<boolean> {
  if (user && user.password) user.password = bcrypt.hashSync(user.password, 10);
  // Validate the user data against the schema on the server's side
  const parsedUser = NewUser.safeParse(user);
  if (!parsedUser.success) {
    return false;
  }
  // Create the user in the database
  try {
    await prisma.user.create({
      data: {
        ...parsedUser.data,
        role: Role.USER
      }
    });
    return true;
  } catch (_) {
    return false;
  }
}

// Returns if there is a reservation for a court on a specific date and time
export async function existsReservation(courtId: string, date: string, timeSlot: TimeSlotKey): Promise<boolean> {
  const reservation = await prisma.reservation.findFirst({
    where: {
      courtId,
      date,
      timeSlot
    }
  });

  return reservation !== null;
}