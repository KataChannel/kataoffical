const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    // Check all sources for 11.5
    const sales = await prisma.donhangsanpham.findMany({
        where: { idSP: product.id, slnhan: 11.5 }
    });
    console.log("Sales with 11.5:", sales.length);

    const purchases = await prisma.dathangsanpham.findMany({
        where: { idSP: product.id, slnhan: 11.5 }
    });
    console.log("Purchases with 11.5:", purchases.length);

    const pks = await prisma.phieuKhoSanpham.findMany({
        where: { sanphamId: product.id, soluong: 11.5 }
    });
    console.log("PhieuKho with 11.5:", pks.length);
    
    const stocktakes = await prisma.chotkhodetail.findMany({
        where: { sanphamId: product.id, sltonhethong: 11.5 }
    });
    console.log("Stocktakes with sys=11.5:", stocktakes.length);
    stocktakes.forEach(st => console.log(`Time: ${st.createdAt}, Sys: ${st.sltonhethong}, Actual: ${st.sltonthucte}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
