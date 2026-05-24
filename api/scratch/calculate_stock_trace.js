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

  console.log(`=== TÍNH TOÁN LŨY KẾ TỒN KHO SẢN PHẨM: ${product.title} ===`);

  // Bắt đầu từ ngày 15/5/2026
  const startDate = new Date('2026-05-15T00:00:00+07:00');

  // Lấy tất cả các phiếu kho từ 15/5/2026
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

  // Lấy tất cả các bản ghi chốt kho từ 15/5/2026
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

  // Gộp chung các sự kiện theo thời gian
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

  // Sắp xếp các sự kiện theo thời gian
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
      console.log(`[${timeStr}] PHIẾU KHO: ${v.maphieu} | Loại: ${v.type} | Số lượng: ${v.soluong} | Thay đổi: ${prevStock} -> ${calculatedStock} | Ghi chú: ${v.ghichu}`);
    } else if (ev.type === 'CLOSING') {
      const c = ev.data;
      console.log(`[${timeStr}] CHỐT KHO: ${c.title} | Tồn hệ thống ghi nhận: ${c.sltonhethong} | Tồn thực tế ghi nhận: ${c.sltonthucte}`);
      
      // Khi chốt kho diễn ra, hệ thống ghi đè tồn kho thực tế sltontt vào slton.
      // Chúng ta cập nhật calculatedStock về tồn thực tế của lần chốt
      const prevStock = calculatedStock;
      calculatedStock = c.sltonthucte;
      console.log(`                       => GHI ĐÈ TỒN KHO THỰC TẾ: ${prevStock} -> ${calculatedStock} (Ghi chú: ${c.ghichu})`);
    }
  });

  console.log(`\nKết quả cuối cùng tính toán: ${calculatedStock}`);
  const currentTk = await prisma.tonKho.findUnique({
    where: { sanphamId: product.id }
  });
  console.log(`Tồn kho thực tế trong bảng TonKho hiện tại: slton=${currentTk?.slton}, sltontt=${currentTk?.sltontt}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
