/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatAIHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatAIMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChitietDexuat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dexuat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DriveItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ErrorLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Khachhang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LandingPage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nhomkhachhang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionDrive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quanlyqrcode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KhachhangNhom` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AffiliateStatus" AS ENUM ('PENDING', 'APPROVED', 'ACTIVE', 'REJECTED', 'INACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('PERCENTAGE', 'FIXED_RATE');

-- CreateEnum
CREATE TYPE "ConversionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PayoutMethod" AS ENUM ('BANK_TRANSFER', 'PAYPAL', 'WISE', 'MOMO', 'OTHER');

-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('STANDARD', 'STUDENT', 'TEACHER', 'INTERNAL', 'VIP', 'COMPANY');

-- CreateEnum
CREATE TYPE "FraudAssessmentStatus" AS ENUM ('NOT_CHECKED', 'LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK', 'CONFIRMED_FRAUD', 'MANUAL_REVIEW_NEEDED');

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChitietDexuat" DROP CONSTRAINT "ChitietDexuat_dexuatId_fkey";

-- DropForeignKey
ALTER TABLE "Dexuat" DROP CONSTRAINT "Dexuat_createdById_fkey";

-- DropForeignKey
ALTER TABLE "LandingPage" DROP CONSTRAINT "LandingPage_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionDrive" DROP CONSTRAINT "PermissionDrive_driveId_fkey";

-- DropForeignKey
ALTER TABLE "RolePermission" DROP CONSTRAINT "RolePermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "RolePermission" DROP CONSTRAINT "RolePermission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropForeignKey
ALTER TABLE "_KhachhangNhom" DROP CONSTRAINT "_KhachhangNhom_A_fkey";

-- DropForeignKey
ALTER TABLE "_KhachhangNhom" DROP CONSTRAINT "_KhachhangNhom_B_fkey";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "ChatAIHistory";

-- DropTable
DROP TABLE "ChatAIMessage";

-- DropTable
DROP TABLE "ChitietDexuat";

-- DropTable
DROP TABLE "Dexuat";

-- DropTable
DROP TABLE "DriveItem";

-- DropTable
DROP TABLE "ErrorLog";

-- DropTable
DROP TABLE "Khachhang";

-- DropTable
DROP TABLE "LandingPage";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "Nhomkhachhang";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "PermissionDrive";

-- DropTable
DROP TABLE "Quanlyqrcode";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "RolePermission";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserRole";

-- DropTable
DROP TABLE "_KhachhangNhom";

-- DropEnum
DROP TYPE "DriveItemType";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "affiliate_partners" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "companyName" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "status" "AffiliateStatus" NOT NULL DEFAULT 'PENDING',
    "trackingCode" TEXT NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "notes" TEXT,
    "payoutMethod" "PayoutMethod",
    "payoutDetails" JSONB,
    "userId" TEXT,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerType" "PartnerType" NOT NULL DEFAULT 'STANDARD',
    "primaryChannelNotes" TEXT,
    "fraudRiskScore" DOUBLE PRECISION,
    "fraudStatus" "FraudAssessmentStatus" NOT NULL DEFAULT 'NOT_CHECKED',
    "isFlaggedForReview" BOOLEAN NOT NULL DEFAULT false,
    "fraudCheckNotes" TEXT,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "affiliate_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_campaigns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "click_events" (
    "id" TEXT NOT NULL,
    "trackingLinkId" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,

    CONSTRAINT "click_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking_links" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "campaignId" TEXT,
    "name" TEXT,
    "destinationUrl" TEXT NOT NULL,
    "generatedUrl" TEXT NOT NULL,
    "notes" TEXT,
    "conversionCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracking_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversion_events" (
    "id" TEXT NOT NULL,
    "externalConversionId" TEXT NOT NULL,
    "businessUnit" TEXT NOT NULL,
    "conversionType" TEXT NOT NULL,
    "conversionAmount" DECIMAL(65,30),
    "currency" TEXT DEFAULT 'VND',
    "conversionTimestamp" TIMESTAMP(3) NOT NULL,
    "reportingTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clickId" TEXT,
    "trackingLinkId" TEXT,
    "affiliatePartnerId" TEXT NOT NULL,
    "customerId" TEXT,
    "productId" TEXT,
    "productSku" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "refererUrl" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "fraudCheckStatus" "FraudAssessmentStatus" NOT NULL DEFAULT 'NOT_CHECKED',
    "fraudCheckNotes" TEXT,
    "status" "ConversionStatus" NOT NULL DEFAULT 'PENDING',
    "processedForCommission" BOOLEAN NOT NULL DEFAULT false,
    "rejectionReason" TEXT,
    "notes" TEXT,
    "processedById" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversion_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commission_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "commissionType" "CommissionType" NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "appliesToBusinessUnit" TEXT,
    "appliesToProductSku" TEXT,
    "appliesToCourseCode" TEXT,
    "appliesToServiceCode" TEXT,
    "appliesToConversionType" TEXT,
    "appliesToPartnerType" "PartnerType",
    "campaignId" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commission_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commission_ledger" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "conversionEventId" TEXT NOT NULL,
    "commissionRuleId" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'VND',
    "status" "ConversionStatus" NOT NULL,
    "payoutId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "notificationSentAt" TIMESTAMP(3),

    CONSTRAINT "commission_ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payouts" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "payoutDate" TIMESTAMP(3) NOT NULL,
    "periodStartDate" TIMESTAMP(3) NOT NULL,
    "periodEndDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'VND',
    "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING',
    "payoutMethod" "PayoutMethod",
    "transactionReference" TEXT,
    "notes" TEXT,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "paymentProcessorResponse" JSONB,
    "processingNotes" TEXT,
    "initiatedById" TEXT,

    CONSTRAINT "payouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_landing_pages" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "trackingLinkId" TEXT,
    "campaignId" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "templateName" TEXT,
    "headline" TEXT,
    "subHeadline" TEXT,
    "bannerImageUrl" TEXT,
    "videoUrl" TEXT,
    "bodyContent" TEXT,
    "ctaText" TEXT,
    "customCss" TEXT,
    "customJs" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_landing_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_partners_email_key" ON "affiliate_partners"("email");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_partners_trackingCode_key" ON "affiliate_partners"("trackingCode");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_partners_userId_key" ON "affiliate_partners"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_partners_customerId_key" ON "affiliate_partners"("customerId");

-- CreateIndex
CREATE INDEX "affiliate_partners_status_idx" ON "affiliate_partners"("status");

-- CreateIndex
CREATE INDEX "affiliate_partners_userId_idx" ON "affiliate_partners"("userId");

-- CreateIndex
CREATE INDEX "affiliate_partners_customerId_idx" ON "affiliate_partners"("customerId");

-- CreateIndex
CREATE INDEX "affiliate_partners_partnerType_idx" ON "affiliate_partners"("partnerType");

-- CreateIndex
CREATE INDEX "affiliate_partners_fraudStatus_idx" ON "affiliate_partners"("fraudStatus");

-- CreateIndex
CREATE INDEX "affiliate_partners_isFlaggedForReview_idx" ON "affiliate_partners"("isFlaggedForReview");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_campaigns_name_key" ON "affiliate_campaigns"("name");

-- CreateIndex
CREATE INDEX "click_events_trackingLinkId_idx" ON "click_events"("trackingLinkId");

-- CreateIndex
CREATE INDEX "click_events_affiliatePartnerId_clickedAt_idx" ON "click_events"("affiliatePartnerId", "clickedAt");

-- CreateIndex
CREATE INDEX "click_events_clickedAt_idx" ON "click_events"("clickedAt");

-- CreateIndex
CREATE INDEX "click_events_ipAddress_idx" ON "click_events"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "tracking_links_generatedUrl_key" ON "tracking_links"("generatedUrl");

-- CreateIndex
CREATE INDEX "tracking_links_affiliatePartnerId_idx" ON "tracking_links"("affiliatePartnerId");

-- CreateIndex
CREATE INDEX "tracking_links_campaignId_idx" ON "tracking_links"("campaignId");

-- CreateIndex
CREATE INDEX "conversion_events_affiliatePartnerId_idx" ON "conversion_events"("affiliatePartnerId");

-- CreateIndex
CREATE INDEX "conversion_events_status_idx" ON "conversion_events"("status");

-- CreateIndex
CREATE INDEX "conversion_events_clickId_idx" ON "conversion_events"("clickId");

-- CreateIndex
CREATE INDEX "conversion_events_trackingLinkId_idx" ON "conversion_events"("trackingLinkId");

-- CreateIndex
CREATE INDEX "conversion_events_processedForCommission_idx" ON "conversion_events"("processedForCommission");

-- CreateIndex
CREATE INDEX "conversion_events_productId_idx" ON "conversion_events"("productId");

-- CreateIndex
CREATE INDEX "conversion_events_utmSource_idx" ON "conversion_events"("utmSource");

-- CreateIndex
CREATE INDEX "conversion_events_fraudCheckStatus_idx" ON "conversion_events"("fraudCheckStatus");

-- CreateIndex
CREATE UNIQUE INDEX "conversion_events_externalConversionId_businessUnit_key" ON "conversion_events"("externalConversionId", "businessUnit");

-- CreateIndex
CREATE INDEX "commission_rules_isActive_startDate_endDate_idx" ON "commission_rules"("isActive", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "commission_rules_appliesToBusinessUnit_idx" ON "commission_rules"("appliesToBusinessUnit");

-- CreateIndex
CREATE INDEX "commission_rules_appliesToConversionType_idx" ON "commission_rules"("appliesToConversionType");

-- CreateIndex
CREATE INDEX "commission_rules_appliesToPartnerType_idx" ON "commission_rules"("appliesToPartnerType");

-- CreateIndex
CREATE INDEX "commission_rules_campaignId_idx" ON "commission_rules"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "commission_ledger_conversionEventId_key" ON "commission_ledger"("conversionEventId");

-- CreateIndex
CREATE INDEX "commission_ledger_affiliatePartnerId_status_idx" ON "commission_ledger"("affiliatePartnerId", "status");

-- CreateIndex
CREATE INDEX "commission_ledger_payoutId_idx" ON "commission_ledger"("payoutId");

-- CreateIndex
CREATE INDEX "commission_ledger_commissionRuleId_idx" ON "commission_ledger"("commissionRuleId");

-- CreateIndex
CREATE INDEX "commission_ledger_status_idx" ON "commission_ledger"("status");

-- CreateIndex
CREATE INDEX "payouts_affiliatePartnerId_status_idx" ON "payouts"("affiliatePartnerId", "status");

-- CreateIndex
CREATE INDEX "payouts_payoutDate_idx" ON "payouts"("payoutDate");

-- CreateIndex
CREATE INDEX "payouts_status_idx" ON "payouts"("status");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_landing_pages_trackingLinkId_key" ON "affiliate_landing_pages"("trackingLinkId");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_landing_pages_slug_key" ON "affiliate_landing_pages"("slug");

-- CreateIndex
CREATE INDEX "affiliate_landing_pages_affiliatePartnerId_idx" ON "affiliate_landing_pages"("affiliatePartnerId");

-- CreateIndex
CREATE INDEX "affiliate_landing_pages_campaignId_idx" ON "affiliate_landing_pages"("campaignId");

-- CreateIndex
CREATE INDEX "affiliate_landing_pages_slug_idx" ON "affiliate_landing_pages"("slug");

-- CreateIndex
CREATE INDEX "affiliate_landing_pages_isEnabled_idx" ON "affiliate_landing_pages"("isEnabled");

-- AddForeignKey
ALTER TABLE "click_events" ADD CONSTRAINT "click_events_trackingLinkId_fkey" FOREIGN KEY ("trackingLinkId") REFERENCES "tracking_links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "click_events" ADD CONSTRAINT "click_events_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracking_links" ADD CONSTRAINT "tracking_links_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracking_links" ADD CONSTRAINT "tracking_links_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "affiliate_campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversion_events" ADD CONSTRAINT "conversion_events_trackingLinkId_fkey" FOREIGN KEY ("trackingLinkId") REFERENCES "tracking_links"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversion_events" ADD CONSTRAINT "conversion_events_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_rules" ADD CONSTRAINT "commission_rules_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "affiliate_campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_ledger" ADD CONSTRAINT "commission_ledger_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_ledger" ADD CONSTRAINT "commission_ledger_conversionEventId_fkey" FOREIGN KEY ("conversionEventId") REFERENCES "conversion_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_ledger" ADD CONSTRAINT "commission_ledger_commissionRuleId_fkey" FOREIGN KEY ("commissionRuleId") REFERENCES "commission_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_ledger" ADD CONSTRAINT "commission_ledger_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "payouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_landing_pages" ADD CONSTRAINT "affiliate_landing_pages_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_landing_pages" ADD CONSTRAINT "affiliate_landing_pages_trackingLinkId_fkey" FOREIGN KEY ("trackingLinkId") REFERENCES "tracking_links"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_landing_pages" ADD CONSTRAINT "affiliate_landing_pages_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "affiliate_campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;
