const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const tomorrowStart = new Date('2026-05-19T00:00:00+07:00');
        console.log("Tomorrow Start:", tomorrowStart.toISOString());

        // Count Donhang
        const totalDadatDH = await prisma.donhang.count({ where: { status: 'dadat' } });
        const backloggedDH = await prisma.donhang.count({
            where: {
                status: 'dadat',
                OR: [
                    { ngaygiao: { lt: tomorrowStart } },
                    { ngaygiao: null, createdAt: { lt: tomorrowStart } }
                ]
            }
        });
        const futureDH = totalDadatDH - backloggedDH;

        console.log(`\nDonhang (Status = 'dadat'):`);
        console.log(`- Total: ${totalDadatDH}`);
        console.log(`- Backlogged (to move to 'choxuly'): ${backloggedDH}`);
        console.log(`- Future (to preserve): ${futureDH}`);

        // Count Dathang
        const totalDadatDHang = await prisma.dathang.count({ where: { status: 'dadat' } });
        const backloggedDHang = await prisma.dathang.count({
            where: {
                status: 'dadat',
                OR: [
                    { ngaynhan: { lt: tomorrowStart } },
                    { ngaynhan: null, createdAt: { lt: tomorrowStart } }
                ]
            }
        });
        const futureDHang = totalDadatDHang - backloggedDHang;

        console.log(`\nDathang (Status = 'dadat'):`);
        console.log(`- Total: ${totalDadatDHang}`);
        console.log(`- Backlogged (to move to 'choxuly'): ${backloggedDHang}`);
        console.log(`- Future (to preserve): ${futureDHang}`);

        if (futureDH > 0) {
            const sampleFutureDH = await prisma.donhang.findMany({
                where: {
                    status: 'dadat',
                    OR: [
                        { ngaygiao: { gte: tomorrowStart } }
                    ]
                },
                take: 5,
                select: { madonhang: true, ngaygiao: true }
            });
            console.log("\nSample Future Donhang:", sampleFutureDH);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
