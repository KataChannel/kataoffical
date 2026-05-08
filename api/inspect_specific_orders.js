const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const codes = ['TG-AA40898', 'TG-AA22139'];
    
    try {
        for (const code of codes) {
            console.log(`\n--- INSPECTING ORDER: ${code} ---`);
            const order = await prisma.donhang.findUnique({
                where: { madonhang: code },
                include: {
                    khachhang: { select: { name: true } },
                    sanpham: {
                        include: { sanpham: { select: { title: true, masp: true } } }
                    },
                    PhieuKho: {
                        include: { sanpham: { include: { sanpham: { select: { title: true } } } } }
                    }
                }
            });

            if (!order) {
                console.log(`Order ${code} NOT found.`);
                continue;
            }

            console.log(`General Info:`);
            console.log(`- ID: ${order.id}`);
            console.log(`- Customer: ${order.khachhang?.name}`);
            console.log(`- Date: ${order.ngaygiao?.toISOString()}`);
            console.log(`- Status: ${order.status}`);
            console.log(`- IsActive: ${order.isActive}`);
            console.log(`- Total Amount: ${order.tongtien}`);
            console.log(`- CreatedAt: ${order.createdAt.toISOString()}`);
            console.log(`- UpdatedAt: ${order.updatedAt.toISOString()}`);

            console.log(`\nItems in Order:`);
            order.sanpham.forEach(item => {
                console.log(`  - ${item.sanpham?.masp} | ${item.sanpham?.title} | Qty: ${item.slgiao} | Price: ${item.giaban}`);
            });

            console.log(`\nRelated Vouchers (PhieuKho):`);
            if (order.PhieuKho.length === 0) {
                console.log(`  No related vouchers.`);
            } else {
                order.PhieuKho.forEach(pk => {
                    console.log(`  - [${pk.type}] ID: ${pk.id} | Code: ${pk.maphieu} | Date: ${pk.ngay?.toISOString()} | Active: ${pk.isActive}`);
                    pk.sanpham.forEach(pks => {
                        console.log(`    > ${pks.sanpham?.title}: ${pks.soluong}`);
                    });
                });
            }

            // Check Audit Logs
            const logs = await prisma.auditLog.findMany({
                where: { entityId: order.id },
                orderBy: { createdAt: 'asc' }
            });

            console.log(`\nAudit Logs:`);
            if (logs.length === 0) {
                console.log(`  No logs found.`);
            } else {
                logs.forEach(log => {
                    console.log(`  - [${log.createdAt.toISOString()}] ${log.action} by ${log.userEmail || 'System'}`);
                    if (log.action === 'UPDATE' && log.changedFields) {
                        console.log(`    Fields: ${log.changedFields.join(', ')}`);
                    }
                });
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
