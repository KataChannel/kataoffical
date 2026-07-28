import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Inspecting PhieuKho PKNAA00008...');

  const pk = await prisma.phieuKho.findUnique({
    where: { maphieu: 'PKNAA00008' },
    include: {
      sanpham: {
        include: {
          sanpham: true
        }
      }
    }
  });

  if (!pk) {
    console.log('PhieuKho not found');
    return;
  }

  console.log(`Found ${pk.sanpham.length} products in PKNAA00008.`);
  for (const sp of pk.sanpham) {
    if (sp.sanpham.masp === 'I100479' || sp.sanpham.title.includes('Dưa hấu')) {
      console.log('MATCH FOUND:');
      console.log(JSON.stringify(sp, null, 2));
    }
  }
  
  // Also list the first 5 products to see what's in there
  console.log('Sample products:');
  console.log(JSON.stringify(pk.sanpham.slice(0, 5), null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
