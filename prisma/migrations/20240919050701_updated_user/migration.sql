/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicSrc" TEXT,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
