const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("--- DUPLICATE ORDERS ANALYSIS ---");
        
        // Fetch recent orders (last 7 days or so)
        const recentOrders = await prisma.donhang.findMany({
            where: {
                createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            },
            include: {
                khachhang: { select: { name: true, id: true } },
                sanpham: { select: { idSP: true, slgiao: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        const duplicates = [];
        const seen = new Map();

        for (const order of recentOrders) {
            // Key based on customer, date (just the day), and total amount (if available) or product count
            const dateStr = order.ngaygiao ? order.ngaygiao.toISOString().split('T')[0] : order.createdAt.toISOString().split('T')[0];
            const productFingerprint = order.sanpham.map(p => `${p.idSP}:${p.slgiao}`).sort().join('|');
            const key = `${order.khachhangId}-${dateStr}-${order.tongtien}-${productFingerprint}`;

            if (seen.has(key)) {
                duplicates.push({
                    original: seen.get(key),
                    duplicate: order
                });
            } else {
                seen.set(key, order);
            }
        }

        console.log(`Found ${duplicates.length} potential duplicate order pairs.\n`);
        duplicates.forEach((pair, index) => {
            console.log(`${index + 1}. [${pair.original.madonhang}] and [${pair.duplicate.madonhang}]`);
            console.log(`   Customer: ${pair.original.khachhang?.name}`);
            console.log(`   Date: ${pair.original.ngaygiao?.toISOString().split('T')[0]}`);
            console.log(`   Amount: ${pair.original.tongtien?.toLocaleString()}`);
            console.log(`   Created: ${pair.original.createdAt.toISOString()} vs ${pair.duplicate.createdAt.toISOString()}`);
            console.log('---');
        });

        console.log("\n--- ORDERS WITH CODE DISCREPANCIES (MÃ LỆCH) ---");
        
        // Check for madonhang issues (e.g., missing prefix, strange format)
        const strangeCodes = await prisma.donhang.findMany({
            where: {
                NOT: {
                    madonhang: { startsWith: 'TG-AA' }
                }
            },
            take: 20
        });

        console.log(`Found ${strangeCodes.length} orders with unusual code formats (not TG-AA...):\n`);
        strangeCodes.forEach(o => {
            console.log(`- ID: ${o.id} | Code: ${o.madonhang} | Date: ${o.createdAt.toISOString()}`);
        });

        // Check for orders without items
        const ordersWithoutItems = await prisma.donhang.findMany({
            where: {
                sanpham: { none: {} }
            },
            take: 20
        });

        console.log(`\nFound ${ordersWithoutItems.length} orders without any products:\n`);
        ordersWithoutItems.forEach(o => {
            console.log(`- Code: ${o.madonhang} | Created: ${o.createdAt.toISOString()}`);
        });

        // Check for PhieuKho referring to non-existent orders
        const phieuKhos = await prisma.phieuKho.findMany({
            where: { madonhang: { not: null } },
            select: { madonhang: true }
        });
        
        const madonhangs = new Set(recentOrders.map(o => o.madonhang));
        // This set only has recent orders, let's get all madonhangs for a thorough check
        const allMadonhangs = await prisma.donhang.findMany({ select: { madonhang: true } });
        const allMadonhangSet = new Set(allMadonhangs.map(o => o.madonhang));

        const orphanPhieuKho = phieuKhos.filter(pk => !allMadonhangSet.has(pk.madonhang));
        console.log(`\nFound ${orphanPhieuKho.length} Vouchers referring to missing Order Codes:\n`);
        const uniqueOrphans = [...new Set(orphanPhieuKho.map(pk => pk.madonhang))].slice(0, 20);
        uniqueOrphans.forEach(code => console.log(`- Orphan Code: ${code}`));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
