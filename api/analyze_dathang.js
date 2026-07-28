const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyzeDathang() {
  const stats = await prisma.dathang.groupBy({
    by: ['status'],
    where: {
      ngaynhan: { lte: new Date('2026-05-13T16:59:59Z') } // All up to end of 13-05 VN
    },
    _count: true
  });
  
  console.log('Dathang stats (up to 13-05):', JSON.stringify(stats, null, 2));
  
  const futureStats = await prisma.dathang.groupBy({
    by: ['status'],
    where: {
      ngaynhan: { gte: new Date('2026-05-13T17:00:00Z') } // All from 14-05 VN
    },
    _count: true
  });
  
  console.log('Dathang stats (from 14-05):', JSON.stringify(futureStats, null, 2));
  
  await prisma.$disconnect();
}

analyzeDathang();
