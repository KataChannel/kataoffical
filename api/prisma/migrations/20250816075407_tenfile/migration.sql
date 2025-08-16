/*
  Warnings:

  - You are about to alter the column `giaban` on the `Banggiasanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,3)`.
  - You are about to alter the column `slthucte` on the `Chotkho` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slhethong` on the `Chotkho` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `chenhlech` on the `Chotkho` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `sldat` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slgiao` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slnhan` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slhuy` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `ttdat` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `ttgiao` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `ttnhan` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `gianhap` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `tongtien` on the `Donhang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `tongvat` on the `Donhang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `vat` on the `Donhang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `sldat` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slgiao` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slnhan` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slhuy` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `ttdat` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `ttgiao` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `ttnhan` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `giaban` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `ttsauvat` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `vat` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `soluong` on the `PhieuKhoSanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `giagoc` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,3)`.
  - You are about to alter the column `loadpoint` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,3)`.
  - You are about to alter the column `soluong` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `soluongkho` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `haohut` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,3)`.
  - You are about to alter the column `giaban` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,3)`.
  - You are about to alter the column `vat` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `soluong` on the `SanphamKho` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slton` on the `TonKho` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slchogiao` on the `TonKho` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.
  - You are about to alter the column `slchonhap` on the `TonKho` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,3)`.

*/
-- AlterTable
ALTER TABLE "public"."Banggiasanpham" ALTER COLUMN "giaban" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."Chotkho" ALTER COLUMN "slthucte" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slhethong" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "chenhlech" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."Dathangsanpham" ALTER COLUMN "sldat" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slgiao" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slnhan" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slhuy" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "ttdat" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "ttgiao" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "ttnhan" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "gianhap" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."Donhang" ALTER COLUMN "tongtien" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "tongvat" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "vat" SET DEFAULT 0.5,
ALTER COLUMN "vat" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."Donhangsanpham" ALTER COLUMN "sldat" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slgiao" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slnhan" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slhuy" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "ttdat" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "ttgiao" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "ttnhan" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "giaban" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "ttsauvat" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "vat" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."PhieuKhoSanpham" ALTER COLUMN "soluong" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."Sanpham" ALTER COLUMN "giagoc" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "loadpoint" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "soluong" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "soluongkho" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "haohut" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "giaban" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "vat" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."SanphamKho" ALTER COLUMN "soluong" SET DATA TYPE DECIMAL(20,3);

-- AlterTable
ALTER TABLE "public"."TonKho" ALTER COLUMN "slton" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slchogiao" SET DATA TYPE DECIMAL(20,3),
ALTER COLUMN "slchonhap" SET DATA TYPE DECIMAL(20,3);
