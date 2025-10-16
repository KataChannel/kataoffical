-- CreateTable
CREATE TABLE "public"."BanggiasanphamHistory" (
    "id" TEXT NOT NULL,
    "banggiasanphamId" TEXT NOT NULL,
    "banggiaId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "oldPrice" DECIMAL(20,3) NOT NULL,
    "newPrice" DECIMAL(20,3) NOT NULL,
    "changePercent" DECIMAL(10,2),
    "changeReason" TEXT,
    "changedBy" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceType" TEXT,
    "batchId" TEXT,
    "metadata" JSONB,

    CONSTRAINT "BanggiasanphamHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DonhangPriceAudit" (
    "id" TEXT NOT NULL,
    "donhangId" TEXT NOT NULL,
    "donhangsanphamId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "oldPrice" DECIMAL(20,3) NOT NULL,
    "newPrice" DECIMAL(20,3) NOT NULL,
    "changePercent" DECIMAL(10,2),
    "changeReason" TEXT NOT NULL,
    "changedBy" TEXT,
    "changedByEmail" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "DonhangPriceAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BanggiasanphamHistory_banggiasanphamId_idx" ON "public"."BanggiasanphamHistory"("banggiasanphamId");

-- CreateIndex
CREATE INDEX "BanggiasanphamHistory_banggiaId_idx" ON "public"."BanggiasanphamHistory"("banggiaId");

-- CreateIndex
CREATE INDEX "BanggiasanphamHistory_sanphamId_idx" ON "public"."BanggiasanphamHistory"("sanphamId");

-- CreateIndex
CREATE INDEX "BanggiasanphamHistory_changedAt_idx" ON "public"."BanggiasanphamHistory"("changedAt");

-- CreateIndex
CREATE INDEX "DonhangPriceAudit_donhangId_idx" ON "public"."DonhangPriceAudit"("donhangId");

-- CreateIndex
CREATE INDEX "DonhangPriceAudit_donhangsanphamId_idx" ON "public"."DonhangPriceAudit"("donhangsanphamId");

-- CreateIndex
CREATE INDEX "DonhangPriceAudit_sanphamId_idx" ON "public"."DonhangPriceAudit"("sanphamId");

-- CreateIndex
CREATE INDEX "DonhangPriceAudit_createdAt_idx" ON "public"."DonhangPriceAudit"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."BanggiasanphamHistory" ADD CONSTRAINT "BanggiasanphamHistory_banggiasanphamId_fkey" FOREIGN KEY ("banggiasanphamId") REFERENCES "public"."Banggiasanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "public"."unique_banggia_time_range" RENAME TO "Banggia_mabanggia_batdau_ketthuc_key";
