const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function auditOrders() {
    try {
        console.log("Searching for orders with VAT discrepancy (isshowvat is false but tongtien > sumItems)...");
        const allOrders = await prisma.donhang.findMany({
            where: {
                isshowvat: false,
                ngaygiao: {
                    gte: new Date('2025-01-01')
                }
            },
            include: { sanpham: true }
        });

        for (const dh of allOrders) {
            let sumItems = 0;
            for (const sp of dh.sanpham) {
                sumItems += (Number(sp.slnhan) || 0) * (Number(sp.giaban) || 0);
            }

            const diff = Number(dh.tongtien) - sumItems;

            if (diff > 1) {
                console.log(`Order: ${dh.madonhang}, ngaygiao: ${dh.ngaygiao.toISOString().split('T')[0]}, tongtien: ${dh.tongtien}, sumItems: ${sumItems}, Diff: ${diff}, vatRate: ${dh.vat}`);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

auditOrders();
