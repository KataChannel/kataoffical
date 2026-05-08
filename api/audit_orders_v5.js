const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("--- CHECKING FOR INTERNAL CODE MISMATCH (MÃ LỆCH) ---");

        const orders = await prisma.donhang.findMany({
            select: { id: true, madonhang: true, order: true, createdAt: true }
        });

        const mismatches = [];
        orders.forEach(o => {
            const numericPart = parseInt(o.madonhang.replace('TG-AA', ''));
            if (o.order !== numericPart) {
                mismatches.push({
                    id: o.id,
                    madonhang: o.madonhang,
                    orderField: o.order,
                    expectedOrder: numericPart,
                    created: o.createdAt
                });
            }
        });

        console.log(`Found ${mismatches.length} orders where 'order' field does not match numeric part of 'madonhang'.`);
        mismatches.slice(0, 20).forEach(m => {
            console.log(`- Code: ${m.madonhang} | Order Field: ${m.orderField} | Expected: ${m.expectedOrder}`);
        });

        console.log("\n--- CHECKING FOR STATUS DISCREPANCIES ---");
        // Orders that are 'danhan' but don't have a PhieuKho (Voucher)
        const ordersWithVouchers = await prisma.$queryRaw`
            SELECT dh.madonhang, dh.status
            FROM "Donhang" dh
            LEFT JOIN "PhieuKho" pk ON dh.madonhang = pk.madonhang
            WHERE dh.status IN ('dagiao', 'danhan', 'hoanthanh') AND pk.id IS NULL
            LIMIT 20
        `;
        
        // Note: Using table name "Donhang" and "PhieuKho"
        // If it fails again, I'll use Prisma API.
        
    } catch (e) {
        console.error("Query Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
