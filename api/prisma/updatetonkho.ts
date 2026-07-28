import { PrismaClient, Prisma } from '@prisma/client';
import * as moment from 'moment-timezone';

const prisma = new PrismaClient();

interface ProductSummary {
  idSP: number;
  sldat: number;
}

interface OrderProduct {
  idSP: number;
  sldat: string | number;
}

class InventoryUpdater {
  private async getOrdersForToday() {
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

  private aggregateProductQuantities(orders: any[]): ProductSummary[] {
    const summaryMap = new Map<number, number>();

    orders.forEach(order => {
      order.sanpham.forEach((product: OrderProduct) => {
        const productId = product.idSP;
        const quantity = Number(product.sldat);
        summaryMap.set(productId, (summaryMap.get(productId) || 0) + quantity);
      });
    });

    return Array.from(summaryMap.entries()).map(([idSP, sldat]) => ({ idSP, sldat }));
  }

  private async resetInventoryCounters() {
    await prisma.tonKho.updateMany({
      where: {
        OR: [
          { slchonhap: { not: 0 } },
          { slchogiao: { not: 0 } },
        ],
      },
      data: {
        slchogiao: 0,
        slchonhap: 0,
      },
    });
  }

  private async updateInventoryCounters(
    summary: ProductSummary[],
    field: 'slchogiao' | 'slchonhap'
  ) {
    const updatePromises = summary.map(item =>
      prisma.tonKho.update({
        where: { sanphamId: item.idSP.toString() },
        data: {
          [field]: { increment: item.sldat },
        },
      })
    );

    await Promise.all(updatePromises);
  }

  async updateInventory(): Promise<void> {
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
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  }
}

async function main() {
  const updater = new InventoryUpdater();
  
  try {
    await updater.updateInventory();
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
