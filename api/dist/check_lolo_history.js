"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const masp = 'I100207';
        console.log(`🔍 Querying historical data for ${masp}...`);
        const product = await prisma.sanpham.findUnique({
            where: { masp },
            include: { TonKho: true }
        });
        if (!product) {
            console.log('❌ Product not found!');
            return;
        }
        console.log(`Product: ${product.title} (ID: ${product.id})`);
        console.log(`Current stock (soluong in Sanpham): ${product.soluong}`);
        console.log(`Current TonKho:`, product.TonKho);
        console.log('\n📅 === CHOT KHO HISTORY (JUNE 2026) ===');
        const chotDetails = await prisma.chotkhodetail.findMany({
            where: {
                sanphamId: product.id,
                ngaychot: {
                    gte: new Date('2026-06-01T00:00:00+07:00'),
                    lte: new Date('2026-06-08T23:59:59+07:00')
                }
            },
            include: {
                chotkho: true
            },
            orderBy: {
                ngaychot: 'asc'
            }
        });
        for (const cd of chotDetails) {
            console.log(`Date: ${cd.ngaychot.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | Code: ${cd.chotkho?.codeId} | Sys Stock: ${cd.sltonhethong} | Real Stock: ${cd.sltonthucte} | Diff: ${cd.chenhlech} | Note: ${cd.ghichu}`);
        }
        console.log('\n📅 === DAILY STOCK MOVEMENT SUMMARY (JUNE 2026) ===');
        const phieuKhos = await prisma.phieuKhoSanpham.findMany({
            where: {
                sanphamId: product.id,
                phieuKho: {
                    ngay: {
                        gte: new Date('2026-06-01T00:00:00+07:00'),
                        lte: new Date('2026-06-08T23:59:59+07:00')
                    }
                }
            },
            include: {
                phieuKho: true
            }
        });
        const dailySummary = {};
        for (const pk of phieuKhos) {
            if (!pk.phieuKho.ngay)
                continue;
            const dateStr = pk.phieuKho.ngay.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            if (!dailySummary[dateStr]) {
                dailySummary[dateStr] = { nhap: 0, xuat: 0 };
            }
            const qty = Number(pk.soluong);
            if (pk.phieuKho.type === 'nhap') {
                dailySummary[dateStr].nhap += qty;
            }
            else {
                dailySummary[dateStr].xuat += qty;
            }
        }
        const sortedDates = Object.keys(dailySummary).sort((a, b) => {
            const partsA = a.split('/').map(Number);
            const partsB = b.split('/').map(Number);
            return new Date(partsA[2], partsA[1] - 1, partsA[0]).getTime() - new Date(partsB[2], partsB[1] - 1, partsB[0]).getTime();
        });
        for (const dateStr of sortedDates) {
            const summary = dailySummary[dateStr];
            console.log(`Date: ${dateStr} | Total Import: +${summary.nhap.toFixed(3)} | Total Export: -${summary.xuat.toFixed(3)} | Net: ${(summary.nhap - summary.xuat).toFixed(3)}`);
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
//# sourceMappingURL=check_lolo_history.js.map