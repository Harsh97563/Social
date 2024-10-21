/*
  Warnings:

  - You are about to drop the column `twitterId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "twitterId",
ADD COLUMN     "twitterAccessSecret" TEXT;
