/*
  Warnings:

  - You are about to drop the `Kataapp` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `TrackingEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrackingEvent" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Kataapp";
