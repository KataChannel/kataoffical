const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100266';
  const product = await prisma.sanpham.findUnique({
    where: { masp }
  });

  if (!product) {
    console.log('Không tìm thấy sản phẩm!');
    return;
  }

  console.log(`=== KIỂM TRA MỞ RỘNG LOGS VÀ IMPORT HISTORY CHO ${masp} ===`);

  // 1. Kiểm tra ImportHistory ngày hôm nay
  const startOfDay = new Date('2026-05-23T17:00:00.000Z');
  const endOfDay = new Date('2026-05-24T17:00:00.000Z');

  const history = await prisma.importHistory.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  console.log('\n--- Import History hôm nay ---');
  if (history.length === 0) {
    console.log('Không có lịch sử import nào.');
  } else {
    history.forEach((h, i) => {
      console.log(`[${i + 1}] ID: ${h.id} | Title: ${h.title} | Type: ${h.type} | Created: ${h.createdAt.toLocaleString('vi-VN')}`);
      // Nếu JSON chứa masp hoặc idSP của sản phẩm này, in ra chi tiết
      const detailStr = JSON.stringify(h.caseDetail);
      if (detailStr.includes(product.id) || detailStr.includes(masp)) {
        console.log(`  -> Liên quan đến SP này! Chi tiết:`, JSON.stringify(h.caseDetail, null, 2));
      }
    });
  }

  // 2. Tìm tất cả các Donhangsanpham liên quan đến sản phẩm này được cập nhật hôm nay (nhằm phát hiện thay đổi)
  console.log('\n--- Tất cả các Donhangsanpham của SP này hôm nay ---');
  const orderItems = await prisma.donhangsanpham.findMany({
    where: {
      idSP: product.id
    },
    include: {
      donhang: true
    }
  });

  orderItems.forEach(item => {
    // Chỉ quan tâm các đơn được tạo hoặc cập nhật gần đây
    const dh = item.donhang;
    if (dh.createdAt >= startOfDay || dh.ngaygiao >= startOfDay) {
      console.log(`Đơn bán: ${dh.madonhang} | Trạng thái: ${dh.status} | Ngày giao: ${dh.ngaygiao?.toLocaleString('vi-VN')} | Đặt: ${item.sldat} | Giao: ${item.slgiao} | Nhận: ${item.slnhan} | Hủy: ${item.slhuy} | Ghi chú: ${item.ghichu}`);
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
