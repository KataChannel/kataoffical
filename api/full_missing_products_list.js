
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const chotkhoId = '5326f9e7-f362-4a20-8946-a467030032ca';
  
  // 1. Lấy danh sách ID sản phẩm ĐÃ chốt trong phiên này
  const chotDetails = await prisma.chotkhodetail.findMany({
    where: { chotkhoId: chotkhoId },
    select: { sanphamId: true }
  });
  const includedIds = new Set(chotDetails.map(d => d.sanphamId));

  // 2. Lấy TẤT CẢ sản phẩm trong hệ thống (không lọc active để thấy bức tranh tổng thể)
  const allProducts = await prisma.sanpham.findMany({
    select: { id: true, masp: true, title: true, isActive: true }
  });

  // 3. Lọc ra các sản phẩm KHÔNG nằm trong phiên chốt
  const missingProducts = allProducts.filter(p => !includedIds.has(p.id));

  // 4. Lấy tồn kho thực tế hiện tại của những sản phẩm thiếu này
  const stocks = await prisma.tonKho.findMany({
    where: {
      sanphamId: { in: missingProducts.map(p => p.id) }
    },
    select: { sanphamId: true, sltontt: true }
  });

  const stockMap = {};
  stocks.forEach(s => stockMap[s.sanphamId] = s.sltontt);

  console.log(`\n=== KẾT QUẢ KIỂM TRA PHIÊN CHỐT ${chotkhoId} ===`);
  console.log(`- Tổng số sản phẩm trong DB: ${allProducts.length}`);
  console.log(`- Số sản phẩm đã chốt: ${includedIds.size}`);
  console.log(`- Số sản phẩm KHÔNG có trong phiên chốt: ${missingProducts.length}`);
  console.log(`\nDANH SÁCH 50 SẢN PHẨM KHÔNG CÓ TRONG PHIÊN CHỐT (Dưới đây là tồn kho hệ thống ĐANG GIỮ LẠI):`);
  console.log(`--------------------------------------------------------------------------------`);
  console.log(`| Mã SP    | Tên Sản Phẩm                             | Tồn hiện tại | Trạng thái |`);
  console.log(`--------------------------------------------------------------------------------`);

  missingProducts.slice(0, 50).forEach(p => {
    const qty = stockMap[p.id] !== undefined ? stockMap[p.id] : 'N/A';
    const status = p.isActive ? 'Active' : 'Inactive';
    console.log(`| ${p.masp.padEnd(8)} | ${p.title.substring(0, 40).padEnd(40)} | ${String(qty).padStart(12)} | ${status.padEnd(10)} |`);
  });

  if (missingProducts.length > 50) {
    console.log(`... và còn ${missingProducts.length - 50} sản phẩm khác.`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
