const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const lastChotkho = await prisma.chotkho.findFirst({
            where: { isActive: true },
            orderBy: { ngaychot: 'desc' },
            include: {
                details: {
                    include: { sanpham: true }
                }
            }
        });

        if (!lastChotkho) {
            console.log("No ChotKho found.");
            return;
        }

        const startDate = lastChotkho.ngaychot;
        console.log(`Analyzing from last closing: ${lastChotkho.title} (${startDate.toISOString()})`);

        // 1. Starting Balance from ChotKho
        const stats = new Map();
        lastChotkho.details.forEach(d => {
            if (!d.sanpham) return;
            stats.set(d.sanphamId, {
                masp: d.sanpham.masp,
                title: d.sanpham.title,
                initial: Number(d.sltonthucte || 0),
                nhap_internal: 0,
                xuat_internal: 0,
                sales: 0,
                purchases: 0,
                currentSystem: 0
            });
        });

        // 2. Fetch all PhieuKho since startDate
        const phieuKhos = await prisma.phieuKho.findMany({
            where: {
                ngay: { gt: startDate },
                isActive: true
            },
            include: {
                sanpham: { include: { sanpham: true } }
            }
        });

        phieuKhos.forEach(pk => {
            pk.sanpham.forEach(pks => {
                if (!pks.sanphamId) return;
                if (!stats.has(pks.sanphamId)) {
                    stats.set(pks.sanphamId, {
                        masp: pks.sanpham.masp,
                        title: pks.sanpham.title,
                        initial: 0, nhap_internal: 0, xuat_internal: 0, sales: 0, purchases: 0, currentSystem: 0
                    });
                }
                const s = stats.get(pks.sanphamId);
                // We only count PhieuKho if they ARE NOT linked to DonHang or DatHang to avoid double counting
                // We also exclude automated 'PX-TG-' vouchers which are logically linked to sales orders
                if (!pk.madonhang && !pk.madncc && !pk.maphieu?.startsWith('PX-TG-')) {
                    if (pk.type === 'nhap') s.nhap_internal += Number(pks.soluong || 0);
                    else if (pk.type === 'xuat') s.xuat_internal += Number(pks.soluong || 0);
                }
            });
        });

        // 3. Fetch all DonHang since startDate
        const donhangs = await prisma.donhang.findMany({
            where: {
                ngaygiao: { gt: startDate },
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
            },
            include: {
                sanpham: { include: { sanpham: true } }
            }
        });

        donhangs.forEach(dh => {
            dh.sanpham.forEach(dhs => {
                if (!dhs.idSP) return;
                if (!stats.has(dhs.idSP)) {
                    stats.set(dhs.idSP, {
                        masp: dhs.sanpham.masp,
                        title: dhs.sanpham.title,
                        initial: 0, nhap_internal: 0, xuat_internal: 0, sales: 0, purchases: 0, currentSystem: 0
                    });
                }
                const s = stats.get(dhs.idSP);
                s.sales += Number(dhs.slnhan || dhs.slgiao || 0);
            });
        });

        // 4. Fetch all DatHang since startDate
        const dathangs = await prisma.dathang.findMany({
            where: {
                ngaynhan: { gt: startDate },
                status: { in: ['danhan', 'hoanthanh'] }
            },
            include: {
                sanpham: { include: { sanpham: true } }
            }
        });

        dathangs.forEach(dt => {
            dt.sanpham.forEach(dts => {
                if (!dts.idSP) return;
                if (!stats.has(dts.idSP)) {
                    stats.set(dts.idSP, {
                        masp: dts.sanpham.masp,
                        title: dts.sanpham.title,
                        initial: 0, nhap_internal: 0, xuat_internal: 0, sales: 0, purchases: 0, currentSystem: 0
                    });
                }
                const s = stats.get(dts.idSP);
                s.purchases += Number(dts.slnhan || dts.slgiao || 0);
            });
        });

        // 5. Get Current TonKho
        const currentTonKho = await prisma.tonKho.findMany({
            include: { sanpham: true }
        });
        currentTonKho.forEach(tk => {
            if (stats.has(tk.sanphamId)) {
                stats.get(tk.sanphamId).currentSystem = Number(tk.sltontt || 0);
            }
        });

        // 6. Summary and Final Comparison
        const result = Array.from(stats.values()).map(s => {
            const expected = s.initial + s.nhap_internal - s.xuat_internal + s.purchases - s.sales;
            const diff = s.currentSystem - expected;
            return {
                ...s,
                expected: Number(expected.toFixed(3)),
                diff: Number(diff.toFixed(3))
            };
        }).filter(s => s.nhap_internal !== 0 || s.xuat_internal !== 0 || s.sales !== 0 || s.purchases !== 0 || s.diff !== 0);

        console.log(JSON.stringify({
            summary: {
                lastClosing: lastChotkho.title,
                date: startDate,
                totalProductsTracked: stats.size,
                productsWithActivity: result.length,
                phieuKhoCount: phieuKhos.length,
                salesCount: donhangs.length,
                purchasesCount: dathangs.length
            },
            details: result.slice(0, 50) // Limit to top 50 for display
        }, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
