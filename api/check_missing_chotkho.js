
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const chotkhoId = '5326f9e7-f362-4a20-8946-a467030032ca';
  
  const chot = await prisma.chotkho.findUnique({
    where: { id: chotkhoId },
    include: {
        details: {
            select: { sanphamId: true }
        }
    }
  });

  if (!chot) {
      console.log(`Không tìm thấy phiên chốt kho với ID: ${chotkhoId}`);
      return;
  }

  const includedProductIds = chot.details.map(d => d.sanphamId);
  console.log(`Phiên chốt kho: ${chot.title}`);
  console.log(`Số lượng sản phẩm được chốt: ${includedProductIds.length}`);

  // Fetch all active products
  const allActiveProducts = await prisma.sanpham.findMany({
      where: { isActive: true },
      select: { id: true, masp: true, title: true }
  });

  console.log(`Tổng số sản phẩm đang hoạt động: ${allActiveProducts.length}`);

  // Filter products NOT in the chotkho
  const missingProducts = allActiveProducts.filter(p => !includedProductIds.includes(p.id));
  console.log(`Số lượng sản phẩm KHÔNG có trong danh sách chốt: ${missingProducts.length}`);

  // Check current stock (tonkho) for these missing products
  const missingProductStocks = await prisma.tonKho.findMany({
      where: {
          sanphamId: { in: missingProducts.map(p => p.id) }
      },
      select: { sanphamId: true, sltontt: true, updatedAt: true }
  });

  const stockMap = {};
  missingProductStocks.forEach(s => {
      stockMap[s.sanphamId] = { sltontt: s.sltontt, updatedAt: s.updatedAt };
  });

  console.log(`\nDANH SÁCH KIỂM TRA CÁC SẢN PHẨM KHÔNG CÓ TRONG PHIÊN CHỐT:`);
  console.log(`(Lưu ý: Những sản phẩm này hệ thống sẽ GIỮ NGUYÊN hoặc TRỪ THEO ĐƠN HÀNG, KHÔNG bị reset về 0)`);
  
  const sample = missingProducts.slice(0, 20); // Show first 20 as sample for log
  sample.forEach(p => {
      const s = stockMap[p.id] || { sltontt: 'N/A' };
      console.log(`- [${p.masp}] ${p.title}: Tồn HT hiện tại ${s.sltontt} (Cập nhật lần cuối: ${s.updatedAt?.toLocaleString('vi-VN')})`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
