const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masps = ['I100233', 'I100479', 'I100207', 'I100003', 'I100002', 'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'];
  const chotkhoId = '4be7ea19-8a18-436e-bccb-ee3526ac383c';

  const details = await prisma.chotkhodetail.findMany({
    where: {
      chotkhoId: chotkhoId,
      sanpham: {
        masp: { in: masps }
      }
    },
    include: {
      sanpham: true
    }
  });

  console.log('--- Database Details for April 13 ---');
  details.forEach(d => {
    console.log(`Masp: ${d.sanpham.masp}, Name: ${d.sanpham.title}, System: ${d.sltonhethong}, Actual: ${d.sltonthucte}, Diff: ${d.chenhlech}, Note: ${d.ghichu}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
