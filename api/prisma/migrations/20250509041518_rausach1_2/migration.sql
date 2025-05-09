/*
  Warnings:

  - You are about to drop the column `caption` on the `UserguidBlock` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `UserguidBlock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserguidBlock" DROP COLUMN "caption",
DROP COLUMN "text",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT;
