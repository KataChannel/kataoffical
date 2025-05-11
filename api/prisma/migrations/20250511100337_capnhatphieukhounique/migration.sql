/*
  Warnings:

  - A unique constraint covering the columns `[phieuKhoId,sanphamId]` on the table `PhieuKhoSanpham` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PhieuKhoSanpham_phieuKhoId_sanphamId_key" ON "PhieuKhoSanpham"("phieuKhoId", "sanphamId");
