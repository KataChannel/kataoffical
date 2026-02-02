const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProductLevel() {
    const madonhang = 'TG-AA25883';
    try {
        const dh = await prisma.donhang.findUnique({
            where: { madonhang },
            include: {
                sanpham: true
            }
        });

        console.log(`Order: ${dh.madonhang}, isshowvat: ${dh.isshowvat}, tongtien: ${dh.tongtien}, tongvat: ${dh.tongvat}`);
        for (const sp of dh.sanpham) {
            console.log(`  Prod idSP: ${sp.idSP}, slnhan: ${sp.slnhan}, giaban: ${sp.giaban}, ttnhan: ${sp.ttnhan}, vat: ${sp.vat}, ttsauvat: ${sp.ttsauvat}`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

checkProductLevel();
