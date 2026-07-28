const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("--- SEARCHING FOR HIDDEN CHARACTER DISCREPANCIES ---");
        const orders = await prisma.donhang.findMany({
            select: { madonhang: true }
        });

        const suspicious = orders.filter(o => {
            const trimmed = o.madonhang.trim();
            return o.madonhang !== trimmed || /[\s]/.test(o.madonhang);
        });

        console.log(`Found ${suspicious.length} orders with potential whitespace issues in madonhang.`);
        suspicious.forEach(o => console.log(`- "${o.madonhang}"`));

        console.log("\n--- SEARCHING FOR NEAR-DUPLICATE CODES ---");
        const sortedCodes = orders.map(o => o.madonhang).sort();
        for (let i = 0; i < sortedCodes.length - 1; i++) {
            const code1 = sortedCodes[i];
            const code2 = sortedCodes[i+1];
            // If they are very similar (e.g. only 1 char diff)
            if (code1.length === code2.length) {
                let diffs = 0;
                for (let j = 0; j < code1.length; j++) {
                    if (code1[j] !== code2[j]) diffs++;
                }
                if (diffs === 1 && code1.startsWith('TG-AA')) {
                    // console.log(`Near-match: ${code1} vs ${code2}`);
                }
            }
        }
        
        console.log("\n--- CHECKING FOR CANCELLED BUT ACTIVE ORDERS ---");
        const ghostOrders = await prisma.donhang.findMany({
            where: {
                isActive: true,
                status: 'huy'
            }
        });
        console.log(`Found ${ghostOrders.length} orders marked as 'huy' but still 'isActive'.`);
        ghostOrders.forEach(o => console.log(`- ${o.madonhang}`));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
