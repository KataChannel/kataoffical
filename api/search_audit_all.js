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
        console.log("Searching AuditLog for any activity related to the codes...");
        
        // Search by string in metadata or newValues/oldValues
        // Since Prisma doesn't support easy full-text on JSON, we'll fetch recent logs or use raw SQL.
        
        for (const code of codes) {
            const logs = await prisma.$queryRaw`
                SELECT al.*, u.email as user_email
                FROM "AuditLog" al
                LEFT JOIN "User" u ON al."userId" = u.id
                WHERE CAST(al."newValues" AS TEXT) LIKE ${'%' + code + '%'}
                   OR CAST(al."oldValues" AS TEXT) LIKE ${'%' + code + '%'}
                   OR al."entityId" IN (SELECT id FROM "Donhang" WHERE madonhang = ${code})
                ORDER BY al."createdAt" ASC
                LIMIT 5
            `;

            if (logs.length > 0) {
                console.log(`\nLogs for ${code}:`);
                logs.forEach(l => {
                    console.log(`- Action: ${l.action} | User: ${l.user_email || 'System'} | At: ${l.createdAt}`);
                });
            } else {
                console.log(`\nNo logs found for ${code}`);
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
