/*
  Warnings:

  - You are about to drop the `affiliate_campaigns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `affiliate_landing_pages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `affiliate_partners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `click_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commission_ledger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commission_rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conversion_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payouts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tracking_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "DriveItemType" AS ENUM ('folder', 'file');

-- DropForeignKey
ALTER TABLE "affiliate_landing_pages" DROP CONSTRAINT "affiliate_landing_pages_affiliatePartnerId_fkey";

-- DropForeignKey
ALTER TABLE "affiliate_landing_pages" DROP CONSTRAINT "affiliate_landing_pages_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "affiliate_landing_pages" DROP CONSTRAINT "affiliate_landing_pages_trackingLinkId_fkey";

-- DropForeignKey
ALTER TABLE "click_events" DROP CONSTRAINT "click_events_affiliatePartnerId_fkey";

-- DropForeignKey
ALTER TABLE "click_events" DROP CONSTRAINT "click_events_trackingLinkId_fkey";

-- DropForeignKey
ALTER TABLE "commission_ledger" DROP CONSTRAINT "commission_ledger_affiliatePartnerId_fkey";

-- DropForeignKey
ALTER TABLE "commission_ledger" DROP CONSTRAINT "commission_ledger_commissionRuleId_fkey";

-- DropForeignKey
ALTER TABLE "commission_ledger" DROP CONSTRAINT "commission_ledger_conversionEventId_fkey";

-- DropForeignKey
ALTER TABLE "commission_ledger" DROP CONSTRAINT "commission_ledger_payoutId_fkey";

-- DropForeignKey
ALTER TABLE "commission_rules" DROP CONSTRAINT "commission_rules_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "conversion_events" DROP CONSTRAINT "conversion_events_affiliatePartnerId_fkey";

-- DropForeignKey
ALTER TABLE "conversion_events" DROP CONSTRAINT "conversion_events_trackingLinkId_fkey";

-- DropForeignKey
ALTER TABLE "payouts" DROP CONSTRAINT "payouts_affiliatePartnerId_fkey";

-- DropForeignKey
ALTER TABLE "tracking_links" DROP CONSTRAINT "tracking_links_affiliatePartnerId_fkey";

-- DropForeignKey
ALTER TABLE "tracking_links" DROP CONSTRAINT "tracking_links_campaignId_fkey";

-- DropTable
DROP TABLE "affiliate_campaigns";

-- DropTable
DROP TABLE "affiliate_landing_pages";

-- DropTable
DROP TABLE "affiliate_partners";

-- DropTable
DROP TABLE "click_events";

-- DropTable
DROP TABLE "commission_ledger";

-- DropTable
DROP TABLE "commission_rules";

-- DropTable
DROP TABLE "conversion_events";

-- DropTable
DROP TABLE "payouts";

-- DropTable
DROP TABLE "tracking_links";

-- DropEnum
DROP TYPE "AffiliateStatus";

-- DropEnum
DROP TYPE "CommissionType";

-- DropEnum
DROP TYPE "ConversionStatus";

-- DropEnum
DROP TYPE "FraudAssessmentStatus";

-- DropEnum
DROP TYPE "PartnerType";

-- DropEnum
DROP TYPE "PayoutMethod";

-- DropEnum
DROP TYPE "PayoutStatus";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "gender" "Gender",
    "email" TEXT,
    "SDT" TEXT,
    "phone" TEXT,
    "zaloId" TEXT,
    "facebookId" TEXT,
    "googleId" TEXT,
    "password" TEXT,
    "provider" TEXT,
    "providerId" TEXT,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "affiliateCode" TEXT,
    "referrerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Khachhang" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "namenn" TEXT,
    "makh" TEXT NOT NULL,
    "diachi" TEXT,
    "sdt" TEXT,
    "mst" TEXT,
    "gionhanhang" TEXT,
    "quan" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "loaikh" TEXT,
    "ghichu" TEXT,
    "hiengia" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Khachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nhomkhachhang" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nhomkhachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAIMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAIMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAIHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAIHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "details" JSONB,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT,
    "entity" TEXT,
    "entityId" TEXT,
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quanlyqrcode" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "qrcode" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isSentEmail" BOOLEAN NOT NULL DEFAULT false,
    "isSentZalo" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quanlyqrcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriveItem" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DriveItemType" NOT NULL,
    "parentId" TEXT,
    "mimeType" TEXT,
    "path" TEXT,
    "size" BIGINT,
    "isDelete" BOOLEAN DEFAULT false,
    "createdTime" TIMESTAMP(3),
    "modifiedTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriveItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionDrive" (
    "id" TEXT NOT NULL,
    "userIdDrive" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "emailAddress" TEXT,
    "role" TEXT NOT NULL,
    "driveId" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermissionDrive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dexuat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tienbangchu" TEXT,
    "tongtien" INTEGER,
    "tongchi" INTEGER,
    "ngaytao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "nguoinhan" TEXT,
    "truongbophan" TEXT,
    "nguoidexuat" TEXT,
    "bophan" TEXT,
    "vitri" TEXT,
    "tamung" INTEGER DEFAULT 0,
    "codeId" TEXT NOT NULL,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dexuat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChitietDexuat" (
    "id" TEXT NOT NULL,
    "dexuatId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thanhtien" INTEGER,
    "ghichu" TEXT,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChitietDexuat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "contentJson" JSONB NOT NULL,
    "contentHtml" TEXT,
    "customCss" TEXT,
    "customJs" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "codeId" TEXT NOT NULL,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KhachhangNhom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KhachhangNhom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_SDT_key" ON "User"("SDT");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_zaloId_key" ON "User"("zaloId");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_affiliateCode_key" ON "User"("affiliateCode");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Khachhang_makh_key" ON "Khachhang"("makh");

-- CreateIndex
CREATE UNIQUE INDEX "Nhomkhachhang_name_key" ON "Nhomkhachhang"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_qrcode_key" ON "Quanlyqrcode"("qrcode");

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_code_key" ON "Quanlyqrcode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_slug_phone_email_key" ON "Quanlyqrcode"("slug", "phone", "email");

-- CreateIndex
CREATE UNIQUE INDEX "DriveItem_googleId_key" ON "DriveItem"("googleId");

-- CreateIndex
CREATE INDEX "DriveItem_type_parentId_idx" ON "DriveItem"("type", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionDrive_userIdDrive_driveId_googleId_key" ON "PermissionDrive"("userIdDrive", "driveId", "googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Dexuat_codeId_key" ON "Dexuat"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_slug_key" ON "LandingPage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_codeId_key" ON "LandingPage"("codeId");

-- CreateIndex
CREATE INDEX "_KhachhangNhom_B_index" ON "_KhachhangNhom"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionDrive" ADD CONSTRAINT "PermissionDrive_driveId_fkey" FOREIGN KEY ("driveId") REFERENCES "DriveItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dexuat" ADD CONSTRAINT "Dexuat_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChitietDexuat" ADD CONSTRAINT "ChitietDexuat_dexuatId_fkey" FOREIGN KEY ("dexuatId") REFERENCES "Dexuat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingPage" ADD CONSTRAINT "LandingPage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhachhangNhom" ADD CONSTRAINT "_KhachhangNhom_A_fkey" FOREIGN KEY ("A") REFERENCES "Khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhachhangNhom" ADD CONSTRAINT "_KhachhangNhom_B_fkey" FOREIGN KEY ("B") REFERENCES "Nhomkhachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
