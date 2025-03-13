-- CreateTable
CREATE TABLE "Raw" (
    "userId" INTEGER NOT NULL,
    "raw" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Raw_userId_key" ON "Raw"("userId");

-- AddForeignKey
ALTER TABLE "Raw" ADD CONSTRAINT "Raw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
