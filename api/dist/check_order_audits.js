"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const codes = ['TG-AA43926', 'TG-AA43898', 'TG-AA44024', 'TG-AA44180', 'TG-AA44353'];
        console.log(`Querying AuditLog for orders: ${codes.join(', ')}...`);
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
            console.log(`- Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
            console.log(`  Action: ${log.action} | Entity: ${log.entityName} | User: ${log.userEmail || 'System/Null'}`);
            console.log(`  Old: ${JSON.stringify(log.oldValues)}`);
            console.log(`  New: ${JSON.stringify(log.newValues)}`);
            console.log('----------------------------------------------------');
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
//# sourceMappingURL=check_order_audits.js.map