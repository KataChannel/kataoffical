/*
  Warnings:

  - You are about to drop the column `ngaynhan1` on the `Dathang` table. All the data in the column will be lost.
  - You are about to drop the column `ngaygiao1` on the `Donhang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Dathang" DROP COLUMN "ngaynhan1";

-- AlterTable
ALTER TABLE "public"."Donhang" DROP COLUMN "ngaygiao1";
