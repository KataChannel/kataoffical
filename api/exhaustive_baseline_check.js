
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Không thấy sản phẩm I100128');

  console.log(`Checking ALL warehouse closing history (ChotKho) for I100128:`);
  const allChot = await prisma.chotkhodetail.findMany({
    where: { sanphamId: sanpham.id },
    orderBy: { ngaychot: 'asc' },
    include: { chotkho: true }
  });

  allChot.forEach(c => {
    console.log(`[${c.ngaychot.toLocaleString('vi-VN')}] Title: ${c.chotkho?.title}, SL Chốt: ${c.sltonthucte}, SL HT khi đó: ${c.sltonht}`);
  });

  // Also check PhieuKho records that are NOT 'nhap' or 'xuat'
  console.log(`\nChecking other types of warehouse slips (kiemkho, dieuchinh, etc.):`);
  const otherSlips = await prisma.phieuKhoSanpham.findMany({
      where: { 
          sanphamId: sanpham.id,
          phieuKho: { type: { notIn: ['nhap', 'xuat'] } }
      },
      include: { phieuKho: true },
      orderBy: { createdAt: 'asc' }
  });

  otherSlips.forEach(s => {
    console.log(`[${s.createdAt.toLocaleString('vi-VN')}] Type: ${s.phieuKho?.type}, SL: ${s.soluong}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
