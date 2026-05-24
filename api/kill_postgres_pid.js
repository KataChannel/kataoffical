const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const result = await prisma.$queryRawUnsafe(`
            SELECT pg_terminate_backend(20023);
        `);
        console.log("Terminated backend pid 20023. Result:", result);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
