const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public"
        },
    },
});

async function main() {
    const latestChot = await prisma.chotkho.findFirst({
        orderBy: { createdAt: 'desc' },
        include: {
            details: {
                where: {
                    OR: [
                        { title: { contains: 'Đậu hủ miếng trắng', mode: 'insensitive' } },
                        { sanpham: { masp: 'I100260' } }
                    ]
                },
                include: { sanpham: true }
            }
        }
    });

    if (!latestChot) {
        console.log('No Chotkho found in testdata');
        return;
    }

    console.log(`Latest Chotkho (testdata): ${latestChot.id} at ${latestChot.createdAt} Title: ${latestChot.title}`);
    latestChot.details.forEach(d => {
        console.log(`  Detail ID: ${d.id}`);
        console.log(`  Product: ${d.title} (MASP: ${d.sanpham?.masp})`);
        console.log(`  System: ${d.sltonhethong}, Real: ${d.sltonthucte}, Diff: ${d.chenhlech}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
