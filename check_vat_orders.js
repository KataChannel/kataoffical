const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrders() {
    const orderIds = ['TG-AA25883', 'TG-AA25843', 'TG-AA25871'];

    try {
        const orders = await prisma.donhang.findMany({
            where: {
                madonhang: {
                    in: orderIds
                }
            },
            include: {
                khachhang: true,
                sanpham: {
                    include: {
                        sanpham: true
                    }
                }
            }
        });

        console.log(JSON.stringify(orders, null, 2));
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkOrders();
