/*
  Warnings:

  - You are about to drop the column `timeSlotId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the `time_slot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weather_report` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlot` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimeSlot" AS ENUM ('H0800', 'H0900', 'H1000', 'H1100', 'H1200', 'H1300', 'H1400', 'H1500', 'H1600', 'H1700', 'H1800', 'H1900', 'H2000', 'H2100');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Amenitie" ADD VALUE 'CespedSintetico';
ALTER TYPE "Amenitie" ADD VALUE 'Buffet';

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_timeSlotId_fkey";

-- DropForeignKey
ALTER TABLE "time_slot" DROP CONSTRAINT "time_slot_courtId_fkey";

-- AlterTable
ALTER TABLE "club" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "court" ADD COLUMN     "TimeSlot" "TimeSlot"[];

-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "timeSlotId",
ADD COLUMN     "timeSlot" "TimeSlot" NOT NULL;

-- DropTable
DROP TABLE "time_slot";

-- DropTable
DROP TABLE "weather_report";

-- DropEnum
DROP TYPE "WeatherState";
