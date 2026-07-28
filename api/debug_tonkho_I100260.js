const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
        },
    },
});

async function main() {
    const masp = 'I100260';
    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    const idSP = sp.id;

    const tonkho = await prisma.tonKho.findUnique({ where: { sanphamId: idSP } });

    // mimic the resolver logic for dates
    // Assuming today is March 6, 2026
    const start = new Date('2026-03-06T00:00:00+07:00');
    const end = new Date('2026-03-06T23:59:59+07:00');

    // Khach Giao Today
    const khachGiaoItems = await prisma.donhangsanpham.findMany({
        where: {
            idSP,
            donhang: {
                ngaygiao: { gte: start, lte: end },
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
            }
        },
        select: { slnhan: true }
    });
    const khachgiao = khachGiaoItems.reduce((acc, curr) => acc + Number(curr.slnhan || 0), 0);

    // Khach Dat Today (Pending)
    const khachDatItems = await prisma.donhangsanpham.findMany({
        where: {
            idSP,
            donhang: {
                ngaygiao: { gte: start, lte: end },
                status: 'dadat'
            }
        },
        select: { sldat: true }
    });
    const khachdat = khachDatItems.reduce((acc, curr) => acc + Number(curr.sldat || 0), 0);

    // Warehouse stock (incomingStock) - Actually "Tồn kho các kho nhánh"
    const sk = await prisma.sanphamKho.findMany({ where: { sanphamId: idSP } });
    const incomingStock = sk.reduce((acc, curr) => acc + Number(curr.soluong || 0), 0);

    // Data after last count
    const lastCountTime = tonkho.updatedAt ? new Date(tonkho.updatedAt).getTime() : 0;

    // Dathang (NCC) Received after count
    const dtItems = await prisma.dathangsanpham.findMany({
        where: {
            idSP,
            dathang: {
                status: 'danhan',
                updatedAt: { gt: tonkho.updatedAt }
            }
        },
        select: { slnhan: true, sldat: true }
    });
    const receivedAfterCount = dtItems.reduce((acc, curr) => acc + Number(curr.slnhan || curr.sldat || 0), 0);

    // Donhang (Khach) Delivered after count
    const dhItemsAfter = await prisma.donhangsanpham.findMany({
        where: {
            idSP,
            donhang: {
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                updatedAt: { gt: tonkho.updatedAt }
            }
        },
        select: { slnhan: true }
    });
    const deliveredAfterCount = dhItemsAfter.reduce((acc, curr) => acc + Number(curr.slnhan || 0), 0);

    const tongkho = Number(tonkho.sltontt) + receivedAfterCount - deliveredAfterCount + incomingStock;
    const tt_ui = tongkho - khachgiao;
    const goiy = khachdat + khachgiao - tongkho;

    console.log('--- DATA FOR I100260 ---');
    console.log(`DB TonKho slton: ${tonkho.slton}`);
    console.log(`DB TonKho sltontt: ${tonkho.sltontt}`);
    console.log(`DB TonKho updatedAt: ${tonkho.updatedAt.toISOString()} (Local: ${tonkho.updatedAt.toLocaleString()})`);
    console.log(`receivedAfterCount: ${receivedAfterCount}`);
    console.log(`deliveredAfterCount: ${deliveredAfterCount}`);
    console.log(`incomingStock: ${incomingStock}`);
    console.log(`khachgiao (Today): ${khachgiao}`);
    console.log(`khachdat (Today): ${khachdat}`);
    console.log(`--- CALCULATIONS ---`);
    console.log(`tongkho (Calculated): ${tongkho}`);
    console.log(`Tồn Hệ Thống (UI Display): ${tt_ui}`);
    console.log(`SL Cần Đặt (Gợi Ý): ${goiy}`);

    // Also check if there were any 'nhap' PhieuKho after updatedAt
    const pk = await prisma.phieuKhoSanpham.findMany({
        where: {
            sanphamId: idSP,
            phieuKho: { type: 'nhap', createdAt: { gt: tonkho.updatedAt } }
        },
        include: { phieuKho: true }
    });
    console.log(`\nNhap PhieuKho after count: ${pk.length}`);
    pk.forEach(p => console.log(`  ${p.phieuKho.createdAt}: Qty=${p.soluong}`));

}

main().catch(console.error).finally(() => prisma.$disconnect());
