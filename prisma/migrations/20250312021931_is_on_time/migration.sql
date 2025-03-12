/*
  Warnings:

  - Changed the type of `Litre` on the `Drank` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Drank" ADD COLUMN     "isOnTime" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "Litre",
ADD COLUMN     "Litre" INTEGER NOT NULL;
