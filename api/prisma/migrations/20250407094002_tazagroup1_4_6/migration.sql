/*
  Warnings:

  - You are about to drop the column `thumnail` on the `LandingPage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LandingPage" DROP COLUMN "thumnail",
ADD COLUMN     "thumbnail" TEXT;
