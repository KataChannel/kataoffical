/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `AffiliateLink` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AffiliateLink" ADD COLUMN     "codeId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateLink_codeId_key" ON "AffiliateLink"("codeId");
