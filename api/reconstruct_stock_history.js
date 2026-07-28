const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
        },
    },
});

async function getStockAt(idSP, targetTime) {
    const tk = await prisma.tonKho.findUnique({ where: { sanphamId: idSP } });
    if (!tk) return 0;

    // 1. Calculate Reliable Stock NOW
    const now = new Date();
    const lastCountTime = tk.updatedAt;

    const [receivedAggNow, deliveredAggNow] = await Promise.all([
        prisma.dathangsanpham.aggregate({
            where: {
                idSP,
                dathang: { status: 'danhan', updatedAt: { gt: lastCountTime } }
            },
            _sum: { slnhan: true }
        }),
        prisma.donhangsanpham.aggregate({
            where: {
                idSP,
                donhang: {
                    status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                    updatedAt: { gt: lastCountTime }
                }
            },
            _sum: { slnhan: true, sldat: true }
        })
    ]);

    const receivedNow = Number(receivedAggNow._sum?.slnhan || 0);
    const deliveredNow = Number(deliveredAggNow._sum?.slnhan || deliveredAggNow._sum?.sldat || 0);

    // Check incoming Stock (this is usually the sum of current inventory in other warehouses)
    const skAgg = await prisma.sanphamKho.aggregate({
        where: { sanphamId: idSP },
        _sum: { soluong: true }
    });
    const incoming = Number(skAgg._sum?.soluong || 0);

    const stockNow = Number(tk.sltontt || 0) + receivedNow - deliveredNow + incoming;

    // 2. Rewind from NOW to targetTime
    // Stock(target) = Stock(now) - Receipts(target -> now) + Deliveries(target -> now)
    const [receivedSinceTarget, deliveredSinceTarget] = await Promise.all([
        prisma.dathangsanpham.aggregate({
            where: {
                idSP,
                dathang: { status: 'danhan', updatedAt: { gte: targetTime, lte: now } }
            },
            _sum: { slnhan: true }
        }),
        prisma.donhangsanpham.aggregate({
            where: {
                idSP,
                donhang: {
                    status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                    updatedAt: { gte: targetTime, lte: now }
                }
            },
            _sum: { slnhan: true, sldat: true }
        })
    ]);

    const recSince = Number(receivedSinceTarget._sum?.slnhan || 0);
    const delSince = Number(deliveredSinceTarget._sum?.slnhan || deliveredSinceTarget._sum?.sldat || 0);

    return stockNow - recSince + delSince;
}

async function main() {
    const masp = 'I100260';
    const sp = await prisma.sanpham.findUnique({ where: { masp } });

    const times = [
        { label: '07:00 03/03/2026', time: new Date('2026-03-03T07:00:00+07:00') },
        { label: '07:00 04/03/2026', time: new Date('2026-03-04T07:00:00+07:00') },
        { label: '07:00 05/03/2026', time: new Date('2026-03-05T07:00:00+07:00') },
        { label: '07:00 06/03/2026', time: new Date('2026-03-06T07:00:00+07:00') },
        { label: 'Hiện tại (Ready)', time: new Date() }
    ];

    console.log(`Reconstructing Stock History for ${masp} (${sp.title}):`);
    for (const t of times) {
        const stock = await getStockAt(sp.id, t.time);
        console.log(`${t.label.padEnd(20)}: Reliable Stock = ${stock.toFixed(2)}`);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
