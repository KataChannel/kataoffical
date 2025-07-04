/*
  Warnings:

  - You are about to drop the column `khoahoc` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "khoahoc";

-- CreateTable
CREATE TABLE "lichhen" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lichhen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "khoahoc" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "khoahoc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lichhen_codeId_key" ON "lichhen"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "khoahoc_codeId_key" ON "khoahoc"("codeId");

-- AddForeignKey
ALTER TABLE "lichhen" ADD CONSTRAINT "lichhen_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khoahoc" ADD CONSTRAINT "khoahoc_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
