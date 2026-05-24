const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cutoff = new Date('2026-05-23T17:00:00+07:00'); // 10:00:00 23/5 UTC
  const cutoffUtc = new Date(cutoff.getTime());

  console.log(`=== PHÂN TÍCH SÂU TỒN KHO ÂM SAU BASELINE 23/05/2026 ===`);
  console.log(`Mốc Baseline cutoff: ${cutoff.toLocaleString('vi-VN')} (${cutoffUtc.toISOString()})`);

  // 1. Đếm sản phẩm bị âm
  const negativeProducts = await prisma.tonKho.findMany({
    where: {
      slton: { lt: 0 }
    },
    include: {
      sanpham: true
    }
  });

  console.log(`\n1. Số lượng sản phẩm bị âm tồn kho hệ thống hiện tại: ${negativeProducts.length}`);

  // In ra 10 sản phẩm âm nhiều nhất làm ví dụ
  const sortedNegatives = [...negativeProducts].sort((a, b) => Number(a.slton) - Number(b.slton));
  console.log('\nTop 10 sản phẩm âm nhiều nhất:');
  sortedNegatives.slice(0, 10).forEach((p, idx) => {
    console.log(`  [${idx + 1}] Mã: ${p.sanpham.masp} | Tên: ${p.sanpham.title} | slton: ${p.slton}`);
  });

  // 2. Phân tích các giao dịch xuất (Donhang) và nhập (Dathang) phát sinh SAU mốc Baseline (23/5 17:00) cho các SP âm này
  let totalAutoExports = 0;
  let totalNegativesWithSales = 0;
  let totalNegativesWithPendingPurchases = 0;

  console.log('\n2. Tiến hành phân tích giao dịch sau Baseline của các sản phẩm âm...');

  for (const p of sortedNegatives) {
    // Tìm các phiếu xuất kho (Donhangsanpham) sau cutoff
    const sales = await prisma.donhangsanpham.findMany({
      where: {
        idSP: p.sanphamId,
        donhang: {
          status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
          updatedAt: { gt: cutoffUtc }
        }
      },
      include: {
        donhang: true
      }
    });

    if (sales.length > 0) {
      totalNegativesWithSales++;
      sales.forEach(s => {
        if (s.donhang.ghichu && s.donhang.ghichu.includes('AUTOCOMPLETE')) {
          totalAutoExports++;
        }
      });
    }

    // Tìm các đơn đặt hàng NCC (Dathangsanpham) phát sinh sau cutoff nhưng CHƯA được nhận (ở trạng thái choxuly, dadat, dagiao)
    const pendingPurchases = await prisma.dathangsanpham.findMany({
      where: {
        idSP: p.sanphamId,
        dathang: {
          status: { in: ['choxuly', 'dadat', 'dagiao'] },
          updatedAt: { gt: cutoffUtc }
        }
      },
      include: {
        dathang: true
      }
    });

    if (pendingPurchases.length > 0) {
      totalNegativesWithPendingPurchases++;
    }
  }

  console.log(`\n3. Kết quả phân tích chi tiết:`);
  console.log(`  - Số sản phẩm âm phát sinh từ các đơn bán hàng (Donhang) sau Baseline: ${totalNegativesWithSales}/${negativeProducts.length} (${((totalNegativesWithSales/negativeProducts.length)*100).toFixed(1)}%)`);
  console.log(`  - Số sản phẩm âm có đơn đặt hàng NCC (Dathang) nhưng đang "TREO" chưa nhận (dadat/dagiao/choxuly): ${totalNegativesWithPendingPurchases}/${negativeProducts.length} (${((totalNegativesWithPendingPurchases/negativeProducts.length)*100).toFixed(1)}%)`);
  console.log(`  - Phát hiện tổng số phiếu xuất tự động autocomplete tác động: ${totalAutoExports} lượt.`);

  // 4. Lấy một ví dụ cụ thể về sản phẩm bị âm lớn (Ví dụ Bắp Cải Tím hoặc Bắp Cải Trắng)
  const targetMasp = 'I100003'; // Bắp cải trắng (SL hệ thống trong Dialog là -82.28)
  const targetProduct = await prisma.sanpham.findUnique({
    where: { masp: targetMasp }
  });

  if (targetProduct) {
    console.log(`\n4. Phân tích sâu trường hợp cụ thể: Bắp cải trắng (${targetMasp})`);
    
    // Tìm các phiếu kho của Bắp cải trắng sau cutoff
    const phieuKhos = await prisma.phieuKhoSanpham.findMany({
      where: {
        sanphamId: targetProduct.id,
        phieuKho: {
          createdAt: { gte: cutoffUtc }
        }
      },
      include: {
        phieuKho: true
      },
      orderBy: { phieuKho: { createdAt: 'asc' } }
    });

    console.log(`  - Danh sách phiếu kho sau Baseline:`);
    phieuKhos.forEach((pk, i) => {
      console.log(`    [${i+1}] Mã: ${pk.phieuKho.maphieu} | Loại: ${pk.phieuKho.type} | Số lượng: ${pk.soluong} | Tạo: ${pk.phieuKho.createdAt.toLocaleString('vi-VN')} | Ghi chú: ${pk.phieuKho.ghichu}`);
    });

    // Tìm các đơn đặt hàng NCC liên quan
    const dathangs = await prisma.dathangsanpham.findMany({
      where: {
        idSP: targetProduct.id,
        dathang: {
          updatedAt: { gte: cutoffUtc }
        }
      },
      include: { dathang: true }
    });
    console.log(`  - Đơn đặt hàng NCC liên quan sau Baseline:`);
    dathangs.forEach(d => {
      console.log(`    * Mã: ${d.dathang.madncc} | Trạng thái: ${d.dathang.status} | Đặt: ${d.sldat} | Giao: ${d.slgiao} | Nhận: ${d.slnhan} | Cập nhật lúc: ${d.dathang.updatedAt.toLocaleString('vi-VN')}`);
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
