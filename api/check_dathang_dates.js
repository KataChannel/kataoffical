const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDathang() {
    const lastDathang = await prisma.dathang.findMany({
        orderBy: { ngaynhan: 'desc' },
        take: 5,
        select: { id: true, madathang: true, ngaynhan: true, status: true }
    });
    console.log('Last 5 dathang by delivery date:', JSON.stringify(lastDathang, null, 2));

    const todayDathang = await prisma.dathang.findMany({
        where: {
            ngaynhan: {
                gte: new Date('2026-04-18T00:00:00Z'),
                lte: new Date('2026-04-18T23:59:59Z')
            }
        },
        take: 5
    });
    console.log('Dathang on April 18 (UTC):', todayDathang.length);
}

checkDathang().catch(console.error).finally(() => prisma.$disconnect());
