"use server";

import { ClubData, EditableClubSchema } from "@/types/club";
import { prisma } from "@/prisma/prismaClientSingleton";
import { revalidatePath } from "next/cache";
import { CourtData, EditableCourtSchema } from "@/types/court";
import { EditableReservationSchema, ReservationData } from "@/types/reservation";

export async function createClub(club: ClubData): Promise<boolean>{
  // Validate the club data against the schema on the server's side
  const parsedClub = EditableClubSchema.safeParse(club);
  if (!parsedClub.success) {
    return false;
  }

  // Create the club in the database
  try {
    await prisma.club.create({
      data: {
        ...parsedClub.data,
        rating: 0,
        image: '', // Default image URL or path
      }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard/clubes');
    revalidatePath('/clubes');

    return true;

  } catch (error) {
    return false;
  }
}

export async function updateClub(club: ClubData, id:string): Promise<boolean> {
  // Validate the club data against the schema on the server's side
  const parsedClub = EditableClubSchema.safeParse(club);
  if (!parsedClub.success) {
    return false;
  }

  // Update the club in the database
  try {
    await prisma.club.update({
      where: { id: id },
      data: {
        ...parsedClub.data,
      }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard/clubes');
    revalidatePath('/clubes');

    return true;

  } catch (error) {
    return false;
  }
}

export async function deleteClub(id: string): Promise<boolean> {
  try {
    // Delete the club from the database
    await prisma.club.delete({
      where: { id }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard/clubes');
    revalidatePath('/clubes');

    return true;

  } catch (error) {
    console.error("Error deleting club:", error);
    return false;
  }
}

export async function deleteReservation(id: string): Promise<boolean> {
  try {
    // Delete the reservation from the database
    await prisma.reservation.delete({
      where: { id }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard/reservas');

    return true;

  } catch (error) {
    console.error("Error deleting reservation:", error);
    return false;
  }
}

export async function createCourt(court: CourtData): Promise<boolean>{
  // Validate the court data against the schema on the server's side
  const parsedCourt = EditableCourtSchema.safeParse(court);
  if (!parsedCourt.success) {
    return false;
  }

  parsedCourt.data.price = parsedCourt.data.price * 100; // Convert price to cents for database storage

  // Create the club in the database
  try {
    await prisma.court.create({
      data: {
        ...parsedCourt.data,
        rating: 0,
        image: '', // Default image URL or path
      }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard');
    revalidatePath('/canchas');

    return true;

  } catch (error) {
    return false;
  }
}


export async function updateCourt(court: CourtData, id:string): Promise<boolean> {
  // Validate the club data against the schema on the server's side
  const parsedCourt = EditableCourtSchema.safeParse(court);
  if (!parsedCourt.success) {
    return false;
  }

  // Update the club in the database
  try {
    await prisma.court.update({
      where: { id: id },
      data: {
        ...parsedCourt.data,
      }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard');
    revalidatePath('/canchas');
    revalidatePath(`/canchas/${id}`);

    return true;

  } catch (error) {
    return false;
  }
}

export async function deleteCourt(id: string): Promise<boolean> {
  try {
    // Delete the court from the database
    await prisma.court.delete({
      where: { id }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard');
    revalidatePath('/canchas');
    revalidatePath(`/canchas/${id}`);

    return true;

  } catch (error) {
    console.error("Error deleting reservation:", error);
    return false;
  }
}


export async function createReservation(reservation: ReservationData): Promise<boolean>{
  // Validate the reservation data against the schema on the server's side
  const parsedReservation = EditableReservationSchema.safeParse(reservation);
  if (!parsedReservation.success) {
    return false;
  }

  // Convert price to cents for database storage
  parsedReservation.data.price = parsedReservation.data.price * 100;

  // Create the reservation in the database
  try {
    await prisma.reservation.create({
      data: {
        ...parsedReservation.data,
        userId: parsedReservation.data.userId, // Assuming userId is part of the reservation data
      }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard/reservas');

    return true;

  } catch (error) {
    return false;
  }
}


// Updates an existing reservation
export async function updateReservation(reservation: ReservationData, id: string): Promise<boolean>{
  // Validate the reservation data against the schema on the server's side
  const parsedReservation = EditableReservationSchema.safeParse(reservation);
  if (!parsedReservation.success) {
    return false;
  }

  // Convert price to cents for database storage
  parsedReservation.data.price = parsedReservation.data.price * 100;

  // Update the reservation in the database
  try {
    await prisma.reservation.update({
      where: { id: id },
      data: {
        ...parsedReservation.data,
      }
    });

    //Clear client-side browser cache and trigger a new request to the server
    revalidatePath('/dashboard/reservas');

    return true;

  } catch (error) {
    return false;
  }
}



