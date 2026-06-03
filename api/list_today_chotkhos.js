const { PrismaClient } = require('@prisma/client');

const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
    const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });

    const todayStart = new Date('2026-05-30T00:00:00+07:00');

    try {
        const cks = await prisma.chotkho.findMany({
            where: {
                ngaychot: { gte: todayStart }
            },
            include: {
                kho: true,
                _count: {
                    select: { details: true }
                }
            },
            orderBy: { ngaychot: 'asc' }
        });

        console.log(`\n--- Chotkho Records Created Today (May 30th) ---`);
        cks.forEach(ck => {
            console.log(`- ID: ${ck.id}`);
            console.log(`  Title: ${ck.title}`);
            console.log(`  ngaychot: ${ck.ngaychot.toISOString()}`);
            console.log(`  createdAt: ${ck.createdAt.toISOString()}`);
            console.log(`  Warehouse: ${ck.kho?.name} (ID: ${ck.khoId})`);
            console.log(`  Details Count: ${ck._count.details}`);
            console.log(`  Ghi chú: ${ck.ghichu}`);
        });

    } catch (err) {
        console.error(err);
    }

    await prisma.$disconnect();
}

main();
