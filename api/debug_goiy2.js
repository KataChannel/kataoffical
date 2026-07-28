const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
    const sp = await prisma.sanpham.findFirst({ where: { masp: 'I100260' } });

    const dathangs = await prisma.dathang.findMany({
        where: {
            status: { in: ['dadat', 'dagiao'] },
            isActive: true
        },
        include: { sanpham: { where: { idSP: sp.id } } }
    });

    let sldat_total = 0;
    for (const dh of dathangs) {
        for (const dsp of dh.sanpham) {
            sldat_total += Number(dsp.sldat);
        }
    }
    console.log('Incoming stock (dadat/dagiao) [dathang.sldat]:', sldat_total);

    const dathangsNhan = await prisma.dathang.findMany({
        where: { status: 'danhan', isActive: true },
        include: { sanpham: { where: { idSP: sp.id } } }
    });
    let slnhan_total = 0;
    for (const dh of dathangsNhan) {
        for (const dsp of dh.sanpham) {
            slnhan_total += Number(dsp.slnhan);
        }
    }
    console.log('Received stock (danhan, no date filter) [dathang.slnhan]:', slnhan_total);
}
run().finally(() => prisma.$disconnect());
