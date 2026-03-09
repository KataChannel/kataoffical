
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Không thấy sản phẩm I100128');

  // Search AuditLog for changes to this product's TonKho
  const logs = await prisma.auditLog.findMany({
    where: {
      entityId: sanpham.id,
      entityName: 'TonKho',
      createdAt: { gte: new Date('2026-03-08T00:00:00Z') }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Lịch sử AuditLog của TonKho (I100128) hôm nay:\n`);
  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] User: ${l.userEmail}`);
      console.log(`   Old: ${JSON.stringify(l.oldValues)}`);
      console.log(`   New: ${JSON.stringify(l.newValues)}`);
  });
  
  // Also check if the TonKho record was updated via the Phieugiao update flow
  const PGlogs = await prisma.auditLog.findMany({
      where: {
          entityName: 'Phieugiao',
          createdAt: { gte: new Date('2026-03-08T00:00:00Z') },
          OR: [
              { newValues: { path: ['newValues', 'madonhang'], equals: 'TG-AA31072' } }, // This doesn't work for JSON
              { action: 'UPDATE' }
          ]
      },
      orderBy: { createdAt: 'desc' },
      take: 20
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
