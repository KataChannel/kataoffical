import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌐 Đang thực thi VACUUM ANALYZE trên Database...');
  
  try {
    // VACUUM cannot be executed inside a transaction.
    // Prisma's $executeRawUnsafe might work if it doesn't wrap in a transaction by default.
    await prisma.$executeRawUnsafe('VACUUM ANALYZE');
    console.log('✅ Đã tối ưu hóa lưu trữ thành công!');
  } catch (error: any) {
    if (error.message.includes('VACUUM cannot run inside a transaction block')) {
      console.error('❌ Lỗi: VACUUM không thể chạy trong transaction block qua Prisma.');
      console.log('👉 Vui lòng chạy lệnh sau trực tiếp qua psql hoặc GUI (DBeaver/pgAdmin):');
      console.log('   VACUUM (VERBOSE, ANALYZE);');
    } else {
      console.error('❌ Lỗi khi chạy VACUUM:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
