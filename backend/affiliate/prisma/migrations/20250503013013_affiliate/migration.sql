/*
  Warnings:

  - You are about to drop the column `details` on the `TrackingEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrackingEvent" DROP COLUMN "details",
ADD COLUMN     "pageIdentifier" TEXT,
ADD COLUMN     "pageType" TEXT,
ADD COLUMN     "pageUrl" TEXT,
ADD COLUMN     "refCode" TEXT;
