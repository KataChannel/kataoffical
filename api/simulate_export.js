const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function simulateExport() {
    const orderIds = ['TG-AA25883', 'TG-AA25843', 'TG-AA25871'];

    try {
        const donhangs = await prisma.donhang.findMany({
            where: {
                madonhang: { in: orderIds }
            },
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                khachhang: true
            }
        });

        for (const dh of donhangs) {
            let orderTotal = 0;
            let sumWithoutVat = 0;
            console.log(`Order: ${dh.madonhang}, isshowvat: ${dh.isshowvat}, vatRate: ${dh.vat}`);

            for (const sp of dh.sanpham) {
                const slnhan = Number(sp.slnhan) || 0;
                if (slnhan > 0) {
                    const giaban = Number(sp.giaban) || 0;
                    // Line 445 logic
                    const vat = dh.isshowvat ? (Number(sp.sanpham?.vat) || 0) : 0;
                    const itemTotal = (slnhan * giaban) * (1 + vat);
                    orderTotal += itemTotal;
                    sumWithoutVat += (slnhan * giaban);

                    console.log(`  Item: ${sp.sanpham?.title}, slnhan: ${slnhan}, giaban: ${giaban}, sp_vat: ${sp.sanpham?.vat}, used_vat: ${vat}, itemTotal: ${itemTotal}`);
                }
            }
            console.log(`Order Total calculated: ${orderTotal}, Sum without VAT: ${sumWithoutVat}, DB Tongtien: ${dh.tongtien}`);
            console.log('---');
        }

    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

simulateExport();
