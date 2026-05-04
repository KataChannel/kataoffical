const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const madonhang = 'TG-AA39493';
  
  const order = await prisma.donhang.findUnique({
    where: { madonhang }
  });

  if (!order) {
    console.log('Order not found');
    return;
  }

  const logs = await prisma.auditLog.findMany({
    where: {
      entityId: order.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(JSON.stringify(logs, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
