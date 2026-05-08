
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP_LIST = ['I100727']; // Mãng Cầu Xiêm

async function main() {
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true }
    });

    if (products.length === 0) return;
    const spId = products[0].id;

    const chotkhos = await prisma.chotkhodetail.findMany({
        where: { sanphamId: spId },
        include: { chotkho: { include: { kho: true } } },
        orderBy: { ngaychot: 'asc' }
    });

    console.log("History of Chot Kho for Mãng Cầu Xiêm with Kho information:");
    chotkhos.forEach(ck => {
        console.log(`${ck.ngaychot.toISOString()} | Kho: ${ck.chotkho.kho.name} (${ck.chotkho.khoId}) | System: ${ck.sltonhethong} | Actual: ${ck.sltonthucte}`);
    });

    const sales = await prisma.donhangsanpham.findMany({
        where: { idSP: spId, donhang: { updatedAt: { gte: new Date('2026-04-17T00:00:00Z') } } },
        include: { donhang: true }
    });
    console.log("\nSales Kho distribution:");
    sales.forEach(s => {
        console.log(`${s.donhang.updatedAt.toISOString()} | KhoId: ${s.donhang.khoId} | Qty: ${s.slnhan || s.sldat}`);
    });

    const purchases = await prisma.dathangsanpham.findMany({
        where: { idSP: spId, dathang: { updatedAt: { gte: new Date('2026-04-17T00:00:00Z') } } },
        include: { dathang: true }
    });
    console.log("\nPurchases Kho distribution:");
    purchases.forEach(p => {
        console.log(`${p.dathang.updatedAt.toISOString()} | KhoId: ${p.dathang.khoId} | Qty: ${p.slnhan || p.sldat}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
