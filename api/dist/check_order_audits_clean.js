"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const codes = ['TG-AA43926', 'TG-AA43898', 'TG-AA44024', 'TG-AA44180', 'TG-AA44353', 'TG-AA44476', 'TG-AA44642', 'TG-AA44777', 'TG-AA44780', 'TG-AA44984'];
        console.log(`Querying AuditLog for orders on 08/06/2026...`);
        const logs = await prisma.auditLog.findMany({
            where: {
                createdAt: {
                    gte: new Date('2026-06-08T00:00:00+07:00'),
                    lte: new Date('2026-06-08T23:59:59+07:00')
                },
                OR: codes.map(code => ({
                    OR: [
                        { entityId: code },
                        { oldValues: { path: ['madonhang'], equals: code } },
                        { newValues: { path: ['madonhang'], equals: code } },
                        { metadata: { path: ['madonhang'], string_contains: code } }
                    ]
                }))
            },
            orderBy: { createdAt: 'desc' }
        });
        console.log(`Found ${logs.length} audit logs:`);
        for (const log of logs) {
            const oldVal = log.oldValues;
            const newVal = log.newValues;
            const oldStatus = oldVal?.status || 'N/A';
            const newStatus = newVal?.status || 'N/A';
            const orderCode = oldVal?.madonhang || newVal?.madonhang || log.entityId;
            console.log(`- Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | Order: ${orderCode} | Action: ${log.action} | Status: ${oldStatus} -> ${newStatus} | User: ${log.userEmail || 'System/Null'}`);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check_order_audits_clean.js.map