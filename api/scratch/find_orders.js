const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findOrders() {
    const orders = await prisma.donhang.findMany({
        where: {
            OR: [
                { khachhang: { name: { contains: 'SIAM' } } },
                { khachhang: { name: { contains: 'Anh Sơn' } } }
            ]
        },
        include: {
            khachhang: true,
            sanpham: { include: { sanpham: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 20
    });

    console.log(JSON.stringify(orders, null, 2));
}

findOrders().catch(console.error).finally(() => prisma.$disconnect());
