
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const madonhang = 'TG-AA31770';
  
  const order = await prisma.donhang.findUnique({
    where: { madonhang },
    include: {
      sanpham: {
        include: {
          sanpham: true
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!order) {
    console.log('Order not found');
    return;
  }

  console.log(`Order: ${order.madonhang} (${order.id})`);
  console.log(`Created: ${order.createdAt}`);
  console.log(`Updated: ${order.updatedAt}`);
  console.log(`Total Items count: ${order.sanpham.length}`);

  const itemCounts = {};
  order.sanpham.forEach(item => {
    const key = `${item.sanpham.masp} - ${item.sanpham.title}`;
    itemCounts[key] = (itemCounts[key] || 0) + 1;
  });

  console.log('\nItem Summary:');
  Object.entries(itemCounts).forEach(([name, count]) => {
    if (count > 1) {
      console.log(`DUPLICATE: ${name} (Count: ${count})`);
    } else {
      // console.log(`OK: ${name}`);
    }
  });

  console.log('\nDetailed Audit Logs (Full):');
  const logs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { entityId: order.id },
        { entityId: madonhang }
      ]
    },
    orderBy: { createdAt: 'asc' }
  });

  logs.forEach(log => {
    console.log(`--- Log at ${log.createdAt} ---`);
    console.log(`Action: ${log.action} | Entity: ${log.entityName} | User: ${log.userId}`);
    console.log(`Endpoint: ${log.metadata?.endpoint}`);
    if (log.changedFields && log.changedFields.length > 0) {
      console.log(`Changed Fields: ${log.changedFields.join(', ')}`);
    }
    // Only print values if they are small or relevant
    // if (log.newValues) console.log(`New Values: ${JSON.stringify(log.newValues).substring(0, 200)}...`);
  });

  // Check if items themselves have audit logs
  const itemIds = order.sanpham.map(i => i.id);
  const itemLogs = await prisma.auditLog.findMany({
    where: {
      entityId: { in: itemIds }
    },
    orderBy: { createdAt: 'asc' }
  });

  if (itemLogs.length > 0) {
    console.log(`\nFound ${itemLogs.length} audit logs for individual items.`);
    // Summarize item logs
    const itemLogSummary = {};
    itemLogs.forEach(log => {
      itemLogSummary[log.action] = (itemLogSummary[log.action] || 0) + 1;
    });
    console.log('Item Log Summary:', itemLogSummary);
  }

  // Check ImportHistory
  const imports = await prisma.importHistory.findMany({
    where: {
      caseDetail: {
        path: ['madonhang'],
        equals: madonhang
      }
    }
  });
  console.log(`\nFound ${imports.length} imports referencing this order ID.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
