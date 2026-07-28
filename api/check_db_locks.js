const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const activeQueries = await prisma.$queryRawUnsafe(`
            SELECT 
                pid,
                usename,
                client_addr,
                backend_start,
                query_start,
                state,
                wait_event_type,
                wait_event,
                pg_blocking_pids(pid) as blocked_by,
                query
            FROM pg_stat_activity
            WHERE state != 'idle' AND pid != pg_backend_pid();
        `);
        console.log("=== Active Database Sessions ===");
        console.log(JSON.stringify(activeQueries, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
