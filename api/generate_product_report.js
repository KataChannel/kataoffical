const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

const MASP_LIST = [
    'I100233', 'I100479', 'I100207', 'I100003', 'I100002',
    'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'
];

const START_TIME = new Date('2026-04-08T13:00:00+07:00');

async function getStockAt(idSP, targetTime) {
    const tk = await prisma.tonKho.findUnique({ where: { sanphamId: idSP } });
    if (!tk) return 0;

    const now = new Date();
    const lastCountTime = tk.updatedAt;

    // Current stock from TonKho + recent dh/dhsp updates
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
    const stockNow = Number(tk.sltontt || 0) + receivedNow - deliveredNow;

    // Rewind to targetTime
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

    // Also rewind manual adjustments
    const adjustments = await prisma.chotkhodetail.aggregate({
        where: {
            sanphamId: idSP,
            chotkho: { ngaychot: { gte: targetTime, lte: now } }
        },
        _sum: { chenhlech: true }
    });

    const recSince = Number(receivedSinceTarget._sum?.slnhan || 0);
    const delSince = Number(deliveredSinceTarget._sum?.slnhan || deliveredSinceTarget._sum?.sldat || 0);
    const adjSince = Number(adjustments._sum?.chenhlech || 0);

    // Stock(target) = Stock(now) - Receipts - Adjs + Deliveries
    // Wait, if adj was sl_hethong - sl_thucte = 39 (reduced 39 to match 72).
    // So if stock now is 72, and adj was 39, then stock before was 111.
    // Stock(target) = Stock(now) - recSince + delSince + adjSince
    return stockNow - recSince + delSince + adjSince;
}

async function main() {
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true, dvt: true }
    });

    const productMap = {};
    const productBalances = {};

    for (const p of products) {
        productMap[p.id] = p;
        const initialStock = await getStockAt(p.id, START_TIME);
        productBalances[p.id] = initialStock;
    }

    const spIds = products.map(p => p.id);

    // 1. Fetch Sales
    const sales = await prisma.donhangsanpham.findMany({
        where: {
            idSP: { in: spIds },
            donhang: {
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            donhang: { select: { madonhang: true, updatedAt: true, khachhang: { select: { name: true } } } }
        }
    });

    // 2. Fetch Purchases
    const purchases = await prisma.dathangsanpham.findMany({
        where: {
            idSP: { in: spIds },
            dathang: {
                status: 'danhan',
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            dathang: { select: { madncc: true, updatedAt: true, nhacungcap: { select: { name: true } } } }
        }
    });

    // 3. Fetch Stock Takes
    const stockTakes = await prisma.chotkhodetail.findMany({
        where: {
            sanphamId: { in: spIds },
            chotkho: { ngaychot: { gte: START_TIME } }
        },
        include: {
            chotkho: { select: { codeId: true, ngaychot: true } }
        }
    });

    const events = [];

    sales.forEach(s => {
        events.push({
            time: s.donhang.updatedAt,
            spId: s.idSP,
            type: 'Xuất Kho',
            change: -Number(s.slnhan || s.sldat || 0),
            ref: s.donhang.madonhang,
            note: `Khách: ${s.donhang.khachhang?.name || 'N/A'}`
        });
    });

    purchases.forEach(p => {
        events.push({
            time: p.dathang.updatedAt,
            spId: p.idSP,
            type: 'Nhập Kho',
            change: Number(p.slnhan || p.sldat || 0),
            ref: p.dathang.madncc,
            note: `NCC: ${p.dathang.nhacungcap?.name || 'N/A'}`
        });
    });

    stockTakes.forEach(st => {
        // chenhlech = he_thong - thucte. 
        // Example: HT 111, TT 72 => CL 39. So we subtract 39.
        events.push({
            time: st.chotkho.ngaychot,
            spId: st.sanphamId,
            type: 'Chốt Kho',
            change: -Number(st.chenhlech || 0),
            ref: st.chotkho.codeId,
            note: `Hệ thống: ${st.sltonhethong}, Thực tế: ${st.sltonthucte}`
        });
    });

    events.sort((a, b) => a.time - b.time);

    let md = "# Bảng Ghi Nhận Thay Đổi Số Lượng Sản Phẩm (Nâng cao)\n";
    md += `*Thời gian: Từ 13h 08/04/2026 đến hiện tại*\n\n`;

    md += "| Thời gian | Mã SP | Tên Sản Phẩm | ĐVT | Loại Giao Dịch | Trước | Thay Đổi | Sau | Tham Chiếu | Ghi Chú |\n";
    md += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n";

    for (const e of events) {
        const p = productMap[e.spId];
        const before = productBalances[e.spId];
        const after = before + e.change;
        productBalances[e.spId] = after;

        const timeStr = new Date(e.time).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const changeStr = e.change > 0 ? `+${e.change}` : `${e.change}`;
        
        md += `| ${timeStr} | ${p.masp} | ${p.title} | ${p.dvt} | ${e.type} | ${Number(before.toFixed(2))} | **${changeStr}** | ${Number(after.toFixed(2))} | ${e.ref} | ${e.note} |\n`;
    }

    fs.writeFileSync('../docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md', md);
    console.log("Report updated: thay_doi_sl_san_pham_20260408_13h.md");
}

main().catch(console.error).finally(() => prisma.$disconnect());
