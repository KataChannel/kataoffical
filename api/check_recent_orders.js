const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRecentCreations() {
    const start = new Date('2026-04-17T00:00:00Z');
    const orders = await prisma.donhang.findMany({
        where: {
            createdAt: { gte: start }
        },
        select: { id: true, madonhang: true, ngaygiao: true, createdAt: true, status: true },
        orderBy: { createdAt: 'desc' },
        take: 10
    });
    console.log('Orders created since yesterday:', JSON.stringify(orders, null, 2));
}

checkRecentCreations().catch(console.error).finally(() => prisma.$disconnect());
