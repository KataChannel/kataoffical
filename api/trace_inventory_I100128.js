
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  const tonkho = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});

  const logs = await prisma.auditLog.findMany({
    where: {
      entityId: tonkho.id,
      entityName: 'TonKho'
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  logs.forEach(l => {
      const vals = l.newValues;
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Action: ${l.action}, User: ${l.userEmail}`);
      console.log(`   Changes: ${JSON.stringify(vals)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
