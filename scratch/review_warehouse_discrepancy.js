
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const latestChotkho = await prisma.chotkho.findFirst({
      orderBy: { ngaychot: 'desc' },
      include: { 
        details: {
          include: { sanpham: true }
        } 
      }
    });

    if (!latestChotkho) {
      console.log("No closing found.");
      return;
    }

    const startTime = latestChotkho.ngaychot;
    
    // Transactions
    const transactions = await prisma.phieuKho.findMany({
      where: { ngay: { gt: startTime }, isActive: true },
      include: { sanpham: { include: { sanpham: true } } }
    });

    // Pending Orders
    const pendingSales = await prisma.donhang.findMany({
      where: { ngaygiao: { gt: startTime }, status: 'dadat', isActive: true },
      include: { sanpham: { include: { sanpham: true } } }
    });

    const productStats = {};

    // From Closing
    latestChotkho.details.forEach(d => {
      if (!d.sanphamId) return;
      productStats[d.sanphamId] = {
        masp: d.sanpham?.masp,
        title: d.sanpham?.title,
        closingStock: parseFloat(d.sltonthucte) || 0,
        inbound: 0,
        outbound: 0,
        pendingIn: 0,
        pendingOut: 0
      };
    });

    // From Transactions
    transactions.forEach(t => {
      const isNhap = t.type?.toLowerCase().includes('nhap');
      const isXuat = t.type?.toLowerCase().includes('xuat');
      t.sanpham.forEach(item => {
        if (!productStats[item.sanphamId]) {
           productStats[item.sanphamId] = { masp: item.sanpham?.masp, title: item.sanpham?.title, closingStock: 0, inbound: 0, outbound: 0, pendingIn: 0, pendingOut: 0 };
        }
        const qty = parseFloat(item.soluong) || 0;
        if (isNhap) productStats[item.sanphamId].inbound += qty;
        if (isXuat) productStats[item.sanphamId].outbound += qty;
      });
    });

    // Current TonKho
    const currentTonKho = await prisma.tonKho.findMany();
    const currentTonKhoMap = {};
    currentTonKho.forEach(tk => currentTonKhoMap[tk.sanphamId] = parseFloat(tk.slton) || 0);

    const discrepancies = [];
    Object.keys(productStats).forEach(spId => {
      const stats = productStats[spId];
      const projected = stats.closingStock + stats.inbound - stats.outbound;
      const actual = currentTonKhoMap[spId] || 0;
      if (Math.abs(projected - actual) > 0.01) {
        discrepancies.push({
          masp: stats.masp,
          title: stats.title,
          projected: projected.toFixed(2),
          actual: actual.toFixed(2),
          diff: (actual - projected).toFixed(2)
        });
      }
    });

    const results = {
      closing: {
        title: latestChotkho.title,
        time: startTime,
        totalItems: latestChotkho.details.length
      },
      ops: {
        nhap: transactions.filter(t => t.type?.toLowerCase().includes('nhap')).length,
        xuat: transactions.filter(t => t.type?.toLowerCase().includes('xuat')).length,
        pendingSales: pendingSales.length
      },
      discrepancies: discrepancies.slice(0, 50), // Top 50 discrepancies
      topMovements: Object.values(productStats)
        .sort((a, b) => (b.inbound + b.outbound) - (a.inbound + a.outbound))
        .slice(0, 20)
    };

    console.log(JSON.stringify(results, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
