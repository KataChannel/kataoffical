
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  
  const sanpham = await prisma.sanpham.findUnique({
    where: { masp }
  });

  if (!sanpham) {
    console.log(`Product ${masp} not found.`);
    return;
  }

  console.log(`Product: ${sanpham.title} (${sanpham.masp})`);

  // Check ALL chotkhodetail for this product
  const allDetails = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: sanpham.id
    },
    include: {
      chotkho: {
        include: {
          user: {
            include: {
              profile: true
            }
          }
        }
      }
    },
    orderBy: {
      ngaychot: 'desc'
    },
    take: 5
  });

  console.log(`\nLast 5 Warehouse Closing Details:`);
  allDetails.forEach(d => {
      const user = d.chotkho?.user;
      const userName = user?.profile?.name || user?.name || user?.email || 'Unknown';
      console.log(`[${d.ngaychot.toISOString()}] 
      Local Time: ${d.ngaychot.toLocaleString('vi-VN')}
      SL Ton Thuc: ${d.sltonthucte} 
      User: ${userName}
      Title: ${d.chotkho?.title}`);
  });
  
  // Check TonKho history from AuditLog (if entityId matches)
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      entityId: sanpham.id,
      entityName: 'Sanpham' // Sometimes it's Sanpham or TonKho
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  });
  
  if (auditLogs.length > 0) {
    console.log(`\nAudit Logs for Sanpham (possibly affecting stock):`);
    auditLogs.forEach(log => {
      console.log(`[${log.createdAt.toLocaleString('vi-VN')}] Action: ${log.action}, User: ${log.userEmail}`);
      console.log(`Changes:`, log.newValues);
    });
  }

  // Check TonKho entity logs specifically
  const tonkho = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  if (tonkho) {
      const tonkhoLogs = await prisma.auditLog.findMany({
        where: {
          entityId: tonkho.id,
          entityName: 'TonKho'
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      });
      console.log(`\nAudit Logs for TonKho entity:`);
      tonkhoLogs.forEach(log => {
          console.log(`[${log.createdAt.toLocaleString('vi-VN')}] Action: ${log.action}, User: ${log.userEmail}`);
          console.log(`Changes:`, log.newValues);
      });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
