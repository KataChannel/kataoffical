const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("--- ADVANCED ORDER AUDIT (v4) ---");

        // 1. Find Potential Duplicate Content (Same Customer, Same Day, Same Amount)
        // Grouping by Khachhang, NgayGiao, and TongTien
        const orders = await prisma.donhang.findMany({
            where: {
                isActive: true,
                status: { not: 'huy' }
            },
            include: { khachhang: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        });

        const groups = new Map();
        orders.forEach(o => {
            if (!o.khachhangId || !o.ngaygiao) return;
            const key = `${o.khachhangId}-${o.ngaygiao.toISOString().split('T')[0]}-${o.tongtien}`;
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(o);
        });

        const duplicates = Array.from(groups.values()).filter(g => g.length > 1);

        console.log(`Found ${duplicates.length} groups of orders with identical Customer, Date, and Amount.`);
        duplicates.slice(0, 20).forEach((group, i) => {
            console.log(`\nGroup ${i+1}: ${group[0].khachhang?.name} | Date: ${group[0].ngaygiao.toISOString().split('T')[0]} | Total: ${group[0].tongtien}`);
            group.forEach(o => {
                console.log(`  - Code: ${o.madonhang} | Created: ${o.createdAt.toISOString()} | Status: ${o.status}`);
            });
        });

        // 2. Find Orders with Non-Standard Codes (Mã lệch)
        // Standard is TG-AA + 5 digits. Let's look for anything else.
        const nonStandard = await prisma.donhang.findMany({
            where: {
                NOT: {
                    madonhang: { startsWith: 'TG-AA' }
                }
            },
            take: 20
        });

        console.log(`\nFound ${nonStandard.length} non-standard order codes:`);
        nonStandard.forEach(o => console.log(`- ${o.madonhang} | ID: ${o.id} | Created: ${o.createdAt.toISOString()}`));

        // 3. Find PhieuKho referring to missing DonHang
        const phieukhoWithMadonhang = await prisma.phieuKho.findMany({
            where: { madonhang: { not: null } },
            select: { madonhang: true, id: true }
        });

        const allMadonhangs = new Set(orders.map(o => o.madonhang));
        // Also fetch inactive/cancelled ones for the set
        const otherMadonhangs = await prisma.donhang.findMany({
            where: { OR: [{ isActive: false }, { status: 'huy' }] },
            select: { madonhang: true }
        });
        otherMadonhangs.forEach(o => allMadonhangs.add(o.madonhang));

        const orphanVouchers = phieukhoWithMadonhang.filter(pk => !allMadonhangs.has(pk.madonhang));
        console.log(`\nFound ${orphanVouchers.length} Vouchers referring to missing Order Codes:`);
        const uniqueOrphans = [...new Set(orphanVouchers.map(pk => pk.madonhang))].slice(0, 20);
        uniqueOrphans.forEach(code => console.log(`- Missing Order Code: ${code}`));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
