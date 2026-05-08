const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const orders = await prisma.donhang.findMany({
            where: { isActive: true },
            select: {
                madonhang: true,
                khachhang: true,
                ngaygiao: true,
                tongtien: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        const groups = new Map();
        orders.forEach(o => {
            const khStr = typeof o.khachhang === 'string' ? o.khachhang : JSON.stringify(o.khachhang);
            const dateStr = o.ngaygiao.toISOString().split('T')[0];
            const key = `${khStr}|${dateStr}|${o.tongtien}`;
            
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(o);
        });

        console.log("Deep Audit: Potential Duplicates");
        let machineCount = 0;
        let humanCount = 0;

        groups.forEach((list, key) => {
            if (list.length > 1) {
                // Sort by creation time to find gaps
                list.sort((a, b) => a.createdAt - b.createdAt);
                
                console.log(`\nGroup: ${key}`);
                for (let i = 0; i < list.length - 1; i++) {
                    const a = list[i];
                    const b = list[i+1];
                    const gapSeconds = (b.createdAt - a.createdAt) / 1000;
                    
                    console.log(`  - ${a.madonhang} vs ${b.madonhang} | Gap: ${gapSeconds.toFixed(1)}s`);
                    
                    if (gapSeconds < 5) {
                        machineCount++;
                        console.log("    => Likely MACHINE (Double-click/System)");
                    } else {
                        humanCount++;
                        console.log("    => Likely HUMAN (Manual re-entry)");
                    }
                 group: list.map(o => o.madonhang).join(', ')
                }
            }
        });

        console.log("\nSummary:");
        console.log(`- Total Duplicate Groups: ${Array.from(groups.values()).filter(l => l.length > 1).length}`);
        console.log(`- Machine Pattern (< 5s): ${machineCount}`);
        console.log(`- Human Pattern (> 5s): ${humanCount}`);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
