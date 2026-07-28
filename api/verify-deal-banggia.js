const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyDeal() {
  const banggiaDeal = await prisma.banggia.findFirst({
    where: { title: 'Bảng giá _DEAL' },
    include: {
      sanpham: {
        include: {
          sanpham: { select: { title: true, masp: true } }
        }
      }
    }
  });
  
  if (!banggiaDeal) {
    console.log('❌ Không tìm thấy Bảng giá _DEAL');
    await prisma.$disconnect();
    return;
  }
  
  console.log('\n💰 BẢNG GIÁ _DEAL');
  console.log('📦 Tổng sản phẩm:', banggiaDeal.sanpham.length);
  
  // Check duplicate
  const sanphamIds = banggiaDeal.sanpham.map(sp => sp.sanphamId);
  const uniqueIds = new Set(sanphamIds);
  const duplicateCount = sanphamIds.length - uniqueIds.size;
  
  if (duplicateCount === 0) {
    console.log('✅ KHÔNG CÓ DUPLICATE');
  } else {
    console.log(`❌ Còn ${duplicateCount} duplicate`);
  }
  
  // Hiển thị 5 sản phẩm đầu
  console.log('\n📋 5 SẢN PHẨM ĐẦU TIÊN:');
  banggiaDeal.sanpham.slice(0, 5).forEach((sp, idx) => {
    console.log(`${idx + 1}. ${sp.sanpham?.title}: ${sp.giaban}`);
  });
  
  await prisma.$disconnect();
}

verifyDeal().catch(console.error);
