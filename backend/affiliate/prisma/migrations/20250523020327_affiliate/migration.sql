/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "codeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_codeId_key" ON "User"("codeId");
