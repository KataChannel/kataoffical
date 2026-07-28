const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        // Check orders around TG-AA14740
        const around = await prisma.donhang.findMany({
            where: {
                order: { gte: 14735, lte: 14745 }
            },
            select: { madonhang: true, createdAt: true, khachhang: true },
            orderBy: { order: 'asc' }
        });

        console.log("Orders around TG-AA14740:");
        around.forEach(o => {
            const kh = typeof o.khachhang === 'string' ? o.khachhang : (o.khachhang?.name || "Unknown");
            console.log(`${o.madonhang} | ${o.createdAt.toISOString()} | KH: ${kh}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
