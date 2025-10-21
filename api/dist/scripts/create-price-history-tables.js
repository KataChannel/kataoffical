"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🔧 Creating Price History tables...');
    try {
        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "BanggiasanphamHistory" (
          "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_banggiasanphamId_idx" 
          ON "BanggiasanphamHistory"("banggiasanphamId");
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_banggiaId_idx" 
          ON "BanggiasanphamHistory"("banggiaId");
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_sanphamId_idx" 
          ON "BanggiasanphamHistory"("sanphamId");
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "BanggiasanphamHistory_changedAt_idx" 
          ON "BanggiasanphamHistory"("changedAt");
    `);
        console.log('✅ BanggiasanphamHistory table created');
        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "DonhangPriceAudit" (
          "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_donhangId_idx" 
          ON "DonhangPriceAudit"("donhangId");
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_donhangsanphamId_idx" 
          ON "DonhangPriceAudit"("donhangsanphamId");
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_sanphamId_idx" 
          ON "DonhangPriceAudit"("sanphamId");
    `);
        await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "DonhangPriceAudit_createdAt_idx" 
          ON "DonhangPriceAudit"("createdAt");
    `);
        console.log('✅ DonhangPriceAudit table created');
        console.log('🎉 Migration completed successfully!');
    }
    catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=create-price-history-tables.js.map