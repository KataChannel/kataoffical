/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `ImportHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ImportHistory" ADD COLUMN     "codeId" TEXT,
ADD COLUMN     "order" INTEGER DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "ImportHistory_codeId_key" ON "ImportHistory"("codeId");
