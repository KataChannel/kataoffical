/*
  Warnings:

  - You are about to drop the `Giohang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Giohangsanpham` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Giohang" DROP CONSTRAINT "Giohang_dathangId_fkey";

-- DropForeignKey
ALTER TABLE "Giohang" DROP CONSTRAINT "Giohang_donhangId_fkey";

-- DropForeignKey
ALTER TABLE "Giohangsanpham" DROP CONSTRAINT "Giohangsanpham_giohangId_fkey";

-- DropForeignKey
ALTER TABLE "Giohangsanpham" DROP CONSTRAINT "Giohangsanpham_idSP_fkey";

-- DropTable
DROP TABLE "Giohang";

-- DropTable
DROP TABLE "Giohangsanpham";

-- CreateTable
CREATE TABLE "Donhangsanpham" (
    "id" TEXT NOT NULL,
    "idSP" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sldat" INTEGER NOT NULL,
    "slgiao" INTEGER NOT NULL,
    "slnhan" INTEGER NOT NULL,
    "ttdat" DOUBLE PRECISION NOT NULL,
    "ttgiao" DOUBLE PRECISION NOT NULL,
    "ttnhan" DOUBLE PRECISION NOT NULL,
    "donhangId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Donhangsanpham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dathangsanpham" (
    "id" TEXT NOT NULL,
    "idSP" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sldat" INTEGER NOT NULL,
    "slgiao" INTEGER NOT NULL,
    "slnhan" INTEGER NOT NULL,
    "ttdat" DOUBLE PRECISION NOT NULL,
    "ttgiao" DOUBLE PRECISION NOT NULL,
    "ttnhan" DOUBLE PRECISION NOT NULL,
    "dathangId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Dathangsanpham_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donhangsanpham" ADD CONSTRAINT "Donhangsanpham_idSP_fkey" FOREIGN KEY ("idSP") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donhangsanpham" ADD CONSTRAINT "Donhangsanpham_donhangId_fkey" FOREIGN KEY ("donhangId") REFERENCES "Donhang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dathangsanpham" ADD CONSTRAINT "Dathangsanpham_idSP_fkey" FOREIGN KEY ("idSP") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dathangsanpham" ADD CONSTRAINT "Dathangsanpham_dathangId_fkey" FOREIGN KEY ("dathangId") REFERENCES "Dathang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
