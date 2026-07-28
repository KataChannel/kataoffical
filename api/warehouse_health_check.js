
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('--- WAREHOUSE HEALTH CHECK ---');

    // 1. Check for negative stock
    const negativeStock = await prisma.tonKho.findMany({
      where: { slton: { lt: 0 } },
      include: { sanpham: true }
    });
    console.log(`- Negative Stock Items: ${negativeStock.length}`);
    negativeStock.forEach(item => {
      console.log(`  * WARNING: ${item.sanpham.masp} | ${item.sanpham.title}: ${item.slton}`);
    });

    // 2. Check last closing discrepancies
    const latestChotkho = await prisma.chotkho.findFirst({
      orderBy: { ngaychot: 'desc' }
    });
    if (latestChotkho) {
      const details = await prisma.chotkhodetail.findMany({
        where: { chotkhoId: latestChotkho.id }
      });
      const discrepancies = details.filter(d => Number(d.chenhlech) !== 0);
      const totalDiscrepancyValue = details.reduce((sum, d) => sum + Math.abs(Number(d.giaTriChenhLech || 0)), 0);
      
      console.log(`- Last Closing Discrepancies: ${discrepancies.length} / ${details.length} items.`);
      console.log(`- Total Discrepancy Value Magnitude: ${totalDiscrepancyValue.toLocaleString()}`);
    }

    // 3. Check for orphan vouchers or orders
    const vouchersWithoutReference = await prisma.phieuKho.findMany({
      where: {
        AND: [
          { madonhang: null },
          { madncc: null },
          { type: { in: ['nhap', 'xuat'] } }
        ]
      }
    });
    console.log(`- Vouchers without Orders/Purchases references: ${vouchersWithoutReference.length}`);

    // 4. Recent Error Logs related to Warehouse
    const recentErrors = await prisma.errorLog.findMany({
      where: { 
        createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        message: { contains: 'kho', mode: 'insensitive' }
      },
      take: 5
    });
    console.log(`- Recent Warehouse-related Errors (24h): ${recentErrors.length}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
