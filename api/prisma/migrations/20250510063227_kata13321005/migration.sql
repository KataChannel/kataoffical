/*
  Warnings:

  - The `lhdgoc` column on the `Hoadon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Hoadon" DROP COLUMN "lhdgoc",
ADD COLUMN     "lhdgoc" INTEGER;
