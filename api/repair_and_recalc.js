const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("--- REPAIRING GHOST ORDERS & RECALCULATING STOCK ---");

        // 1. Set isActive: false for all orders with terminal statuses
        const terminalStatuses = ['huy', 'danhan', 'hoanthanh'];
        const repairRes = await prisma.donhang.updateMany({
            where: {
                status: { in: terminalStatuses },
                isActive: true
            },
            data: {
                isActive: false,
                updatedAt: new Date()
            }
        });
        console.log(`Step 1: Repaired ${repairRes.count} orders (set isActive: false).`);

        // 2. Recalculate slchogiao and slchonhap for ALL products
        console.log("Step 2: Recalculating inventory counters...");
        
        const sanphams = await prisma.sanpham.findMany({
            include: {
                Donhangsanpham: {
                    where: {
                        donhang: { 
                            isActive: true,
                            status: { in: ['dadat', 'choxuly', 'dagiao'] } 
                        }
                    },
                    include: { donhang: true }
                },
                Dathangsanpham: {
                    where: {
                        dathang: { 
                            isActive: true,
                            status: { in: ['dadat', 'choxuly', 'dagiao'] } 
                        }
                    },
                    include: { dathang: true }
                }
            }
        });

        let fixedCount = 0;
        for (const sp of sanphams) {
            // Outflow reservation (slchogiao)
            // Note: dagiao is still in slchogiao because it's not yet 'danhan'?
            // Actually, usually 'dagiao' already deducted slton, but slchogiao should be cleared.
            // Let's stick to the definition: slchogiao = total quantity in pending orders.
            const pendingOut = sp.Donhangsanpham
                .filter(item => ['dadat', 'choxuly'].includes(item.donhang.status))
                .reduce((sum, item) => sum + Number(item.slgiao || item.sldat || 0), 0);
            
            const pendingIn = sp.Dathangsanpham
                .filter(item => ['dadat', 'choxuly'].includes(item.dathang.status))
                .reduce((sum, item) => sum + Number(item.slnhan || item.slgiao || 0), 0);

            const correctedSlchogiao = Math.round(pendingOut * 1000) / 1000;
            const correctedSlchonhap = Math.round(pendingIn * 1000) / 1000;

            await prisma.tonKho.upsert({
                where: { sanphamId: sp.id },
                create: {
                    sanphamId: sp.id,
                    slton: 0,
                    slchogiao: correctedSlchogiao,
                    slchonhap: correctedSlchonhap
                },
                update: {
                    slchogiao: correctedSlchogiao,
                    slchonhap: correctedSlchonhap
                }
            });
            fixedCount++;
            if (fixedCount % 100 === 0) console.log(`Processed ${fixedCount} products...`);
        }

        console.log(`\nCOMPLETED: Repaired ${repairRes.count} orders and recalculated ${fixedCount} product counters.`);

    } catch (e) {
        console.error("Error during repair:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
