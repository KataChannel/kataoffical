const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrder() {
    try {
        const dh = await prisma.donhang.findUnique({
            where: { madonhang: 'TG-AA24327' },
            include: { sanpham: { include: { sanpham: true } } }
        });

        if (!dh) {
            console.log("Order not found");
            return;
        }

        console.log(`Order: ${dh.madonhang}, isshowvat: ${dh.isshowvat}, vat: ${dh.vat}`);
        for (const sp of dh.sanpham) {
            console.log(`  Prod: ${sp.sanpham.title}, vat: ${sp.vat}, ttnhan: ${sp.ttnhan}, ttsauvat: ${sp.ttsauvat}`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

checkOrder();
