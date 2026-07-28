const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("--- ADVANCED ORDER AUDIT ---");

        // 1. Find Duplicate madonhang (The same code used for multiple IDs)
        const duplicateCodes = await prisma.$queryRaw`
            SELECT madonhang, COUNT(*) as count
            FROM "DonHang"
            GROUP BY madonhang
            HAVING COUNT(*) > 1
        `;

        console.log(`Found ${duplicateCodes.length} duplicate 'madonhang' codes.`);
        for (const item of duplicateCodes) {
            const orders = await prisma.donhang.findMany({
                where: { madonhang: item.madonhang },
                include: { khachhang: { select: { name: true } } }
            });
            console.log(`\nCode: ${item.madonhang} (Used ${item.count} times)`);
            orders.forEach(o => console.log(`  - ID: ${o.id} | Customer: ${o.khachhang?.name} | Created: ${o.createdAt.toISOString()} | Status: ${o.status}`));
        }

        // 2. Find Potential Duplicate Content (Same Customer, Same Day, Same Amount)
        // Grouping by Khachhang, NgayGiao, and TongTien
        const duplicateContent = await prisma.$queryRaw`
            SELECT "khachhangId", "ngaygiao", "tongtien", COUNT(*) as count
            FROM "DonHang"
            WHERE "isActive" = true AND "status" != 'dahuy'
            GROUP BY "khachhangId", "ngaygiao", "tongtien"
            HAVING COUNT(*) > 1
            LIMIT 20
        `;

        console.log(`\nFound ${duplicateContent.length} potential duplicate content groups (limited to 20):`);
        for (const item of duplicateContent) {
            const orders = await prisma.donhang.findMany({
                where: {
                    khachhangId: item.khachhangId,
                    ngaygiao: item.ngaygiao,
                    tongtien: item.tongtien,
                    isActive: true
                },
                include: { khachhang: { select: { name: true } } }
            });
            console.log(`\nGroup: ${orders[0].khachhang?.name} | Date: ${item.ngaygiao.toISOString().split('T')[0]} | Total: ${item.tongtien}`);
            orders.forEach(o => console.log(`  - Code: ${o.madonhang} | ID: ${o.id} | Created: ${o.createdAt.toISOString()}`));
        }

        // 3. Find Orders with non-standard codes (Mã lệch)
        // The standard is TG-AA + 5 digits
        const nonStandard = await prisma.donhang.findMany({
            where: {
                NOT: {
                    madonhang: {
                        startsWith: 'TG-AA'
                    }
                }
            },
            take: 20
        });

        console.log(`\nFound ${nonStandard.length} non-standard order codes (first 20):`);
        nonStandard.forEach(o => console.log(`- ${o.madonhang} | ID: ${o.id}`));

        // 4. Check for Orphan Order Items (Sanpham without a valid DonHang)
        // This is hard with Prisma if the relation is enforced, but let's check for broken relations in JSON or similar
        // Or check for orders referenced in PhieuKho but not existing
        const orphanVouchers = await prisma.$queryRaw`
            SELECT pk.madonhang, pk.id as pk_id
            FROM "PhieuKho" pk
            LEFT JOIN "DonHang" dh ON pk.madonhang = dh.madonhang
            WHERE pk.madonhang IS NOT NULL AND pk.madonhang LIKE 'TG-AA%' AND dh.id IS NULL
            LIMIT 20
        `;

        console.log(`\nFound ${orphanVouchers.length} Vouchers referring to missing Orders (Mã lệch/mất đơn):`);
        orphanVouchers.forEach(v => console.log(`- Voucher ID: ${v.pk_id} | Ref Code: ${v.madonhang}`));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
