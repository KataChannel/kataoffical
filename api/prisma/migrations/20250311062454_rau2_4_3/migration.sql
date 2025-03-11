/*
  Warnings:

  - Added the required column `title2` to the `Sanpham` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sanpham" ADD COLUMN     "title2" TEXT NOT NULL;
