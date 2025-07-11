/*
  Warnings:

  - You are about to drop the column `status` on the `court` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "court" DROP COLUMN "status",
ADD COLUMN     "state" "CourtState" NOT NULL DEFAULT 'Activa';
