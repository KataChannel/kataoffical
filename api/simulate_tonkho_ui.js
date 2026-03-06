// Simulate the backend logic and frontend mapping for I100260
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public"
        },
    },
});

async function main() {
    const masp = 'I100260';
    const start = new Date('2026-03-06T00:00:00+07:00'); // Assuming today
    const end = new Date('2026-03-06T23:59:59+07:00');

    const sanpham = await prisma.sanpham.findFirst({ where: { masp } });
    const idSP = sanpham.id;

    const tonkho = await prisma.tonKho.findUnique({ where: { sanphamId: idSP } });

    // Delivered Donhangs in range
    const donhangs = await prisma.donhangsanpham.findMany({
        where: {
            idSP,
            donhang: { ngaygiao: { gte: start, lte: end }, status: { in: ['dagiao', 'danhan', 'hoanthanh'] } }
        },
        include: { donhang: true }
    });

    const khachgiao = donhangs.reduce((sum, d) => sum + (Number(d.slnhan) || 0), 0);

    // Incoming Dathangs in range
    const dathangsRange = await prisma.dathangsanpham.findMany({
        where: {
            idSP,
            dathang: { ngaynhan: { gte: start, lte: end }, status: { not: 'huy' } }
        },
        include: { dathang: true }
    });

    const Dathangs = await prisma.dathangsanpham.findMany({
        where: { idSP, dathang: { status: { not: 'huy' } } },
        include: { dathang: true }
    });

    const Donhangs = await prisma.donhangsanpham.findMany({
        where: { idSP, donhang: { status: { not: 'huy' } } },
        include: { donhang: true }
    });

    const lastCountTime = tonkho.updatedAt ? new Date(tonkho.updatedAt).getTime() : 0;

    const receivedAfterCount = Dathangs
        .filter(dh => dh.dathang.status === 'danhan' && dh.dathang.updatedAt && new Date(dh.dathang.updatedAt).getTime() > lastCountTime)
        .reduce((sum, dh) => sum + (Number(dh.slnhan) || 0), 0);

    const deliveredAfterCount = Donhangs
        .filter(dh => ['dagiao', 'danhan', 'hoanthanh'].includes(dh.donhang.status) && dh.donhang.updatedAt && new Date(dh.donhang.updatedAt).getTime() > lastCountTime)
        .reduce((sum, dh) => sum + (Number(dh.slnhan) || 0), 0);

    const incomingStock = 0; // Assuming kho1..kho6 sum is 0 based on early queries

    const tongkho = Number(tonkho.sltontt) + receivedAfterCount - deliveredAfterCount + incomingStock;
    const tt_in_ui = tongkho - khachgiao;

    console.log(`Product: ${masp}`);
    console.log(`TonKho.sltontt: ${tonkho.sltontt}`);
    console.log(`TonKho.slton (DB): ${tonkho.slton}`);
    console.log(`TonKho.updatedAt: ${tonkho.updatedAt}`);
    console.log(`lastCountTime: ${lastCountTime}`);
    console.log(`receivedAfterCount: ${receivedAfterCount}`);
    console.log(`deliveredAfterCount: ${deliveredAfterCount}`);
    console.log(`tongkho (calculated): ${tongkho}`);
    console.log(`khachgiao (in range): ${khachgiao}`);
    console.log(`Tồn Hệ Thống (in UI, tt): ${tt_in_ui}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
