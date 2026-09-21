import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEFAUL_BANGGIA_ID = '84a62698-5784-4ac3-b506-5e662d1511cb';

async function fixZeroPriceOrders() {
  console.log('🚀 Bắt đầu quét và sửa các đơn hàng bị giá 0đ...');

  // 1. Lấy bảng giá mặc định BG04
  const bg04 = await prisma.banggia.findUnique({
    where: { id: DEFAUL_BANGGIA_ID },
    include: {
      sanpham: {
        include: { sanpham: true }
      }
    }
  });

  if (!bg04) {
    console.error('❌ Không tìm thấy bảng giá mặc định BG04');
    return;
  }

  const bg04PriceMap = new Map<string, number>();
  bg04.sanpham.forEach(item => {
    const price = Number(item.giaban) || 0;
    if (price > 0) {
      bg04PriceMap.set(item.sanphamId, price);
    }
  });
  console.log(`📋 Đã tải ${bg04PriceMap.size} sản phẩm có giá từ bảng giá mặc định BG04.`);

  // 2. Tìm tất cả đơn hàng từ 15/08/2026 trở lại đây
  const donhangs = await prisma.donhang.findMany({
    where: {
      ngaygiao: {
        gte: new Date('2026-08-15T00:00:00Z')
      }
    },
    include: {
      khachhang: {
        include: {
          banggia: {
            include: { sanpham: true }
          }
        }
      },
      banggia: {
        include: { sanpham: true }
      },
      sanpham: {
        include: { sanpham: true }
      }
    },
    orderBy: { ngaygiao: 'desc' }
  });

  console.log(`🎯 Quét tổng cộng ${donhangs.length} đơn hàng gần đây.`);

  let totalOrdersFixed = 0;
  let totalItemsFixed = 0;

  for (const dh of donhangs) {
    const banggiaUuTien = dh.banggia || dh.khachhang?.banggia;
    const bgPriceMap = new Map<string, number>();

    if (banggiaUuTien) {
      banggiaUuTien.sanpham.forEach(item => {
        const price = Number(item.giaban) || 0;
        if (price > 0) {
          bgPriceMap.set(item.sanphamId, price);
        }
      });
    }

    let orderHasChanges = false;
    const changedItems: string[] = [];

    for (const sp of dh.sanpham) {
      const currentPrice = Number(sp.giaban) || 0;
      const spTitle = sp.sanpham?.title || 'N/A';
      const masp = sp.sanpham?.masp || 'N/A';

      // Bỏ qua phí ship
      if (spTitle.toLowerCase().startsWith('z_phí')) {
        continue;
      }

      if (currentPrice === 0) {
        // Tìm giá: Ưu tiên bảng giá của đơn/khách > Bảng giá mặc định BG04 > Giá gốc Sanpham
        let targetPrice = bgPriceMap.get(sp.idSP);
        let source = `${banggiaUuTien?.mabanggia || 'Bảng giá riêng'}`;

        if (!targetPrice || targetPrice <= 0) {
          targetPrice = bg04PriceMap.get(sp.idSP);
          source = 'BG04 (mặc định)';
        }

        if (!targetPrice || targetPrice <= 0) {
          const spGia = Number(sp.sanpham?.giaban) || 0;
          if (spGia > 0) {
            targetPrice = spGia;
            source = 'Sanpham gốc';
          }
        }

        if (targetPrice && targetPrice > 0) {
          const sldat = Number(sp.sldat) || 0;
          const slgiao = Number(sp.slgiao) || 0;
          const slnhan = Number(sp.slnhan) || 0;
          const vatRate = dh.isshowvat ? (Number(sp.vat) || 0) : 0;

          const ttdat = targetPrice * sldat;
          const ttgiao = targetPrice * slgiao;
          const ttnhan = targetPrice * slnhan;
          const ttsauvat = ttnhan * (1 + vatRate);

          await prisma.donhangsanpham.update({
            where: { id: sp.id },
            data: {
              giaban: targetPrice,
              ttdat,
              ttgiao,
              ttnhan,
              ttsauvat
            }
          });

          changedItems.push(`  ✅ [${masp}] ${spTitle}: 0đ -> ${targetPrice.toLocaleString()}đ (Nguồn: ${source})`);
          totalItemsFixed++;
          orderHasChanges = true;
        } else {
          changedItems.push(`  ⚠️ [${masp}] ${spTitle}: Không tìm thấy giá trong bất kỳ bảng giá nào!`);
        }
      }
    }

    if (orderHasChanges) {
      console.log(`\n========================================`);
      console.log(`📦 Đơn hàng: ${dh.madonhang} | Khách: ${dh.khachhang?.name || dh.khachhang?.tenkh || 'N/A'} | Ngày giao: ${dh.ngaygiao?.toISOString().split('T')[0]}`);
      changedItems.forEach(msg => console.log(msg));

      // 3. Tính toán lại tổng tiền của đơn hàng
      const updatedItems = await prisma.donhangsanpham.findMany({
        where: { donhangId: dh.id }
      });

      let tongchua = 0;
      for (const item of updatedItems) {
        tongchua += Number(item.ttnhan) || 0;
      }

      const vatRate = dh.isshowvat ? (Number(dh.vat) || 0) : 0;
      const tongvat = tongchua * vatRate;
      const tongtien = tongchua + tongvat;

      await prisma.donhang.update({
        where: { id: dh.id },
        data: {
          tongvat,
          tongtien,
          updatedAt: new Date()
        }
      });

      console.log(`  💰 Tổng tiền mới: ${tongtien.toLocaleString()}đ (VAT: ${tongvat.toLocaleString()}đ)`);
      totalOrdersFixed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`🎉 HOÀN TẤT: Đã cập nhật thành công ${totalItemsFixed} sản phẩm trên ${totalOrdersFixed} đơn hàng!`);
}

fixZeroPriceOrders()
  .catch(err => {
    console.error('❌ Lỗi:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
