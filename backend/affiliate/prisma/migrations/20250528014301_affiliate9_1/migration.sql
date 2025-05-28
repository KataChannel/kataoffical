/*
  Warnings:

  - A unique constraint covering the columns `[codeId]` on the table `DoanhThu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeId]` on the table `KhachHang` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DoanhThu" ADD COLUMN     "codeId" TEXT,
ADD COLUMN     "order" INTEGER DEFAULT 1;

-- AlterTable
ALTER TABLE "KhachHang" ADD COLUMN     "codeId" TEXT,
ADD COLUMN     "order" INTEGER DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "DoanhThu_codeId_key" ON "DoanhThu"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "KhachHang_codeId_key" ON "KhachHang"("codeId");
