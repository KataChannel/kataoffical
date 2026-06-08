const { PrismaClient } = require('@prisma/client');
const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public';

async function main() {
  const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });
  
  try {
    const chotId = '03dba5dc-ddac-4ae6-a0cc-8a5e5fc63461';
    const chot = await prisma.chotkho.findUnique({
      where: { id: chotId },
      include: {
        details: {
          include: {
            sanpham: true
          }
        }
      }
    });

    if (!chot) {
      console.log('❌ Today\'s chotkho not found in sandbox DB!');
      return;
    }

    console.log(`=== INSPECTING SANDBOX CHOTKHO: ${chot.title} (ngaychot: ${chot.ngaychot.toISOString()}) ===`);
    
    // 1. Check virtual warehouses stock in sandbox
    const warehouseSum = await prisma.$queryRaw`
      SELECT k.name, k.makho, SUM(sk.soluong)::float as total_qty, COUNT(sk.id)::int as product_count
      FROM "SanphamKho" sk
      JOIN "Kho" k ON sk."khoId" = k.id
      GROUP BY k.name, k.makho
      ORDER BY total_qty DESC
    `;
    console.log('Total stock per warehouse in sandbox:', JSON.stringify(warehouseSum, null, 2));

    // 2. Filter Thơm products in sandbox details
    const thomDetails = chot.details.filter(d => d.sanpham.title.toLowerCase().includes('thơm') && !d.sanpham.title.toLowerCase().includes('rau thơm'));
    console.log(`\n--- Thơm Products in Sandbox Details (${thomDetails.length} items): ---`);
    thomDetails.forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): System=${d.sltonhethong}, Actual=${d.sltonthucte}, Chenhlech=${d.chenhlech}, Ghi chú: ${d.ghichu}`);
    });

    // 3. Filter products that were reset to 0 in sandbox details
    const autoCarryDetails = chot.details.filter(d => {
      const title = d.sanpham.title.toLowerCase();
      const isBap = title.includes('bắp') && !title.includes('cải') && !title.includes('chuối') && !title.includes('đậu') && !title.includes('thịt');
      return title.includes('dưa hấu') || isBap || title.includes('cải chua') || title.includes('hành tây');
    });
    
    console.log(`\n--- Auto-carried over Products in Sandbox Details (Samples): ---`);
    autoCarryDetails.slice(0, 5).forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): System=${d.sltonhethong}, Actual=${d.sltonthucte}, Chenhlech=${d.chenhlech}, Ghi chú: ${d.ghichu}`);
    });

    // 4. Check if other products not in Excel are reset to 0
    const resetProducts = chot.details.filter(d => {
      const title = d.sanpham.title.toLowerCase();
      const isBap = title.includes('bắp') && !title.includes('cải') && !title.includes('chuối') && !title.includes('đậu') && !title.includes('thịt');
      const isAutoCarry = title.includes('dưa hấu') || isBap || title.includes('cải chua') || title.includes('hành tây');
      return !isAutoCarry &&
        !(title.includes('thơm') && !title.includes('rau thơm')) &&
      d.ghichu.includes('Reset về 0')
    });

    console.log(`\n--- Products not in Excel and RESET TO 0 (${resetProducts.length} items): ---`);
    resetProducts.slice(0, 10).forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): System=${d.sltonhethong}, Actual=${d.sltonthucte}, Ghi chú: ${d.ghichu}`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
