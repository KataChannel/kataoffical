import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-02-19T13:00:00+07:00');
  const endDate = new Date('2026-02-20T17:00:00+07:00');

  console.log(`🔎 Searching for ANY updates to TonKho or Sanpham from ${startDate.toISOString()} to ${endDate.toISOString()} VN...`);

  const audits = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      entityName: { in: ['TonKho', 'Sanpham', 'SanphamKho'] }
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`\nFound ${audits.length} audit logs:`);
  audits.forEach(a => {
    console.log(`- Entity: ${a.entityName} | Action: ${a.action} | Time: ${a.createdAt.toISOString()} | User: ${a.userId || a.userEmail}`);
  });

  const sanphamUpdates = await prisma.sanpham.findMany({
    where: {
      updatedAt: { gte: startDate, lte: endDate }
    },
    select: { masp: true, title: true, updatedAt: true },
    orderBy: { updatedAt: 'asc' }
  });

  console.log(`\nFound ${sanphamUpdates.length} Sanpham updatedAt in this window.`);
  if (sanphamUpdates.length > 0) {
      console.log(`Sample:`, sanphamUpdates.slice(0, 5));
  }

  const tonkhoUpdates = await prisma.tonKho.findMany({
    where: {
      updatedAt: { gte: startDate, lte: endDate }
    },
    include: { sanpham: true },
    orderBy: { updatedAt: 'asc' }
  });

  console.log(`\nFound ${tonkhoUpdates.length} TonKho updatedAt in this window.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
