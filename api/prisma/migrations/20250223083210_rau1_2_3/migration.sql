/*
  Warnings:

  - You are about to drop the column `gionhanhng` on the `Khachhang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Khachhang" DROP COLUMN "gionhanhng",
ADD COLUMN     "ghichu" TEXT,
ADD COLUMN     "gionhanhang" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
