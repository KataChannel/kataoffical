const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const masp = 'I101266'; // Măng tây trung
    
    try {
        console.log(`--- ANALYZING SLCHOGIAO FOR ${masp} ---`);
        
        const sanpham = await prisma.sanpham.findUnique({ where: { masp } });
        if (!sanpham) return;

        // Current value in TonKho
        const tonkho = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id } });
        console.log(`Current slchogiao in TonKho: ${tonkho.slchogiao}`);

        // Calculate from active orders (isActive: true AND status: dadat/choxuly)
        // Note: status 'huy', 'dagiao', 'danhan', 'hoanthanh' should NOT be in slchogiao
        const pendingOrders = await prisma.donhangsanpham.findMany({
            where: {
                idSP: sanpham.id,
                donhang: {
                    isActive: true,
                    status: { in: ['dadat', 'choxuly'] }
                }
            },
            include: { donhang: true }
        });

        let calculatedPending = 0;
        pendingOrders.forEach(po => {
            calculatedPending += Number(po.sldat || 0);
        });

        console.log(`Calculated pending from Active/Valid orders: ${calculatedPending}`);

        // Check if our ghost order TG-AA40898 is being counted somewhere
        const ghostOrderItems = await prisma.donhangsanpham.findMany({
            where: {
                idSP: sanpham.id,
                donhang: {
                    madonhang: 'TG-AA40898'
                }
            },
            include: { donhang: true }
        });

        console.log(`\nGhost Order TG-AA40898 Status: ${ghostOrderItems[0]?.donhang.status}, isActive: ${ghostOrderItems[0]?.donhang.isActive}, Qty: ${ghostOrderItems[0]?.sldat}`);

        // If slchogiao is 15.1 but calculated is different, we have a problem.
        if (Number(tonkho.slchogiao) !== calculatedPending) {
            console.log(`Mismatch detected! System: ${tonkho.slchogiao} vs Calculated: ${calculatedPending}`);
            
            // Let's see all orders contributing to that 15.1 if we count EVERYTHING that is isActive: true
            const allActiveOrderItems = await prisma.donhangsanpham.findMany({
                where: {
                    idSP: sanpham.id,
                    donhang: { isActive: true }
                },
                include: { donhang: true }
            });

            let sumAllActive = 0;
            console.log("\nOrders contributing if we count all isActive:true:");
            allActiveOrderItems.forEach(ao => {
                const qty = Number(ao.sldat || 0);
                sumAllActive += qty;
                console.log(`- ${ao.donhang.madonhang} | Status: ${ao.donhang.status} | Qty: ${qty}`);
            });
            console.log(`Sum of all isActive:true: ${sumAllActive}`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
