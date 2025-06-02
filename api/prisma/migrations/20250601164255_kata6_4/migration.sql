/*
  Warnings:

  - You are about to drop the column `giaban` on the `banggia` table. All the data in the column will be lost.
  - You are about to drop the column `khachhangId` on the `banggia` table. All the data in the column will be lost.
  - You are about to drop the column `sanphamId` on the `banggia` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "banggia" DROP CONSTRAINT "banggia_khachhangId_fkey";

-- DropForeignKey
ALTER TABLE "banggia" DROP CONSTRAINT "banggia_sanphamId_fkey";

-- AlterTable
ALTER TABLE "banggia" DROP COLUMN "giaban",
DROP COLUMN "khachhangId",
DROP COLUMN "sanphamId";

-- CreateTable
CREATE TABLE "BangGiaSanPham" (
    "id" TEXT NOT NULL,
    "banggiaId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "giaban" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BangGiaSanPham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BangGiaKhachHang" (
    "id" TEXT NOT NULL,
    "banggiaId" TEXT NOT NULL,
    "khachhangId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BangGiaKhachHang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BangGiaSanPham_banggiaId_sanphamId_key" ON "BangGiaSanPham"("banggiaId", "sanphamId");

-- CreateIndex
CREATE UNIQUE INDEX "BangGiaKhachHang_banggiaId_khachhangId_key" ON "BangGiaKhachHang"("banggiaId", "khachhangId");

-- AddForeignKey
ALTER TABLE "BangGiaSanPham" ADD CONSTRAINT "BangGiaSanPham_banggiaId_fkey" FOREIGN KEY ("banggiaId") REFERENCES "banggia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BangGiaSanPham" ADD CONSTRAINT "BangGiaSanPham_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "sanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BangGiaKhachHang" ADD CONSTRAINT "BangGiaKhachHang_banggiaId_fkey" FOREIGN KEY ("banggiaId") REFERENCES "banggia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BangGiaKhachHang" ADD CONSTRAINT "BangGiaKhachHang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
