const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDates() {
    const lastOrders = await prisma.donhang.findMany({
        orderBy: { ngaygiao: 'desc' },
        take: 5,
        select: { id: true, madonhang: true, ngaygiao: true, status: true }
    });
    console.log('Last 5 orders by delivery date:', JSON.stringify(lastOrders, null, 2));

    const todayOrders = await prisma.donhang.findMany({
        where: {
            ngaygiao: {
                gte: new Date('2026-04-18T00:00:00Z'),
                lte: new Date('2026-04-18T23:59:59Z')
            }
        },
        take: 5
    });
    console.log('Orders on April 18 (UTC):', todayOrders.length);
}

checkDates().catch(console.error).finally(() => prisma.$disconnect());
