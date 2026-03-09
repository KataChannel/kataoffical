
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const maphieu = 'PX-TG-AA31072';
  const phieukho = await prisma.phieuKho.findUnique({
    where: { maphieu },
    include: {
      donhang: true,
      dathang: true
    }
  });

  if (!phieukho) return console.log('PhieuKho not found');

  console.log(`PhieuKho: ${phieukho.maphieu}`);
  console.log(`Donhang: ${phieukho.donhang?.madonhang}`);
  
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      entityId: phieukho.id,
      entityName: 'PhieuKho'
    },
    orderBy: { createdAt: 'asc' }
  });

  if (auditLogs.length > 0) {
    console.log(`\nAudit Logs for PhieuKho:`);
    auditLogs.forEach(log => {
      console.log(`[${log.createdAt.toLocaleString('vi-VN')}] User: ${log.userEmail}, Action: ${log.action}`);
    });
  } else {
    // If no logs for PhieuKho, check the Donhang it belongs to
    if (phieukho.donhang) {
        const donhangLogs = await prisma.auditLog.findMany({
            where: {
                entityId: phieukho.donhang.id,
                entityName: 'Donhang'
            },
            orderBy: { createdAt: 'asc' }
        });
        console.log(`\nAudit Logs for Donhang ${phieukho.donhang.madonhang}:`);
        donhangLogs.forEach(log => {
            console.log(`[${log.createdAt.toLocaleString('vi-VN')}] User: ${log.userEmail}, Action: ${log.action}`);
        });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
