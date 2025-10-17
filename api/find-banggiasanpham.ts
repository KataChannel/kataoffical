import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findBanggiasanpham() {
  const banggiaId = '693b9b8c-8d5a-462d-9e2a-826fdc81c589';
  const sanphamId = '6b567353-7d8b-4dda-be20-0819c6b35b41';
  
  console.log('🔍 Searching for Banggiasanpham:');
  console.log('- Banggia ID:', banggiaId);
  console.log('- Sanpham ID:', sanphamId);
  console.log('');
  
  // Check banggia
  const banggia = await prisma.banggia.findUnique({
    where: { id: banggiaId },
    select: { id: true, mabanggia: true, title: true }
  });
  
  console.log('Banggia:', banggia ? `${banggia.mabanggia} - ${banggia.title}` : 'NOT FOUND');
  
  // Check sanpham
  const sanpham = await prisma.sanpham.findUnique({
    where: { id: sanphamId },
    select: { id: true, masp: true, title: true }
  });
  
  console.log('Sanpham:', sanpham ? `${sanpham.masp} - ${sanpham.title}` : 'NOT FOUND');
  console.log('');
  
  if (!banggia || !sanpham) {
    console.log('❌ Banggia or Sanpham not found!');
    await prisma.$disconnect();
    return;
  }
  
  // Check banggiasanpham
  const bgsp = await prisma.banggiasanpham.findFirst({
    where: { 
      banggiaId,
      sanphamId
    },
    include: {
      banggia: { select: { mabanggia: true, title: true } },
      sanpham: { select: { masp: true, title: true } }
    }
  });
  
  if (bgsp) {
    console.log('✅ Banggiasanpham FOUND:');
    console.log('- ID:', bgsp.id);
    console.log('- Banggia:', bgsp.banggia.mabanggia, '-', bgsp.banggia.title);
    console.log('- Sanpham:', bgsp.sanpham.masp, '-', bgsp.sanpham.title);
    console.log('- Current Price:', bgsp.giaban);
  } else {
    console.log('❌ Banggiasanpham NOT FOUND for this combination');
    console.log('');
    console.log('📋 Checking if this sanpham exists in any Banggiasanpham...');
    
    const anyBgsp = await prisma.banggiasanpham.findMany({
      where: { 
        OR: [
          { banggiaId },
          { sanphamId }
        ]
      },
      include: {
        banggia: { select: { mabanggia: true, title: true } },
        sanpham: { select: { masp: true, title: true } }
      },
      take: 5
    });
    
    console.log(`Found ${anyBgsp.length} related records:`);
    anyBgsp.forEach((item, i) => {
      console.log(`${i + 1}. ${item.banggia.mabanggia} + ${item.sanpham.masp} (Price: ${item.giaban})`);
    });
  }
  
  await prisma.$disconnect();
}

findBanggiasanpham().catch(console.error);
