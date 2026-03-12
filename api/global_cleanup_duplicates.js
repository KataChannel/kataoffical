
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting global cleanup of duplicate products in orders...');
  
  const duplicates = await prisma.$queryRaw`
    SELECT "donhangId", "idSP", COUNT(*) as count
    FROM "Donhangsanpham"
    GROUP BY "donhangId", "idSP"
    HAVING COUNT(*) > 1
  `;

  if (duplicates.length === 0) {
    console.log('No duplicates found.');
    return;
  }

  console.log(`Found ${duplicates.length} duplicate groups to merge.`);

  for (const dup of duplicates) {
    const { donhangId, idSP } = dup;
    
    // Get all records for this order and product
    const items = await prisma.donhangsanpham.findMany({
      where: { donhangId, idSP },
      orderBy: { id: 'asc' }
    });

    if (items.length <= 1) continue;

    const [first, ...rest] = items;
    
    // Aggregates
    let totalSldat = Number(first.sldat);
    let totalSlgiao = Number(first.slgiao);
    let totalSlnhan = Number(first.slnhan);
    let totalSlhuy = Number(first.slhuy);
    let totalTtdat = Number(first.ttdat);
    let totalTtgiao = Number(first.ttgiao);
    let totalTtnhan = Number(first.ttnhan);
    let totalTtsauvat = Number(first.ttsauvat);
    let combinedGhichu = first.ghichu || '';

    for (const item of rest) {
      totalSldat += Number(item.sldat);
      totalSlgiao += Number(item.slgiao);
      totalSlnhan += Number(item.slnhan);
      totalSlhuy += Number(item.slhuy);
      totalTtdat += Number(item.ttdat);
      totalTtgiao += Number(item.ttgiao);
      totalTtnhan += Number(item.ttnhan);
      totalTtsauvat += Number(item.ttsauvat);
      
      if (item.ghichu && !combinedGhichu.includes(item.ghichu)) {
        combinedGhichu = combinedGhichu ? `${combinedGhichu}; ${item.ghichu}` : item.ghichu;
      }
    }

    // Update first record and delete others
    await prisma.$transaction([
      prisma.donhangsanpham.update({
        where: { id: first.id },
        data: {
          sldat: totalSldat,
          slgiao: totalSlgiao,
          slnhan: totalSlnhan,
          slhuy: totalSlhuy,
          ttdat: totalTtdat,
          ttgiao: totalTtgiao,
          ttnhan: totalTtnhan,
          ttsauvat: totalTtsauvat,
          ghichu: combinedGhichu
        }
      }),
      prisma.donhangsanpham.deleteMany({
        where: { id: { in: rest.map(r => r.id) } }
      })
    ]);

    console.log(`Merged ${items.length} records for Order ID ${donhangId}, Product ID ${idSP}`);
  }

  console.log('Global cleanup completed.');
}

main().finally(() => prisma.$disconnect());
