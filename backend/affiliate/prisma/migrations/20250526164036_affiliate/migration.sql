-- CreateTable
CREATE TABLE "AffiliateLink" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT,
    "campaignName" TEXT,
    "description" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffiliateLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AffiliateLinkToTrackingEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AffiliateLinkToTrackingEvent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AffiliateLinkToTrackingEvent_B_index" ON "_AffiliateLinkToTrackingEvent"("B");

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliateLinkToTrackingEvent" ADD CONSTRAINT "_AffiliateLinkToTrackingEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "AffiliateLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliateLinkToTrackingEvent" ADD CONSTRAINT "_AffiliateLinkToTrackingEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "TrackingEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
