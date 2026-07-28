import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-02-20T00:00:00+07:00');
  const endDate = new Date('2026-02-20T23:59:59+07:00');

  console.log(`Checking AUDIT LOG from ${startDate.toISOString()} to ${endDate.toISOString()}`);

  const audits = await prisma.auditLog.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      }
    },
    select: { entityName: true, action: true, createdAt: true }
  });

  const auditSummary = audits.reduce((acc, curr) => {
    const key = `${curr.entityName}_${curr.action}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log(auditSummary);

  const inventoryAudits = await prisma.auditLog.findMany({
    where: {
      entityName: {
        in: ['Sanpham', 'TonKho', 'SanphamKho', 'Inventory']
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`\nFound ${inventoryAudits.length} inventory related audits`);
  inventoryAudits.forEach(a => console.log(`${a.entityName} ${a.action} at ${a.createdAt.toISOString()}`));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
