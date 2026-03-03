const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const sp = await prisma.sanpham.findFirst({ where: { masp: 'I100260' } });

    const dathangs = await prisma.dathang.findMany({
        where: {
            status: { in: ['dadat', 'dagiao'] },
            createdAt: { gte: threeMonthsAgo },
            isActive: true
        },
        include: { sanpham: { where: { idSP: sp.id } } }
    });

    console.log(`Found ${dathangs.length} active orders containing this product in dadat/dagiao in the last 3 months`);

    let sldat_total = 0;
    for (const dh of dathangs) {
        let dh_sum = 0;
        for (const dsp of dh.sanpham) {
            sldat_total += Number(dsp.sldat);
            dh_sum += Number(dsp.sldat);
        }
        if (dh_sum > 0) {
            console.log(`- Order ${dh.id} (status: ${dh.status}, date: ${dh.ngaynhan?.toISOString()}) has sldat: ${dh_sum}`);
        }
    }
}
run().finally(() => prisma.$disconnect());
