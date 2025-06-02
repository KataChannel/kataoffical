/*
  Warnings:

  - You are about to drop the column `gia` on the `donhangsanpham` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `sanpham` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "donhangsanpham" DROP COLUMN "gia",
ADD COLUMN     "giaban" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "sanpham" DROP COLUMN "price",
ADD COLUMN     "giagoc" DOUBLE PRECISION NOT NULL DEFAULT 0;
