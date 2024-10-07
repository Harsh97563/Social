/*
  Warnings:

  - You are about to drop the column `activeStreak` on the `Streak` table. All the data in the column will be lost.
  - Added the required column `type` to the `Streak` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StreakTypes" AS ENUM ('DAYS10', 'DAYS30', 'DAYS60', 'DAYS100');

-- DropForeignKey
ALTER TABLE "Streak" DROP CONSTRAINT "Streak_userId_fkey";

-- AlterTable
ALTER TABLE "Streak" DROP COLUMN "activeStreak",
ADD COLUMN     "streakCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" "StreakTypes" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeSteakId" TEXT;
