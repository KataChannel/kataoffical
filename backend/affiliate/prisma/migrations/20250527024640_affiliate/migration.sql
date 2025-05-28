/*
  Warnings:

  - You are about to drop the `_AffiliateLinkToTrackingEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AffiliateLinkToTrackingEvent" DROP CONSTRAINT "_AffiliateLinkToTrackingEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_AffiliateLinkToTrackingEvent" DROP CONSTRAINT "_AffiliateLinkToTrackingEvent_B_fkey";

-- AlterTable
ALTER TABLE "TrackingEvent" ADD COLUMN     "affiliateLinkId" TEXT;

-- DropTable
DROP TABLE "_AffiliateLinkToTrackingEvent";

-- AddForeignKey
ALTER TABLE "TrackingEvent" ADD CONSTRAINT "TrackingEvent_affiliateLinkId_fkey" FOREIGN KEY ("affiliateLinkId") REFERENCES "AffiliateLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;
