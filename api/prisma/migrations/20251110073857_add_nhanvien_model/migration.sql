/*
  Warnings:

  - You are about to drop the column `nhanvienchiahang` on the `Donhang` table. All the data in the column will be lost.
  - You are about to drop the column `shipper` on the `Donhang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Donhang" DROP COLUMN "nhanvienchiahang",
DROP COLUMN "shipper",
ADD COLUMN     "nhanvienchiahangId" TEXT,
ADD COLUMN     "shipperId" TEXT;

-- CreateTable
CREATE TABLE "public"."Nhanvien" (
    "id" TEXT NOT NULL,
    "manv" TEXT NOT NULL,
    "tennv" TEXT NOT NULL,
    "sdtnv" TEXT,
    "ngaysinhnv" TIMESTAMP(3),
    "emailnv" TEXT,
    "diachinv" TEXT,
    "hinhccnv" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nhanvien_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nhanvien_manv_key" ON "public"."Nhanvien"("manv");

-- CreateIndex
CREATE INDEX "Nhanvien_manv_idx" ON "public"."Nhanvien"("manv");

-- CreateIndex
CREATE INDEX "Nhanvien_tennv_idx" ON "public"."Nhanvien"("tennv");

-- CreateIndex
CREATE INDEX "Donhang_nhanvienchiahangId_idx" ON "public"."Donhang"("nhanvienchiahangId");

-- CreateIndex
CREATE INDEX "Donhang_shipperId_idx" ON "public"."Donhang"("shipperId");

-- AddForeignKey
ALTER TABLE "public"."Donhang" ADD CONSTRAINT "Donhang_nhanvienchiahangId_fkey" FOREIGN KEY ("nhanvienchiahangId") REFERENCES "public"."Nhanvien"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donhang" ADD CONSTRAINT "Donhang_shipperId_fkey" FOREIGN KEY ("shipperId") REFERENCES "public"."Nhanvien"("id") ON DELETE SET NULL ON UPDATE CASCADE;
