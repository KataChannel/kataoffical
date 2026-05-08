
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const latestChotkho = await prisma.chotkho.findFirst({
      orderBy: { ngaychot: 'desc' },
      include: { kho: true }
    });

    if (!latestChotkho) {
      console.log('No inventory closing found.');
      return;
    }

    const startDate = latestChotkho.ngaychot;
    const now = new Date();

    const vouchers = await prisma.phieuKho.findMany({
      where: { createdAt: { gt: startDate } },
      include: {
        sanpham: {
          include: { sanpham: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Summary logic
    let totalImport = 0;
    let totalExport = 0;
    let totalTransfer = 0;
    let importQty = 0;
    let exportQty = 0;
    
    const productStats = {}; // { spId: { name, masp, import: 0, export: 0 } }

    vouchers.forEach(v => {
      if (v.type === 'nhap') totalImport++;
      else if (v.type === 'xuat') totalExport++;
      else totalTransfer++;

      v.sanpham.forEach(ps => {
        const qty = Number(ps.soluong || 0);
        const sp = ps.sanpham;
        if (!productStats[sp.id]) {
          productStats[sp.id] = { name: sp.title, masp: sp.masp, import: 0, export: 0 };
        }

        if (v.type === 'nhap') {
          importQty += qty;
          productStats[sp.id].import += qty;
        } else if (v.type === 'xuat') {
          exportQty += qty;
          productStats[sp.id].export += qty;
        }
      });
    });

    console.log('--- WAREHOUSE ACTIVITY REPORT ---');
    console.log(`Period: ${startDate.toLocaleString()} to ${now.toLocaleString()}`);
    console.log(`Last Closing: ${latestChotkho.title} (${latestChotkho.ghichu})`);
    console.log('---------------------------------');
    console.log(`Total Vouchers: ${vouchers.length}`);
    console.log(`- Import (Nhập): ${totalImport}`);
    console.log(`- Export (Xuất): ${totalExport}`);
    console.log(`- Transfer/Other: ${totalTransfer}`);
    console.log('---------------------------------');
    console.log(`Total Quantities:`);
    console.log(`- Total Imported: ${importQty.toFixed(2)}`);
    console.log(`- Total Exported: ${exportQty.toFixed(2)}`);
    console.log(`- Net Change: ${(importQty - exportQty).toFixed(2)}`);
    console.log('---------------------------------');
    
    // Top products by movement
    const sortedProducts = Object.values(productStats).sort((a, b) => (b.import + b.export) - (a.import + a.export));
    console.log('Top 10 Products by Activity:');
    sortedProducts.slice(0, 10).forEach(p => {
      console.log(`- ${p.masp} | ${p.name}: +${p.import.toFixed(2)} / -${p.export.toFixed(2)} (Net: ${(p.import - p.export).toFixed(2)})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
