
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkChotkhoDetails(searchVal) {
  try {
    let chotkho = await prisma.chotkho.findFirst({
      where: { 
        OR: [
          { codeId: searchVal },
          { id: searchVal }
        ]
      },
      include: {
        details: {
          include: {
            sanpham: true
          }
        }
      }
    });

    if (!chotkho) {
      console.log(`Chotkho with codeId ${codeId} not found`);
      return;
    }

    console.log(`Chotkho: ${chotkho.codeId} | Ngay: ${chotkho.ngaychot}`);
    console.log(`Total details: ${chotkho.details.length}`);
    
    const negativeResults = chotkho.details.filter(d => Number(d.sltonthucte) < 0 || Number(d.sltonhethong) < 0);
    console.log(`Details with negative values in this session: ${negativeResults.length}`);
    
    negativeResults.slice(0, 10).forEach(d => {
      console.log(`${d.sanpham?.masp} | ${d.sanpham?.title} | Hethong: ${d.sltonhethong} | Thucte: ${d.sltonthucte}`);
    });

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

const codeId = process.argv[2] || 'CHOTKHO_17780625912';
checkChotkhoDetails(codeId);
