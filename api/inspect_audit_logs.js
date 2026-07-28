const { PrismaClient } = require('@prisma/client');

const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
    const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });

    const masps = ['I100259', 'I100482'];
    const cutoffDate = new Date('2026-05-29T17:00:00Z'); // From May 30th VN time

    for (const masp of masps) {
        console.log(`\n=================== AUDIT LOGS FOR: ${masp} ===================`);
        try {
            const sp = await prisma.sanpham.findUnique({ where: { masp } });
            if (!sp) {
                console.log(`Product ${masp} not found!`);
                continue;
            }

            // Find audit logs where entityId is product's id, or where oldValues/newValues contain product id
            const logs = await prisma.auditLog.findMany({
                where: {
                    createdAt: { gte: cutoffDate },
                    OR: [
                        { entityId: sp.id },
                        { entityId: { in: [sp.id] } },
                        {
                            oldValues: {
                                path: ['sanphamId'],
                                equals: sp.id
                            }
                        },
                        {
                            newValues: {
                                path: ['sanphamId'],
                                equals: sp.id
                            }
                        }
                    ]
                },
                orderBy: { createdAt: 'asc' }
            });

            console.log(`Found ${logs.length} audit logs since May 30th.`);
            logs.forEach(log => {
                console.log(`- Time: ${log.createdAt.toISOString()} | Action: ${log.action} | Entity: ${log.entityName} | User: ${log.userEmail || 'System'}`);
                console.log(`  Old: ${JSON.stringify(log.oldValues)}`);
                console.log(`  New: ${JSON.stringify(log.newValues)}`);
            });

        } catch (err) {
            console.error(`Error querying audit logs for ${masp}:`, err);
        }
    }

    await prisma.$disconnect();
}

main();
