/*
  Warnings:

  - You are about to drop the column `litre` on the `Drank` table. All the data in the column will be lost.
  - You are about to drop the `Raw` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Litre` to the `Drank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Raw" DROP CONSTRAINT "Raw_userId_fkey";

-- AlterTable
ALTER TABLE "Drank" DROP COLUMN "litre",
ADD COLUMN     "Litre" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Raw";
