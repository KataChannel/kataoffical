
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const khId = '274b8f4c-c9fc-40dc-ab0a-2e153a49fdfe';
  const orders = await prisma.donhang.findMany({
    where: {
      khachhangId: khId,
      ngaygiao: {
        gte: new Date('2026-03-11T00:00:00.000Z'),
        lte: new Date('2026-03-12T23:59:59.000Z')
      }
    }
  });

  console.log(`Found ${orders.length} orders for this customer.`);
  orders.forEach(o => {
    console.log(`- ${o.madonhang} (${o.id}) - Created: ${o.createdAt.toISOString()}`);
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
