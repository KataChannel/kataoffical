
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrders() {
  const tomorrowStart = new Date('2026-05-15T00:00:00+07:00');
  
  const futureDonhang = await prisma.donhang.count({
    where: { status: 'dadat', ngaygiao: { gte: tomorrowStart } }
  });

  const oldDonhang = await prisma.donhang.count({
    where: { 
      status: 'dadat', 
      OR: [
        { ngaygiao: { lt: tomorrowStart } },
        { ngaygiao: null, createdAt: { lt: tomorrowStart } }
      ]
    }
  });

  console.log('Future Donhang (>= 15-5):', futureDonhang);
  console.log('Old/Today Donhang (< 15-5):', oldDonhang);
  
  await prisma.$disconnect();
}

checkOrders();
