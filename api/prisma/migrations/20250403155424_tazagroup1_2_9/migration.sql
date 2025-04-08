/*
  Warnings:

  - You are about to drop the column `uniqueCode` on the `AffiliateLink` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AffiliateLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codeId]` on the table `AffiliateLink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeId]` on the table `LandingPage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeId` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codeId` to the `LandingPage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AffiliateLink" DROP CONSTRAINT "AffiliateLink_userId_fkey";

-- DropIndex
DROP INDEX "AffiliateLink_uniqueCode_key";

-- AlterTable
ALTER TABLE "AffiliateLink" DROP COLUMN "uniqueCode",
DROP COLUMN "userId",
ADD COLUMN     "codeId" TEXT NOT NULL,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LandingPage" ADD COLUMN     "codeId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateLink_codeId_key" ON "AffiliateLink"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_codeId_key" ON "LandingPage"("codeId");

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
