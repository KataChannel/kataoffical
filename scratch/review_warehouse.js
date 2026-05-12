
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // 1. Tìm lần chốt kho gần nhất
    const latestChotkho = await prisma.chotkho.findFirst({
      orderBy: { ngaychot: 'desc' },
      include: { 
        details: {
          include: { sanpham: true }
        } 
      }
    });

    if (!latestChotkho) {
      console.log("Không tìm thấy dữ liệu chốt kho.");
      return;
    }

    console.log(`\n=== LẦN CHỐT KHO GẦN NHẤT ===`);
    console.log(`ID: ${latestChotkho.id}`);
    console.log(`Tiêu đề: ${latestChotkho.title}`);
    console.log(`Thời gian: ${latestChotkho.ngaychot.toLocaleString()}`);
    console.log(`Số mặt hàng chốt: ${latestChotkho.details.length}`);

    // 2. Tìm các giao dịch (PhieuKho) sau lần chốt này
    const transactions = await prisma.phieuKho.findMany({
      where: {
        ngay: {
          gt: latestChotkho.ngaychot
        },
        isActive: true
      },
      include: {
        sanpham: {
          include: { sanpham: true }
        }
      },
      orderBy: { ngay: 'asc' }
    });

    console.log(`\n=== HOẠT ĐỘNG SAU CHỐT KHO (${transactions.length} phiếu) ===`);
    
    const summary = {
      nhap: 0,
      xuat: 0,
      huy: 0,
      chuyen: 0,
      khac: 0
    };

    transactions.forEach(p => {
      const type = p.type?.toLowerCase() || 'unknown';
      if (type.includes('nhap')) summary.nhap++;
      else if (type.includes('xuat')) summary.xuat++;
      else if (type.includes('huy')) summary.huy++;
      else if (type.includes('chuyen')) summary.chuyen++;
      else summary.khac++;
    });

    console.log(`- Nhập kho: ${summary.nhap}`);
    console.log(`- Xuất kho: ${summary.xuat}`);
    console.log(`- Hủy/Hao hụt: ${summary.huy}`);
    console.log(`- Chuyển kho: ${summary.chuyen}`);
    console.log(`- Khác: ${summary.khac}`);

    // 3. Tính toán biến động cho từng sản phẩm
    const productChanges = {};

    transactions.forEach(p => {
      p.sanpham.forEach(item => {
        const spId = item.sanphamId;
        if (!productChanges[spId]) {
          productChanges[spId] = {
            name: item.sanpham?.title || 'Không tên',
            masp: item.sanpham?.masp || 'N/A',
            nhap: 0,
            xuat: 0,
            huy: 0,
            chuyen: 0
          };
        }

        const qty = parseFloat(item.soluong) || 0;
        const type = p.type?.toLowerCase() || 'unknown';

        if (type.includes('nhap')) productChanges[spId].nhap += qty;
        else if (type.includes('xuat')) productChanges[spId].xuat += qty;
        else if (type.includes('huy')) productChanges[spId].huy += qty;
        // Chuyển kho thì tùy thuộc vào kho nguồn/đích, ở đây giả sử tính tổng chung
      });
    });

    // 4. So sánh với tồn thực tế hiện tại
    const currentStock = await prisma.tonKho.findMany({
      include: { sanpham: true }
    });

    console.log(`\n=== PHÂN TÍCH BIẾN ĐỘNG (TOP 10 MẶT HÀNG) ===`);
    const topChanges = Object.values(productChanges)
      .sort((a, b) => (b.nhap + b.xuat) - (a.nhap + a.xuat))
      .slice(0, 10);

    topChanges.forEach(p => {
      console.log(`${p.masp} - ${p.name}: Nhập ${p.nhap.toFixed(2)}, Xuất ${p.xuat.toFixed(2)}, Hủy ${p.huy.toFixed(2)}`);
    });

  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
