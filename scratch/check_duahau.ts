import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Kiểm tra giá trị hiện tại
  const tonkho = await prisma.tonKho.findMany({
    where: { sanpham: { masp: 'I100479' } },
    include: { sanpham: { select: { id: true, masp: true, title: true } } }
  });
  
  if (tonkho.length === 0) {
    console.log('Không tìm thấy TonKho cho Dưa Hấu (I100479)');
    return;
  }
  
  const tk = tonkho[0];
  console.log('=== TRƯỚC KHI SỬA ===');
  console.log('sanphamId:', tk.sanphamId);
  console.log('slton:', Number(tk.slton));
  console.log('sltontt:', Number(tk.sltontt));
  console.log('slchogiao:', Number(tk.slchogiao));
  console.log('slchonhap:', Number(tk.slchonhap));
  
  // Kiểm tra số lượng tại kho
  const spKho = await prisma.sanphamKho.findMany({
    where: { sanpham: { masp: 'I100479' } },
    include: { kho: { select: { name: true, makho: true } } }
  });
  console.log('\n=== SanphamKho ===');
  let totalKho = 0;
  spKho.forEach(sk => {
    const qty = Number(sk.soluong);
    totalKho += qty;
    console.log('Kho:', sk.kho.name, '('+sk.kho.makho+')', 'soluong:', qty);
  });
  console.log('Tổng kho:', totalKho);
  
  console.log('\n🔧 Cần reset slton và sltontt về giá trị hợp lý.');
  console.log('Giá trị sltontt hiện tại:', Number(tk.sltontt), '← ÂM CỰC LỚN, cần reset');
  console.log('Gợi ý: Cần nhập lại giá trị chính xác từ kiểm kê thực tế.');
  
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
