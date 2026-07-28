const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    const orders = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                status: 'dadat'
            }
        },
        include: {
            donhang: true
        }
    });

    console.log("Total Pending Orders (dadat):", orders.length);
    let totalQty = 0;
    orders.forEach(o => {
        totalQty += Number(o.sldat || 0);
        console.log(`Order: ${o.donhang.madonhang}, Qty: ${o.sldat}, Date: ${o.donhang.ngaygiao}`);
    });
    console.log("Total Qty in Pending Orders:", totalQty);
}

main().catch(console.error).finally(() => prisma.$disconnect());
