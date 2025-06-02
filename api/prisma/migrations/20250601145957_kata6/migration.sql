/*
  Warnings:

  - You are about to drop the column `description` on the `banggia` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `banggia` table. All the data in the column will be lost.
  - Added the required column `khachhangId` to the `banggia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanphamId` to the `banggia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banggia" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "batdau" TIMESTAMP(3),
ADD COLUMN     "giaban" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ketthuc" TIMESTAMP(3),
ADD COLUMN     "khachhangId" TEXT NOT NULL,
ADD COLUMN     "sanphamId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'baogia';

-- AddForeignKey
ALTER TABLE "banggia" ADD CONSTRAINT "banggia_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "sanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banggia" ADD CONSTRAINT "banggia_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
