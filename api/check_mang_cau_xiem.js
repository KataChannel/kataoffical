
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP_LIST = ['I100727']; // Mãng Cầu Xiêm
const START_TIME = new Date('2026-01-01T00:00:00+07:00');

async function main() {
    console.log(`Checking logs for ${MASP_LIST} from ${START_TIME.toISOString()}...`);
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true, soluong: true, soluongkho: true }
    });

    if (products.length === 0) {
        console.log("Product not found in database.");
        return;
    }

    console.log("Current DB Status:", products);

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
            type: 'Xuat Kho',
            change: -Number(s.slnhan || s.sldat || 0),
            ref: s.donhang.madonhang,
            note: `Khách: ${s.donhang.khachhang?.name || 'N/A'}`
        });
    });

    purchases.forEach(p => {
        events.push({
            time: p.dathang.updatedAt,
            type: 'Nhap Kho',
            change: Number(p.slnhan || p.sldat || 0),
            ref: p.dathang.madncc,
            note: `NCC: ${p.dathang.nhacungcap?.name || 'N/A'}`
        });
    });

    stockTakes.forEach(st => {
        events.push({
            time: st.chotkho.ngaychot,
            type: 'Chốt Kho (Điều chỉnh)',
            change: Number(st.chenhlech || 0),
            ref: st.chotkho.codeId,
            note: `Trước: ${st.sltonhethong}, Thực tế: ${st.sltonthucte}`
        });
    });

    events.sort((a, b) => a.time - b.time);

    let currentBalance = 0;
    const history = events.map(e => {
        currentBalance += e.change;
        return { ...e, balance: currentBalance };
    });

    console.log(JSON.stringify(history, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
