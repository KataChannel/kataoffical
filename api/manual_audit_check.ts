import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const madonhang = 'TG-AA30553';
  const dh = await prisma.donhang.findUnique({ where: { madonhang } });
  if (!dh) {
    console.log('Order not found');
    return;
  }
  
  const audits = await prisma.auditLog.findMany({
    where: {
      OR: [
        { entityId: dh.id },
        { newValues: { path: ['donhangId'], equals: dh.id } },
        { oldValues: { path: ['donhangId'], equals: dh.id } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
  
  console.log(`Found ${audits.length} audits`);
  for (const a of audits) {
    console.log('---');
    console.log(`Time: ${a.createdAt.toISOString()}`);
    console.log(`User: ${a.userEmail}`);
    console.log(`Action: ${a.action} on ${a.entityName}`);
    console.log(`Changed: ${a.changedFields.join(', ')}`);
    console.log(`Old: ${JSON.stringify(a.oldValues)}`);
    console.log(`New: ${JSON.stringify(a.newValues)}`);
  }

  // Also search for the product code directly in AuditLog just in case
  const productAudits = await prisma.auditLog.findMany({
    where: {
        OR: [
            { oldValues: { path: ['title'], string_contains: 'Thanh long ruột đỏ' } },
            { newValues: { path: ['title'], string_contains: 'Thanh long ruột đỏ' } },
            { metadata: { path: ['title'], string_contains: 'Thanh long ruột đỏ' } }
        ],
        createdAt: { gte: new Date('2026-03-01') }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`\nFound ${productAudits.length} product-related audits`);
    for (const a of productAudits) {
        console.log('---');
        console.log(`Time: ${a.createdAt.toISOString()}`);
        console.log(`User: ${a.userEmail}`);
        console.log(`Action: ${a.action} on ${a.entityName}`);
        console.log(`Metadata: ${JSON.stringify(a.metadata)}`);
    }
}
main().finally(() => prisma.$disconnect());
