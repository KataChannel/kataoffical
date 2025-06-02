/*
  Warnings:

  - You are about to drop the column `doanhsoId` on the `Doanhthu` table. All the data in the column will be lost.
  - Added the required column `dichvuId` to the `Doanhthu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doanhthu" DROP CONSTRAINT "Doanhthu_doanhsoId_fkey";

-- AlterTable
ALTER TABLE "Doanhthu" DROP COLUMN "doanhsoId",
ADD COLUMN     "dichvuId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Doanhthu" ADD CONSTRAINT "Doanhthu_dichvuId_fkey" FOREIGN KEY ("dichvuId") REFERENCES "Dichvu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
