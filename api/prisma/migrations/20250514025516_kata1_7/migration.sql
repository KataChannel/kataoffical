/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "codeId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Resource_codeId_key" ON "Resource"("codeId");
