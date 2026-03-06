const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
        },
    },
});

async function main() {
    const tonkhos = await prisma.tonKho.findMany({
        include: {
            sanpham: {
                select: { masp: true, title: true }
            }
        }
    });

    const discrepancies = [];

    for (const tk of tonkhos) {
        const sanphamId = tk.sanphamId;

        // Calculate reliable stock (simplified version of syncStockToReality)
        const [receivedAgg, deliveredAgg] = await Promise.all([
            prisma.dathangsanpham.aggregate({
                where: {
                    idSP: sanphamId,
                    dathang: {
                        updatedAt: { gt: tk.updatedAt },
                        status: 'danhan'
                    }
                },
                _sum: { slnhan: true }
            }),
            prisma.donhangsanpham.aggregate({
                where: {
                    idSP: sanphamId,
                    donhang: {
                        updatedAt: { gt: tk.updatedAt },
                        status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
                    }
                },
                _sum: { slnhan: true, sldat: true }
            })
        ]);

        const received = Number(receivedAgg._sum?.slnhan || 0);
        const delivered = Number(deliveredAgg._sum?.slnhan || deliveredAgg._sum?.sldat || 0);

        // Note: incomingStock is not in syncStockToReality logic but is in UI tongkho.
        // For slton sync, the logic uses tk.sltontt + fluctuations since updatedAt.
        const reliableTotal = Math.max(0, Number(tk.sltontt || 0) + received - delivered);

        if (Math.abs(reliableTotal - Number(tk.slton)) > 1) {
            discrepancies.push({
                masp: tk.sanpham.masp,
                title: tk.sanpham.title,
                slton_db: Number(tk.slton),
                sltontt_db: Number(tk.sltontt),
                reliable: reliableTotal,
                diff: reliableTotal - Number(tk.slton),
                updatedAt: tk.updatedAt
            });
        }
    }

    discrepancies.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

    console.log('Top 20 Inventory Discrepancies (DB slton vs Reliable Calculation):');
    console.table(discrepancies.slice(0, 20).map(d => ({
        MASP: d.masp,
        Title: d.title.substring(0, 30),
        'DB slton': d.slton_db,
        'Reliable': d.reliable,
        'Diff': d.diff
    })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
