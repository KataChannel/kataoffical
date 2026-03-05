"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const allInventories = await prisma.auditLog.findMany({
        where: {
            entityName: 'TonKho',
        },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true, action: true },
        take: 10
    });
    console.log(`\nLast 10 TonKho AuditLogs:`, allInventories);
    const allPhieukho = await prisma.phieuKho.findMany({
        where: {
            ghichu: {
                contains: 'tồn kho',
                mode: 'insensitive'
            }
        },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true, ghichu: true },
        take: 10
    });
    console.log(`\nLast 10 PhieuKho with 'tồn kho' updates:`, allPhieukho);
    const chotkho = await prisma.phieuKho.findMany({
        where: {
            isChotkho: true
        },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true, title: true, ghichu: true },
        take: 10
    });
    console.log(`\nLast 10 PhieuKho with 'isChotkho = true':`, chotkho);
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_inventory_update.js.map