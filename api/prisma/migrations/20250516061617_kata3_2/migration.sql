/*
  Warnings:

  - Added the required column `idhoadon` to the `HoadonChitiet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HoadonChitiet" DROP CONSTRAINT "HoadonChitiet_idhdon_fkey";

-- AlterTable
ALTER TABLE "HoadonChitiet" ADD COLUMN     "idhoadon" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "HoadonChitiet" ADD CONSTRAINT "HoadonChitiet_idhoadon_fkey" FOREIGN KEY ("idhoadon") REFERENCES "Hoadon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
