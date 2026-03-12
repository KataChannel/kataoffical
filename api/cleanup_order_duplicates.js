
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orderId = 'f568a61d-91fe-4c12-935d-eb4bc21cb437';
  console.log(`Cleaning up order ${orderId}...`);

  const order = await prisma.donhang.findUnique({
    where: { id: orderId },
    include: { sanpham: true }
  });

  if (!order) {
    console.log('Order not found');
    return;
  }

  const productsMap = new Map();

  for (const item of order.sanpham) {
    const key = item.idSP;
    if (productsMap.has(key)) {
      const existing = productsMap.get(key);
      console.log(`Merging duplicate product ${key} (RecID: ${item.id})`);
      
      // Accumulate quantities
      existing.sldat += Number(item.sldat) || 0;
      existing.slgiao += Number(item.slgiao) || 0;
      existing.slnhan += Number(item.slnhan) || 0;
      existing.slhuy += Number(item.slhuy) || 0;
      existing.ttdat += Number(item.ttdat) || 0;
      existing.ttgiao += Number(item.ttgiao) || 0;
      existing.ttnhan += Number(item.ttnhan) || 0;
      existing.ttsauvat += Number(item.ttsauvat) || 0;
      
      if (item.ghichu && !existing.ghichu.includes(item.ghichu)) {
        existing.ghichu = existing.ghichu ? `${existing.ghichu}; ${item.ghichu}` : item.ghichu;
      }
      
      existing.idsToDelete.push(item.id);
    } else {
      productsMap.set(key, {
        ...item,
        sldat: Number(item.sldat) || 0,
        slgiao: Number(item.slgiao) || 0,
        slnhan: Number(item.slnhan) || 0,
        slhuy: Number(item.slhuy) || 0,
        ttdat: Number(item.ttdat) || 0,
        ttgiao: Number(item.ttgiao) || 0,
        ttnhan: Number(item.ttnhan) || 0,
        ttsauvat: Number(item.ttsauvat) || 0,
        idsToDelete: []
      });
    }
  }

  const allIdsToDelete = [];
  productsMap.forEach(item => {
    if (item.idsToDelete.length > 0) {
      allIdsToDelete.push(...item.idsToDelete);
    }
  });

  if (allIdsToDelete.length === 0) {
    console.log('No duplicates found.');
    return;
  }

  const transaction = await prisma.$transaction(async (tx) => {
    // 1. Update the "surviving" items with aggregated quantities
    for (const [idSP, item] of productsMap.entries()) {
      if (item.idsToDelete.length > 0) {
        await tx.donhangsanpham.update({
          where: { id: item.id },
          data: {
            sldat: item.sldat,
            slgiao: item.slgiao,
            slnhan: item.slnhan,
            slhuy: item.slhuy,
            ttdat: item.ttdat,
            ttgiao: item.ttgiao,
            ttnhan: item.ttnhan,
            ttsauvat: item.ttsauvat,
            ghichu: item.ghichu
          }
        });
      }
    }

    // 2. Delete the redundant items
    await tx.donhangsanpham.deleteMany({
      where: { id: { in: allIdsToDelete } }
    });

    return { updated: productsMap.size, deleted: allIdsToDelete.length };
  });

  console.log(`Cleanup complete: Updated ${transaction.updated} items, Deleted ${transaction.deleted} duplicates.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
