
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Không thấy sản phẩm I100128');

  // Find all changes today
  const tonRecord = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  console.log(`Hiện tại: ${tonRecord.sltontt}`);

  // Get Phieukho (inventory entries) explicitly
  const entries = await prisma.phieuKho.findMany({
    where: { sanphamId: sanpham.id, createdAt: { gte: new Date('2026-03-08T00:00:00Z') }},
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Lịch sử Phieukho trong hôm nay cho I100128:`);
  entries.forEach(e => {
      console.log(`[${e.createdAt.toLocaleString('vi-VN')}] Title: ${e.title}, Kiểu: ${e.type}, Thay đổi: ${e.slthaydoi}, Tồn HT sau: ${e.sltonm}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
