"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masp = 'TG-AA30553';
    console.log(`🔎 Searching for product: ${masp}`);
    const sp = await prisma.sanpham.findUnique({
        where: { masp }
    });
    if (!sp) {
        console.log(`❌ Product ${masp} not found.`);
        return;
    }
    console.log(`✅ Found product: ${sp.title} (ID: ${sp.id})`);
    console.log(`🔎 Searching AuditLog for product ID or keyword...`);
    const audits = await prisma.auditLog.findMany({
        where: {
            OR: [
                { entityId: sp.id },
                { oldValues: { path: ['masp'], equals: masp } },
                { newValues: { path: ['masp'], equals: masp } },
                { metadata: { path: ['title'], string_contains: masp } },
                { metadata: { path: ['masp'], string_contains: masp } }
            ]
        },
        orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${audits.length} audit entries.`);
    audits.forEach(a => {
        console.log(`---`);
        console.log(`Time: ${a.createdAt.toISOString()}`);
        console.log(`Action: ${a.action} on ${a.entityName}`);
        console.log(`User: ${a.userEmail}`);
        console.log(`Changed fields: ${a.changedFields.join(', ')}`);
        console.log(`Old: ${JSON.stringify(a.oldValues)}`);
        console.log(`New: ${JSON.stringify(a.newValues)}`);
    });
    console.log(`\n🔎 Checking BanggiasanphamHistory...`);
    const priceHistory = await prisma.banggiasanphamHistory.findMany({
        where: { sanphamId: sp.id },
        orderBy: { changedAt: 'desc' }
    });
    console.log(`Found ${priceHistory.length} price change entries.`);
    priceHistory.forEach(h => {
        console.log(`- ${h.changedAt.toISOString()}: ${h.oldPrice} -> ${h.newPrice} (${h.changeReason}) by ${h.changedBy}`);
    });
    console.log(`\n🔎 Checking if it was edited in Donhangsanpham...`);
    const priceAudits = await prisma.donhangPriceAudit.findMany({
        where: { sanphamId: sp.id },
        orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${priceAudits.length} order price audit entries.`);
    priceAudits.forEach(pa => {
        console.log(`- Order: ${pa.donhangId} | Time: ${pa.createdAt.toISOString()}: ${pa.oldPrice} -> ${pa.newPrice} | Reason: ${pa.changeReason}`);
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_specific_product_audit.js.map