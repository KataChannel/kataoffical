const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSpecificOrders() {
    const ids = ['TG-AA25883', 'TG-AA25843', 'TG-AA25871'];
    try {
        const orders = await prisma.donhang.findMany({
            where: { madonhang: { in: ids } },
            include: { sanpham: true }
        });

        for (const dh of orders) {
            let sumItems = 0;
            for (const sp of dh.sanpham) {
                sumItems += (Number(sp.slnhan) || 0) * (Number(sp.giaban) || 0);
            }
            console.log(`Order: ${dh.madonhang}, isshowvat: ${dh.isshowvat}, vatRate: ${dh.vat}, tongtien: ${dh.tongtien}, sumItems: ${sumItems}`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

checkSpecificOrders();
