import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkBanggiaProducts() {
  const banggiaId = '693b9b8c-8d5a-462d-9e2a-826fdc81c589';
  
  console.log('🔍 Checking products in Banggia:', banggiaId);
  console.log('');
  
  const banggia = await prisma.banggia.findUnique({
    where: { id: banggiaId },
    include: {
      sanpham: {
        include: {
          sanpham: true
        },
        take: 5  // First 5 products
      }
    }
  });
  
  if (!banggia) {
    console.log('❌ Banggia not found!');
    await prisma.$disconnect();
    return;
  }
  
  console.log('✅ Banggia:', banggia.mabanggia, '-', banggia.title);
  console.log('');
  console.log(`📦 Products (showing first 5 of ${banggia.sanpham.length}):`);
  console.log('');
  
  banggia.sanpham.forEach((item, i) => {
    console.log(`${i + 1}. Banggiasanpham ID: ${item.id}`);
    console.log(`   Sanpham ID: ${item.sanphamId}`);
    console.log(`   Sanpham: ${item.sanpham.masp} - ${item.sanpham.title}`);
    console.log(`   Price: ${item.giaban}`);
    console.log('');
  });
  
  console.log('');
  console.log('🔍 What the API returns (transformed):');
  console.log('');
  
  const result = banggia.sanpham.slice(0, 3).map(item => ({
    ...item.sanpham,
    giaban: Number(item.giaban),
    banggiasanphamId: item.id,
    sanphamId: item.sanphamId,
  }));
  
  console.log(JSON.stringify(result, null, 2));
  
  await prisma.$disconnect();
}

checkBanggiaProducts().catch(console.error);
