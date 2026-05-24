const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== TRUY VẾT LỊCH SỬ HỦ TIẾU XÀO (5 NGÀY GẦN ĐÂY) ===');
  
  // 1. Tìm sản phẩm
  const products = await prisma.sanpham.findMany({
    where: {
      OR: [
        { title: { contains: 'Hủ Tiếu Xào', mode: 'insensitive' } },
        { title: { contains: 'Hủ tiếu xào', mode: 'insensitive' } },
        { title: { contains: 'Hu Tieu Xao', mode: 'insensitive' } }
      ]
    },
    include: {
      TonKho: true
    }
  });

  if (products.length === 0) {
    console.log('Không tìm thấy sản phẩm Hủ Tiếu Xào!');
    return;
  }

  const product = products[0];
  console.log(`Sản phẩm: ${product.title} (${product.masp})`);
  console.log(`Tồn kho hiện tại: slton=${product.TonKho?.slton}, sltontt=${product.TonKho?.sltontt}`);

  // 2. Lấy phiếu kho từ ngày 2026-05-20
  const startPeriod = new Date('2026-05-19T17:00:00.000Z'); // 00:00 20/5/2026 GMT+7
  const endPeriod = new Date('2026-05-25T17:00:00.000Z'); // 23:59 25/5/2026 GMT+7

  const phieuKhos = await prisma.phieuKhoSanpham.findMany({
    where: {
      sanphamId: product.id,
      phieuKho: {
        createdAt: {
          gte: startPeriod,
          lte: endPeriod
        }
      }
    },
    include: {
      phieuKho: true
    },
    orderBy: {
      phieuKho: {
        createdAt: 'asc'
      }
    }
  });

  console.log(`\n--- Danh sách phiếu kho (20/5/2026 - nay) ---`);
  phieuKhos.forEach((item, index) => {
    const pk = item.phieuKho;
    console.log(`[${index + 1}] Mã phiếu: ${pk.maphieu} | Loại: ${pk.type} | Số lượng: ${item.soluong} | Tạo lúc: ${pk.createdAt.toLocaleString('vi-VN')} (${pk.createdAt.toISOString()}) | Ghi chú: ${pk.ghichu || 'Không'}`);
  });

  // 3. Lấy lịch sử chốt kho
  const chotKhos = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: product.id,
      ngaychot: {
        gte: startPeriod,
        lte: endPeriod
      }
    },
    include: {
      chotkho: true
    },
    orderBy: {
      ngaychot: 'asc'
    }
  });

  console.log(`\n--- Danh sách chốt kho (20/5/2026 - nay) ---`);
  chotKhos.forEach((item, index) => {
    const ck = item.chotkho;
    console.log(`[${index + 1}] Mã chốt: ${ck ? ck.title || ck.id : 'Không'} | Giờ chốt: ${item.ngaychot.toLocaleString('vi-VN')} | Tồn hệ thống: ${item.sltonhethong} | Tồn thực tế: ${item.sltonthucte} | Chênh lệch: ${item.chenhlech} | Hủy: ${item.slhuy} | Ghi chú: ${item.ghichu || 'Không'}`);
  });

  // 4. Kiểm tra các đơn đặt hàng (nhập hàng) và đơn bán hàng (xuất hàng) liên quan ngày hôm nay để xem có đơn nào chưa được lập phiếu kho hay không
  console.log(`\n--- Kiểm tra đơn bán hàng (Donhang) ngày giao 24/5/2026 ---`);
  const orders = await prisma.donhangsanpham.findMany({
    where: {
      idSP: product.id,
      donhang: {
        ngaygiao: {
          gte: new Date('2026-05-23T17:00:00.000Z'),
          lte: new Date('2026-05-24T17:00:00.000Z')
        }
      }
    },
    include: {
      donhang: true
    }
  });

  if (orders.length === 0) {
    console.log('Không có đơn hàng bán nào cho sản phẩm này giao ngày 24/5/2026');
  } else {
    orders.forEach(o => {
      console.log(`Đơn bán: ${o.donhang.madonhang} | Trạng thái: ${o.donhang.status} | Đặt: ${o.sldat} | Giao: ${o.slgiao} | Nhận: ${o.slnhan} | Hủy: ${o.slhuy}`);
    });
  }

  console.log(`\n--- Kiểm tra đơn đặt hàng NCC (Dathang) ngày nhận 24/5/2026 ---`);
  const purchases = await prisma.dathangsanpham.findMany({
    where: {
      idSP: product.id,
      dathang: {
        ngaynhan: {
          gte: new Date('2026-05-23T17:00:00.000Z'),
          lte: new Date('2026-05-24T17:00:00.000Z')
        }
      }
    },
    include: {
      dathang: true
    }
  });

  if (purchases.length === 0) {
    console.log('Không có đơn đặt nhà cung cấp nào cho sản phẩm này nhận ngày 24/5/2026');
  } else {
    purchases.forEach(p => {
      console.log(`Đơn nhập: ${p.dathang.madncc} | Trạng thái: ${p.dathang.status} | Đặt: ${p.sldat} | Giao: ${p.slgiao} | Nhận: ${p.slnhan} | Hủy: ${p.slhuy}`);
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
