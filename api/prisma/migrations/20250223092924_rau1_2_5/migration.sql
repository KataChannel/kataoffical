/*
  Warnings:

  - A unique constraint covering the columns `[makh]` on the table `Khachhang` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Khachhang_email_key";

-- AlterTable
ALTER TABLE "Khachhang" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Khachhang_makh_key" ON "Khachhang"("makh");
