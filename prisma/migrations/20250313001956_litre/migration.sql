/*
  Warnings:

  - You are about to drop the column `Litre` on the `Drank` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drank" DROP COLUMN "Litre",
ADD COLUMN     "litre" INTEGER NOT NULL DEFAULT 1;
