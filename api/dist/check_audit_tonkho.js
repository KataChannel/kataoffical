"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkAudit() {
    const tonKhoId = 'e97cb3bd-c6cd-4a47-a8d4-6c2b8373351a';
    const logs = await prisma.auditLog.findMany({
        where: {
            entityName: 'TonKho',
            entityId: tonKhoId
        },
        orderBy: { createdAt: 'desc' },
        take: 10
    });
    console.log('--- AUDIT LOGS FOR TONKHO ---');
    logs.forEach(log => {
        console.log(`[${log.createdAt.toISOString()}] ${log.action}: ${JSON.stringify(log.changedFields)}`);
        console.log(`  Old: ${JSON.stringify(log.oldValues)}`);
        console.log(`  New: ${JSON.stringify(log.newValues)}`);
    });
    await prisma.$disconnect();
}
checkAudit();
//# sourceMappingURL=check_audit_tonkho.js.map