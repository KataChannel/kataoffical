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

    console.log('Details length:', chot.details.length);
    const nonExcelNonCarry = chot.details.filter(d => {
      const title = d.sanpham.title.toLowerCase();
      const isBap = title.includes('bắp') && !title.includes('cải') && !title.includes('chuối') && !title.includes('đậu') && !title.includes('thịt');
      const isAutoCarry = title.includes('dưa hấu') || isBap || title.includes('cải chua') || title.includes('hành tây');
      const isThom = title.includes('thơm') && !title.includes('rau thơm');
      return !isAutoCarry && !isThom && !d.ghichu.includes('Excel');
    });

    console.log(`Found ${nonExcelNonCarry.length} non-excel non-carry items. Samples:`);
    nonExcelNonCarry.slice(0, 10).forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): System=${d.sltonhethong}, Actual=${d.sltonthucte}, ghichu=${d.ghichu}`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
