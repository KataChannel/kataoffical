const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const masp = 'I100480';
    console.log(`=== DIAGNOSING DB TRANSACTIONS & LOGS FOR ${masp} TODAY ===`);

    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp) {
        console.error('Product not found!');
        return;
    }

    const todayStart = new Date('2026-05-24T00:00:00+07:00');

    // 1. Check Donhangsanpham (Order Items) updated today
    console.log('\n--- 1. Order Items (Donhangsanpham) ---');
    const orderItems = await prisma.donhangsanpham.findMany({
        where: {
            idSP: sp.id,
            donhang: {
                updatedAt: { gte: todayStart }
            }
        },
        include: {
            donhang: true
        }
    });
    console.log(`Found ${orderItems.length} order items updated today.`);
    orderItems.forEach(item => {
        console.log(`Order: ${item.donhang.madonhang} | Trạng thái: ${item.donhang.status} | Đặt: ${item.sldat} | Giao: ${item.slgiao} | Nhận: ${item.slnhan} | Khách: ${item.donhang.tenkhachhang} | Ngày giao: ${item.donhang.ngaygiao?.toLocaleString('vi-VN')} | UpdatedAt: ${item.donhang.updatedAt.toLocaleString('vi-VN')}`);
    });

    // 2. Check PhieuKhoSanpham (Warehouse vouchers) created today
    console.log('\n--- 2. Warehouse Voucher Items (PhieuKhoSanpham) ---');
    const pkItems = await prisma.phieuKhoSanpham.findMany({
        where: {
            sanphamId: sp.id,
            phieuKho: {
                createdAt: { gte: todayStart }
            }
        },
        include: {
            phieuKho: true
        }
    });
    console.log(`Found ${pkItems.length} warehouse items today.`);
    pkItems.forEach(item => {
        console.log(`Voucher Code: ${item.phieuKho.code} | Loại: ${item.phieuKho.loai} | Số lượng: ${item.soluong} | Thực tế: ${item.soluongthucte} | Ghi chú: ${item.phieuKho.ghichu} | CreatedAt: ${item.phieuKho.createdAt.toLocaleString('vi-VN')}`);
    });

    // 3. Search for audit logs
    console.log('\n--- 3. Database Audit logs (General search for I100480 / sanphamId) ---');
    try {
        const auditLogs = await prisma.$queryRawUnsafe(
            `SELECT * FROM "AuditLog" WHERE "metadata"->>'sanphamId' = $1 OR "metadata"->>'masp' = $2 OR "metadata"->>'idSP' = $1 ORDER BY "createdAt" DESC LIMIT 10`,
            sp.id, masp
        );
        console.log(`Found ${auditLogs.length} audit logs.`);
        auditLogs.forEach(l => {
            console.log(`Time: ${l.createdAt.toLocaleString('vi-VN')} | Action: ${l.action} | User: ${l.userId} | Metadata: ${JSON.stringify(l.metadata)}`);
        });
    } catch (e) {
        console.log('AuditLog table query skipped or failed:', e.message);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
