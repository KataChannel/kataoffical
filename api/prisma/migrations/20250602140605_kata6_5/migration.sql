/*
  Warnings:

  - You are about to drop the column `description` on the `dathang` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `dathang` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `nhacungcap` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `nhacungcap` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nhacungcapId` to the `dathang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dathang" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "nhacungcapId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "nhacungcap" ADD COLUMN     "diachi" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "title" DROP NOT NULL;

-- CreateTable
CREATE TABLE "dathangsanpham" (
    "id" TEXT NOT NULL,
    "dathangId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "sldat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slgiao" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slnhan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slhuy" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "giaban" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dathangsanpham_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dathangsanpham_dathangId_sanphamId_key" ON "dathangsanpham"("dathangId", "sanphamId");

-- CreateIndex
CREATE UNIQUE INDEX "nhacungcap_email_key" ON "nhacungcap"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nhacungcap_phone_key" ON "nhacungcap"("phone");

-- AddForeignKey
ALTER TABLE "dathang" ADD CONSTRAINT "dathang_nhacungcapId_fkey" FOREIGN KEY ("nhacungcapId") REFERENCES "nhacungcap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dathangsanpham" ADD CONSTRAINT "dathangsanpham_dathangId_fkey" FOREIGN KEY ("dathangId") REFERENCES "dathang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dathangsanpham" ADD CONSTRAINT "dathangsanpham_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "sanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;
