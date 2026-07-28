
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const madonhang = 'TG-AA31072';
  const donhang = await prisma.donhang.findUnique({
    where: { madonhang },
    include: {
      khachhang: true
    }
  });

  if (!donhang) return console.log('Donhang not found');

  console.log(`Donhang: ${donhang.madonhang}`);
  console.log(`Status: ${donhang.status}`);
  console.log(`CreatedAt: ${donhang.createdAt.toLocaleString('vi-VN')}`);
  console.log(`UpdatedAt: ${donhang.updatedAt.toLocaleString('vi-VN')}`);
  console.log(`Khachhang: ${donhang.khachhang?.title}`);
  
  // Who created it?
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      entityId: donhang.id,
      entityName: 'Donhang'
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`\nAudit Logs for Donhang:`);
  auditLogs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] User: ${l.userEmail}, Action: ${l.action}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
