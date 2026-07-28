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

    // Recent PhieuKho
    const pk = await prisma.phieuKhoSanpham.findMany({
        where: { sanphamId: sp.id },
        include: { phieuKho: true },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    console.log('--- PHIEU KHO MOVEMENTS ---');
    pk.forEach(p => {
        console.log(`${p.phieuKho.ngay}: Type=${p.phieuKho.type}, Qty=${p.soluong}, Maphieu=${p.phieuKho.maphieu}`);
    });

    // Recent Audit Logs for TonKho
    const audits = await prisma.auditLog.findMany({
        where: {
            entityName: 'TonKho',
            newValues: { path: ['sanphamId'], equals: sp.id }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    console.log('\n--- AUDIT LOGS FOR TONKHO ---');
    audits.forEach(a => {
        console.log(`${a.createdAt}: Action=${a.action}, User=${a.userEmail}`);
        console.log(`  New: ${JSON.stringify(a.newValues)}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
