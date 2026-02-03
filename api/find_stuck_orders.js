const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment-timezone');

async function findStuckOrders() {
    const now = moment().tz('Asia/Ho_Chi_Minh');
    const startOfToday = now.clone().startOf('day').toDate();

    console.log(`Checking for orders stuck in 'dagiao' with ngaygiao < ${startOfToday.toISOString()}`);

    const stuckOrders = await prisma.donhang.findMany({
        where: {
            status: 'dagiao',
            ngaygiao: {
                lt: startOfToday
            }
        },
        select: {
            id: true,
            madonhang: true,
            ngaygiao: true,
            updatedAt: true,
            khachhang: { select: { name: true } }
        },
        orderBy: {
            ngaygiao: 'asc'
        }
    });

    console.log(`Found ${stuckOrders.length} stuck orders:`);
    stuckOrders.forEach(order => {
        console.log(`- ${order.madonhang}: ngaygiao=${order.ngaygiao.toISOString()}, updatedAt=${order.updatedAt.toISOString()}, Customer=${order.khachhang?.name}`);
    });

    await prisma.$disconnect();
}

findStuckOrders().catch(err => {
    console.error(err);
    process.exit(1);
});
