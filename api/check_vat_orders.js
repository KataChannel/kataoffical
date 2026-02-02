const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrders() {
    const orderId = 'TG-AA25843';

    try {
        const order = await prisma.donhang.findUnique({
            where: {
                madonhang: orderId
            },
            include: {
                sanpham: true
            }
        });

        const sumTtnhan = order.sanpham.reduce((acc, sp) => acc + parseFloat(sp.ttnhan || 0), 0);
        const sumTtgiao = order.sanpham.reduce((acc, sp) => acc + parseFloat(sp.ttgiao || 0), 0);

        console.log({
            madonhang: order.madonhang,
            tongtien: order.tongtien,
            sumTtnhan,
            sumTtgiao,
            diff_tien_ttnhan: parseFloat(order.tongtien) - sumTtnhan,
            diff_tien_ttgiao: parseFloat(order.tongtien) - sumTtgiao
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkOrders();
