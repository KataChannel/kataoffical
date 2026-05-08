
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function syncInventory() {
  console.log("🚀 Bắt đầu tiến trình đồng bộ hóa tồn kho từ lịch sử giao dịch...");
  
  const products = await prisma.sanpham.findMany({
    where: { isActive: true },
    select: { id: true, masp: true, title: true }
  });

  console.log(`🔍 Quét ${products.length} sản phẩm...`);
  let fixCount = 0;

  for (const sp of products) {
    // 1. Lấy phiên chốt kho gần nhất
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

    // 2. Tính Nhập (Aggregate)
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

    // 3. Tính Xuất (Aggregate)
    const sales = await prisma.donhangsanpham.aggregate({
      where: {
        idSP: sp.id,
        donhang: {
          status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
          updatedAt: { gt: startTime }
        }
      },
      _sum: { slgiao: true, sldat: true }
    });
    const xuatQty = Number(sales._sum.slgiao || sales._sum.sldat || 0);

    // 4. Tính Điều chỉnh (Standalone PhieuKho)
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

    // 5. Tính toán Expected
    const expected = parseFloat((initialQty + nhapQty - xuatQty + adjQty).toFixed(3));

    // 6. Kiểm tra TonKho hiện tại
    const tonkho = await prisma.tonKho.findUnique({
      where: { sanphamId: sp.id }
    });
    
    const actual = tonkho ? Number(tonkho.slton) : 0;

    if (Math.abs(expected - actual) > 0.001) {
      console.log(`🛠  Fixing ${sp.masp} (${sp.title}): ${actual} -> ${expected}`);
      
      // Update TonKho
      await prisma.tonKho.upsert({
        where: { sanphamId: sp.id },
        update: { slton: expected, sltontt: expected },
        create: { sanphamId: sp.id, slton: expected, sltontt: expected, slchogiao: 0, slchonhap: 0 }
      });

      // Update Sanpham (Mirror for UI)
      await prisma.sanpham.update({
        where: { id: sp.id },
        data: { 
          soluong: expected.toString(),
          soluongkho: expected.toString()
        }
      });

      fixCount++;
    }
  }

  console.log(`\n✨ HOÀN TẤT: Đã sửa lỗi cho ${fixCount} sản phẩm.`);
}

syncInventory()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
