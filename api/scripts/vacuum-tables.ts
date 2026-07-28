import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Use exact SQL table names as per @@map or default Prisma naming
  const tables = ['AuditLog', 'performance_logs', 'ImportHistory', 'BanggiasanphamHistory'];
  
  for (const table of tables) {
    console.log(`🌐 Đang thực thi VACUUE ANALYZE trên bảng "${table}"...`);
    try {
      await prisma.$executeRawUnsafe(`VACUUM ANALYZE "${table}"`);
      console.log(`✅ Hoàn tất tối ưu bảng "${table}"`);
    } catch (error: any) {
      console.error(`❌ Lỗi khi tối ưu bảng "${table}":`, error.message);
    }
  }
  
  await prisma.$disconnect();
}

main();
