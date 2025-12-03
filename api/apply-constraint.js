const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function applyConstraint() {
  try {
    console.log('\n🔧 THÊM UNIQUE CONSTRAINT...\n');
    
    await prisma.$executeRaw`
      ALTER TABLE "Banggiasanpham" 
      ADD CONSTRAINT "unique_banggia_sanpham" 
      UNIQUE ("banggiaId", "sanphamId");
    `;
    
    console.log('✅ Đã thêm unique constraint thành công!');
    console.log('   Từ giờ không thể tạo duplicate banggia-sanpham');
    
  } catch (error) {
    if (error.code === '23505' || error.message.includes('already exists')) {
      console.log('ℹ️ Unique constraint đã tồn tại');
    } else if (error.code === '23505' || error.message.includes('duplicate')) {
      console.log('❌ Vẫn còn duplicate trong database!');
      console.log('   Vui lòng chạy lại script fix-banggia-duplicate.js');
    } else {
      console.error('❌ Lỗi:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

applyConstraint();
