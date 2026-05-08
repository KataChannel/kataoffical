
import { PrismaClient } from '@prisma/client';

async function run() {
  const prisma = new PrismaClient();
  const todayStart = new Date('2026-05-05T00:00:00Z');
  
  console.log('🔍 Analyzing inventory changes caused by old order updates today...\n');

  // Find all Dathang updates today
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      createdAt: { gt: todayStart },
      entityName: 'Update Dathang',
      action: 'UPDATE'
    },
    orderBy: { createdAt: 'desc' }
  });

  const affectedProducts = new Map();

  for (const log of auditLogs) {
    const data = log.newValues as any;
    if (!data || !data.sanpham) continue;

    const orderDate = new Date(data.createdAt);
    // Only care about orders from BEFORE today
    if (orderDate >= todayStart) continue;

    const madncc = data.madncc;

    for (const item of data.sanpham) {
      const sp = await prisma.sanpham.findUnique({
        where: { id: item.idSP },
        select: { masp: true, title: true }
      });

      if (sp) {
        const key = sp.masp;
        if (!affectedProducts.has(key)) {
          affectedProducts.set(key, {
            masp: sp.masp,
            title: sp.title,
            orders: new Set(),
            totalNhan: 0
          });
        }
        const info = affectedProducts.get(key);
        info.orders.add(`${madncc} (${orderDate.toLocaleDateString('vi-VN')})`);
        info.totalNhan += Number(item.slnhan || 0);
      }
    }
  }

  // Also check Donhang updates if necessary, but Dathang (Imports) are the main cause of stock increase
  
  const sortedProducts = Array.from(affectedProducts.values()).sort((a, b) => a.masp.localeCompare(b.masp));

  console.log(`| Mã SP | Tên Sản Phẩm | Các Đơn Hàng Cũ Được Cập Nhật Hôm Nay |`);
  console.log(`|-------|--------------|--------------------------------------|`);
  
  for (const p of sortedProducts) {
    console.log(`| ${p.masp} | ${p.title} | ${Array.from(p.orders).join(', ')} |`);
  }

  console.log(`\nTotal products affected: ${sortedProducts.length}`);

  await prisma.$disconnect();
}

run();
