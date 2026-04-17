import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cutoffDate = new Date('2026-04-16T00:00:00.000Z');
  console.log(`🚀 Bắt đầu cập nhật đơn hàng trước ngày ${cutoffDate.toISOString()}...`);

  try {
    // 1. Cập nhật Donhang (Đơn bán khách hàng)
    const updateDonhang = await prisma.donhang.updateMany({
      where: {
        OR: [
          { ngaygiao: { lt: cutoffDate } },
          { createdAt: { lt: cutoffDate } }
        ],
        status: {
          notIn: ['hoanthanh', 'choxuly'] // Không chạm vào các đơn đã hoàn tất hoặc đã là chờ xử lý
        }
      },
      data: {
        status: 'choxuly'
      }
    });
    console.log(`✅ Đã cập nhật ${updateDonhang.count} đơn hàng khách (Donhang) về trạng thái 'choxuly'.`);

    // 2. Cập nhật Dathang (Đơn đặt nhà cung cấp)
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

  } catch (error) {
    console.error('❌ Lỗi khi thực hiện cập nhật:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
