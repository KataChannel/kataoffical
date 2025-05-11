/*
  Warnings:

  - You are about to alter the column `sldat` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slgiao` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slnhan` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `ttdat` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `ttgiao` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `ttnhan` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slhuy` on the `Dathangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `sldat` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slgiao` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slnhan` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `ttdat` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `ttgiao` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `ttnhan` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slhuy` on the `Donhangsanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `soluong` on the `SanphamKho` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slton` on the `TonKho` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slchogiao` on the `TonKho` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `slchonhap` on the `TonKho` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - Made the column `sldat` on table `Dathangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slgiao` on table `Dathangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slnhan` on table `Dathangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ttdat` on table `Dathangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ttgiao` on table `Dathangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ttnhan` on table `Dathangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slhuy` on table `Dathangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sldat` on table `Donhangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slgiao` on table `Donhangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slnhan` on table `Donhangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ttdat` on table `Donhangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ttgiao` on table `Donhangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ttnhan` on table `Donhangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slhuy` on table `Donhangsanpham` required. This step will fail if there are existing NULL values in that column.
  - Made the column `soluong` on table `PhieuKhoSanpham` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dathangsanpham" ALTER COLUMN "sldat" SET NOT NULL,
ALTER COLUMN "sldat" SET DEFAULT 0,
ALTER COLUMN "sldat" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slgiao" SET NOT NULL,
ALTER COLUMN "slgiao" SET DEFAULT 0,
ALTER COLUMN "slgiao" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slnhan" SET NOT NULL,
ALTER COLUMN "slnhan" SET DEFAULT 0,
ALTER COLUMN "slnhan" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "ttdat" SET NOT NULL,
ALTER COLUMN "ttdat" SET DEFAULT 0,
ALTER COLUMN "ttdat" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "ttgiao" SET NOT NULL,
ALTER COLUMN "ttgiao" SET DEFAULT 0,
ALTER COLUMN "ttgiao" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "ttnhan" SET NOT NULL,
ALTER COLUMN "ttnhan" SET DEFAULT 0,
ALTER COLUMN "ttnhan" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slhuy" SET NOT NULL,
ALTER COLUMN "slhuy" SET DEFAULT 0,
ALTER COLUMN "slhuy" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "Donhangsanpham" ALTER COLUMN "sldat" SET NOT NULL,
ALTER COLUMN "sldat" SET DEFAULT 0,
ALTER COLUMN "sldat" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slgiao" SET NOT NULL,
ALTER COLUMN "slgiao" SET DEFAULT 0,
ALTER COLUMN "slgiao" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slnhan" SET NOT NULL,
ALTER COLUMN "slnhan" SET DEFAULT 0,
ALTER COLUMN "slnhan" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "ttdat" SET NOT NULL,
ALTER COLUMN "ttdat" SET DEFAULT 0,
ALTER COLUMN "ttdat" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "ttgiao" SET NOT NULL,
ALTER COLUMN "ttgiao" SET DEFAULT 0,
ALTER COLUMN "ttgiao" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "ttnhan" SET NOT NULL,
ALTER COLUMN "ttnhan" SET DEFAULT 0,
ALTER COLUMN "ttnhan" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slhuy" SET NOT NULL,
ALTER COLUMN "slhuy" SET DEFAULT 0,
ALTER COLUMN "slhuy" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "PhieuKhoSanpham" ALTER COLUMN "soluong" SET NOT NULL;

-- AlterTable
ALTER TABLE "SanphamKho" ALTER COLUMN "soluong" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "TonKho" ALTER COLUMN "slton" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slchogiao" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "slchonhap" SET DATA TYPE DECIMAL(20,2);
