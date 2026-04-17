"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const targetDate = new Date('2026-04-16T00:00:00.000Z');
    console.log('--- ĐÓNG CÁC ĐƠN HÀNG CŨ (Trước 16/04/2026) ---');
    const dathangRes = await prisma.dathang.updateMany({
        where: {
            createdAt: { lt: targetDate },
            status: { in: ['dadat', 'dagiao', 'choxuly'] }
        },
        data: { status: 'danhan' }
    });
    console.log(`Đã cập nhật ${dathangRes.count} phiếu Đặt hàng sang Đã nhận.`);
    const donhangRes = await prisma.donhang.updateMany({
        where: {
            createdAt: { lt: targetDate },
            status: { in: ['dadat', 'dagiao', 'choxuly'] }
        },
        data: { status: 'hoanthanh' }
    });
    console.log(`Đã cập nhật ${donhangRes.count} phiếu Đơn hàng sang Hoàn thành.`);
    console.log('--- ĐỒNG BỘ LẠI slchogiao VÀ slchonhap ---');
    const sanphams = await prisma.sanpham.findMany({
        include: {
            TonKho: true,
            Donhangsanpham: {
                where: { donhang: { status: { in: ['dadat', 'dagiao'] } } }
            },
            Dathangsanpham: {
                where: { dathang: { status: { in: ['dadat', 'dagiao'] } } }
            }
        }
    });
    let fixed = 0;
    for (const sanpham of sanphams) {
        const pendingOut = sanpham.Donhangsanpham.reduce((sum, item) => sum + Number(item.slgiao || item.sldat || 0), 0);
        const pendingIn = sanpham.Dathangsanpham.reduce((sum, item) => sum + Number(item.slgiao || item.sldat || 0), 0);
        const correctedSlchogiao = Math.round(pendingOut * 1000) / 1000;
        const correctedSlchonhap = Math.round(pendingIn * 1000) / 1000;
        if (sanpham.TonKho) {
            if (Number(sanpham.TonKho.slchogiao) !== correctedSlchogiao || Number(sanpham.TonKho.slchonhap) !== correctedSlchonhap) {
                await prisma.tonKho.update({
                    where: { sanphamId: sanpham.id },
                    data: {
                        slchogiao: correctedSlchogiao,
                        slchonhap: correctedSlchonhap
                    }
                });
                fixed++;
            }
        }
        else if (correctedSlchogiao > 0 || correctedSlchonhap > 0) {
            await prisma.tonKho.create({
                data: {
                    sanphamId: sanpham.id,
                    slton: 0,
                    slchogiao: correctedSlchogiao,
                    slchonhap: correctedSlchonhap,
                    sltontt: 0
                }
            });
            fixed++;
        }
    }
    console.log(`Đã đồng bộ lại ${fixed} bản ghi TonKho bị lệch dữ liệu treo.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=repair-ghost-orders.js.map