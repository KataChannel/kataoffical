const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function auditOrders() {
    try {
        const orders = await prisma.donhang.findMany({
            where: {
                khachhang: {
                    makh: 'Mùa Vàng - Bò Tơ Quán Mộc' // Just a guess based on the customer name
                },
                ngaygiao: {
                    gte: new Date('2025-01-01'),
                    lte: new Date('2025-01-31')
                }
            },
            include: {
                sanpham: true
            }
        });

        if (orders.length === 0) {
            // Try finding by ID if makh didn't work
            console.log("No orders found for the specific makh. Searching for orders with discrepancy...");
            const allOrders = await prisma.donhang.findMany({
                where: {
                    ngaygiao: {
                        gte: new Date('2025-01-20'), // Narrow down
                        lte: new Date('2025-02-05')
                    }
                },
                include: { sanpham: { include: { sanpham: true } } }
            });

            for (const dh of allOrders) {
                let sumItems = 0;
                for (const sp of dh.sanpham) {
                    sumItems += (Number(sp.slnhan) || 0) * (Number(sp.giaban) || 0);
                }

                const expectedTongtien = dh.isshowvat ? sumItems * (1 + (Number(dh.vat) || 0)) : sumItems;
                const diff = Math.abs(expectedTongtien - Number(dh.tongtien));

                if (diff > 1) {
                    console.log(`Order: ${dh.madonhang}, isshowvat: ${dh.isshowvat}, vat: ${dh.vat}, tongtien: ${dh.tongtien}, Expected: ${expectedTongtien}, SumItems: ${sumItems}, Diff: ${diff}`);
                }
            }
            return;
        }

        // ... (rest of the specific customer check if found)
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

auditOrders();
