/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeId` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "codeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Setting_codeId_key" ON "Setting"("codeId");
