/*
  Warnings:

  - A unique constraint covering the columns `[sanphamId]` on the table `TonKho` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TonKho_sanphamId_key" ON "TonKho"("sanphamId");
