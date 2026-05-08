
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
        include: { chotkho: true },
        orderBy: { ngaychot: 'asc' }
    });

    console.log("History of Chot Kho for Mãng Cầu Xiêm:");
    chotkhos.forEach(ck => {
        console.log(`${ck.ngaychot.toISOString()} | Title: ${ck.chotkho.title} | System: ${ck.sltonhethong} | Actual: ${ck.sltonthucte} | Diff: ${ck.chenhlech}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
