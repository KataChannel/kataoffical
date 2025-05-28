/*
  Warnings:

  - You are about to drop the `DoanhThu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KhachHang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DoanhThu" DROP CONSTRAINT "DoanhThu_khachHangId_fkey";

-- DropTable
DROP TABLE "DoanhThu";

-- DropTable
DROP TABLE "KhachHang";
