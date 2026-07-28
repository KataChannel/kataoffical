
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const latestChotkho = await prisma.chotkho.findFirst({
      orderBy: { ngaychot: 'desc' }
    });
    const startDate = latestChotkho.ngaychot;

    const orders = await prisma.donhang.findMany({
      where: { updatedAt: { gt: startDate } },
      select: { status: true, madonhang: true }
    });

    const purchases = await prisma.dathang.findMany({
      where: { updatedAt: { gt: startDate } },
      select: { status: true, madncc: true }
    });

    console.log('--- ADDITIONAL ACTIVITY ---');
    console.log(`Orders (Donhang) updated: ${orders.length}`);
    const orderStatus = orders.reduce((acc, o) => {
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
    }, {});
    console.log('Order status summary:', orderStatus);

    console.log(`Purchases (Dathang) updated: ${purchases.length}`);
    const purchaseStatus = purchases.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
    }, {});
    console.log('Purchase status summary:', purchaseStatus);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
