const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixVat() {
    try {
        console.log("Starting VAT consistency fix...");
        const orders = await prisma.donhang.findMany({
            where: {
                ngaygiao: {
                    gte: new Date('2025-01-01') // Only fix current year for safety
                }
            },
            include: { sanpham: true }
        });

        console.log(`Auditing ${orders.length} orders...`);
        let fixCount = 0;

        for (const dh of orders) {
            let sumItems = 0;
            for (const sp of dh.sanpham) {
                sumItems += (Number(sp.slnhan) || 0) * (Number(sp.giaban) || 0);
            }

            const vatRate = dh.isshowvat ? (Number(dh.vat) || 0) : 0;
            const expectedTongvat = sumItems * vatRate;
            const expectedTongtien = sumItems + expectedTongvat;

            const diffVat = Math.abs(expectedTongvat - (Number(dh.tongvat) || 0));
            const diffTotal = Math.abs(expectedTongtien - (Number(dh.tongtien) || 0));

            if (diffVat > 0.1 || diffTotal > 0.1) {
                console.log(`Fixing Order: ${dh.madonhang}, isshowvat: ${dh.isshowvat}`);
                console.log(`  Current - Tongvat: ${dh.tongvat}, Tongtien: ${dh.tongtien}`);
                console.log(`  Expected - Tongvat: ${expectedTongvat}, Tongtien: ${expectedTongtien}`);

                await prisma.donhang.update({
                    where: { id: dh.id },
                    data: {
                        tongvat: expectedTongvat,
                        tongtien: expectedTongtien
                    }
                });
                fixCount++;
            }
        }

        console.log(`VAT consistency fix completed. Fixed ${fixCount} orders.`);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

fixVat();
