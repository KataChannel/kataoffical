
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  
  // 1. Find the product
  const sanpham = await prisma.sanpham.findUnique({
    where: { masp },
    include: {
      TonKho: true
    }
  });

  if (!sanpham) {
    console.log(`Product ${masp} not found.`);
    return;
  }

  console.log(`Product: ${sanpham.title} (${sanpham.masp})`);
  console.log(`Internal ID: ${sanpham.id}`);
  console.log(`Current TonKho:`, sanpham.TonKho);

  // 2. Who closed the warehouse today?
  const today = new Date('2026-03-08');
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  console.log(`\n--- Chốt Kho Today (${startOfToday.toISOString()} to ${endOfToday.toISOString()}) ---`);
  const dailyChotKho = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: sanpham.id,
      ngaychot: {
        gte: startOfToday,
        lte: endOfToday
      }
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
    }
  });

  if (dailyChotKho.length === 0) {
    console.log('No warehouse closing found for today.');
  } else {
    dailyChotKho.forEach(detail => {
      const user = detail.chotkho?.user;
      const userName = user?.profile?.name || user?.name || user?.email || 'Unknown';
      console.log(`Time: ${detail.ngaychot.toLocaleString('vi-VN')}`);
      console.log(`User: ${userName}`);
      console.log(`Title: ${detail.chotkho?.title}`);
      console.log(`SL Ton HT: ${detail.sltonhethong}`);
      console.log(`SL Ton Thuc: ${detail.sltonthucte}`);
      console.log(`Chenh lech: ${detail.chenhlech}`);
      console.log('---');
    });
  }

  // 3. History of sltontt from 2026-03-07
  console.log(`\n--- Inventory Change History (from 2026-03-07) ---`);
  const startDate = new Date('2026-03-07T00:00:00Z');
  
  // Checking Chotkhodetail history
  const history = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: sanpham.id,
      ngaychot: {
        gte: startDate
      }
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
      ngaychot: 'asc'
    }
  });

  console.log(`Warehouse Closing Entries:`);
  history.forEach(h => {
    const user = h.chotkho?.user;
    const userName = user?.profile?.name || user?.name || user?.email || 'Unknown';
    console.log(`[${h.ngaychot.toLocaleString('vi-VN')}] SL Ton Thuc: ${h.sltonthucte} (By: ${userName})`);
  });

  // Also check AuditLog if available
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      entityId: sanpham.id,
      entityName: 'TonKho',
      createdAt: {
        gte: startDate
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  if (auditLogs.length > 0) {
    console.log(`\nAudit Logs for TonKho:`);
    auditLogs.forEach(log => {
      console.log(`[${log.createdAt.toLocaleString('vi-VN')}] Action: ${log.action}`);
      console.log(`Old Values:`, log.oldValues);
      console.log(`New Values:`, log.newValues);
    });
  } else {
    console.log('\nNo Audit Logs found for TonKho.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
