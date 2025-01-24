/*
  Warnings:

  - You are about to drop the column `fileType` on the `GeneratedFile` table. All the data in the column will be lost.
  - The `fileUrl` column on the `GeneratedFile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GeneratedFile" DROP COLUMN "fileType",
DROP COLUMN "fileUrl",
ADD COLUMN     "fileUrl" TEXT[];
