
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  const adjustment = await prisma.phieuKhoSanpham.findMany({
    where: { 
        sanphamId: sanpham.id, 
        phieuKho: { type: { in: ['kiemkho', 'dieuchinh'] } }
    },
    include: { phieuKho: true },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  console.log(`Lịch sử KIỂM KHO / ĐIỀU CHỈNH của I100128:\n`);
  adjustment.forEach(e => {
      console.log(`[${e.createdAt.toLocaleString('vi-VN')}] SL Thay đổi: ${e.soluong}, Tồn SAU: ${e.sltonm}, Ghi chú: ${e.ghichu}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
