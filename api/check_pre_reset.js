
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP_LIST = ['I100727']; // Mãng Cầu Xiêm
const END_TIME = new Date('2026-04-23T08:08:18Z');

async function main() {
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true }
    });

    if (products.length === 0) return;
    const spId = products[0].id;

    const sales = await prisma.donhangsanpham.findMany({
        where: { idSP: spId, donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] }, updatedAt: { lt: END_TIME } } },
        include: { donhang: { select: { khoId: true, madonhang: true, updatedAt: true } } }
    });

    const purchases = await prisma.dathangsanpham.findMany({
        where: { idSP: spId, dathang: { status: 'danhan', updatedAt: { lt: END_TIME } } },
        include: { dathang: { select: { khoId: true, madncc: true, updatedAt: true } } }
    });

    console.log("Transactions BEFORE 2026-04-23:");
    
    const summary = {};
    sales.forEach(s => {
        const k = s.donhang.khoId || 'N/A';
        summary[k] = summary[k] || { xuat: 0, nhap: 0 };
        summary[k].xuat += Number(s.slnhan || s.sldat);
    });
    purchases.forEach(p => {
        const k = p.dathang.khoId || 'N/A';
        summary[k] = summary[k] || { xuat: 0, nhap: 0 };
        summary[k].nhap += Number(p.slnhan);
    });

    console.log(JSON.stringify(summary, null, 2));

    const khoNames = await prisma.kho.findMany({ where: { id: { in: Object.keys(summary) } } });
    khoNames.forEach(k => console.log(`${k.id} -> ${k.name}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
