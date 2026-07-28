const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixBaselineAndOrders() {
  try {
    console.log('--- Fixing Baseline Side Effects (12-05 and 13-05) ---');

    // 1. Revert tomorrow's orders (14-05 onwards) to 'dadat'
    // 14-05-2026 00:00:00 VN = 2026-05-13T17:00:00Z
    const tomorrowStart = new Date('2026-05-13T17:00:00Z');

    const updatedDonhang = await prisma.donhang.updateMany({
      where: {
        status: 'choxuly',
        ngaygiao: { gte: tomorrowStart }
      },
      data: { status: 'dadat', updatedAt: new Date() }
    });

    const updatedDathang = await prisma.dathang.updateMany({
      where: {
        status: 'choxuly',
        ngaynhan: { gte: tomorrowStart }
      },
      data: { status: 'dadat', updatedAt: new Date() }
    });

    console.log(`Reverted ${updatedDonhang.count} Donhang and ${updatedDathang.count} Dathang to 'dadat'.`);

    // 2. Recalculate slchogiao and slchonhap for all products
    console.log('Recalculating slchogiao/slchonhap based on ALL current dadat orders...');

    const allDadatDonhang = await prisma.donhang.findMany({
      where: { status: 'dadat' },
      include: { sanpham: true }
    });

    const allDadatDathang = await prisma.dathang.findMany({
      where: { status: 'dadat' },
      include: { sanpham: true }
    });

    const slchogiaoMap = new Map();
    const slchonhapMap = new Map();

    allDadatDonhang.forEach(dh => {
      dh.sanpham.forEach(sp => {
        const id = sp.idSP;
        const qty = parseFloat(sp.sldat) || 0;
        slchogiaoMap.set(id, (slchogiaoMap.get(id) || 0) + qty);
      });
    });

    allDadatDathang.forEach(dh => {
      dh.sanpham.forEach(sp => {
        const id = sp.idSP;
        const qty = parseFloat(sp.sldat) || 0;
        slchonhapMap.set(id, (slchonhapMap.get(id) || 0) + qty);
      });
    });

    // Reset and Update in Transaction
    await prisma.$transaction(async (tx) => {
      // Reset all to 0 first
      await tx.tonKho.updateMany({
        data: { slchogiao: 0, slchonhap: 0 }
      });

      // Update slchogiao
      for (const [spId, qty] of slchogiaoMap.entries()) {
        await tx.tonKho.upsert({
          where: { sanphamId: spId },
          create: { sanphamId: spId, slchogiao: qty, slton: 0, sltontt: 0, slchonhap: 0 },
          update: { slchogiao: qty }
        });
      }

      // Update slchonhap
      for (const [spId, qty] of slchonhapMap.entries()) {
        await tx.tonKho.upsert({
          where: { sanphamId: spId },
          create: { sanphamId: spId, slchonhap: qty, slton: 0, sltontt: 0, slchogiao: 0 },
          update: { slchonhap: qty }
        });
      }
    });

    console.log('Recalculation complete.');
    console.log(`- Products with slchogiao > 0: ${slchogiaoMap.size}`);
    console.log(`- Products with slchonhap > 0: ${slchonhapMap.size}`);

  } catch (error) {
    console.error('Error during fix:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixBaselineAndOrders();
