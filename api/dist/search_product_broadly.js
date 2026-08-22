"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const keyword = 'AA30553';
    const nameKeyword = 'Thanh long ruột đỏ';
    console.log(`🔎 Searching for products containing: "${keyword}" or "${nameKeyword}"`);
    const products = await prisma.sanpham.findMany({
        where: {
            OR: [
                { masp: { contains: keyword, mode: 'insensitive' } },
                { title: { contains: nameKeyword, mode: 'insensitive' } }
            ]
        }
    });
    if (products.length === 0) {
        console.log(`❌ No products found.`);
        return;
    }
    console.log(`Found ${products.length} products:`);
    for (const sp of products) {
        console.log(`- ${sp.title} | Masp: ${sp.masp} | ID: ${sp.id}`);
        console.log(`  🔎 Auditing...`);
        const audits = await prisma.auditLog.findMany({
            where: {
                OR: [
                    { entityId: sp.id },
                    { oldValues: { path: ['masp'], equals: sp.masp } },
                    { newValues: { path: ['masp'], equals: sp.masp } }
                ]
            },
            orderBy: { createdAt: 'desc' }
        });
        console.log(`  Found ${audits.length} audit entries.`);
        audits.forEach(a => {
            console.log(`    [Audit] ${a.createdAt.toISOString()} | Action: ${a.action} | User: ${a.userEmail} | Fields: ${a.changedFields.join(', ')}`);
        });
        const priceHistory = await prisma.banggiasanphamHistory.findMany({
            where: { sanphamId: sp.id },
            orderBy: { changedAt: 'desc' }
        });
        console.log(`  Found ${priceHistory.length} price history entries.`);
    }
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=search_product_broadly.js.map