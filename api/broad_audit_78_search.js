
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  const tonRecord = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  
  console.log(`Current TonKho ID: ${tonRecord.id}`);
  
  // Search for ANY audit log that mentions 78 as sltontt
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  auditLogs.forEach(l => {
      const news = JSON.stringify(l.newValues);
      if (news.includes('78')) {
          console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Entity: ${l.entityName}, Action: ${l.action}, User: ${l.userEmail}`);
          console.log(`   Data: ${news}`);
      }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
