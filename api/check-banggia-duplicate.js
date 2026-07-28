const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkBanggiaDuplicate() {
  // Lấy bảng giá _DEAL
  const banggiaDeal = await prisma.banggia.findFirst({
    where: { title: 'Bảng giá _DEAL' },
    include: {
      sanpham: {
        include: {
          sanpham: { select: { title: true, masp: true } }
        },
        orderBy: { sanphamId: 'asc' }
      }
    }
  });
  
  if (!banggiaDeal) {
    console.log('❌ Không tìm thấy bảng giá _DEAL');
    await prisma.$disconnect();
    return;
  }
  
  console.log('\n💰 BẢNG GIÁ:', banggiaDeal.title);
  console.log('📦 Tổng số sản phẩm:', banggiaDeal.sanpham.length);
  
  // Tìm duplicate dựa trên sanphamId
  const sanphamIds = banggiaDeal.sanpham.map(sp => sp.sanphamId);
  const duplicates = sanphamIds.filter((id, index) => sanphamIds.indexOf(id) !== index);
  const uniqueDuplicates = [...new Set(duplicates)];
  
  if (uniqueDuplicates.length > 0) {
    console.log('\n⚠️ CÓ', uniqueDuplicates.length, 'SẢN PHẨM BỊ DUPLICATE:');
    
    // Chỉ hiển thị 10 sản phẩm đầu tiên để không quá dài
    const displayLimit = 10;
    for (let i = 0; i < Math.min(displayLimit, uniqueDuplicates.length); i++) {
      const sanphamId = uniqueDuplicates[i];
      const items = banggiaDeal.sanpham.filter(sp => sp.sanphamId === sanphamId);
      const sanpham = items[0].sanpham;
      
      console.log(`\n${i + 1}. 📌 ${sanpham?.title || 'N/A'}`);
      console.log('   Mã SP:', sanpham?.masp);
      console.log('   Số lần xuất hiện:', items.length);
      console.log('   Chi tiết:');
      items.forEach((item, idx) => {
        const createdDate = item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : 'N/A';
        console.log(`      ${idx + 1}. ID: ${item.id.substring(0, 8)}..., Giá: ${item.giaban}, Created: ${createdDate}`);
      });
    }
    
    if (uniqueDuplicates.length > displayLimit) {
      console.log(`\n   ... và ${uniqueDuplicates.length - displayLimit} sản phẩm duplicate khác`);
    }
    
    // Thống kê
    const totalDuplicateRecords = banggiaDeal.sanpham.length - new Set(sanphamIds).size;
    console.log('\n📊 THỐNG KÊ:');
    console.log('   Tổng bản ghi:', banggiaDeal.sanpham.length);
    console.log('   Sản phẩm unique:', new Set(sanphamIds).size);
    console.log('   Bản ghi bị duplicate:', totalDuplicateRecords);
    console.log('   Số sản phẩm bị duplicate:', uniqueDuplicates.length);
    
    // Tìm sản phẩm có nhiều bản ghi nhất
    const countMap = {};
    sanphamIds.forEach(id => {
      countMap[id] = (countMap[id] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(countMap));
    const maxDuplicates = Object.entries(countMap).filter(([id, count]) => count === maxCount);
    
    console.log('\n🔥 SẢN PHẨM CÓ NHIỀU BẢN GHI NHẤT:');
    maxDuplicates.slice(0, 5).forEach(([id, count]) => {
      const item = banggiaDeal.sanpham.find(sp => sp.sanphamId === id);
      console.log(`   - ${item?.sanpham?.title}: ${count} bản ghi`);
    });
    
  } else {
    console.log('\n✅ KHÔNG có sản phẩm nào bị duplicate');
  }
  
  await prisma.$disconnect();
}

checkBanggiaDuplicate().catch(console.error);
