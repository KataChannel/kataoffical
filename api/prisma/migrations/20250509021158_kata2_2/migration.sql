/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `UserguidBlock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeId]` on the table `UserguidStep` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserguidBlock" ADD COLUMN     "codeId" TEXT;

-- AlterTable
ALTER TABLE "UserguidStep" ADD COLUMN     "codeId" TEXT,
ADD COLUMN     "order" INTEGER DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "UserguidBlock_codeId_key" ON "UserguidBlock"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserguidStep_codeId_key" ON "UserguidStep"("codeId");
