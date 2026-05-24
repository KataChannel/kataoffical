
const { PrismaClient } = require('@prisma/client');
// Manually set production URL
const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: prodUrl,
    },
  },
});

async function check() {
  const stock = await prisma.sanphamKho.findMany({
    where: { 
      sanpham: { masp: { in: ['I100182', 'I100178'] } },
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258'
    },
    include: { sanpham: true }
  });

  console.log('--- Current Stock in PRODUCTION ---');
  stock.forEach(s => {
    console.log(`Code: ${s.sanpham.masp} | Title: ${s.sanpham.title} | Qty: ${s.soluong}`);
  });

  await prisma.$disconnect();
}

check();
