"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const masp = 'I100207';
        console.log(`🔍 Querying product info...`);
        const product = await prisma.sanpham.findUnique({
            where: { masp },
            include: { TonKho: true }
        });
        if (!product) {
            console.log('❌ Product not found!');
            return;
        }
        console.log(`Product ID: ${product.id}`);
        console.log(`TonKho ID: ${product.TonKho?.id}`);
        console.log('\n🔍 Querying AuditLog from 05/06/2026 to 08/06/2026...');
        const auditLogs = await prisma.auditLog.findMany({
            where: {
                createdAt: {
                    gte: new Date('2026-06-05T00:00:00+07:00'),
                    lte: new Date('2026-06-08T23:59:59+07:00')
                },
                OR: [
                    { entityId: product.id },
                    { entityId: product.TonKho?.id },
                    {
                        newValues: {
                            path: ['sanphamId'],
                            equals: product.id
                        }
                    },
                    {
                        oldValues: {
                            path: ['sanphamId'],
                            equals: product.id
                        }
                    }
                ]
            },
            orderBy: { createdAt: 'asc' }
        });
        console.log(`Found ${auditLogs.length} audit logs:`);
        for (const log of auditLogs) {
            console.log(`- Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
            console.log(`  Action: ${log.action} | Entity: ${log.entityName} | ID: ${log.entityId}`);
            console.log(`  User: ${log.userEmail || 'System/Null'}`);
            console.log(`  Changed: ${JSON.stringify(log.changedFields)}`);
            console.log(`  Old: ${JSON.stringify(log.oldValues)}`);
            console.log(`  New: ${JSON.stringify(log.newValues)}`);
            console.log(`  Metadata: ${JSON.stringify(log.metadata)}`);
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
//# sourceMappingURL=check_lolo_audit.js.map