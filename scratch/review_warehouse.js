
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // 1. Get the latest inventory closing
    const latestChotkho = await prisma.chotkho.findFirst({
      orderBy: {
        ngaychot: 'desc'
      },
      include: {
        kho: true
      }
    });

    if (!latestChotkho) {
      console.log('No inventory closing (Chotkho) found.');
      return;
    }

    console.log('Latest Chotkho:', JSON.stringify(latestChotkho, null, 2));

    const startDate = latestChotkho.ngaychot;

    // 2. Get warehouse vouchers (PhieuKho) since that date
    const vouchers = await prisma.phieuKho.findMany({
      where: {
        createdAt: {
          gt: startDate
        }
      },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        },
        kho: true,
        tuKho: true,
        denKho: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    console.log(`\nFound ${vouchers.length} warehouse vouchers since ${startDate.toISOString()}:`);
    
    const summary = vouchers.reduce((acc, v) => {
        acc[v.type] = (acc[v.type] || 0) + 1;
        return acc;
    }, {});
    console.log('Voucher types summary:', summary);

    // 3. Details of some vouchers
    vouchers.forEach(v => {
        console.log(`- [${v.type}] ${v.maphieu || 'N/A'} at ${v.createdAt.toISOString()}. Items: ${v.sanpham.length}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
