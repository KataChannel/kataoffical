const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP },
        include: { TonKho: true }
    });

    console.log("Product:", product.masp, product.title);
    console.log("soluong:", product.soluong);
    console.log("soluongkho:", product.soluongkho);
    if (product.TonKho) {
        console.log("TonKho slton:", product.TonKho.slton);
        console.log("TonKho slchogiao:", product.TonKho.slchogiao);
        console.log("TonKho slchonhap:", product.TonKho.slchonhap);
        console.log("TonKho sltontt:", product.TonKho.sltontt);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
