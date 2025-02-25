/*
  Warnings:

  - You are about to drop the column `sldat` on the `SanphamKho` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PhieuKhoSanpham" ADD COLUMN     "ghichu" TEXT,
ADD COLUMN     "sldat" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "SanphamKho" DROP COLUMN "sldat";
