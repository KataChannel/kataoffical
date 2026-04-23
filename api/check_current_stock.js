const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masps = ['I100233', 'I100479', 'I100207', 'I100003', 'I100002', 'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'];

  const results = await prisma.tonKho.findMany({
    where: {
      sanpham: {
        masp: { in: masps }
      }
    },
    include: {
      sanpham: true
    }
  });

  console.log('--- Current Stock Levels (April 23) ---');
  results.forEach(r => {
    console.log(`Masp: ${r.sanpham.masp}, Name: ${r.sanpham.title}, slton: ${r.slton}, sltontt: ${r.sltontt}, slchogiao: ${r.slchogiao}, slchonhap: ${r.slchonhap}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
