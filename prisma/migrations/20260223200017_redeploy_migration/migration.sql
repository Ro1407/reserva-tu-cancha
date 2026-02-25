/*
  Warnings:

  - You are about to drop the column `TimeSlot` on the `court` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "court" DROP COLUMN "TimeSlot",
ADD COLUMN     "timeSlots" "TimeSlot"[];

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdAt",
DROP COLUMN "externalId",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "push_subscription" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "expirationTime" DOUBLE PRECISION,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,

    CONSTRAINT "push_subscription_pkey" PRIMARY KEY ("id")
);
