const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkIsActive() {
    const items = await prisma.donhangsanpham.findMany({
        take: 20,
        select: {
            id: true,
            isActive: true,
            sldat: true,
            donhang: { select: { madonhang: true } }
        }
    });

    console.log(JSON.stringify(items, null, 2));
}

checkIsActive().catch(console.error).finally(() => prisma.$disconnect());
