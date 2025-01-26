-- CreateTable
CREATE TABLE "BrandInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brandInformation" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrandInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrandInfo_userId_key" ON "BrandInfo"("userId");

-- CreateIndex
CREATE INDEX "BrandInfo_userId_idx" ON "BrandInfo"("userId");

-- AddForeignKey
ALTER TABLE "BrandInfo" ADD CONSTRAINT "BrandInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
