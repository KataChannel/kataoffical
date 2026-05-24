const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100266';
  console.log(`=== CHI TIẾT SẢN PHẨM ${masp} ===`);

  const product = await prisma.sanpham.findUnique({
    where: { masp },
    include: {
      TonKho: true
    }
  });

  if (!product) {
    console.log('Không tìm thấy sản phẩm!');
    return;
  }

  // 1. Chi tiết đơn đặt hàng NCC TGNCC-XE00007
  console.log('\n--- 1. Chi tiết Dathang NCC TGNCC-XE00007 ---');
  const dathang = await prisma.dathang.findFirst({
    where: {
      madncc: 'TGNCC-XE00007'
    },
    include: {
      sanpham: {
        where: { idSP: product.id }
      },
      PhieuKho: {
        include: {
          sanpham: {
            where: { sanphamId: product.id }
          }
        }
      }
    }
  });

  if (dathang) {
    console.log(`Đơn Dathang: ID=${dathang.id}, madncc=${dathang.madncc}, status=${dathang.status}, ngaynhan=${dathang.ngaynhan?.toISOString()}`);
    dathang.sanpham.forEach(sp => {
      console.log(`  + Chi tiết SP: sldat=${sp.sldat}, slgiao=${sp.slgiao}, slnhan=${sp.slnhan}, gianhap=${sp.gianhap}`);
    });
    dathang.PhieuKho.forEach(pk => {
      console.log(`  + Phiếu kho liên kết: ID=${pk.id}, maphieu=${pk.maphieu}, type=${pk.type}, createdAt=${pk.createdAt.toISOString()}`);
      pk.sanpham.forEach(pks => {
        console.log(`    - Số lượng nhập trong phiếu: ${pks.soluong}`);
      });
    });
  } else {
    console.log('Không tìm thấy đơn dathang TGNCC-XE00007');
  }

  // 2. Chi tiết các đơn bán hàng ngày 24/5/2026
  console.log('\n--- 2. Chi tiết Donhang (Bán hàng) ngày 24/5/2026 ---');
  const donhangs = await prisma.donhang.findMany({
    where: {
      ngaygiao: {
        gte: new Date('2026-05-23T17:00:00.000Z'),
        lte: new Date('2026-05-24T17:00:00.000Z')
      },
      sanpham: {
        some: { idSP: product.id }
      }
    },
    include: {
      sanpham: {
        where: { idSP: product.id }
      },
      PhieuKho: {
        include: {
          sanpham: {
            where: { sanphamId: product.id }
          }
        }
      }
    }
  });

  donhangs.forEach(dh => {
    console.log(`Đơn bán: ID=${dh.id}, madonhang=${dh.madonhang}, status=${dh.status}, ngaygiao=${dh.ngaygiao?.toISOString()}`);
    dh.sanpham.forEach(sp => {
      console.log(`  + Chi tiết SP: sldat=${sp.sldat}, slgiao=${sp.slgiao}, slnhan=${sp.slnhan}, slhuy=${sp.slhuy}`);
    });
    dh.PhieuKho.forEach(pk => {
      console.log(`  + Phiếu kho liên kết: ID=${pk.id}, maphieu=${pk.maphieu}, type=${pk.type}, createdAt=${pk.createdAt.toISOString()}`);
      pk.sanpham.forEach(pks => {
        console.log(`    - Số lượng xuất trong phiếu: ${pks.soluong}`);
      });
    });
  });

  // 3. Toàn bộ phiếu kho liên quan đến sản phẩm này ngày 24/5/2026
  console.log('\n--- 3. Toàn bộ phiếu kho của SP ngày 24/5/2026 ---');
  const allVouchers = await prisma.phieuKhoSanpham.findMany({
    where: {
      sanphamId: product.id,
      phieuKho: {
        createdAt: {
          gte: new Date('2026-05-23T17:00:00.000Z'),
          lte: new Date('2026-05-24T17:00:00.000Z')
        }
      }
    },
    include: {
      phieuKho: true
    }
  });
  allVouchers.forEach(v => {
    console.log(`Phiếu: ${v.phieuKho.maphieu} | Loại: ${v.phieuKho.type} | Số lượng: ${v.soluong} | madncc=${v.phieuKho.madncc} | madonhang=${v.phieuKho.madonhang} | createdAt=${v.phieuKho.createdAt.toISOString()}`);
  });

  // 4. Lấy toàn bộ lịch sử Chotkho chi tiết của ngày 24/05/2026
  console.log('\n--- 4. Toàn bộ Chotkho chi tiết của ngày 24/5/2026 ---');
  const closings = await prisma.chotkho.findMany({
    where: {
      ngaychot: {
        gte: new Date('2026-05-23T17:00:00.000Z'),
        lte: new Date('2026-05-24T17:00:00.000Z')
      }
    },
    include: {
      details: {
        where: { sanphamId: product.id }
      }
    }
  });

  closings.forEach(c => {
    console.log(`Chốt kho: ID=${c.id}, title=${c.title}, ngaychot=${c.ngaychot.toISOString()}, isLocked=${c.isLocked}`);
    c.details.forEach(d => {
      console.log(`  + Chi tiết SP: sltonhethong=${d.sltonhethong}, sltonthucte=${d.sltonthucte}, chenhlech=${d.chenhlech}, ghichu=${d.ghichu}`);
    });
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
