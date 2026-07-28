const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';
const AFTER_TIME = new Date('2026-04-09T10:03:40Z'); // 17:03:40 GMT+7

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    const sales = await prisma.donhangsanpham.findMany({
        where: { idSP: product.id, donhang: { updatedAt: { gte: AFTER_TIME } } },
        include: { donhang: true }
    });
    console.log("Recent Sales:", sales.length);

    const purchases = await prisma.dathangsanpham.findMany({
        where: { idSP: product.id, dathang: { updatedAt: { gte: AFTER_TIME } } },
        include: { dathang: true }
    });
    console.log("Recent Purchases:", purchases.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
