
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function auditAllProducts() {
  console.log("🚀 Bắt đầu đối soát toàn bộ hệ thống kho...");
  
  const products = await prisma.sanpham.findMany({
    where: { isActive: true },
    select: { id: true, masp: true, title: true }
  });

  console.log(`🔍 Tìm thấy ${products.length} sản phẩm đang hoạt động.`);
  
  const discrepancies = [];

  for (const sp of products) {
    // 1. Tìm phiên chốt kho gần nhất của Kho Tổng
    const lastChot = await prisma.chotkhodetail.findFirst({
      where: {
        sanphamId: sp.id,
        chotkho: {
          khoId: KHO_TONG_ID,
          isActive: true
        }
      },
      orderBy: { ngaychot: 'desc' }
    });

    const startTime = lastChot ? lastChot.ngaychot : new Date(0);
    const initialQty = lastChot ? Number(lastChot.sltonthucte) : 0;

    // 2. Tính tổng xuất (Donhang) - Aggregate mode for Kho Tổng
    const sales = await prisma.donhangsanpham.aggregate({
      where: {
        idSP: sp.id,
        donhang: {
          status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
          updatedAt: { gt: startTime }
        }
      },
      _sum: { slgiao: true, slnhan: true, sldat: true }
    });
    
    // Lưu ý: Logic trong code sử dụng slgiao || sldat cho stock deduction
    const xuatQty = Number(sales._sum.slgiao || sales._sum.sldat || 0);

    // 3. Tính tổng nhập (Dathang) - Aggregate mode for Kho Tổng
    const purchases = await prisma.dathangsanpham.aggregate({
      where: {
        idSP: sp.id,
        dathang: {
          status: 'danhan',
          updatedAt: { gt: startTime }
        }
      },
      _sum: { slnhan: true }
    });
    const nhapQty = Number(purchases._sum.slnhan || 0);

    // 4. Tính tổng điều chỉnh (PhieuKho) - Cần cực kỳ cẩn thận tránh double count
    // Hiện tại Trace Log đang bỏ qua PhieuKho, nhưng thực tế PhieuKho làm thay đổi slton thực tế.
    // Nếu PhieuKho được tạo tự động từ Dathang/Donhang, chúng ta đã đếm ở trên.
    // Chỉ đếm các PhieuKho "Standalone" (không có madncc và không có madonhang)
    const adjustments = await prisma.phieuKhoSanpham.findMany({
      where: {
        sanphamId: sp.id,
        phieuKho: {
          madncc: null,
          madonhang: null,
          isActive: true,
          createdAt: { gt: startTime }
        }
      },
      include: { phieuKho: true }
    });
    
    let adjQty = 0;
    adjustments.forEach(a => {
        const val = Number(a.soluong || 0);
        if (a.phieuKho.type === 'nhap') adjQty += val;
        else if (a.phieuKho.type === 'xuat') adjQty -= val;
    });

    // 5. Tính toán kết quả kỳ vọng
    const expected = initialQty + nhapQty - xuatQty + adjQty;

    // 6. Lấy số dư thực tế trong database
    const tonkho = await prisma.tonKho.findUnique({
      where: { sanphamId: sp.id }
    });
    const actual = Number(tonkho?.slton || 0);

    const diff = Math.abs(expected - actual);
    if (diff > 0.001) {
      discrepancies.push({
        masp: sp.masp,
        title: sp.title,
        lastChot: startTime.toISOString(),
        initial: initialQty,
        nhap: nhapQty,
        xuat: xuatQty,
        adj: adjQty,
        expected: expected.toFixed(3),
        actual: actual.toFixed(3),
        diff: (actual - expected).toFixed(3)
      });
    }
  }

  console.log(`\n📊 KẾT QUẢ ĐỐI SOÁT:`);
  if (discrepancies.length === 0) {
    console.log("✅ Chúc mừng! Không tìm thấy sai lệch nào giữa Logs và Tồn kho thực tế.");
  } else {
    console.log(`❌ Phát hiện ${discrepancies.length} sản phẩm bị lệch số:`);
    console.table(discrepancies);
  }
}

auditAllProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
