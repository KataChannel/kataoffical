"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const cutoffDate = new Date('2026-04-16T00:00:00.000Z');
    console.log(`🚀 Bắt đầu cập nhật đơn hàng trước ngày ${cutoffDate.toISOString()}...`);
    try {
        const updateDonhang = await prisma.donhang.updateMany({
            where: {
                OR: [
                    { ngaygiao: { lt: cutoffDate } },
                    { createdAt: { lt: cutoffDate } }
                ],
                status: {
                    notIn: ['hoanthanh', 'choxuly']
                }
            },
            data: {
                status: 'choxuly'
            }
        });
        console.log(`✅ Đã cập nhật ${updateDonhang.count} đơn hàng khách (Donhang) về trạng thái 'choxuly'.`);
        const updateDathang = await prisma.dathang.updateMany({
            where: {
                OR: [
                    { ngaynhan: { lt: cutoffDate } },
                    { createdAt: { lt: cutoffDate } }
                ],
                status: {
                    notIn: ['hoanthanh', 'choxuly']
                }
            },
            data: {
                status: 'choxuly'
            }
        });
        console.log(`✅ Đã cập nhật ${updateDathang.count} đơn đặt nhà cung cấp (Dathang) về trạng thái 'choxuly'.`);
    }
    catch (error) {
        console.error('❌ Lỗi khi thực hiện cập nhật:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=update_old_orders.js.map