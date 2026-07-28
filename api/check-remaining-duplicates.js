const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRemaining() {
  const allBanggia = await prisma.banggia.findMany({
    include: {
      sanpham: true
    }
  });
  
  let totalDuplicates = 0;
  
  for (const banggia of allBanggia) {
    const sanphamIds = banggia.sanpham.map(sp => sp.sanphamId);
    const uniqueIds = new Set(sanphamIds);
    const duplicateCount = sanphamIds.length - uniqueIds.size;
    
    if (duplicateCount > 0) {
      console.log(`${banggia.title}: ${duplicateCount} duplicate`);
      totalDuplicates += duplicateCount;
    }
  }
  
  if (totalDuplicates === 0) {
    console.log('✅ KHÔNG CÒN DUPLICATE!');
  } else {
    console.log(`\n⚠️ Còn ${totalDuplicates} bản ghi duplicate cần xóa`);
  }
  
  await prisma.$disconnect();
}

checkRemaining().catch(console.error);
