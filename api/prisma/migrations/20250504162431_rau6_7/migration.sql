/*
  Warnings:

  - You are about to alter the column `soluong` on the `PhieuKhoSanpham` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "PhieuKhoSanpham" ALTER COLUMN "soluong" DROP NOT NULL,
ALTER COLUMN "soluong" SET DATA TYPE DECIMAL(15,2);
