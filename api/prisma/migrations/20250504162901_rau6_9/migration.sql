/*
  Warnings:

  - You are about to alter the column `soluong` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `soluongkho` on the `Sanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.

*/
-- AlterTable
ALTER TABLE "Sanpham" ALTER COLUMN "soluong" DROP NOT NULL,
ALTER COLUMN "soluong" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "soluongkho" DROP NOT NULL,
ALTER COLUMN "soluongkho" SET DATA TYPE DECIMAL(20,2);
