import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const madonhang = 'TG-AA30553';
  const dh = await prisma.donhang.findUnique({ where: { madonhang } });
  if (!dh) return;

  const items = await prisma.donhangsanpham.findMany({
    where: { donhangId: dh.id },
    include: { sanpham: true }
  });

  console.log(`Auditing items for order ${madonhang}...`);

  for (const item of items) {
    const audits = await prisma.auditLog.findMany({
      where: { entityId: item.id },
      orderBy: { createdAt: 'desc' }
    });

    if (audits.length > 0) {
      console.log(`\nItem: ${item.sanpham.title} (${item.sanpham.masp})`);
      audits.forEach(a => {
        const changed = a.changedFields || [];
        // Ignore initial price settings if they are from null user
        if (a.userEmail === null && priceOnly(a)) return;
        
        console.log(`- [${a.createdAt.toISOString()}] User: ${a.userEmail} | Action: ${a.action} | Fields: ${changed.join(', ')}`);
        console.log(`  Old: ${JSON.stringify(a.oldValues)}`);
        console.log(`  New: ${JSON.stringify(a.newValues)}`);
      });
    }
  }
}

function priceOnly(audit) {
    if (!audit.changedFields) return false;
    if (audit.changedFields.length === 1 && audit.changedFields[0] === 'giaban') return true;
    return false;
}

main().finally(() => prisma.$disconnect());
