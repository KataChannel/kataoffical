const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('=== ALL KHO RECORDS RAW ===');
    const warehouses = await prisma.kho.findMany();
    console.dir(warehouses, { depth: null });
}

main().catch(console.error).finally(() => prisma.$disconnect());
