const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAnyOrders() {
    const orders = await prisma.donhang.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
            madonhang: true,
            ngaygiao: true,
            status: true,
            khachhang: { select: { name: true } }
        }
    });

    console.log(JSON.stringify(orders, null, 2));
}

checkAnyOrders().catch(console.error).finally(() => prisma.$disconnect());
