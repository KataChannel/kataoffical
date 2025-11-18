/*
  Warnings:

  - You are about to drop the column `nhanvienchiahangId` on the `Donhang` table. All the data in the column will be lost.
  - You are about to drop the column `shipperId` on the `Donhang` table. All the data in the column will be lost.
  - You are about to drop the column `diachinv` on the `Nhanvien` table. All the data in the column will be lost.
  - You are about to drop the column `emailnv` on the `Nhanvien` table. All the data in the column will be lost.
  - You are about to drop the column `hinhccnv` on the `Nhanvien` table. All the data in the column will be lost.
  - You are about to drop the column `manv` on the `Nhanvien` table. All the data in the column will be lost.
  - You are about to drop the column `ngaysinhnv` on the `Nhanvien` table. All the data in the column will be lost.
  - You are about to drop the column `sdtnv` on the `Nhanvien` table. All the data in the column will be lost.
  - You are about to drop the column `tennv` on the `Nhanvien` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[maNV]` on the table `Nhanvien` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Nhanvien` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cmnd]` on the table `Nhanvien` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Nhanvien` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hoTen` to the `Nhanvien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maNV` to the `Nhanvien` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."LoaiPhongban" AS ENUM ('PHONGBAN', 'BOPHAN', 'PHONG', 'BAN', 'TO', 'NHOM', 'KHAC');

-- CreateEnum
CREATE TYPE "public"."GioiTinh" AS ENUM ('NAM', 'NU', 'KHAC');

-- CreateEnum
CREATE TYPE "public"."TrangThaiNhanvien" AS ENUM ('DANGLAMVIEC', 'NGHIPHEP', 'THUVIEC', 'DANGHIVIEC', 'TAMNGHI', 'KHAC');

-- DropForeignKey
ALTER TABLE "public"."Donhang" DROP CONSTRAINT "Donhang_nhanvienchiahangId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Donhang" DROP CONSTRAINT "Donhang_shipperId_fkey";

-- DropIndex
DROP INDEX "public"."Donhang_nhanvienchiahangId_idx";

-- DropIndex
DROP INDEX "public"."Donhang_shipperId_idx";

-- DropIndex
DROP INDEX "public"."Nhanvien_manv_idx";

-- DropIndex
DROP INDEX "public"."Nhanvien_manv_key";

-- DropIndex
DROP INDEX "public"."Nhanvien_tennv_idx";

-- AlterTable
ALTER TABLE "public"."Donhang" DROP COLUMN "nhanvienchiahangId",
DROP COLUMN "shipperId",
ADD COLUMN     "nhanvienchiahang" TEXT,
ADD COLUMN     "shipper" TEXT;

-- AlterTable
ALTER TABLE "public"."Nhanvien" DROP COLUMN "diachinv",
DROP COLUMN "emailnv",
DROP COLUMN "hinhccnv",
DROP COLUMN "manv",
DROP COLUMN "ngaysinhnv",
DROP COLUMN "sdtnv",
DROP COLUMN "tennv",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "chiNhanh" TEXT,
ADD COLUMN     "chucVu" TEXT,
ADD COLUMN     "cmnd" TEXT,
ADD COLUMN     "diaChiHienTai" TEXT,
ADD COLUMN     "diaChiTamTru" TEXT,
ADD COLUMN     "diaChiThuongTru" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "ghiChu" TEXT,
ADD COLUMN     "gioiTinh" "public"."GioiTinh" DEFAULT 'KHAC',
ADD COLUMN     "heSoLuong" DECIMAL(10,2) DEFAULT 1,
ADD COLUMN     "hoTen" TEXT NOT NULL,
ADD COLUMN     "hoTenDem" TEXT,
ADD COLUMN     "loaiHopDong" TEXT,
ADD COLUMN     "luongCoBan" DECIMAL(20,3) DEFAULT 0,
ADD COLUMN     "maNV" TEXT NOT NULL,
ADD COLUMN     "nganHang" TEXT,
ADD COLUMN     "ngayCapCmnd" TIMESTAMP(3),
ADD COLUMN     "ngayNghiViec" TIMESTAMP(3),
ADD COLUMN     "ngaySinh" TIMESTAMP(3),
ADD COLUMN     "ngayVaoLam" TIMESTAMP(3),
ADD COLUMN     "nguoiLienHeKhanCap" TEXT,
ADD COLUMN     "noiCapCmnd" TEXT,
ADD COLUMN     "order" INTEGER DEFAULT 1,
ADD COLUMN     "phongbanId" TEXT,
ADD COLUMN     "phuCap" DECIMAL(20,3) DEFAULT 0,
ADD COLUMN     "quanHeKhanCap" TEXT,
ADD COLUMN     "sdtKhanCap" TEXT,
ADD COLUMN     "soDienThoai" TEXT,
ADD COLUMN     "soTaiKhoan" TEXT,
ADD COLUMN     "ten" TEXT,
ADD COLUMN     "trangThai" "public"."TrangThaiNhanvien" NOT NULL DEFAULT 'DANGLAMVIEC',
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "viTri" TEXT;

-- CreateTable
CREATE TABLE "public"."Phongban" (
    "id" TEXT NOT NULL,
    "ma" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "loai" "public"."LoaiPhongban" NOT NULL DEFAULT 'PHONGBAN',
    "level" INTEGER NOT NULL DEFAULT 1,
    "moTa" TEXT,
    "dienThoai" TEXT,
    "email" TEXT,
    "diaChi" TEXT,
    "truongPhongId" TEXT,
    "parentId" TEXT,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phongban_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phongban_ma_key" ON "public"."Phongban"("ma");

-- CreateIndex
CREATE INDEX "Phongban_ma_idx" ON "public"."Phongban"("ma");

-- CreateIndex
CREATE INDEX "Phongban_parentId_idx" ON "public"."Phongban"("parentId");

-- CreateIndex
CREATE INDEX "Phongban_level_idx" ON "public"."Phongban"("level");

-- CreateIndex
CREATE INDEX "Phongban_truongPhongId_idx" ON "public"."Phongban"("truongPhongId");

-- CreateIndex
CREATE UNIQUE INDEX "Nhanvien_maNV_key" ON "public"."Nhanvien"("maNV");

-- CreateIndex
CREATE UNIQUE INDEX "Nhanvien_email_key" ON "public"."Nhanvien"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Nhanvien_cmnd_key" ON "public"."Nhanvien"("cmnd");

-- CreateIndex
CREATE UNIQUE INDEX "Nhanvien_userId_key" ON "public"."Nhanvien"("userId");

-- CreateIndex
CREATE INDEX "Nhanvien_maNV_idx" ON "public"."Nhanvien"("maNV");

-- CreateIndex
CREATE INDEX "Nhanvien_hoTen_idx" ON "public"."Nhanvien"("hoTen");

-- CreateIndex
CREATE INDEX "Nhanvien_phongbanId_idx" ON "public"."Nhanvien"("phongbanId");

-- CreateIndex
CREATE INDEX "Nhanvien_userId_idx" ON "public"."Nhanvien"("userId");

-- CreateIndex
CREATE INDEX "Nhanvien_email_idx" ON "public"."Nhanvien"("email");

-- CreateIndex
CREATE INDEX "Nhanvien_trangThai_idx" ON "public"."Nhanvien"("trangThai");

-- AddForeignKey
ALTER TABLE "public"."Phongban" ADD CONSTRAINT "Phongban_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Phongban"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Phongban" ADD CONSTRAINT "Phongban_truongPhongId_fkey" FOREIGN KEY ("truongPhongId") REFERENCES "public"."Nhanvien"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Nhanvien" ADD CONSTRAINT "Nhanvien_phongbanId_fkey" FOREIGN KEY ("phongbanId") REFERENCES "public"."Phongban"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Nhanvien" ADD CONSTRAINT "Nhanvien_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
