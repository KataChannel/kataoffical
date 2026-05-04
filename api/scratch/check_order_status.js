const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const madonhang = 'TG-AA39493';
  console.log(`Checking order: ${madonhang}`);
  
  const order = await prisma.donhang.findUnique({
    where: { madonhang },
    include: { 
      khachhang: true,
      sanpham: true
    }
  });

  if (!order) {
    console.log('Order not found');
    return;
  }

  console.log('Order Details:');
  console.log(JSON.stringify({
    id: order.id,
    madonhang: order.madonhang,
    ngaygiao: order.ngaygiao,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    khachhang: order.khachhang ? order.khachhang.name : 'N/A'
  }, null, 2));

  console.log('\nChecking Audit Logs for this order...');
  const logs = await prisma.auditLog.findMany({
    where: {
      entityId: order.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(`Found ${logs.length} audit logs:`);
  logs.forEach(log => {
    console.log(`- ${log.createdAt.toISOString()}: ${log.action} by ${log.userEmail || 'system'}`);
    if (log.changedFields && log.changedFields.length > 0) {
      console.log(`  Fields: ${log.changedFields.join(', ')}`);
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
