const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTomorrowOrders() {
  const tomorrowStart = new Date('2026-05-14T00:00:00');
  
  const donhangs = await prisma.donhang.findMany({
    where: {
      ngaygiao: { gte: tomorrowStart },
      status: 'choxuly'
    },
    select: { id: true, madonhang: true, ngaygiao: true, status: true, createdAt: true }
  });

  const dathangs = await prisma.dathang.findMany({
    where: {
      ngaynhan: { gte: tomorrowStart },
      status: 'choxuly'
    },
    select: { id: true, madncc: true, ngaynhan: true, status: true, createdAt: true }
  });

  console.log('Donhang (Tomorrow or later) in choxuly:', JSON.stringify(donhangs, null, 2));
  console.log('Dathang (Tomorrow or later) in choxuly:', JSON.stringify(dathangs, null, 2));
  
  await prisma.$disconnect();
}

checkTomorrowOrders();
