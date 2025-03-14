/*
  Warnings:

  - You are about to drop the column `subtile` on the `Khachhang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Khachhang" DROP COLUMN "subtile",
ADD COLUMN     "subtitle" TEXT;
