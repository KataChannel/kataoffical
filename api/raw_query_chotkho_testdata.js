const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public"
        },
    },
});

async function main() {
    const result = await prisma.$queryRaw`SELECT * FROM "Chotkho" ORDER BY "createdAt" DESC LIMIT 5`;
    console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
