const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSpecificOrder() {
    const madonhang = 'TG-AA24847';
    console.log(`Checking order: ${madonhang}`);

    const donhang = await prisma.donhang.findFirst({
        where: { madonhang },
        include: {
            khachhang: { select: { name: true } }
        }
    });

    if (!donhang) {
        console.log(`❌ Order ${madonhang} not found`);
        return;
    }

    console.log('\n=== ORDER DETAILS ===');
    console.log('ID:', donhang.id);
    console.log('Madonhang:', donhang.madonhang);
    console.log('Status:', donhang.status);
    console.log('Ngaygiao:', donhang.ngaygiao);
    console.log('CreatedAt:', donhang.createdAt);
    console.log('UpdatedAt:', donhang.updatedAt);
    console.log('Khachhang:', donhang.khachhang?.name);
    console.log('Ghichu:', donhang.ghichu);

    console.log('\n=== AUDIT LOGS ===');
    const auditLogs = await prisma.auditLog.findMany({
        where: {
            entityId: donhang.id,
            entityName: 'Donhang'
        },
        orderBy: { createdAt: 'desc' }
    });

    if (auditLogs.length === 0) {
        console.log('No direct audit logs found for this order ID.');
    } else {
        auditLogs.forEach(log => {
            console.log(`[${log.createdAt.toISOString()}] ${log.action} by ${log.userId || 'System'}`);
            console.log('  Changed Fields:', log.changedFields);
            console.log('  Old Values:', JSON.stringify(log.oldValues));
            console.log('  New Values:', JSON.stringify(log.newValues));
            console.log('---');
        });
    }

    // Also search audit logs by madonhang in newValues/oldValues if entityId mismatch
    console.log('\n=== SEARCHING AUDIT LOGS BY MADONHANG IN JSON ===');
    const jsonLogs = await prisma.auditLog.findMany({
        where: {
            OR: [
                { oldValues: { path: ['madonhang'], equals: madonhang } },
                { newValues: { path: ['madonhang'], equals: madonhang } }
            ]
        },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    if (jsonLogs.length === 0) {
        console.log('No JSON audit logs found by madonhang.');
    } else {
        jsonLogs.forEach(log => {
            console.log(`[${log.createdAt.toISOString()}] ${log.action} on ${log.entityName} (${log.entityId})`);
            console.log('---');
        });
    }

    await prisma.$disconnect();
}

checkSpecificOrder().catch(err => {
    console.error(err);
    process.exit(1);
});
