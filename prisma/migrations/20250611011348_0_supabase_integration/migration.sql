-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('Futbol', 'Tennis', 'Paddle', 'Basketball', 'Volleyball', 'Hockey');

-- CreateEnum
CREATE TYPE "CourtState" AS ENUM ('Activa', 'Inactiva');

-- CreateEnum
CREATE TYPE "Amenitie" AS ENUM ('Indoor', 'Outdoor', 'Iluminacion', 'Vestuarios', 'Estacionamiento', 'AireAcondicionado', 'Calefaccion');

-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('Confirmada', 'Pendiente', 'Cancelada', 'Mantenimiento');

-- CreateEnum
CREATE TYPE "WeatherState" AS ENUM ('Soleado', 'Nublado', 'Lluvioso', 'Tormentoso', 'Ventoso');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "sports" "Sport"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "court" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "sport" "Sport" NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL,
    "amenities" "Amenitie" NOT NULL,
    "image" TEXT,
    "status" "CourtState" NOT NULL DEFAULT 'Activa',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "court_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "state" "ReservationState" NOT NULL DEFAULT 'Pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courtId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timeSlotId" TEXT NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_slot" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courtId" TEXT NOT NULL,

    CONSTRAINT "time_slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weather_report" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "state" "WeatherState" NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "rain" DOUBLE PRECISION NOT NULL,
    "wind" DOUBLE PRECISION NOT NULL,
    "clouds" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weather_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "club_name_key" ON "club"("name");

-- CreateIndex
CREATE UNIQUE INDEX "court_clubId_name_key" ON "court"("clubId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "time_slot_courtId_date_time_key" ON "time_slot"("courtId", "date", "time");

-- CreateIndex
CREATE UNIQUE INDEX "weather_report_date_key" ON "weather_report"("date");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "court" ADD CONSTRAINT "court_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "court"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_slot" ADD CONSTRAINT "time_slot_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "court"("id") ON DELETE CASCADE ON UPDATE CASCADE;
