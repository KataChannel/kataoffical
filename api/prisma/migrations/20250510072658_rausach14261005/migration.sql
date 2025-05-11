/*
  Warnings:

  - A unique constraint covering the columns `[maphieu]` on the table `PhieuKho` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PhieuKho_maphieu_key" ON "PhieuKho"("maphieu");
