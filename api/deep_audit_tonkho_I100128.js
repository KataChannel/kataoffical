
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  const tonKho = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  
  if (!tonKho) return console.log('Không thấy TonKho cho I100128');
  console.log(`TonKho ID: ${tonKho.id}`);

  const logs = await prisma.auditLog.findMany({
    where: {
      entityId: tonKho.id,
      entityName: 'TonKho',
      createdAt: { gte: new Date('2026-03-08T00:00:00Z') }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Lịch sử AuditLog của TonKho (I100128) hôm nay:\n`);
  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] User: ${l.userEmail}, Action: ${l.action}`);
      console.log(`   Old: ${JSON.stringify(l.oldValues)}`);
      console.log(`   New: ${JSON.stringify(l.newValues)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
