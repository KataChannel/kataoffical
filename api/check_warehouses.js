const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP },
        include: { SanphamKho: { include: { kho: true } } }
    });

    console.log("Product:", product.masp);
    console.log("Total warehouses:", product.SanphamKho.length);
    product.SanphamKho.forEach(sk => {
        console.log(`Warehouse: ${sk.kho.name} (${sk.kho.makho}), Qty: ${sk.soluong}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
