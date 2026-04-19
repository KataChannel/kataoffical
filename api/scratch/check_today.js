const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrdersToday() {
    const today = new Date('2026-04-19');
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await prisma.donhang.findMany({
        where: {
            ngaygiao: { gte: startOfDay, lte: endOfDay }
        },
        select: {
            madonhang: true,
            status: true,
            khachhang: { select: { name: true } }
        }
    });

    console.log(`Found ${orders.length} orders for 2026-04-19`);
    console.log(JSON.stringify(orders.slice(0, 10), null, 2));
}

checkOrdersToday().catch(console.error).finally(() => prisma.$disconnect());
