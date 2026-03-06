const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Check most recent AuditLogs for TonKho
    const logs = await prisma.auditLog.findMany({
        where: {
            entityName: 'TonKho'
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { user: true }
    });
    console.log("Recent AuditLogs for TonKho:");
    console.log(JSON.stringify(logs, null, 2));

    // 2. Check most recent ImportHistory
    const imports = await prisma.importHistory.findMany({
        orderBy: { importTime: 'desc' },
        take: 5
    });
    console.log("\nRecent ImportHistory:");
    console.log(JSON.stringify(imports, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
