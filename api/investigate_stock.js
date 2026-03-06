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
    const sp = await prisma.sanpham.findUnique({
        where: { masp },
        include: {
            TonKho: true,
            SanphamKho: {
                include: { kho: true }
            },
            chotkhodetail: {
                orderBy: { ngaychot: 'desc' },
                take: 5,
                include: { chotkho: true }
            }
        }
    });

    console.log('--- SAN PHAM INFO ---');
    console.log(JSON.stringify({
        id: sp.id,
        masp: sp.masp,
        title: sp.title,
        soluong: sp.soluong,
        soluongkho: sp.soluongkho
    }, null, 2));

    console.log('\n--- TON KHO TABLE ---');
    console.log(JSON.stringify(sp.TonKho, null, 2));

    console.log('\n--- SAN PHAM KHO (BY WAREHOUSE) ---');
    sp.SanphamKho.forEach(sk => {
        console.log(`${sk.kho.makho} (${sk.kho.name}): ${sk.soluong}`);
    });

    console.log('\n--- RECENT CHOT KHO (CLOSING) ---');
    sp.chotkhodetail.forEach(ck => {
        console.log(`Date: ${ck.ngaychot}, System: ${ck.sltonhethong}, Real: ${ck.sltonthucte}, Diff: ${ck.chenhlech}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
