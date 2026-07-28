const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const codes = [
        'TG-AA14740', 'TG-AA14741',
        'TG-AA06936', 'TG-AA06940',
        'TG-AA04832', 'TG-AA04833',
        'TG-AA04024', 'TG-AA04026'
    ];

    try {
        // Find order IDs first
        const orders = await prisma.donhang.findMany({
            where: { madonhang: { in: codes } },
            select: { id: true, madonhang: true }
        });

        const idToCode = new Map(orders.map(o => [o.id, o.madonhang]));

        // Search AuditLog
        const logs = await prisma.auditLog.findMany({
            where: {
                entityName: 'Donhang',
                entityId: { in: orders.map(o => o.id) },
                action: 'CREATE'
            },
            include: { user: true }
        });

        console.log("Audit Log for Creation:");
        logs.forEach(l => {
            console.log(`[${idToCode.get(l.entityId)}] User: ${l.userEmail || l.user?.email || 'System'} | Created At: ${l.createdAt.toISOString()}`);
        });

        if (logs.length === 0) {
            console.log("No CREATE logs found in AuditLog. Possibly created before AuditLog was enabled or via direct SQL.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
