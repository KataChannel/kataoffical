const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrders() {
    const madonhangs = ['TG-AA37911', 'TG-AA37904'];
    const orders = await prisma.donhang.findMany({
        where: { madonhang: { in: madonhangs } },
        include: {
            khachhang: { include: { nhomkhachhang: true } },
            sanpham: { include: { sanpham: true } }
        }
    });

    console.log(JSON.stringify(orders, null, 2));
}

checkOrders().catch(console.error).finally(() => prisma.$disconnect());
