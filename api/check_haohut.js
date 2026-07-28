const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    console.log("Product:", product.masp);
    console.log("haohut:", product.haohut);
}

main().catch(console.error).finally(() => prisma.$disconnect());
