import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-02-19T13:00:00+07:00');
  const endDate = new Date('2026-02-20T17:00:00+07:00');

  console.log(`🔎 Checking "Chốt Kho" from ${startDate.toISOString()} to ${endDate.toISOString()} VN...`);

  // 1. PhieuKho marked as chotkho
  const phieukho = await prisma.phieuKho.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      isChotkho: true
    },
    include: { kho: true },
    orderBy: { createdAt: 'desc' }
  });

  // 2. PhieuKho with stock-update related keywords in notes
  const phieukhoKeyword = await prisma.phieuKho.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      ghichu: { contains: 'tồn kho', mode: 'insensitive' }
    },
    orderBy: { createdAt: 'desc' }
  });

  // 3. ImportHistory related to inventory
  const imports = await prisma.importHistory.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      OR: [
        { title: { contains: 'tồn kho', mode: 'insensitive' } },
        { type: { contains: 'tồn kho', mode: 'insensitive' } },
        { status: { contains: 'tồn kho', mode: 'insensitive' } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });

  // 4. AuditLog in that time window
  const audits = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      OR: [
        { entityName: { in: ['TonKho', 'Chotkho', 'Chotkhodetail'] } },
        { metadata: { path: ['action'], equals: 'InventoryUpdate' } } // Guessing some metadata
      ]
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`\n--- PHIEU KHO (isChotkho=true) ---`);
  console.log(`Found: ${phieukho.length}`);
  phieukho.forEach(p => console.log(`- ${p.maphieu} | ${p.type} | Created: ${p.createdAt.toISOString()}`));

  console.log(`\n--- PHIEU KHO (Keyword 'tồn kho') ---`);
  console.log(`Found: ${phieukhoKeyword.length}`);
  phieukhoKeyword.forEach(p => console.log(`- ${p.maphieu} | Ghichu: ${p.ghichu} | Created: ${p.createdAt.toISOString()}`));

  console.log(`\n--- IMPORT HISTORY ---`);
  console.log(`Found: ${imports.length}`);
  imports.forEach(i => console.log(`- Title: ${i.title} | Status: ${i.status} | Created: ${i.createdAt.toISOString()}`));

  console.log(`\n--- AUDIT LOG (Inventory related) ---`);
  console.log(`Found: ${audits.length}`);
  audits.forEach(a => console.log(`- Entity: ${a.entityName} | Action: ${a.action} | Created: ${a.createdAt.toISOString()}`));

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
