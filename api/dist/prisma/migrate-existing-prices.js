"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const DEFAUL_BANGGIA_ID = '84a62698-5784-4ac3-b506-5e662d1511cb';
async function migrateExistingPrices() {
    console.log('🚀 Starting price history migration...');
    try {
        const allPrices = await prisma.banggiasanpham.findMany({
            include: {
                banggia: true,
                sanpham: true
            }
        });
        console.log(`📊 Found ${allPrices.length} price records to migrate`);
        let migrated = 0;
        let failed = 0;
        for (const price of allPrices) {
            try {
                await prisma.banggiasanphamHistory.create({
                    data: {
                        banggiaId: price.banggiaId,
                        sanphamId: price.sanphamId,
                        giaban: price.giaban,
                        validFrom: price.createdAt || new Date(),
                        validTo: null,
                        reason: 'Initial migration from existing data',
                        metadata: {
                            migratedAt: new Date().toISOString(),
                            originalId: price.id,
                            banggia: price.banggia.mabanggia,
                            sanpham: price.sanpham.masp
                        }
                    }
                });
                migrated++;
                if (migrated % 100 === 0) {
                    console.log(`✅ Migrated ${migrated}/${allPrices.length} prices`);
                }
            }
            catch (error) {
                console.error(`❌ Failed to migrate price ${price.id}:`, error.message);
                failed++;
            }
        }
        console.log(`\n✅ Price migration completed!`);
        console.log(`   - Successfully migrated: ${migrated}`);
        console.log(`   - Failed: ${failed}`);
        await migrateOrderPrices();
    }
    catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
async function migrateOrderPrices() {
    console.log('\n🚀 Migrating order price snapshots...');
    const batchSize = 100;
    let offset = 0;
    let totalUpdated = 0;
    while (true) {
        const orders = await prisma.donhang.findMany({
            include: {
                sanpham: true
            },
            skip: offset,
            take: batchSize,
            orderBy: { createdAt: 'desc' }
        });
        if (orders.length === 0)
            break;
        console.log(`📦 Processing batch: ${offset + 1} to ${offset + orders.length}`);
        for (const order of orders) {
            for (const sp of order.sanpham) {
                try {
                    const priceHistory = await prisma.banggiasanphamHistory.findFirst({
                        where: {
                            banggiaId: order.banggiaId || DEFAUL_BANGGIA_ID,
                            sanphamId: sp.idSP,
                            validFrom: { lte: order.createdAt },
                            OR: [
                                { validTo: null },
                                { validTo: { gte: order.createdAt } }
                            ]
                        },
                        orderBy: { validFrom: 'desc' }
                    });
                    if (priceHistory) {
                        await prisma.donhangsanpham.update({
                            where: { id: sp.id },
                            data: {
                                priceHistoryId: priceHistory.id,
                                priceSnapshotAt: order.createdAt,
                                originalBanggiaId: order.banggiaId,
                                priceSource: 'banggia'
                            }
                        });
                        totalUpdated++;
                    }
                    else {
                        await prisma.donhangsanpham.update({
                            where: { id: sp.id },
                            data: {
                                priceSnapshotAt: order.createdAt,
                                originalBanggiaId: order.banggiaId,
                                priceSource: 'manual'
                            }
                        });
                    }
                }
                catch (error) {
                    console.error(`Failed to link price history for order ${order.madonhang}, product ${sp.idSP}:`, error.message);
                }
            }
        }
        offset += batchSize;
    }
    console.log(`✅ Updated ${totalUpdated} order line items with price history links`);
}
migrateExistingPrices()
    .then(() => {
    console.log('\n🎉 All migrations completed successfully!');
    process.exit(0);
})
    .catch((error) => {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
});
//# sourceMappingURL=migrate-existing-prices.js.map