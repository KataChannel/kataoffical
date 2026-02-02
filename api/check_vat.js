const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProductVAT() {
    try {
        const sp = await prisma.sanpham.findFirst({
            where: { title: 'Tỏi lột' }
        });
        console.log(`Product: ${sp.title}, VAT: ${sp.vat}`);

        const dhsp = await prisma.donhangsanpham.findFirst({
            where: { idSP: sp.id, donhang: { madonhang: 'TG-AA25883' } }
        });
        console.log(`Donhangsanpham VAT: ${dhsp.vat}`);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

checkProductVAT();
