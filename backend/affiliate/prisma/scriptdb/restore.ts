import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './backups_json';

async function getTables(): Promise<string[]> {
  try {
    const tables: { tablename: string }[] =
      await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    return tables.map((table) => table.tablename);
  } catch (error: any) {
    console.error('❌ Lỗi khi lấy danh sách bảng:', error.message, error.stack);
    throw error;
  }
}

async function restoreTableFromJson(table: string): Promise<void> {
  try {
    const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
    console.log(`Đang khôi phục dữ liệu cho bảng: ${table} từ thư mục backup: ${latestBackupDir}`);
    
    if (!latestBackupDir) {
      console.error(`❌ Không tìm thấy thư mục backup.`);
      return;
    }
    const filePath: string = path.join(
      BACKUP_ROOT_DIR,
      latestBackupDir,
      `${table}.json`,
    );
    if (!fs.existsSync(filePath)) {
      // File backup cho bảng này không tồn tại
      return;
    }
    const data: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (Array.isArray(data) && data.length > 0) {
      const processedData = data.map((item) => {
        const newItem = { ...item };
        if (newItem.size && typeof newItem.size === 'string') {
          newItem.size =
            newItem.size.trim() === '' ? null : parseInt(newItem.size, 10);
        }
        return newItem;
      });

      const model = (prisma as any)[table];
      if (!model || typeof model.createMany !== 'function') {
        console.log(
          `Bảng join ${table} không có model. Sử dụng raw SQL để restore dữ liệu.`,
        );

        const columns = Object.keys(processedData[0])
          .map((col) => `"${col}"`)
          .join(', ');

        const values = processedData
          .map((item) => {
            return (
              '(' +
              Object.values(item)
                .map((val) => {
                  if (typeof val === 'string') {
                    return `'${val.replace(/'/g, "''")}'`;
                  } else if (val === null || val === undefined) {
                    return 'NULL';
                  }
                  return val;
                })
                .join(', ') +
              ')'
            );
          })
          .join(', ');

        await prisma.$executeRawUnsafe(
          `INSERT INTO "${table}" (${columns}) VALUES ${values} ON CONFLICT DO NOTHING`,
        );
        return;
      } else {
        await model.createMany({
          data: processedData,
          skipDuplicates: true,
        });
      }

      console.log(`✅ Đã nhập dữ liệu vào bảng ${table}`);
    }
  } catch (error: any) {
    console.error(`❌ Lỗi khôi phục bảng ${table}:`, error.message, error.stack);
  }
}

async function restoreAllTablesFromJson(): Promise<void> {
  try {
    const tables: string[] = await getTables();
    console.log(`Tìm thấy ${tables.length} bảng trong cơ sở dữ liệu.`);

    for (const table of tables) {
      await restoreTableFromJson(table);
    }
  } catch (error: any) {
    console.error('❌ Lỗi trong quá trình khôi phục dữ liệu:', error.message, error.stack);
  }
}

restoreAllTablesFromJson()
  .then(() => console.log('🎉 Khôi phục dữ liệu JSON hoàn tất!'))
  .catch((err) =>
    console.error('❌ Lỗi chung trong quá trình khôi phục:', err.message, err.stack),
  )
  .finally(() => prisma.$disconnect());
