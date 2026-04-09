const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';
const START_TIME = new Date('2026-04-08T13:00:00+07:00');

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    const pks = await prisma.phieuKhoSanpham.findMany({
        where: {
            sanphamId: product.id,
            createdAt: { gte: START_TIME }
        },
        include: {
            phieuKho: true
        }
    });

    console.log("Total PhieuKhoSanpham:", pks.length);
    pks.forEach(pk => {
        console.log(`Time: ${pk.createdAt.toISOString()}, Qty: ${pk.soluong}, Type: ${pk.phieuKho.type}, Maphieu: ${pk.phieuKho.maphieu}, Ref: ${pk.phieuKho.madonhang || pk.phieuKho.madncc}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
