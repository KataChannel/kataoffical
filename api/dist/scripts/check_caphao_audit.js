"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: {
        postgres: {
            url: 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public'
        }
    }
});
async function main() {
    console.log('=== AUDITING STOCK CHANGES FOR CÀ PHÁO (I100036) ===\n');
    const sp = await prisma.sanpham.findFirst({
        where: { masp: 'I100036' }
    });
    if (!sp) {
        console.log('Product not found');
        await prisma.$disconnect();
        return;
    }
    const tk = await prisma.tonKho.findUnique({ where: { sanphamId: sp.id } });
    const sks = await prisma.sanphamKho.findMany({ where: { sanphamId: sp.id } });
    const ids = [sp.id];
    if (tk)
        ids.push(tk.id);
    sks.forEach(sk => ids.push(sk.id));
    console.log('Searching audit logs for entity IDs:', ids);
    const logs = await prisma.auditLog.findMany({
        where: {
            entityId: { in: ids }
        },
        orderBy: { createdAt: 'desc' },
        take: 50
    });
    console.log(`Found ${logs.length} audit log entries.\n`);
    logs.forEach(log => {
        console.log(`- Time: ${log.createdAt.toISOString()}`);
        console.log(`  Action: ${log.action} | Entity: ${log.entityName}`);
        console.log(`  User: ${log.userEmail || log.userId || 'system'}`);
        console.log(`  Old values:`, JSON.stringify(log.oldValues));
        console.log(`  New values:`, JSON.stringify(log.newValues));
        console.log('----------------------------------------');
    });
    await prisma.$disconnect();
}
main().catch(console.error);
//# sourceMappingURL=check_caphao_audit.js.map