/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `Chotkho` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chotkho" ADD COLUMN     "codeId" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Chotkho_codeId_key" ON "Chotkho"("codeId");
