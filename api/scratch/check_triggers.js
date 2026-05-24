const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('=== CHECKING POSTGRESQL TRIGGERS ON SanphamKho AND TonKho ===');
    
    const triggers = await prisma.$queryRawUnsafe(`
        SELECT 
            tgname AS trigger_name,
            relname AS table_name,
            tgtype,
            proname AS function_name
        FROM pg_trigger
        JOIN pg_class ON pg_class.oid = tgrelid
        JOIN pg_proc ON pg_proc.oid = tgfoid
        WHERE relname IN ('SanphamKho', 'TonKho', 'sanpham_kho', 'ton_kho')
    `);

    console.dir(triggers, { depth: null });
}

main().catch(console.error).finally(() => prisma.$disconnect());
