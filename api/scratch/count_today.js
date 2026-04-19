const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment');

async function countOrders() {
    const start = moment('2026-04-19').startOf('day').toISOString();
    const end = moment('2026-04-19').endOf('day').toISOString();

    const orders = await prisma.donhang.findMany({
        where: {
            ngaygiao: { gte: start, lte: end },
            status: { not: 'huy' }
        },
        include: {
            khachhang: {
                include: { nhomkhachhang: true }
            }
        }
    });

    console.log(`Total active orders: ${orders.length}`);
    orders.forEach(o => {
        const categories = o.khachhang?.nhomkhachhang?.map(n => n.name).join(', ') || 'None';
        const type = o.khachhang?.loaikh || 'None';
        console.log(`- ${o.madonhang} | ${o.khachhang?.name} | Cat: ${categories} | Type: ${type}`);
    });
}

countOrders().catch(console.error).finally(() => prisma.$disconnect());
