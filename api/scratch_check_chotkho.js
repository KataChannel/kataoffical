const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Search for any chotkho on 26/05/2026
    const allMay26 = await prisma.chotkho.findMany({
      where: {
        ngaychot: {
          gte: new Date('2026-05-26T00:00:00+07:00'),
          lte: new Date('2026-05-26T23:59:59+07:00')
        }
      },
      include: {
        _count: {
          select: { details: true }
        }
      }
    });
    console.log(`Found ${allMay26.length} chotkho(s) on 2026-05-26 in this DB:`);
    allMay26.forEach(c => {
      console.log(`- ID: ${c.id} | Title: ${c.title} | Details count: ${c._count.details} | ngaychot: ${c.ngaychot}`);
    });

    const vouchers = await prisma.phieuKho.findMany({
      where: {
        maphieu: {
          contains: 'DOISOAT-26052026'
        }
      }
    });
    console.log(`Found ${vouchers.length} vouchers with 'DOISOAT-26052026' in maphieu:`);
    vouchers.forEach(v => {
      console.log(`- ID: ${v.id} | maphieu: ${v.maphieu} | type: ${v.type}`);
    });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
