/*
  Warnings:

  - You are about to drop the column `khachhang` on the `Donhang` table. All the data in the column will be lost.
  - Added the required column `order` to the `Banggiasanpham` table without a default value. This is not possible if the table is not empty.
  - Added the required column `khachhangId` to the `Donhang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Giohangsanpham` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banggia" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Banggiasanpham" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Donhang" DROP COLUMN "khachhang",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "khachhangId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Giohang" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Giohangsanpham" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Khachhang" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Khachhang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Khachhang_email_key" ON "Khachhang"("email");

-- AddForeignKey
ALTER TABLE "Donhang" ADD CONSTRAINT "Donhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "Khachhang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
