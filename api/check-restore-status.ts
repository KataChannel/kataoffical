import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkStatus() {
  try {
    const tables = [
      'AuditLog', 'Banggiasanpham', 'Donhang', 'PhieuKho',
      'Donhangsanpham', 'Dathangsanpham', 'PhieuKhoSanpham', 'performance_logs'
    ];
    
    console.log('📊 Kiểm tra số records đã restore:\n');
    
    for (const table of tables) {
      try {
        const result = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM "${table}"`);
        const count = Number(result[0].count);
        console.log(`${table}: ${count.toLocaleString()} records`);
      } catch (error: any) {
        console.log(`${table}: ❌ ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStatus();
