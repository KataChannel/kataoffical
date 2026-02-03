const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment-timezone');

async function fixStuckOrders() {
    const now = moment().tz('Asia/Ho_Chi_Minh');
    const endOfToday = now.clone().endOf('day').toDate();

    console.log(`Fixing orders stuck in 'dagiao' with ngaygiao <= ${endOfToday.toISOString()}`);

    const stuckOrders = await prisma.donhang.findMany({
        where: {
            status: 'dagiao',
            ngaygiao: {
                lte: endOfToday
            }
        }
    });

    if (stuckOrders.length === 0) {
        console.log('No stuck orders found.');
        return;
    }

    console.log(`Found ${stuckOrders.length} orders to update.`);

    const currentTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    for (const order of stuckOrders) {
        try {
            await prisma.donhang.update({
                where: { id: order.id },
                data: {
                    status: 'danhan',
                    ghichu: `${order.ghichu ? order.ghichu + ' | ' : ''}[FIX] Tự động giải kẹt trạng thái lúc ${currentTime}`,
                    updatedAt: new Date(),
                },
            });
            console.log(`✅ Updated ${order.madonhang}`);
        } catch (error) {
            console.error(`❌ Failed to update ${order.madonhang}:`, error);
        }
    }

    await prisma.$disconnect();
}

fixStuckOrders().catch(err => {
    console.error(err);
    process.exit(1);
});
