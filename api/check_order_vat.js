
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrder() {
    const order = await prisma.donhang.findFirst({
        where: { madonhang: 'TG-AA25881' },
        include: {
            sanpham: {
                include: {
                    sanpham: true
                }
            },
            khachhang: true
        }
    });

    console.log(JSON.stringify(order, null, 2));
    await prisma.$disconnect();
}

checkOrder();
