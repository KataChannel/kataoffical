
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function recalculatePending() {
  try {
    console.log("--- Recalculating slchogiao & slchonhap for ALL active orders ---");

    // 1. Get all active products
    const products = await prisma.sanpham.findMany({
        select: { id: true, masp: true }
    });

    for (const sp of products) {
      // Calculate slchogiao (Pending Outbound)
      const pendingOutAgg = await prisma.donhangsanpham.aggregate({
        where: { 
            idSP: sp.id, 
            donhang: { status: 'dadat' } 
        },
        _sum: { sldat: true }
      });
      const slchogiao = Number(pendingOutAgg._sum?.sldat || 0);

      // Calculate slchonhap (Pending Inbound)
      const pendingInAgg = await prisma.dathangsanpham.aggregate({
        where: { 
            idSP: sp.id, 
            dathang: { status: 'dadat' } 
        },
        _sum: { sldat: true }
      });
      const slchonhap = Number(pendingInAgg._sum?.sldat || 0);

      if (slchogiao > 0 || slchonhap > 0) {
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: { 
            slchogiao: slchogiao,
            slchonhap: slchonhap,
            updatedAt: new Date()
          }
        });
        console.log(`Updated ${sp.masp}: slchogiao=${slchogiao}, slchonhap=${slchonhap}`);
      }
    }

    console.log("--- Recalculation complete ---");
  } catch (error) {
    console.error("Error during recalculation:", error);
  } finally {
    await prisma.$disconnect();
  }
}

recalculatePending();
