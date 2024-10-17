/*
  Warnings:

  - Added the required column `status` to the `Streak` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StreakStatus" AS ENUM ('ONGOING', 'BROKEN', 'COMPLETED');

-- AlterTable
ALTER TABLE "Streak" ADD COLUMN     "status" "StreakStatus" NOT NULL;
