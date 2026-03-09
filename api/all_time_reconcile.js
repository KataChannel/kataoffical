
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Không thấy sản phẩm I100128');

  console.log(`Summing ALL transactions for I100128:`);
  
  const nx = await prisma.phieuKhoSanpham.findMany({
      where: { sanphamId: sanpham.id },
      include: { phieuKho: true },
      orderBy: { createdAt: 'asc' }
  });

  let stock = 0;
  nx.forEach(n => {
      if (n.phieuKho?.type === 'nhap') stock += Number(n.soluong);
      else if (n.phieuKho?.type === 'xuat') stock -= Number(n.soluong);
      // console.log(`[${n.createdAt.toLocaleString('vi-VN')}] ${n.phieuKho?.type}: ${n.soluong} -> Stock: ${stock.toFixed(2)}`);
  });

  console.log(`Calculated Stock from 0: ${stock.toFixed(2)}`);
  const current = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  console.log(`Current sltontt: ${current.sltontt}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
