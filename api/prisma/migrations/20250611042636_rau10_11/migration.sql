/*
  Warnings:

  - You are about to drop the `_Banggiakhachhang` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[banggiaId]` on the table `Khachhang` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_Banggiakhachhang" DROP CONSTRAINT "_Banggiakhachhang_A_fkey";

-- DropForeignKey
ALTER TABLE "_Banggiakhachhang" DROP CONSTRAINT "_Banggiakhachhang_B_fkey";

-- AlterTable
ALTER TABLE "Khachhang" ADD COLUMN     "banggiaId" TEXT;

-- DropTable
DROP TABLE "_Banggiakhachhang";

-- CreateIndex
CREATE UNIQUE INDEX "Khachhang_banggiaId_key" ON "Khachhang"("banggiaId");

-- AddForeignKey
ALTER TABLE "Khachhang" ADD CONSTRAINT "Khachhang_banggiaId_fkey" FOREIGN KEY ("banggiaId") REFERENCES "Banggia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
