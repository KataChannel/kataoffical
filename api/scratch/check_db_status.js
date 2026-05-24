const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masps = ['I100001', 'I100002', 'I100003', 'I100008'];
  
  console.log('=== TRUY VẤN TỒN KHO CỦA 4 SẢN PHẨM TRÊN DIALOG ===');
  
  const results = await prisma.tonKho.findMany({
    where: {
      sanpham: { masp: { in: masps } }
    },
    include: {
      sanpham: true
    }
  });

  results.forEach(r => {
    console.log(`Mã SP: ${r.sanpham.masp} | Tên: ${r.sanpham.title} | slton: ${r.slton} | sltontt: ${r.sltontt}`);
  });

  // Đếm tất cả các sản phẩm có slton < 0
  const negs = await prisma.tonKho.findMany({
    where: { slton: { lt: 0 } }
  });
  console.log(`\nTổng số sản phẩm có slton < 0 trong DB hiện tại: ${negs.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
