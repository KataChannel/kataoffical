const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public"
        },
    },
});

async function main() {
    const masp = 'I100260';
    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp) { console.log("Not found in testdata"); return; }

    const tk = await prisma.tonKho.findUnique({ where: { sanphamId: sp.id } });
    const sk = await prisma.sanphamKho.findMany({ where: { sanphamId: sp.id }, include: { kho: true } });

    console.log('--- TESTDATA PRODUCT ---');
    console.log(sp.id, sp.masp, sp.title);

    console.log('\n--- TON KHO ---');
    console.log(JSON.stringify(tk, null, 2));

    console.log('\n--- WAREHOUSE STOCK ---');
    sk.forEach(s => console.log(`${s.kho.makho}: ${s.soluong}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
