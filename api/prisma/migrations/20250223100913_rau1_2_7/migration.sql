/*
  Warnings:

  - You are about to drop the column `giohangId` on the `Dathang` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Dathang` table. All the data in the column will be lost.
  - You are about to drop the `DathangSanpham` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dathangId]` on the table `Giohang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ngaynhan` to the `Dathang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Dathang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Dathang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dathangId` to the `Giohang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dathang" DROP CONSTRAINT "Dathang_giohangId_fkey";

-- DropForeignKey
ALTER TABLE "DathangSanpham" DROP CONSTRAINT "DathangSanpham_dathangId_fkey";

-- DropForeignKey
ALTER TABLE "DathangSanpham" DROP CONSTRAINT "DathangSanpham_sanphamId_fkey";

-- AlterTable
ALTER TABLE "Dathang" DROP COLUMN "giohangId",
DROP COLUMN "status",
ADD COLUMN     "ghichu" TEXT,
ADD COLUMN     "ngaynhan" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Giohang" ADD COLUMN     "dathangId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Nhacungcap" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "diachi" DROP NOT NULL;

-- DropTable
DROP TABLE "DathangSanpham";

-- CreateIndex
CREATE UNIQUE INDEX "Giohang_dathangId_key" ON "Giohang"("dathangId");

-- AddForeignKey
ALTER TABLE "Giohang" ADD CONSTRAINT "Giohang_dathangId_fkey" FOREIGN KEY ("dathangId") REFERENCES "Dathang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
