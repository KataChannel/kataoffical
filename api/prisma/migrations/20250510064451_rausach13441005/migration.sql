/*
  Warnings:

  - You are about to drop the column `sldat` on the `PhieuKhoSanpham` table. All the data in the column will be lost.
  - You are about to drop the column `slhuy` on the `PhieuKhoSanpham` table. All the data in the column will be lost.
  - You are about to drop the column `sltra` on the `PhieuKhoSanpham` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PhieuKhoSanpham" DROP COLUMN "sldat",
DROP COLUMN "slhuy",
DROP COLUMN "sltra";

-- CreateTable
CREATE TABLE "TonKho" (
    "id" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "slton" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slchogiao" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slchonhap" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "TonKho_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TonKho" ADD CONSTRAINT "TonKho_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
