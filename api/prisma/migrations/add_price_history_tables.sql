-- Create BanggiasanphamHistory table
CREATE TABLE IF NOT EXISTS "BanggiasanphamHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    CONSTRAINT "BanggiasanphamHistory_banggiasanphamId_fkey" 
        FOREIGN KEY ("banggiasanphamId") REFERENCES "Banggiasanpham"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_banggiasanphamId_idx" 
    ON "BanggiasanphamHistory"("banggiasanphamId");
CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_banggiaId_idx" 
    ON "BanggiasanphamHistory"("banggiaId");
CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_sanphamId_idx" 
    ON "BanggiasanphamHistory"("sanphamId");
CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_changedAt_idx" 
    ON "BanggiasanphamHistory"("changedAt");

-- Create DonhangPriceAudit table
CREATE TABLE IF NOT EXISTS "DonhangPriceAudit" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "metadata" JSONB
);

CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_donhangId_idx" 
    ON "DonhangPriceAudit"("donhangId");
CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_donhangsanphamId_idx" 
    ON "DonhangPriceAudit"("donhangsanphamId");
CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_sanphamId_idx" 
    ON "DonhangPriceAudit"("sanphamId");
CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_createdAt_idx" 
    ON "DonhangPriceAudit"("createdAt");

-- Grant permissions
GRANT ALL ON "BanggiasanphamHistory" TO PUBLIC;
GRANT ALL ON "DonhangPriceAudit" TO PUBLIC;

COMMENT ON TABLE "BanggiasanphamHistory" IS 'Lưu lịch sử thay đổi giá trong bảng giá';
COMMENT ON TABLE "DonhangPriceAudit" IS 'Lưu audit log khi thay đổi giá đơn hàng';
