
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Không thấy sản phẩm I100128');

  // Lấy chi tiết các phiếu thay đổi kho cho SP này trong hôm nay
  const details = await prisma.phieuKhoSanpham.findMany({
    where: { 
        sanphamId: sanpham.id, 
        createdAt: { gte: new Date('2026-03-08T00:00:00Z') }
    },
    include: {
        phieuKho: true
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Lịch sử thay đổi kho I100128 hôm nay:\n`);
  
  details.forEach(d => {
      console.log(`[${d.createdAt.toLocaleString('vi-VN')}] Phiếu: ${d.phieuKho?.maphieu || d.phieuKho?.madonhang || d.phieuKho?.madncc || 'N/A'}`);
      console.log(`   Khối lượng: ${d.soluong}, Ghi chú: ${d.ghichu}`);
  });

  const currentDB = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  console.log(`\nTồn HT hiện tại (sltontt): ${currentDB.sltontt}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
