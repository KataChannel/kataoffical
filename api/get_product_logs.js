const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP_LIST = [
    'I100233', 'I100479', 'I100207', 'I100003', 'I100002',
    'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'
];

const START_TIME = new Date('2026-04-08T13:00:00+07:00');

async function main() {
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true }
    });

    const productMap = {};
    products.forEach(p => productMap[p.id] = p);
    const spIds = products.map(p => p.id);

    // 1. Fetch Sales (Xuat kho)
    const sales = await prisma.donhangsanpham.findMany({
        where: {
            idSP: { in: spIds },
            donhang: {
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            donhang: {
                select: { madonhang: true, ngaygiao: true, updatedAt: true, khachhang: { select: { name: true } } }
            }
        }
    });

    // 2. Fetch Purchases (Nhap kho)
    const purchases = await prisma.dathangsanpham.findMany({
        where: {
            idSP: { in: spIds },
            dathang: {
                status: 'danhan',
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            dathang: {
                select: { madncc: true, ngaynhan: true, updatedAt: true, nhacungcap: { select: { name: true } } }
            }
        }
    });

    // 3. Fetch Stock Takes (Chot kho)
    const stockTakes = await prisma.chotkhodetail.findMany({
        where: {
            sanphamId: { in: spIds },
            chotkho: {
                ngaychot: { gte: START_TIME }
            }
        },
        include: {
            chotkho: {
                select: { codeId: true, ngaychot: true, title: true }
            }
        }
    });

    // 4. Combine and Sort
    const events = [];

    sales.forEach(s => {
        events.push({
            time: s.donhang.updatedAt,
            masp: productMap[s.idSP].masp,
            name: productMap[s.idSP].title,
            type: 'Xuat Kho',
            change: -Number(s.slnhan || s.sldat || 0),
            ref: s.donhang.madonhang,
            note: `Khách: ${s.donhang.khachhang?.name || 'N/A'}`
        });
    });

    purchases.forEach(p => {
        events.push({
            time: p.dathang.updatedAt,
            masp: productMap[p.idSP].masp,
            name: productMap[p.idSP].title,
            type: 'Nhap Kho',
            change: Number(p.slnhan || p.sldat || 0),
            ref: p.dathang.madncc,
            note: `NCC: ${p.dathang.nhacungcap?.name || 'N/A'}`
        });
    });

    stockTakes.forEach(st => {
        events.push({
            time: st.chotkho.ngaychot,
            masp: productMap[st.sanphamId].masp,
            name: productMap[st.sanphamId].title,
            type: 'Chốt Kho (Điều chỉnh)',
            change: Number(st.chenhlech || 0),
            ref: st.chotkho.codeId,
            note: `Trước: ${st.sltonhethong}, Thực tế: ${st.sltonthucte}`
        });
    });

    events.sort((a, b) => a.time - b.time);

    console.log(JSON.stringify(events, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
