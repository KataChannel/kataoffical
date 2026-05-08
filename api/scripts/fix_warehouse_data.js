const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function main() {
  console.log("🚀 Starting Warehouse Data Fix on TESTDATA...");
  
  try {
    const lastChotkho = await prisma.chotkho.findFirst({
      where: { isActive: true },
      orderBy: { ngaychot: 'desc' },
    });

    if (!lastChotkho) {
      console.error("❌ No Chotkho found. Cannot safely recalculate.");
      return;
    }

    const startDate = lastChotkho.ngaychot;
    console.log("📅 Last Chotkho Date:", startDate);

    // 1. Identify Orders without PhieuKho since last Chotkho
    const ordersToFix = await prisma.donhang.findMany({
      where: {
        ngaygiao: { gt: startDate },
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        NOT: { PhieuKho: { some: {} } }
      },
      include: { sanpham: { include: { sanpham: true } } }
    });

    console.log("🔍 Found " + ordersToFix.length + " orders to fix.");

    // 2. Create missing PhieuKho records
    for (const order of ordersToFix) {
      const maphieu = "PX-" + order.madonhang;
      console.log("📦 Creating PhieuKho for " + order.madonhang + "...");
      
      await prisma.phieuKho.upsert({
        where: { maphieu },
        create: {
          maphieu,
          madonhang: order.madonhang, // Establish relation
          ngay: order.ngaygiao || new Date(),
          type: 'xuat',
          khoId: order.khoId || DEFAUL_KHO_ID,
          ghichu: "Tự động bổ sung từ đối soát (" + order.status + ")",
          isActive: true,
          sanpham: {
            create: order.sanpham.map(sp => ({
              sanphamId: sp.idSP,
              soluong: Number(sp.slgiao || sp.sldat || 0),
              ghichu: sp.ghichu
            }))
          }
        },
        update: {
            madonhang: order.madonhang // Fix existing if needed
        }
      });
    }

    // 3. Recalculate ALL TonKho
    console.log("🔄 Recalculating all product balances...");
    const allProducts = await prisma.sanpham.findMany({
        select: { id: true, masp: true }
    });

    for (const sp of allProducts) {
      const pendingOutAgg = await prisma.donhangsanpham.aggregate({
        where: { idSP: sp.id, donhang: { status: 'dadat' } },
        _sum: { sldat: true }
      });
      const slchogiao = Number(pendingOutAgg._sum?.sldat || 0);

      const pendingInAgg = await prisma.dathangsanpham.aggregate({
        where: { idSP: sp.id, dathang: { status: 'dadat' } },
        _sum: { sldat: true }
      });
      const slchonhap = Number(pendingInAgg._sum?.sldat || 0);

      const chotDetail = await prisma.chotkhodetail.findFirst({
        where: { chotkhoId: lastChotkho.id, sanphamId: sp.id },
      });
      const initialStock = Number(chotDetail?.sltonthucte || 0);

      const movementsAgg = await prisma.phieuKhoSanpham.findMany({
        where: {
          sanphamId: sp.id,
          phieuKho: { ngay: { gt: startDate }, isActive: true }
        },
        include: { phieuKho: true }
      });

      let netMovement = 0;
      for (const m of movementsAgg) {
        if (m.phieuKho.type === 'nhap') netMovement += Number(m.soluong);
        else if (m.phieuKho.type === 'xuat') netMovement -= Number(m.soluong);
      }

      const sltontt = initialStock + netMovement;

      await prisma.tonKho.upsert({
        where: { sanphamId: sp.id },
        update: {
          slton: sltontt,
          sltontt: sltontt,
          slchogiao: slchogiao,
          slchonhap: slchonhap,
          updatedAt: new Date()
        },
        create: {
          sanphamId: sp.id,
          slton: sltontt,
          sltontt: sltontt,
          slchogiao: slchogiao,
          slchonhap: slchonhap
        }
      });
    }

    console.log("✅ All data fixed successfully on TESTDATA.");

  } catch (error) {
    console.error("❌ Error fixing data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
