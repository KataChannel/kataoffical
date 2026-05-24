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

  console.log(`=== SỬA DỮ LIỆU SAI LỆCH CHO CAM VÀNG: ${product.title} ===`);

  // 1. Cập nhật phiếu nhập kho tự động lên 10 kg
  const phieuKhoNhap = await prisma.phieuKho.findFirst({
    where: {
      madncc: 'TGNCC-XE00097',
      type: 'nhap'
    },
    include: {
      sanpham: {
        where: { sanphamId: product.id }
      }
    }
  });

  if (phieuKhoNhap && phieuKhoNhap.sanpham.length > 0) {
    const pks = phieuKhoNhap.sanpham[0];
    console.log(`[1] Đang cập nhật phiếu nhập ${phieuKhoNhap.maphieu}: ${pks.soluong} -> 10`);
    await prisma.phieuKhoSanpham.update({
      where: { id: pks.id },
      data: { soluong: 10 }
    });
    console.log('  => Cập nhật phiếu nhập thành công!');
  } else {
    console.log('[1] Không tìm thấy phiếu nhập kho của đơn TGNCC-XE00097!');
  }

  // 2. Cập nhật TonKho về 3.9 kg (2.5 đầu ngày + 10 nhập - 8.6 xuất = 3.9)
  console.log('[2] Đang cập nhật TonKho về 3.9...');
  await prisma.tonKho.update({
    where: { sanphamId: product.id },
    data: {
      slton: 3.9,
      sltontt: 3.9
    }
  });
  console.log('  => Cập nhật TonKho thành công!');

  // 3. Cập nhật bản ghi chốt kho hôm nay lên 3.9 kg
  const startOfDay = new Date('2026-05-23T17:00:00.000Z');
  const endOfDay = new Date('2026-05-24T17:00:00.000Z');

  const chotKhoDetail = await prisma.chotkhodetail.findFirst({
    where: {
      sanphamId: product.id,
      ngaychot: {
        gte: startOfDay,
        lte: endOfDay
      }
    }
  });

  if (chotKhoDetail) {
    console.log(`[3] Đang cập nhật bản ghi chốt kho chi tiết: ${chotKhoDetail.sltonhethong} -> 3.9`);
    await prisma.chotkhodetail.update({
      where: { id: chotKhoDetail.id },
      data: {
        sltonhethong: 3.9,
        sltonthucte: 3.9,
        chenhlech: 0
      }
    });
    console.log('  => Cập nhật chốt kho thành công!');
  } else {
    console.log('[3] Không tìm thấy bản ghi chốt kho chi tiết hôm nay!');
  }

  console.log('\n=== HOÀN TẤT SỬA DỮ LIỆU CAM VÀNG! ===');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
