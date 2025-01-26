/*
  Warnings:

  - You are about to drop the `BrandInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BrandInfo" DROP CONSTRAINT "BrandInfo_userId_fkey";

-- DropTable
DROP TABLE "BrandInfo";

-- CreateTable
CREATE TABLE "BrandDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrandDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrandDetails_userId_key" ON "BrandDetails"("userId");

-- CreateIndex
CREATE INDEX "BrandDetails_userId_idx" ON "BrandDetails"("userId");

-- AddForeignKey
ALTER TABLE "BrandDetails" ADD CONSTRAINT "BrandDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
