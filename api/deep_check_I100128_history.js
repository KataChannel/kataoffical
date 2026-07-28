
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Không thấy sản phẩm I100128');

  // Check Chotkhodetail for this product, ANY date, any value
  console.log(`Checking ALL warehouse closing history for I100128:`);
  const allChot = await prisma.chotkhodetail.findMany({
    where: { sanphamId: sanpham.id },
    orderBy: { ngaychot: 'desc' },
    take: 10
  });

  allChot.forEach(c => {
    console.log(`[${c.ngaychot.toLocaleString('vi-VN')}] Chốt thực tế: ${c.sltonthucte}, Hệ thống khi đó: ${c.sltonht}`);
  });

  // Check PhieuKhoSanpham direct entries for value '78'
  console.log(`\nChecking if '78' was ever entered in a warehouse slip:`);
  const slip78 = await prisma.phieuKhoSanpham.findMany({
      where: { 
          sanphamId: sanpham.id,
          soluong: 78
      }
  });
  console.log(`Tìm thấy ${slip78.length} phiếu có khối lượng 78.`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
