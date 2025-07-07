import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './backups_json';
async function getTables(): Promise<string[]> {
  const tables: { tablename: string }[] = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  return tables.map((table) => table.tablename);
}


async function restoreTableFromJson(table: string): Promise<void> {
  try {
    const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort()[0];
    if (!latestBackupDir) {
      console.error(`❌ Không tìm thấy thư mục backup.`);
      return;
    }
    const filePath: string = path.join(BACKUP_ROOT_DIR, latestBackupDir, `${table}.json`);
    console.log(filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Không tìm thấy file backup cho bảng ${table}`);
      return;
    }
    const data: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));    
    // for (const row of data) {
    //   await prisma.$queryRawUnsafe(
    //     `INSERT INTO "${table}" (${Object.keys(row).map(key => `"${key}"`).join(', ')}) VALUES (${Object.values(row).map((_, i) => `$${i + 1}`).join(', ')})`,
    //     ...Object.values(row)
    //   );
    //   console.log(row);
    // }

    // for (const [table, data] of Object.entries(data)) {
      if (Array.isArray(data) && data.length > 0) {
        try {
          // Convert string numbers to actual numbers, especially for 'size' field
          const processedData = data.map(item => {
            const newItem = { ...item };
            if (newItem.size && typeof newItem.size === 'string') {
              newItem.size = newItem.size.trim() === '' ? null : parseInt(newItem.size, 10);
            }
            return newItem;
          });
          
          await prisma[table].createMany({
            data: processedData,
            skipDuplicates: true, // Bỏ qua nếu trùng
          });
          console.log(`✅ Đã nhập dữ liệu vào bảng ${table}`);
        } catch (error) {
          console.error(`⚠️ Lỗi khi nhập dữ liệu vào bảng ${table}:`, error.message);
        }
      // }
    }
  } catch (error) {
  
    console.error(`❌ Lỗi khôi phục bảng ${table}:`, error);
  }
}

async function restoreAllTablesFromJson(): Promise<void> {
  const tables: string[] = await getTables();
  for (const table of tables) {
    await restoreTableFromJson(table);
  }
}
restoreAllTablesFromJson()
  .then(() => console.log('🎉 Khôi phục dữ liệu JSON hoàn tất!'))
  .catch((err) => console.error('Lỗi:', err))
  .finally(() => prisma.$disconnect());
