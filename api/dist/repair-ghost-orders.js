"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const targetDate = new Date('2026-04-16T00:00:00.000Z');
    console.log('--- REPAIRING DATABASE: rausachfinal ---');
    console.log('--- Target: Orders before 2026-04-16 in status dadat/dagiao ---');
    const dathangRes = await prisma.dathang.updateMany({
        where: {
            createdAt: { lt: targetDate },
            status: { in: ['dadat', 'dagiao'] }
        },
        data: { status: 'choxuly' }
    });
    console.log(`- Đã chuyển ${dathangRes.count} Đặt hàng sang 'choxuly'.`);
    const donhangRes = await prisma.donhang.updateMany({
        where: {
            createdAt: { lt: targetDate },
            status: { in: ['dadat', 'dagiao'] }
        },
        data: { status: 'choxuly' }
    });
    console.log(`- Đã chuyển ${donhangRes.count} Đơn hàng sang 'choxuly'.`);
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
    let fixedCount = 0;
    for (const sp of sanphams) {
        const pIn = sp.Dathangsanpham.reduce((sum, item) => sum + Number(item.slgiao || item.sldat || 0), 0);
        const pOut = sp.Donhangsanpham.reduce((sum, item) => sum + Number(item.slgiao || item.sldat || 0), 0);
        const targetIn = Math.round(pIn * 1000) / 1000;
        const targetOut = Math.round(pOut * 1000) / 1000;
        if (sp.TonKho) {
            const curIn = Number(sp.TonKho.slchonhap || 0);
            const curOut = Number(sp.TonKho.slchogiao || 0);
            if (Math.abs(curIn - targetIn) > 0.001 || Math.abs(curOut - targetOut) > 0.001) {
                await prisma.tonKho.update({
                    where: { id: sp.TonKho.id },
                    data: {
                        slchonhap: targetIn,
                        slchogiao: targetOut
                    }
                });
                fixedCount++;
            }
        }
        else if (targetIn > 0 || targetOut > 0) {
            await prisma.tonKho.create({
                data: {
                    sanphamId: sp.id,
                    slton: 0,
                    sltontt: 0,
                    slchonhap: targetIn,
                    slchogiao: targetOut
                }
            });
            fixedCount++;
        }
    }
    console.log(`- Đã đồng bộ lại ${fixedCount} bản ghi tồn kho bị sai lệch.`);
    console.log('--- HOÀN TẤT REPAIR ---');
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=repair-ghost-orders.js.map