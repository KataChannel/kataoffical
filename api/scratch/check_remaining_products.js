const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const productsToAudit = [
    { masp: 'I100050', name: 'Cải sậy' },
    { masp: 'I100613', name: 'Xoài tứ quý' },
    { masp: 'I100469', name: 'Cam vàng' },
    { masp: 'I100595', name: 'Cà pháo lớn' },
    { masp: 'I100932', name: 'z_Phí ship 40_z' }
  ];

  const startOfDay = new Date('2026-05-23T17:00:00.000Z');
  const endOfDay = new Date('2026-05-24T17:00:00.000Z');

  console.log('=== KIỂM TRA CÁC SẢN PHẨM CÒN LẠI TRONG DANH SÁCH ĐỐI SOÁT ===');

  for (const item of productsToAudit) {
    const product = await prisma.sanpham.findUnique({
      where: { masp: item.masp },
      include: { TonKho: true }
    });

    if (!product) {
      console.log(`\n❌ Không tìm thấy sản phẩm ${item.masp} (${item.name})!`);
      continue;
    }

    console.log(`\n======================================================`);
    console.log(`📦 SẢN PHẨM: ${product.title} (${product.masp})`);
    console.log(`------------------------------------------------------`);
    console.log(`Tồn kho TonKho hiện tại: slton=${product.TonKho?.slton}, sltontt=${product.TonKho?.sltontt}`);

    // 1. Lấy phiếu kho hôm nay (24/5/2026)
    const phieuKhos = await prisma.phieuKhoSanpham.findMany({
      where: {
        sanphamId: product.id,
        phieuKho: {
          createdAt: { gte: startOfDay, lte: endOfDay }
        }
      },
      include: { phieuKho: true }
    });

    console.log(`\n📄 Phiếu kho hôm nay (24/5):`);
    if (phieuKhos.length === 0) {
      console.log('  => Không có phiếu kho nào.');
    } else {
      phieuKhos.forEach(pkItem => {
        const pk = pkItem.phieuKho;
        console.log(`  - [${pk.type.toUpperCase()}] Mã: ${pk.maphieu} | Số lượng: ${pkItem.soluong} | madncc=${pk.madncc} | madonhang=${pk.madonhang} | Ghi chú: ${pk.ghichu}`);
      });
    }

    // 2. Lấy đơn đặt NCC (Dathang) hôm nay
    const purchases = await prisma.dathangsanpham.findMany({
      where: {
        idSP: product.id,
        dathang: {
          ngaynhan: { gte: startOfDay, lte: endOfDay }
        }
      },
      include: { dathang: true }
    });

    console.log(`\n📥 Đơn đặt NCC (Dathang) hôm nay:`);
    if (purchases.length === 0) {
      console.log('  => Không có đơn đặt NCC.');
    } else {
      purchases.forEach(p => {
        console.log(`  - Mã: ${p.dathang.madncc} | Trạng thái: ${p.dathang.status} | Đặt: ${p.sldat} | Giao: ${p.slgiao} | Nhận: ${p.slnhan}`);
      });
    }

    // 3. Lấy đơn bán (Donhang) hôm nay
    const sales = await prisma.donhangsanpham.findMany({
      where: {
        idSP: product.id,
        donhang: {
          ngaygiao: { gte: startOfDay, lte: endOfDay }
        }
      },
      include: { donhang: true }
    });

    console.log(`\n📤 Đơn bán hàng (Donhang) hôm nay:`);
    if (sales.length === 0) {
      console.log('  => Không có đơn bán.');
    } else {
      sales.forEach(s => {
        console.log(`  - Mã: ${s.donhang.madonhang} | Trạng thái: ${s.donhang.status} | Đặt: ${s.sldat} | Giao: ${s.slgiao} | Nhận: ${s.slnhan} | Hủy: ${s.slhuy}`);
      });
    }

    // 4. Lịch sử chốt kho hôm nay
    const closings = await prisma.chotkhodetail.findMany({
      where: {
        sanphamId: product.id,
        ngaychot: { gte: startOfDay, lte: endOfDay }
      },
      include: { chotkho: true }
    });

    console.log(`\n🔒 Bản ghi chốt kho hôm nay (24/5):`);
    if (closings.length === 0) {
      console.log('  => Không có bản ghi chốt kho.');
    } else {
      closings.forEach(c => {
        console.log(`  - Mã chốt: ${c.chotkho?.title || c.chotkhoId} | Hệ thống: ${c.sltonhethong} | Thực tế: ${c.sltonthucte} | Chênh lệch: ${c.chenhlech} | Ghi chú: ${c.ghichu}`);
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
