
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP_LIST = ['I100727']; // Mãng Cầu Xiêm
const START_TIME = new Date('2026-04-23T08:08:18Z');
const END_TIME = new Date('2026-05-05T00:00:00Z');

async function main() {
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true }
    });

    if (products.length === 0) return;
    const spId = products[0].id;

    const sales = await prisma.donhangsanpham.findMany({
        where: {
            idSP: spId,
            donhang: {
                updatedAt: { gte: START_TIME, lte: END_TIME }
            }
        },
        include: {
            donhang: {
                select: { madonhang: true, status: true, updatedAt: true, khachhang: { select: { name: true } } }
            }
        }
    });

    const purchases = await prisma.dathangsanpham.findMany({
        where: {
            idSP: spId,
            dathang: {
                updatedAt: { gte: START_TIME, lte: END_TIME }
            }
        },
        include: {
            dathang: {
                select: { madncc: true, status: true, updatedAt: true, nhacungcap: { select: { name: true } } }
            }
        }
    });

    console.log(`ALL events for Mãng Cầu Xiêm between 2026-04-23 and 2026-05-05:`);
    console.log("Sales:", JSON.stringify(sales, null, 2));
    console.log("Purchases:", JSON.stringify(purchases, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
