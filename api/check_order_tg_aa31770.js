
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const madonhang = 'TG-AA31770';
  console.log(`Checking order: ${madonhang}`);

  const order = await prisma.donhang.findUnique({
    where: { madonhang },
    include: {
      sanpham: {
        include: {
          sanpham: true
        }
      }
    }
  });

  if (!order) {
    console.log('Order not found');
    return;
  }

  console.log('Order Details:');
  console.log(`ID: ${order.id}`);
  console.log(`Created At: ${order.createdAt}`);
  console.log(`Status: ${order.status}`);
  console.log(`Total Items: ${order.sanpham.length}`);

  console.log('\nItems:');
  const items = order.sanpham.map(item => ({
    id: item.id,
    masp: item.sanpham.masp,
    title: item.sanpham.title,
    sldat: item.sldat.toString(),
    giaban: item.giaban.toString(),
    createdAt: item.createdAt // Wait, Donhangsanpham might not have createdAt, let's check schema again
  }));

  console.table(items);

  // Check AuditLog
  console.log('\nAudit Logs for this order:');
  const logs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { entityId: order.id },
        { entityId: madonhang }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  console.log(JSON.stringify(logs, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
