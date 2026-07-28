const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRecentChanges() {
  const recentLogs = await prisma.auditLog.findMany({
    where: {
      entityName: { in: ['Donhang', 'Dathang'] },
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24h
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  console.log(JSON.stringify(recentLogs, null, 2));
  await prisma.$disconnect();
}

checkRecentChanges();
