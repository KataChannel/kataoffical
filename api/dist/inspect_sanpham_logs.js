"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const startDate = new Date('2026-02-19T00:00:00+07:00');
    const endDate = new Date('2026-02-21T00:00:00+07:00');
    console.log(`🔎 Inspecting "Update Sanpham_UPDATE" logs...`);
    const audits = await prisma.auditLog.findMany({
        where: {
            entityName: 'Update Sanpham',
            action: 'UPDATE',
            createdAt: { gte: startDate, lte: endDate }
        },
        orderBy: { createdAt: 'asc' }
    });
    audits.forEach(a => {
        console.log(`- Time: ${a.createdAt.toISOString()} | User: ${a.userEmail}`);
        console.log(`  Changed fields: ${a.changedFields.join(', ')}`);
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
//# sourceMappingURL=inspect_sanpham_logs.js.map