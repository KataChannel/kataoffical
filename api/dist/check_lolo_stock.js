"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const masp = 'I100207';
        console.log(`🔍 Querying product info for ${masp}...`);
        const product = await prisma.sanpham.findUnique({
            where: { masp },
            include: { TonKho: true }
        });
        if (!product) {
            console.log('❌ Product not found!');
            return;
        }
        console.log(`Product ID: ${product.id}`);
        console.log(`Title: ${product.title}`);
        console.log(`Current slton in Sanpham table: ${product.soluong}`);
        console.log(`Current TonKho record:`, product.TonKho);
        console.log('\n🔍 Querying PhieuKhoSanpham on 08/06/2026...');
        const startOfDay = new Date('2026-06-08T00:00:00+07:00');
        const endOfDay = new Date('2026-06-08T23:59:59+07:00');
        const phieuKhos = await prisma.phieuKhoSanpham.findMany({
            where: {
                sanphamId: product.id,
                phieuKho: {
                    ngay: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                }
            },
            include: {
                phieuKho: true
            },
            orderBy: {
                phieuKho: {
                    ngay: 'asc'
                }
            }
        });
        console.log(`Found ${phieuKhos.length} stock vouchers:`);
        let calcBalance = 0;
        for (const pk of phieuKhos) {
            const type = pk.phieuKho.type;
            const qty = Number(pk.soluong);
            const change = type === 'nhap' ? qty : -qty;
            calcBalance += change;
            console.log(`- Time: ${pk.phieuKho.ngay?.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | Type: ${type} | Code: ${pk.phieuKho.maphieu} | Qty: ${qty} | Cumulative: ${calcBalance.toFixed(3)} | Title: ${pk.phieuKho.title} | Ghi chú: ${pk.phieuKho.ghichu}`);
        }
        console.log('\n🔍 Querying AuditLog for TonKho modifications today...');
        const auditLogs = await prisma.auditLog.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                OR: [
                    { entityId: product.TonKho?.id },
                    {
                        newValues: {
                            path: ['sanphamId'],
                            equals: product.id
                        }
                    }
                ]
            },
            orderBy: { createdAt: 'asc' }
        });
        console.log(`Found ${auditLogs.length} TonKho audit logs today:`);
        for (const log of auditLogs) {
            const oldVal = log.oldValues;
            const newVal = log.newValues;
            console.log(`- Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
            console.log(`  Actor: ${log.userEmail || 'System'} | Action: ${log.action}`);
            console.log(`  Old slton: ${oldVal?.slton || 'N/A'} | New slton: ${newVal?.slton || 'N/A'}`);
            console.log(`  Old slchogiao: ${oldVal?.slchogiao || 'N/A'} | New slchogiao: ${newVal?.slchogiao || 'N/A'}`);
            console.log(`  Metadata: ${JSON.stringify(log.metadata)}`);
            console.log('-------------------------------------------');
        }
        console.log('\n🔍 Querying Chotkhodetail around 14:39:11...');
        const chotDetails = await prisma.chotkhodetail.findMany({
            where: {
                sanphamId: product.id,
                ngaychot: {
                    gte: new Date('2026-06-08T14:30:00+07:00'),
                    lte: new Date('2026-06-08T14:45:00+07:00')
                }
            },
            include: {
                chotkho: {
                    include: {
                        user: { include: { profile: true } }
                    }
                }
            }
        });
        console.log(`Found ${chotDetails.length} chotkho detail records:`);
        for (const cd of chotDetails) {
            console.log(`- Chotkho Code: ${cd.chotkho?.codeId}`);
            console.log(`  Ngaychot: ${cd.ngaychot.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
            console.log(`  Tồn hệ thống: ${cd.sltonhethong}`);
            console.log(`  Tồn thực tế: ${cd.sltonthucte}`);
            console.log(`  Chênh lệch: ${cd.chenhlech}`);
            console.log(`  Ghi chú: ${cd.ghichu}`);
            console.log(`  User chốt: ${cd.chotkho?.user?.email || 'N/A'}`);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check_lolo_stock.js.map