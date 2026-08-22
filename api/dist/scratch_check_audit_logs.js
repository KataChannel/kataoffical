"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const masp = 'I100207';
        const product = await prisma.sanpham.findUnique({
            where: { masp }
        });
        if (!product) {
            console.log('❌ Product not found!');
            return;
        }
        const productId = product.id;
        const startOfDay = new Date('2026-06-08T00:00:00+07:00');
        const endOfDay = new Date('2026-06-08T23:59:59+07:00');
        const auditLogs = await prisma.auditLog.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                OR: [
                    { entityId: productId },
                    {
                        newValues: {
                            path: ['sanphamId'],
                            equals: productId
                        }
                    },
                    {
                        oldValues: {
                            path: ['sanphamId'],
                            equals: productId
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        console.log(`=== AUDIT LOGS FOR ${product.title} (I100207) ON 08/06/2026 (Count: ${auditLogs.length}) ===`);
        auditLogs.forEach((log, index) => {
            console.log(`[${index + 1}] Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
            console.log(`    Action: ${log.action} | Entity: ${log.entityName} | EntityId: ${log.entityId}`);
            console.log(`    Old Values:`, JSON.stringify(log.oldValues));
            console.log(`    New Values:`, JSON.stringify(log.newValues));
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=scratch_check_audit_logs.js.map