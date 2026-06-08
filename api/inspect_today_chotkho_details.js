const { PrismaClient } = require('@prisma/client');
const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

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
      console.log('❌ Today\'s chotkho not found in DB!');
      return;
    }

    console.log(`=== INSPECTING CHOTKHO: ${chot.title} (ngaychot: ${chot.ngaychot.toISOString()}) ===`);
    
    // 1. Check if sub-warehouses were reset to 0 in this transaction (SanphamKho count)
    // We already know we reset it later in the command line, but let's see what was recorded in the details
    
    // 2. Filter Thơm products in details
    const thomDetails = chot.details.filter(d => d.sanpham.title.toLowerCase().includes('thơm') && !d.sanpham.title.toLowerCase().includes('rau thơm'));
    console.log(`\n--- Thơm Products in Details (${thomDetails.length} items): ---`);
    thomDetails.forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): System=${d.sltonhethong}, Actual=${d.sltonthucte}, Chenhlech=${d.chenhlech}, Ghi chú: ${d.ghichu}`);
    });

    // 3. Filter products that were reset to 0 (actual = 0) vs kept system stock
    const autoCarryDetails = chot.details.filter(d => {
      const title = d.sanpham.title.toLowerCase();
      const isBap = title.includes('bắp') && !title.includes('cải') && !title.includes('chuối') && !title.includes('đậu') && !title.includes('thịt');
      return title.includes('dưa hấu') || isBap || title.includes('cải chua') || title.includes('hành tây');
    });
    
    console.log(`\n--- Auto-carried over Products in Details (Samples): ---`);
    autoCarryDetails.slice(0, 10).forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): System=${d.sltonhethong}, Actual=${d.sltonthucte}, Chenhlech=${d.chenhlech}, Ghi chú: ${d.ghichu}`);
    });

    // 4. Check if there are other products not in Excel that were kept at system stock
    // A product is not in Excel if ghichu includes "không có trong Excel" or similar, or check if sltonthucte == sltonhethong and they were not in the excel
    const keptSystemStock = chot.details.filter(d => {
      const title = d.sanpham.title.toLowerCase();
      const isBap = title.includes('bắp') && !title.includes('cải') && !title.includes('chuối') && !title.includes('đậu') && !title.includes('thịt');
      const isAutoCarry = title.includes('dưa hấu') || isBap || title.includes('cải chua') || title.includes('hành tây');
      return !isAutoCarry &&
        !(title.includes('thơm') && !title.includes('rau thơm')) &&
      Number(d.sltonhethong) === Number(d.sltonthucte) &&
      Number(d.sltonhethong) > 0 &&
      d.ghichu.includes('không có trong Excel')
    });

    console.log(`\n--- Products not in Excel but KEPT System Stock (${keptSystemStock.length} items): ---`);
    keptSystemStock.slice(0, 10).forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): System=${d.sltonhethong}, Actual=${d.sltonthucte}, Ghi chú: ${d.ghichu}`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
