const { PrismaClient } = require('@prisma/client');

async function main() {
    const dbUrl = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public&connection_limit=5&pool_timeout=60&connect_timeout=20';
    process.env.DATABASE_URL = dbUrl;
    
    const prisma = new PrismaClient({
        datasources: {
            postgres: {
                url: dbUrl
            }
        }
    });

    try {
        console.log('Searching AuditLog for updates around 2026-05-24T15:32:48...');
        // Let's search AuditLog
        const logs = await prisma.auditLog.findMany({
            where: {
                createdAt: {
                    gte: new Date('2026-05-24T15:30:00.000Z'),
                    lte: new Date('2026-05-24T15:35:00.000Z')
                }
            },
            take: 100
        });

        console.log(`Found ${logs.length} audit logs.`);
        logs.forEach(l => {
            console.log(`ID: ${l.id} | Action: ${l.action} | Entity: ${l.entity} | User: ${l.userId} | CreatedAt: ${l.createdAt.toISOString()}`);
            console.log(`Data: ${l.data ? JSON.stringify(l.data).substring(0, 300) : 'null'}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
