
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function auditWarehouseStatus() {
  try {
    const lastChotTime = new Date('2026-05-09T17:00:00Z');
    console.log(`--- Auditing warehouse status since: ${lastChotTime.toISOString()} ---`);

    // 1. Outbound Orders (Donhang)
    const outboundOrders = await prisma.donhang.findMany({
      where: {
        ngaygiao: { gte: lastChotTime },
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
      },
      select: { id: true, madonhang: true, status: true, ngaygiao: true }
    });

    // 2. Inbound Orders (Dathang)
    const inboundOrders = await prisma.dathang.findMany({
      where: {
        ngaynhan: { gte: lastChotTime },
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
      },
      select: { id: true, madncc: true, status: true, ngaynhan: true }
    });

    // 3. Warehouse Slips (PhieuKho)
    const slips = await prisma.phieuKho.findMany({
      where: {
        createdAt: { gte: lastChotTime }
      }
    });

    // 4. Products with movement
    const productsWithMovement = await prisma.phieuKhoSanpham.groupBy({
      by: ['sanphamId'],
      where: {
        createdAt: { gte: lastChotTime }
      },
      _count: true
    });

    // 5. Negative stock items
    const negativeStockItems = await prisma.tonKho.findMany({
      where: {
        slton: { lt: 0 }
      },
      include: {
        sanpham: {
          select: { title: true, masp: true }
        }
      },
      orderBy: { slton: 'asc' }
    });

    // 6. Check for missing slips (Confirmed orders with 0 slips)
    const missingSlips = [];
    for (const order of outboundOrders) {
        const hasSlip = await prisma.phieuKho.findFirst({ where: { madonhang: order.madonhang } });
        if (!hasSlip) missingSlips.push(order.madonhang);
    }

    // 7. Check slchogiao (pending delivery) anomalies
    const pendingAnomalies = await prisma.tonKho.findMany({
      where: {
        slchogiao: { gt: 0 } 
      },
      include: {
        sanpham: { select: { title: true, masp: true } }
      },
      orderBy: { slchogiao: 'desc' }
    });

    console.log('\n--- AUDIT RESULTS ---');
    console.log(`1. Outbound Orders (Confirmed/Delivered): ${outboundOrders.length}`);
    console.log(`2. Inbound Orders (Confirmed/Received): ${inboundOrders.length}`);
    console.log(`3. Warehouse Slips Created: ${slips.length}`);
    console.log(`4. Products with actual movement: ${productsWithMovement.length}`);
    console.log(`5. Negative Stock Items: ${negativeStockItems.length}`);
    if (negativeStockItems.length > 0) {
      console.log('   Top negative items:');
      negativeStockItems.slice(0, 5).forEach(item => {
        console.log(`   - ${item.sanpham.title} (${item.sanpham.masp}): ${item.slton}`);
      });
    }

    console.log(`\n6. Orders missing slips: ${missingSlips.length}`);
    if (missingSlips.length > 0) {
        console.log(`   Sample: ${missingSlips.slice(0, 5).join(', ')}`);
    }

    console.log('\n7. Top products with high "Pending Delivery" or Over-reservation:');
    pendingAnomalies.slice(0, 5).forEach(item => {
      const usable = Number(item.slton) - Number(item.slchogiao);
      console.log(`   - ${item.sanpham.title}: Ton=${item.slton}, ChoGiao=${item.slchogiao}, KhaDung=${usable}`);
    });

  } catch (error) {
    console.error('Audit failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

auditWarehouseStatus();
