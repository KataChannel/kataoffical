/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `Dexuat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeId` to the `Dexuat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dexuat" ADD COLUMN     "codeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dexuat_codeId_key" ON "Dexuat"("codeId");
