
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const banggiaId = 'cb030d9b-e607-4d38-9389-5728f7965823';
  console.log(`Checking Banggia: ${banggiaId}`);
  
  const banggia = await prisma.banggia.findUnique({
    where: { id: banggiaId },
    include: {
      sanpham: {
        include: {
          sanpham: true
        }
      }
    }
  });

  if (!banggia) {
    console.log('Banggia not found');
    return;
  }

  console.log(`Banggia Title: ${banggia.title}`);
  console.log(`Total Products: ${banggia.sanpham.length}`);

  const chanhItems = banggia.sanpham.filter(p => p.sanpham.masp === 'I100060');
  console.log(`Chanh không hạt items in Banggia: ${chanhItems.length}`);
  
  chanhItems.forEach(item => {
    console.log(`  - Price: ${item.giaban}, Order: ${item.order}, Active: ${item.isActive}`);
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
