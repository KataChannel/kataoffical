const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';
const START_TIME = new Date('2026-04-08T13:00:00+07:00');

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    const logs = await prisma.auditLog.findMany({
        where: {
            entityName: 'Sanpham',
            entityId: product.id,
            createdAt: { gte: START_TIME }
        },
        orderBy: { createdAt: 'desc' }
    });

    console.log("Total Audit Logs:", logs.length);
    logs.forEach(log => {
        console.log(`Time: ${log.createdAt.toISOString()}, Action: ${log.action}, Changed: ${log.changedFields.join(', ')}`);
        console.log(`Old: ${JSON.stringify(log.oldValues)}, New: ${JSON.stringify(log.newValues)}`);
        console.log('---');
    });

    // Also check for 'TonKho' entity logs
    const tonLogs = await prisma.auditLog.findMany({
        where: {
            entityName: 'TonKho',
            createdAt: { gte: START_TIME }
        },
        orderBy: { createdAt: 'desc' }
    });
    
    // Filter by sanphamId in TonKho
    const tonKhoRecord = await prisma.tonKho.findUnique({ where: { sanphamId: product.id } });
    if (tonKhoRecord) {
        const productTonLogs = tonLogs.filter(l => l.entityId === tonKhoRecord.id);
        console.log("Total TonKho Audit Logs:", productTonLogs.length);
        productTonLogs.forEach(log => {
            console.log(`Time: ${log.createdAt.toISOString()}, Action: ${log.action}, Changed: ${log.changedFields.join(', ')}`);
            console.log(`Old: ${JSON.stringify(log.oldValues)}, New: ${JSON.stringify(log.newValues)}`);
            console.log('---');
        });
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
