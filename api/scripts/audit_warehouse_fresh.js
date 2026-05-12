
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function auditWarehouseFresh() {
  try {
    const lastChotTime = new Date('2026-05-09T17:00:00Z');
    const now = new Date();
    console.log(`--- FRESH AUDIT (Post-Baseline Only) ---`);
    console.log(`Baseline: ${lastChotTime.toISOString()}`);
    console.log(`Current: ${now.toISOString()}`);

    // 1. New Outbound Orders (Donhang)
    const newOrders = await prisma.donhang.findMany({
      where: {
        createdAt: { gte: lastChotTime }
      },
      include: { sanpham: true, PhieuKho: true }
    });

    // 2. New Inbound Orders (Dathang)
    const newInbound = await prisma.dathang.findMany({
      where: {
        createdAt: { gte: lastChotTime }
      },
      include: { sanpham: true }
    });

    // 3. New Slips (PhieuKho)
    const newSlips = await prisma.phieuKho.findMany({
      where: {
        createdAt: { gte: lastChotTime }
      }
    });

    // 4. Calculate NEW slchogiao (Pending Delivery from NEW orders only)
    const activeNewOrders = newOrders.filter(o => o.status === 'dadat');
    const newPendingMap = new Map();
    for (const o of activeNewOrders) {
      for (const sp of o.sanpham) {
        const current = newPendingMap.get(sp.idSP) || 0;
        newPendingMap.set(sp.idSP, current + Number(sp.sldat));
      }
    }

    // 5. Check for missing slips in NEW confirmed orders
    const confirmedNewOrders = newOrders.filter(o => ['dagiao', 'danhan', 'hoanthanh'].includes(o.status));
    const missingSlips = confirmedNewOrders.filter(o => o.PhieuKho.length === 0);

    // 6. Negative stock check (Physical slton < 0)
    const negativeStock = await prisma.tonKho.findMany({
      where: { slton: { lt: 0 } },
      include: { sanpham: { select: { title: true, masp: true } } }
    });

    console.log('\n--- RESULTS (ONLY SINCE 09/05 CLOSE) ---');
    console.log(`1. New Orders Created: ${newOrders.length}`);
    console.log(`   - Pending (dadat): ${activeNewOrders.length}`);
    console.log(`   - Confirmed (dagiao/hoanthanh): ${confirmedNewOrders.length}`);
    console.log(`2. New Inbound Created: ${newInbound.length}`);
    console.log(`3. New Slips Created: ${newSlips.length}`);
    
    console.log(`\n4. "True" Pending Delivery (Post-Baseline Only):`);
    // Sort and get top 5
    const sortedPending = Array.from(newPendingMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    for (const [id, qty] of sortedPending) {
        const sp = await prisma.sanpham.findUnique({ where: { id }, select: { title: true } });
        console.log(`   - ${sp.title}: ${qty}`);
    }

    console.log(`\n5. Missing Slips in NEW Confirmed Orders: ${missingSlips.length}`);
    if (missingSlips.length > 0) {
      console.log(`   Sample: ${missingSlips.slice(0, 5).map(o => o.madonhang).join(', ')}`);
    }

    console.log(`\n6. Current Negative Stock: ${negativeStock.length}`);
    negativeStock.slice(0, 5).forEach(item => {
      console.log(`   - ${item.sanpham.title}: ${item.slton}`);
    });

  } catch (error) {
    console.error('Audit failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

auditWarehouseFresh();
