"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkProductAudit() {
    const masp = 'I100479';
    const sanpham = await prisma.sanpham.findFirst({ where: { masp } });
    if (!sanpham)
        return;
    const logs = await prisma.auditLog.findMany({
        where: {
            OR: [
                { entityId: sanpham.id },
                { metadata: { path: ['sanphamId'], equals: sanpham.id } }
            ]
        },
        orderBy: { createdAt: 'desc' },
        take: 20
    });
    console.log(`--- AUDIT LOGS FOR ${sanpham.title} ---`);
    logs.forEach(log => {
        console.log(`[${log.createdAt.toISOString()}] ${log.entityName} ${log.action}`);
        console.log(`  New: ${JSON.stringify(log.newValues)}`);
    });
    await prisma.$disconnect();
}
checkProductAudit();
//# sourceMappingURL=check_dua_hau_audit.js.map