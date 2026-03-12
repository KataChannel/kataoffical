
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const log = await prisma.auditLog.findFirst({
    where: {
      action: 'CREATE',
      entityName: 'Import Donhang Cu Confirmed',
      createdAt: {
        gte: new Date('2026-03-11T16:55:00.000Z'),
        lte: new Date('2026-03-11T17:00:00.000Z')
      }
    }
  });

  if (log && log.newValues) {
    console.log(`Log at ${log.createdAt.toISOString()}`);
    const orders = log.newValues; // This is likely an array of orders or something
    
    // Search for our order f568a61d-91fe-4c12-935d-eb4bc21cb437 or TG-AA31770
    const str = JSON.stringify(orders);
    console.log(`Log includes TG-AA31770: ${str.includes('TG-AA31770')}`);
    
    // Let's try to find it in the array
    if (Array.isArray(orders)) {
      const ourOrder = orders.find(o => o.madonhang === 'TG-AA31770' || o.id === 'f568a61d-91fe-4c12-935d-eb4bc21cb437');
      if (ourOrder) {
        console.log(`Found order in log. Items: ${ourOrder.sanpham?.length}`);
        const chanh = ourOrder.sanpham.filter(p => p.masp === 'I100060' || p.idSP === '3d41818d-cd67-4dcb-9f04-6a811e732b3f' || p.id === '3d41818d-cd67-4dcb-9f04-6a811e732b3f');
        console.log(`Chanh không hạt count in original import: ${chanh.length}`);
      } else {
        console.log('Order not found in the array of this log.');
      }
    } else {
       console.log('newValues is not an array.');
       // Maybe it's a single order?
       if (orders.madonhang === 'TG-AA31770') {
          console.log(`Items in single order log: ${orders.sanpham?.length}`);
       }
    }
  } else {
    console.log('Log not found or no newValues');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
