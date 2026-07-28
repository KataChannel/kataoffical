const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const codes = [
        'TG-AA14740', 'TG-AA14741',
        'TG-AA06936', 'TG-AA06940',
        'TG-AA04832', 'TG-AA04833',
        'TG-AA04024', 'TG-AA04026'
    ];

    try {
        const orders = await prisma.donhang.findMany({
            where: { madonhang: { in: codes } },
            select: {
                madonhang: true,
                khachhang: true,
                ngaygiao: true,
                tongtien: true,
                createdAt: true,
                updatedAt: true,
                order: true,
                status: true
            },
            orderBy: { createdAt: 'asc' }
        });

        console.log("Order Inspection Results:");
        orders.forEach(o => {
            console.log(`[${o.madonhang}] KH: ${o.khachhang} | NgayGiao: ${o.ngaygiao.toISOString()} | Tien: ${o.tongtien} | Created: ${o.createdAt.toISOString()} | Updated: ${o.updatedAt.toISOString()} | Order: ${o.order} | Status: ${o.status}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
