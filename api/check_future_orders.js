
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const tomorrowStart = new Date('2026-05-15T00:00:00+07:00');
  
  const items = await prisma.donhangsanpham.findMany({
    where: { 
      sanpham: { masp: { in: ['I100182', 'I100178'] } }, 
      donhang: { status: 'dadat', ngaygiao: { gte: tomorrowStart } } 
    },
    include: { donhang: true, sanpham: true }
  });
  
  console.log('--- Future Orders in TESTDATA ---');
  if (items.length === 0) console.log('No future orders found for these products.');
  items.forEach(i => {
    console.log(`${i.sanpham.masp} | ${i.sanpham.title} | Qty: ${i.slnhan || i.slgiao || i.sldat} | Date: ${i.donhang.ngaygiao}`);
  });
  
  await prisma.$disconnect();
}

check();
