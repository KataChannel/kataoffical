const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
        },
    },
});

async function main() {
    const masp = 'I100260';
    const sp = await prisma.sanpham.findUnique({ where: { masp } });

    const ckd = await prisma.chotkhodetail.findMany({
        where: { sanphamId: sp.id },
        orderBy: { createdAt: 'desc' },
        take: 2,
        include: { chotkho: { include: { kho: true } } }
    });

    console.log('--- RECENT CLOSING DETAILS ---');
    ckd.forEach(c => {
        console.log(`ID: ${c.id}`);
        console.log(`Created: ${c.createdAt}`);
        console.log(`Warehouse: ${c.chotkho?.kho?.name || 'ALL'}`);
        console.log(`System: ${c.sltonhethong}`);
        console.log(`Real: ${c.sltonthucte}`);
        console.log(`Diff: ${c.chenhlech}`);
        console.log('---');
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
