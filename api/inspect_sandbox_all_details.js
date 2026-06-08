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
          },
          take: 10
        }
      }
    });

    console.log('Sample details:');
    chot.details.forEach(d => {
      console.log(`- ${d.sanpham.title} (${d.sanpham.masp}): hethong=${d.sltonhethong}, thucte=${d.sltonthucte}, ghichu="${d.ghichu}"`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
