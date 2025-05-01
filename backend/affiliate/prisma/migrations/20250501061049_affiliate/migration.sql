/*
  Warnings:

  - You are about to drop the `ChitietDexuat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dexuat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DriveItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Khachhang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nhomkhachhang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionDrive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quanlyqrcode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KhachhangNhom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChitietDexuat" DROP CONSTRAINT "ChitietDexuat_dexuatId_fkey";

-- DropForeignKey
ALTER TABLE "Dexuat" DROP CONSTRAINT "Dexuat_createdById_fkey";

-- DropForeignKey
ALTER TABLE "PermissionDrive" DROP CONSTRAINT "PermissionDrive_driveId_fkey";

-- DropForeignKey
ALTER TABLE "_KhachhangNhom" DROP CONSTRAINT "_KhachhangNhom_A_fkey";

-- DropForeignKey
ALTER TABLE "_KhachhangNhom" DROP CONSTRAINT "_KhachhangNhom_B_fkey";

-- DropTable
DROP TABLE "ChitietDexuat";

-- DropTable
DROP TABLE "Dexuat";

-- DropTable
DROP TABLE "DriveItem";

-- DropTable
DROP TABLE "Khachhang";

-- DropTable
DROP TABLE "Nhomkhachhang";

-- DropTable
DROP TABLE "PermissionDrive";

-- DropTable
DROP TABLE "Quanlyqrcode";

-- DropTable
DROP TABLE "_KhachhangNhom";

-- DropEnum
DROP TYPE "DriveItemType";
