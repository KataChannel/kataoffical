const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100469';
  const product = await prisma.sanpham.findUnique({
    where: { masp }
  });

  if (!product) {
    console.log('Không tìm thấy sản phẩm!');
    return;
  }

  console.log(`=== TRUY VẾT TỒN KHO LŨY KẾ SẢN PHẨM: ${product.title} (${masp}) ===`);

  const startDate = new Date('2026-05-15T00:00:00+07:00');

  // Lấy phiếu kho
  const phieuKhos = await prisma.phieuKhoSanpham.findMany({
    where: {
      sanphamId: product.id,
      phieuKho: {
        createdAt: { gte: startDate }
      }
    },
    include: {
      phieuKho: true
    },
    orderBy: {
      phieuKho: { createdAt: 'asc' }
    }
  });

  // Lấy chốt kho
  const chotKhos = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: product.id,
      ngaychot: { gte: startDate }
    },
    include: {
      chotkho: true
    },
    orderBy: {
      ngaychot: 'asc'
    }
  });

  const events = [];

  phieuKhos.forEach(item => {
    events.push({
      type: 'VOUCHER',
      time: item.phieuKho.createdAt,
      data: {
        maphieu: item.phieuKho.maphieu,
        type: item.phieuKho.type,
        soluong: Number(item.soluong),
        ghichu: item.phieuKho.ghichu
      }
    });
  });

  chotKhos.forEach(item => {
    events.push({
      type: 'CLOSING',
      time: item.ngaychot,
      data: {
        id: item.chotkhoId,
        title: item.chotkho?.title || 'Chốt kho',
        sltonhethong: Number(item.sltonhethong),
        sltonthucte: Number(item.sltonthucte),
        chenhlech: Number(item.chenhlech),
        ghichu: item.ghichu
      }
    });
  });

  events.sort((a, b) => a.time.getTime() - b.time.getTime());

  let calculatedStock = 0;
  console.log(`\nThời gian bắt đầu: ${startDate.toLocaleString('vi-VN')} | Tồn ban đầu giả định: 0\n`);

  events.forEach((ev, i) => {
    const timeStr = ev.time.toLocaleString('vi-VN');
    if (ev.type === 'VOUCHER') {
      const v = ev.data;
      const prevStock = calculatedStock;
      if (v.type === 'nhap') {
        calculatedStock += v.soluong;
      } else if (v.type === 'xuat') {
        calculatedStock -= v.soluong;
      }
      console.log(`[${timeStr}] PHIẾU KHO: ${v.maphieu} | Loại: ${v.type} | Số lượng: ${v.soluong} | Thay đổi: ${prevStock} -> ${calculatedStock}`);
    } else if (ev.type === 'CLOSING') {
      const c = ev.data;
      console.log(`[${timeStr}] CHỐT KHO: ${c.title} | Hệ thống: ${c.sltonhethong} | Thực tế: ${c.sltonthucte}`);
      
      const prevStock = calculatedStock;
      calculatedStock = c.sltonthucte;
      console.log(`                       => GHI ĐÈ TỒN KHO THỰC TẾ: ${prevStock} -> ${calculatedStock} (Ghi chú: ${c.ghichu})`);
    }
  });

  console.log(`\nKết quả cuối cùng tính toán lũy kế: ${calculatedStock}`);
  const currentTk = await prisma.tonKho.findUnique({
    where: { sanphamId: product.id }
  });
  console.log(`Tồn kho hiện tại trong DB: slton=${currentTk?.slton}, sltontt=${currentTk?.sltontt}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
