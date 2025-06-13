/*
  Warnings:

  - Changed the column `amenities` on the `court` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "court" ALTER COLUMN "amenities" SET DATA TYPE "Amenitie"[] USING ARRAY["amenities"]::"Amenitie"[];
