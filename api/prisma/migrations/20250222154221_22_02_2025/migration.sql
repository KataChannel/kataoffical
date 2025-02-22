/*
  Warnings:

  - You are about to drop the column `url` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "url",
ADD COLUMN     "slug" TEXT;
