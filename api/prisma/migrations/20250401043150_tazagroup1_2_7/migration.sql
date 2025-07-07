/*
  Warnings:

  - You are about to drop the column `ghiChu` on the `ChitietDexuat` table. All the data in the column will be lost.
  - You are about to drop the column `thanhTien` on the `ChitietDexuat` table. All the data in the column will be lost.
  - You are about to drop the column `boPhan` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `ngayTao` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `nguoiDeXuat` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `nguoiNhan` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `tamUng` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `tienBangChu` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `tongChi` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `tongTien` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `truongBoPhan` on the `Dexuat` table. All the data in the column will be lost.
  - You are about to drop the column `viTri` on the `Dexuat` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ChitietDexuat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChitietDexuat" DROP COLUMN "ghiChu",
DROP COLUMN "thanhTien",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ghichu" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER DEFAULT 1,
ADD COLUMN     "thanhtien" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Dexuat" DROP COLUMN "boPhan",
DROP COLUMN "ngayTao",
DROP COLUMN "nguoiDeXuat",
DROP COLUMN "nguoiNhan",
DROP COLUMN "tamUng",
DROP COLUMN "tienBangChu",
DROP COLUMN "tongChi",
DROP COLUMN "tongTien",
DROP COLUMN "truongBoPhan",
DROP COLUMN "viTri",
ADD COLUMN     "bophan" TEXT,
ADD COLUMN     "ngaytao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nguoidexuat" TEXT,
ADD COLUMN     "nguoinhan" TEXT,
ADD COLUMN     "tamung" INTEGER DEFAULT 0,
ADD COLUMN     "tienbangchu" TEXT,
ADD COLUMN     "tongchi" INTEGER,
ADD COLUMN     "tongtien" INTEGER,
ADD COLUMN     "truongbophan" TEXT,
ADD COLUMN     "vitri" TEXT;
