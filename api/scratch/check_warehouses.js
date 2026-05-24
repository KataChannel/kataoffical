const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('=== ALL WAREHOUSES ===');
    const warehouses = await prisma.kho.findMany();
    warehouses.forEach(w => {
        console.log(`ID: ${w.id} | Name: ${w.ten} | Code: ${w.code}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
