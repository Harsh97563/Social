-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "streakId" TEXT;

-- CreateTable
CREATE TABLE "Streak" (
    "streakId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "activeStreak" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("streakId")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "Streak"("streakId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
