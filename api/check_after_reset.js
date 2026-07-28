
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP_LIST = ['I100727']; // Mãng Cầu Xiêm
const START_TIME = new Date('2026-04-23T08:08:18Z');

async function main() {
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true, soluong: true, soluongkho: true }
    });

    if (products.length === 0) return;
    const spId = products[0].id;

    // 1. Fetch Sales (Xuat kho)
    const sales = await prisma.donhangsanpham.findMany({
        where: {
            idSP: spId,
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
            idSP: spId,
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

    events.sort((a, b) => a.time - b.time);

    let currentBalance = 0; // Assuming it was reset to 0 on 04-23
    const history = events.map(e => {
        currentBalance += e.change;
        return { ...e, balance: currentBalance };
    });

    console.log(`Events for Mãng Cầu Xiêm after 2026-04-23 (Reset to 0):`);
    console.log(JSON.stringify(history, null, 2));
    console.log("Current calculated balance:", currentBalance);
    console.log("Current DB soluong:", products[0].soluong);
}

main().catch(console.error).finally(() => prisma.$disconnect());
