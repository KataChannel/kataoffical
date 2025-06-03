/*
  Warnings:

  - You are about to drop the column `subtitle` on the `sanpham` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sanpham" DROP COLUMN "subtitle",
ADD COLUMN     "bacgia" JSONB;
