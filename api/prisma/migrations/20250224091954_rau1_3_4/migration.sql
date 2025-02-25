/*
  Warnings:

  - You are about to drop the column `title` on the `Donhangsanpham` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donhangsanpham" DROP COLUMN "title",
ALTER COLUMN "sldat" DROP NOT NULL,
ALTER COLUMN "slgiao" DROP NOT NULL,
ALTER COLUMN "slnhan" DROP NOT NULL,
ALTER COLUMN "ttdat" DROP NOT NULL,
ALTER COLUMN "ttgiao" DROP NOT NULL,
ALTER COLUMN "ttnhan" DROP NOT NULL,
ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "isActive" DROP NOT NULL;
