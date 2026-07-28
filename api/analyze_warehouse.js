const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // 1. Get the last inventory count (Chotkho)
    const lastChotkho = await prisma.chotkho.findFirst({
      where: { isActive: true },
      orderBy: { ngaychot: 'desc' },
      include: {
        details: {
          include: {
            sanpham: {
              select: { id: true, masp: true, title: true, dvt: true }
            }
          }
        }
      }
    });

    if (!lastChotkho) {
      console.log("No inventory count (Chotkho) found.");
      return;
    }

    console.log("Last Inventory Count (Chotkho): " + (lastChotkho.title || 'Untitled'));
    console.log("Date: " + lastChotkho.ngaychot);
    console.log("ID: " + lastChotkho.id);
    console.log("--------------------------------------------------");

    const startDate = lastChotkho.ngaychot;

    // 2. Get all warehouse transactions since startDate
    const phieuKhos = await prisma.phieuKho.findMany({
      where: {
        ngay: { gt: startDate },
        isActive: true,
      },
      include: {
        sanpham: {
          include: { sanpham: true }
        }
      }
    });

    const donhangs = await prisma.donhang.findMany({
      where: {
        ngaygiao: { gt: startDate },
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
      },
      include: {
        sanpham: {
          include: { sanpham: true }
        }
      }
    });

    const dathangs = await prisma.dathang.findMany({
      where: {
        ngaynhan: { gt: startDate },
        status: { in: ['danhan', 'hoanthanh'] }
      },
      include: {
        sanpham: {
          include: { sanpham: true }
        }
      }
    });

    console.log("Found " + phieuKhos.length + " PhieuKho transactions.");
    console.log("Found " + donhangs.length + " successful Sales Orders.");
    console.log("Found " + dathangs.length + " successful Purchase Orders.");
    console.log("--------------------------------------------------");

    const productStats = new Map();

    for (const detail of lastChotkho.details) {
      if (!detail.sanpham) continue;
      const spId = detail.sanphamId;
      productStats.set(spId, {
        masp: detail.sanpham.masp,
        title: detail.sanpham.title,
        dvt: detail.sanpham.dvt,
        initial: Number(detail.sltonthucte || 0),
        nhap: 0,
        xuat: 0,
        sales: 0,
        purchases: 0,
        adjustments: 0,
        currentSystem: 0
      });
    }

    for (const pk of phieuKhos) {
      for (const pks of pk.sanpham) {
        if (!pks.sanphamId) continue;
        if (!productStats.has(pks.sanphamId)) {
          productStats.set(pks.sanphamId, {
            masp: pks.sanpham.masp,
            title: pks.sanpham.title,
            dvt: pks.sanpham.dvt,
            initial: 0, nhap: 0, xuat: 0, sales: 0, purchases: 0, adjustments: 0, currentSystem: 0
          });
        }
        const stats = productStats.get(pks.sanphamId);
        // Only count internal (manual) transactions. 
        // Vouchers linked to orders or starting with PX-TG- (automated) are ignored to avoid double counting with Sales/Purchases.
        if (pk.madonhang || pk.madncc || pk.maphieu?.startsWith('PX-TG-')) continue;

        if (pk.type === 'nhap') {
          stats.nhap += Number(pks.soluong || 0);
        } else if (pk.type === 'xuat') {
          stats.xuat += Number(pks.soluong || 0);
        }
      }
    }

    for (const dh of donhangs) {
      for (const dhs of dh.sanpham) {
        if (!dhs.idSP) continue;
        if (!productStats.has(dhs.idSP)) {
          productStats.set(dhs.idSP, {
            masp: dhs.sanpham.masp,
            title: dhs.sanpham.title,
            dvt: dhs.sanpham.dvt,
            initial: 0, nhap: 0, xuat: 0, sales: 0, purchases: 0, adjustments: 0, currentSystem: 0
          });
        }
        const stats = productStats.get(dhs.idSP);
        stats.sales += Number(dhs.slnhan || dhs.slgiao || 0);
      }
    }

    for (const dt of dathangs) {
      for (const dts of dt.sanpham) {
        if (!dts.idSP) continue;
        if (!productStats.has(dts.idSP)) {
          productStats.set(dts.idSP, {
            masp: dts.sanpham.masp,
            title: dts.sanpham.title,
            dvt: dts.sanpham.dvt,
            initial: 0, nhap: 0, xuat: 0, sales: 0, purchases: 0, adjustments: 0, currentSystem: 0
          });
        }
        const stats = productStats.get(dts.idSP);
        stats.purchases += Number(dts.slnhan || dts.slgiao || 0);
      }
    }

    const allTonKho = await prisma.tonKho.findMany();
    for (const tk of allTonKho) {
      if (productStats.has(tk.sanphamId)) {
        const stats = productStats.get(tk.sanphamId);
        stats.currentSystem = Number(tk.sltontt || 0);
      }
    }

    const report = Array.from(productStats.values()).map(s => {
      const expected = s.initial + s.nhap - s.xuat + s.purchases - s.sales;
      const discrepancy = s.currentSystem - expected;
      return {
        ...s,
        expected: Number(expected.toFixed(3)),
        discrepancy: Number(discrepancy.toFixed(3))
      };
    });

    // Only show products with transactions or discrepancies
    const relevantReport = report.filter(s => 
      s.nhap !== 0 || s.xuat !== 0 || s.sales !== 0 || s.purchases !== 0 || s.discrepancy !== 0
    );

    console.log(JSON.stringify(relevantReport, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
