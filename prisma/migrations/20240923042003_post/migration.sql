-- CreateTable
CREATE TABLE "Post" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "caption" TEXT,
    "files" TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_postId_key" ON "Post"("postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
