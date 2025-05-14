/*
  Warnings:

  - You are about to alter the column `price` on the `sanpham` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "sanpham" ALTER COLUMN "price" SET DATA TYPE DECIMAL(15,2);
