"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const masp = 'I100207';
        console.log(`🔍 Querying product info...`);
        const product = await prisma.sanpham.findUnique({
            where: { masp },
            include: { TonKho: true }
        });
        if (!product) {
            console.log('❌ Product not found!');
            return;
        }
        const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258';
        const endTime = new Date('2026-06-08T14:39:11+07:00');
        console.log('\n🔎 1. Finding last active chotkho before endTime...');
        const lastChot = await prisma.chotkhodetail.findFirst({
            where: {
                sanphamId: product.id,
                chotkho: {
                    khoId,
                    isActive: true,
                    ngaychot: { lt: endTime }
                }
            },
            orderBy: { ngaychot: 'desc' },
            include: { chotkho: true }
        });
        if (lastChot) {
            console.log(`Last Chot: Code=${lastChot.chotkho?.codeId} | Ngaychot=${lastChot.ngaychot.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | RealStock=${lastChot.sltonthucte}`);
        }
        else {
            console.log(`No last chot found.`);
        }
        const startTime = lastChot ? lastChot.ngaychot : new Date(0);
        const initialQty = lastChot ? Number(lastChot.sltonthucte) : 0;
        console.log(`Time window: [${startTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}] -> [${endTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}]`);
        console.log('\n🔎 2. Querying Donhangsanpham (Exports) inside window...');
        const xuat = await prisma.donhangsanpham.findMany({
            where: {
                idSP: product.id,
                donhang: {
                    status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                    OR: [
                        { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
                        { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: endTime } }
                    ]
                }
            },
            include: { donhang: true }
        });
        console.log(`Found ${xuat.length} exports:`);
        let totalXuat = 0;
        for (const x of xuat) {
            const qty = Number(x.slnhan || x.slgiao || x.sldat);
            totalXuat += qty;
            const completedTime = x.donhang.ngayHoanThanhThucte || x.donhang.updatedAt;
            console.log(`- Code: ${x.donhang.madonhang} | Status: ${x.donhang.status} | Qty: ${qty} | Time: ${completedTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | ngaygiao: ${x.donhang.ngaygiao?.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
        }
        console.log('\n🔎 3. Querying Dathangsanpham (Imports) inside window...');
        const nhap = await prisma.dathangsanpham.findMany({
            where: {
                idSP: product.id,
                dathang: {
                    status: 'danhan',
                    OR: [
                        { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
                        { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: endTime } }
                    ]
                }
            },
            include: { dathang: true }
        });
        console.log(`Found ${nhap.length} imports:`);
        let totalNhap = 0;
        for (const n of nhap) {
            const qty = Number(n.slnhan || n.slgiao);
            totalNhap += qty;
            const completedTime = n.dathang.ngayHoanThanhThucte || n.dathang.updatedAt || new Date();
            console.log(`- Code: ${n.dathang.madncc} | Status: ${n.dathang.status} | Qty: ${qty} | Time: ${completedTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | ngaynhan: ${n.dathang.ngaynhan?.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
        }
        console.log('\n🧮 === STOCK RECONCILIATION CALCULATION ===');
        console.log(`Initial Qty: ${initialQty}`);
        console.log(`Total Imports (+): ${totalNhap}`);
        console.log(`Total Exports (-): ${totalXuat}`);
        const finalCalc = initialQty + totalNhap - totalXuat;
        console.log(`Calculated Stock (initial + imports - exports): ${finalCalc}`);
        console.log(`Actual sltonhethong recorded in Chotkho: 224.57`);
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check_chotkho_calculation.js.map