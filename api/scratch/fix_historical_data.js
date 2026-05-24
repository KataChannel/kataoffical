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

  console.log(`=== TIẾN HÀNH SỬA DỮ LIỆU SAI LỆCH LỊCH SỬ CHO: ${product.title} ===`);

  // 1. Sửa số lượng trong phiếu nhập kho tự động lên 7
  const phieuKhoNhap = await prisma.phieuKho.findFirst({
    where: {
      madncc: 'TGNCC-XE00007',
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
    console.log(`[1] Đang cập nhật phiếu nhập ${phieuKhoNhap.maphieu}: thay đổi số lượng từ ${pks.soluong} -> 7`);
    await prisma.phieuKhoSanpham.update({
      where: { id: pks.id },
      data: { soluong: 7 }
    });
    console.log('  => Cập nhật phiếu nhập kho thành công!');
  } else {
    console.log('[1] Không tìm thấy phiếu nhập kho hoặc sản phẩm trong phiếu nhập kho của đơn TGNCC-XE00007!');
  }

  // 2. Cập nhật tồn kho hiện tại (TonKho) về 0 (0 đầu ngày + 7 nhập - 7 xuất = 0)
  console.log('[2] Đang cập nhật TonKho về 0...');
  await prisma.tonKho.update({
    where: { sanphamId: product.id },
    data: {
      slton: 0,
      sltontt: 0
    }
  });
  console.log('  => Cập nhật TonKho thành công!');

  // 3. Sửa bản ghi chốt kho ngày 24/5/2026 về 0
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
    console.log(`[3] Đang cập nhật bản ghi chốt kho chi tiết (ID: ${chotKhoDetail.id}): sltonhethong ${chotKhoDetail.sltonhethong} -> 0, sltonthucte ${chotKhoDetail.sltonthucte} -> 0`);
    await prisma.chotkhodetail.update({
      where: { id: chotKhoDetail.id },
      data: {
        sltonhethong: 0,
        sltonthucte: 0,
        chenhlech: 0
      }
    });
    console.log('  => Cập nhật bản ghi chốt kho thành công!');
  } else {
    console.log('[3] Không tìm thấy bản ghi chốt kho chi tiết hôm nay!');
  }

  console.log('\n=== HOÀN TẤT SỬA DỮ LIỆU! ===');
  
  // Kiểm tra lại sau khi sửa
  const finalTk = await prisma.tonKho.findUnique({
    where: { sanphamId: product.id }
  });
  console.log(`Tồn kho sau khi sửa: slton=${finalTk?.slton}, sltontt=${finalTk?.sltontt}`);

  const finalPk = await prisma.phieuKhoSanpham.findMany({
    where: {
      sanphamId: product.id,
      phieuKho: {
        createdAt: { gte: startOfDay, lte: endOfDay }
      }
    },
    include: { phieuKho: true }
  });
  console.log('\nCác phiếu kho hôm nay sau khi sửa:');
  finalPk.forEach(item => {
    console.log(`- Phiếu: ${item.phieuKho.maphieu} | Loại: ${item.phieuKho.type} | Số lượng: ${item.soluong}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
