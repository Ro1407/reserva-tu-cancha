import { PrismaClient } from "@prisma/client"
import {
    Club,
    Reservation,
    Court,
    User,
} from "@prisma/client"

import {
    clubs,
    courts,
    users,
    reservations,
} from "@/lib/data"

import { ClubDataSchema } from "@/types/club"
import { CourtDataSchema } from "@/types/court"
import { UserDataSchema } from "@/types/user"
import { ReservationDataSchema } from "@/types/reservation"


const prisma = new PrismaClient()

function validatePlaceholder(): boolean {
    let clubValidation

    clubs.forEach((club) => {
        clubValidation = ClubDataSchema.safeParse(club)
        if (!clubValidation.success) {
            console.error("Club data validation failed:", clubValidation.error)
            return false
        }
    })

    let courtValidation
    courts.forEach((court) => {
        courtValidation = CourtDataSchema.safeParse(court)
        if (!courtValidation.success) {
            console.error("Court data validation failed:", courtValidation.error)
            return false
        }
    })

    let usersValidation
    users.forEach((user) => {
        usersValidation = UserDataSchema.safeParse(user)
        if (!usersValidation.success) {
            console.error("User data validation failed:", usersValidation.error)
            return false
        }
    })

    let reservationValidation
    reservations.forEach((reservation) => {
        reservationValidation = ReservationDataSchema.safeParse(reservation)
        if (!reservationValidation.success) {
            console.error("Reservation data validation failed:", reservationValidation.error)
            return false
        }
    })

    console.log("Placeholder data validation successful")
    return true
}

async function clearExistingData() {
    console.log("Starting database seeding...")

    await prisma.reservation.deleteMany()
    await prisma.court.deleteMany()
    await prisma.club.deleteMany()
    await prisma.user.deleteMany()

    console.log("Cleaned existing data")
}

async function createUsers(): Promise<User[]> {
    const createdUsers = await prisma.user.createManyAndReturn({data: users})
    console.log("Created users")
    return createdUsers
}


async function createClubs(): Promise<Club[]> {
    const createdClubs = await prisma.club.createManyAndReturn({data: clubs})
    console.log("Created clubs")
    return createdClubs
}

async function createCourts(): Promise<Court[]> {
    const createdCourts = await prisma.court.createManyAndReturn({data: courts})
    console.log("Created courts")
    return createdCourts
}

async function createReservations(): Promise<Reservation[]> {
    const createdReservations = await prisma.reservation.createManyAndReturn({data: reservations})

    console.log("Created reservations")
    return createdReservations;
}

async function main() {

    const validationSuccess =  validatePlaceholder()
    if (!validationSuccess) { process.exit(1) }

    await clearExistingData()

    const users = await createUsers()
    const clubs = await createClubs()
    const courts = await createCourts()
    const reservations = await createReservations()

    console.log("Database seeding completed successfully!")
    console.log("\n Seeding Summary:")
    console.log(`   • ${clubs.length} clubs created`)
    console.log(`   • ${courts.length} courts created`)
    console.log(`   • ${users.length} users created`)
    console.log(`   • ${reservations.length} reservations created`)
}

main()
    .catch((e) => {
        console.error("Error during seeding:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
