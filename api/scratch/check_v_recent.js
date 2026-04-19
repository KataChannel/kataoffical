const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRecentOrders() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const orders = await prisma.donhang.findMany({
        where: {
            createdAt: { gte: oneDayAgo }
        },
        include: {
            khachhang: true,
            sanpham: { include: { sanpham: true } }
        }
    });

    console.log(`Found ${orders.length} orders created in the last 24h`);
    orders.forEach(o => {
        console.log(`DH: ${o.madonhang}, KH: ${o.khachhang?.name}, Status: ${o.status}`);
        o.sanpham.forEach(sp => {
            console.log(`  - SP: ${sp.sanpham?.title}, SLDat: ${sp.sldat}, IsActive: ${sp.isActive}, SLHuy: ${sp.slhuy}`);
        });
    });
}

checkRecentOrders().catch(console.error).finally(() => prisma.$disconnect());
