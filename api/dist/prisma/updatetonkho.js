"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const moment = require("moment-timezone");
const prisma = new client_1.PrismaClient();
class InventoryUpdater {
    async getOrdersForToday() {
        const today = {
            gte: moment().startOf('day').toDate(),
            lte: moment().endOf('day').toDate(),
        };
        const [donhangs, dathangs] = await Promise.all([
            prisma.donhang.findMany({
                where: {
                    ngaygiao: today,
                    status: 'dadat',
                },
                include: { sanpham: true },
            }),
            prisma.dathang.findMany({
                where: {
                    ngaynhan: today,
                    status: 'dadat',
                },
                include: { sanpham: true },
            }),
        ]);
        return { donhangs, dathangs };
    }
    aggregateProductQuantities(orders) {
        const summaryMap = new Map();
        orders.forEach(order => {
            order.sanpham.forEach((product) => {
                const productId = product.idSP;
                const quantity = Number(product.sldat);
                summaryMap.set(productId, (summaryMap.get(productId) || 0) + quantity);
            });
        });
        return Array.from(summaryMap.entries()).map(([idSP, sldat]) => ({ idSP, sldat }));
    }
    async resetInventoryCounters() {
        await prisma.tonKho.updateMany({
            where: {
                OR: [
                    { slchonhap: { gt: 0 } },
                    { slchogiao: { gt: 0 } },
                ],
            },
            data: {
                slchogiao: 0,
                slchonhap: 0,
            },
        });
    }
    async updateInventoryCounters(summary, field) {
        const updatePromises = summary.map(item => prisma.tonKho.update({
            where: { sanphamId: item.idSP.toString() },
            data: {
                [field]: { increment: item.sldat },
            },
        }));
        await Promise.all(updatePromises);
    }
    async updateInventory() {
        try {
            const { donhangs, dathangs } = await this.getOrdersForToday();
            const donhangSummary = this.aggregateProductQuantities(donhangs);
            const dathangSummary = this.aggregateProductQuantities(dathangs);
            await this.resetInventoryCounters();
            await Promise.all([
                this.updateInventoryCounters(donhangSummary, 'slchogiao'),
                this.updateInventoryCounters(dathangSummary, 'slchonhap'),
            ]);
            console.log('Inventory update completed successfully!');
        }
        catch (error) {
            console.error('Error updating inventory:', error);
            throw error;
        }
    }
}
async function main() {
    const updater = new InventoryUpdater();
    try {
        await updater.updateInventory();
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch(console.error);
//# sourceMappingURL=updatetonkho.js.map