const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const masp = 'I100480';
    console.log(`=== DIAGNOSING UPDATED PHIEUKHO VOUCHERS FOR ${masp} TODAY ===`);

    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp) {
        console.error('Product not found!');
        return;
    }

    const todayStart = new Date('2026-05-24T00:00:00+07:00');

    // Query PhieuKhoSanpham where parent phieuKho has updatedAt today
    const pkItems = await prisma.phieuKhoSanpham.findMany({
        where: {
            sanphamId: sp.id,
            phieuKho: {
                updatedAt: { gte: todayStart }
            }
        },
        include: {
            phieuKho: {
                include: {
                    tuKho: true,
                    denKho: true
                }
            }
        }
    });

    console.log(`Found ${pkItems.length} warehouse items updated today.`);
    pkItems.forEach(item => {
        console.log(`- Product: ${masp} | Voucher: ${item.phieuKho.code} | Loại: ${item.phieuKho.loai} | Status: ${item.phieuKho.status || 'N/A'}`);
        console.log(`  Từ kho: ${item.phieuKho.tuKho?.name || 'N/A'} (ID: ${item.phieuKho.tuKhoId})`);
        console.log(`  Đến kho: ${item.phieuKho.denKho?.name || 'N/A'} (ID: ${item.phieuKho.denKhoId})`);
        console.log(`  Số lượng yêu cầu (soluong): ${item.soluong}`);
        console.log(`  Số lượng thực tế (soluongthucte): ${item.soluongthucte}`);
        console.log(`  Ghi chú: ${item.phieuKho.ghichu}`);
        console.log(`  Voucher CreatedAt: ${item.phieuKho.createdAt.toLocaleString('vi-VN')}`);
        console.log(`  Voucher UpdatedAt: ${item.phieuKho.updatedAt.toLocaleString('vi-VN')}`);
        console.log('----------------------------------------------------');
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
