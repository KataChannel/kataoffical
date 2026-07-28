const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const lastChotkho = await prisma.chotkho.findFirst({
      where: { isActive: true },
      orderBy: { ngaychot: 'desc' },
      include: {
        details: {
          include: {
            sanpham: { select: { id: true, masp: true, title: true } }
          }
        }
      }
    });

    if (!lastChotkho) {
      console.log("No Chotkho found.");
      return;
    }

    const startDate = lastChotkho.ngaychot;
    console.log("Start Date (Last Chotkho):", startDate);

    // Get all PhieuKho since startDate
    const phieuKhos = await prisma.phieuKho.findMany({
      where: { ngay: { gt: startDate }, isActive: true },
      include: { sanpham: true }
    });

    // Get all orders without PhieuKho since startDate
    const ordersWithoutPhieu = await prisma.donhang.findMany({
      where: {
        ngaygiao: { gt: startDate },
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        NOT: { PhieuKho: { some: {} } }
      },
      include: { sanpham: true }
    });

    const products = new Map();

    // Init from Chotkho
    for (const d of lastChotkho.details) {
      if (!d.sanpham) continue;
      products.set(d.sanphamId, {
        masp: d.sanpham.masp,
        title: d.sanpham.title,
        initial: Number(d.sltonthucte || 0),
        movements: 0,
        ordersNoPhieu: 0,
        current: 0
      });
    }

    // Process PhieuKho
    for (const pk of phieuKhos) {
      for (const pks of pk.sanpham) {
        if (!products.has(pks.sanphamId)) {
          // If product not in chotkho, we need to fetch info
          const sp = await prisma.sanpham.findUnique({ where: { id: pks.sanphamId } });
          products.set(pks.sanphamId, { masp: sp?.masp, title: sp?.title, initial: 0, movements: 0, ordersNoPhieu: 0, current: 0 });
        }
        const p = products.get(pks.sanphamId);
        if (pk.type === 'nhap') p.movements += Number(pks.soluong);
        else if (pk.type === 'xuat') p.movements -= Number(pks.soluong);
      }
    }

    // Process Orders without PhieuKho
    for (const dh of ordersWithoutPhieu) {
      for (const dhs of dh.sanpham) {
        if (!products.has(dhs.idSP)) {
          const sp = await prisma.sanpham.findUnique({ where: { id: dhs.idSP } });
          products.set(dhs.idSP, { masp: sp?.masp, title: sp?.title, initial: 0, movements: 0, ordersNoPhieu: 0, current: 0 });
        }
        const p = products.get(dhs.idSP);
        p.ordersNoPhieu -= Number(dhs.slnhan || dhs.slgiao || 0);
      }
    }

    // Current Stock
    const tonKhos = await prisma.tonKho.findMany();
    for (const tk of tonKhos) {
      if (products.has(tk.sanphamId)) {
        products.get(tk.sanphamId).current = Number(tk.sltontt);
      }
    }

    const report = Array.from(products.values()).map(p => {
      const expectedFromPhieu = p.initial + p.movements;
      const expectedTotal = p.initial + p.movements + p.ordersNoPhieu;
      return {
        ...p,
        expectedFromPhieu: Number(expectedFromPhieu.toFixed(3)),
        expectedTotal: Number(expectedTotal.toFixed(3)),
        diff: Number((p.current - expectedTotal).toFixed(3))
      };
    });

    // Sort by largest discrepancy
    report.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

    console.log("TOP DISCREPANCIES:");
    console.log(JSON.stringify(report.slice(0, 50), null, 2));

    console.log("\nSUMMARY:");
    console.log("Total products tracked:", report.length);
    console.log("Products with discrepancy > 0.01:", report.filter(p => Math.abs(p.diff) > 0.01).length);

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
