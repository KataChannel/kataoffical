import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const madonhang = 'TG-AA30553';
  console.log(`🔎 Searching AuditLog for order: ${madonhang}`);
  
  const dh = await prisma.donhang.findUnique({
    where: { madonhang }
  });

  if (!dh) {
    console.log(`❌ Order ${madonhang} not found.`);
    return;
  }

  console.log(`✅ Found order ID: ${dh.id}`);

  const audits = await prisma.auditLog.findMany({
    where: {
      OR: [
        { entityId: dh.id },
        { metadata: { path: ['madonhang'], equals: madonhang } },
        { oldValues: { path: ['madonhang'], equals: madonhang } },
        { newValues: { path: ['madonhang'], equals: madonhang } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Found ${audits.length} audit entries for order.`);
  audits.forEach(a => {
    console.log(`---`);
    console.log(`Time: ${a.createdAt.toISOString()}`);
    console.log(`Action: ${a.action} on ${a.entityName}`);
    console.log(`User: ${a.userEmail}`);
    console.log(`Fields: ${a.changedFields.join(', ')}`);
    console.log(`Old: ${JSON.stringify(a.oldValues)}`);
    console.log(`New: ${JSON.stringify(a.newValues)}`);
  });

  console.log(`\n🔎 Searching for changes in items of this order...`);
  const dhsp = await prisma.donhangsanpham.findMany({
    where: { donhangId: dh.id },
    include: { sanpham: true }
  });

  for (const item of dhsp) {
    const itemAudits = await prisma.auditLog.findMany({
      where: { entityId: item.id },
      orderBy: { createdAt: 'desc' }
    });
    
    if (itemAudits.length > 0) {
      console.log(`Found ${itemAudits.length} audit entries for item: ${item.sanpham.title} (${item.sanpham.masp}) (ID: ${item.id})`);
      itemAudits.forEach(a => {
        console.log(`  [Item Audit] ${a.createdAt.toISOString()} | Action: ${a.action} | User: ${a.userEmail} | Fields: ${a.changedFields.join(', ')}`);
        if (a.oldValues) console.log(`    Old: ${JSON.stringify(a.oldValues)}`);
        if (a.newValues) console.log(`    New: ${JSON.stringify(a.newValues)}`);
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
