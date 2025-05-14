/*
  Warnings:

  - You are about to alter the column `price` on the `sanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "sanpham" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
