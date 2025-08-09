import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';

async function cleanupBeforeRestore(): Promise<void> {
  console.log('🧹 Dọn dẹp dữ liệu cũ trước khi restore...');
  
  try {
    // Delete in reverse dependency order to avoid FK constraint issues
    const cleanupOrder = [
      'dathangsanpham',
      'donhangsanpham', 
      'phieugiaohangsanpham',
      'phieunhapkhosanpham',
      'dathang',
      'donhang',
      'phieugiaohang',
      'phieunhapkho',
      'tonkho'
      // Keep core data like khachhang, nhacungcap, sanpham, users, kho
    ];
    
    for (const table of cleanupOrder) {
      try {
        const model = (prisma as any)[table];
        if (model && typeof model.deleteMany === 'function') {
          const result = await model.deleteMany({});
          console.log(`🗑️  Đã xóa ${result.count || 0} records từ bảng ${table}`);
        }
      } catch (error) {
        console.log(`⚠️  Không thể xóa bảng ${table}: ${error}`);
      }
    }
    
    console.log('✅ Hoàn thành dọn dẹp dữ liệu cũ');
  } catch (error) {
    console.error('❌ Lỗi khi dọn dẹp:', error);
  }
}

async function getTables(): Promise<string[]> {
  const tables: { tablename: string }[] =
    await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  return tables.map((table) => table.tablename);
}

async function restoreTableFromJson(table: string): Promise<void> {
  try {
    const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
    console.log(`Đang khôi phục bảng: ${table} từ ${latestBackupDir}`);
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
      console.log(`⚠️  Không tìm thấy file backup cho bảng ${table}, bỏ qua.`);
      return;
    }
    const data: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (Array.isArray(data) && data.length > 0) {
      // Convert string numbers to actual numbers, especially for 'size' field
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
                    // escape single quotes by doubling them
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
        // Try to restore with better error handling
        try {
          await model.createMany({
            data: processedData,
            skipDuplicates: true, // Bỏ qua nếu trùng
          });
        } catch (fkError: any) {
          if (fkError.message && fkError.message.includes('Foreign key constraint')) {
            console.log(`⚠️  Foreign key constraint lỗi cho bảng ${table}, thử từng record riêng lẻ...`);
            
            // Try inserting records one by one to identify problematic records
            let successCount = 0;
            let errorCount = 0;
            
            for (const record of processedData) {
              try {
                await model.create({
                  data: record
                });
                successCount++;
              } catch (recordError: any) {
                errorCount++;
                console.log(`⚠️  Lỗi insert record: ${JSON.stringify(record).substring(0, 100)}...`);
              }
            }
            
            console.log(`✅ Bảng ${table}: ${successCount} thành công, ${errorCount} lỗi`);
            return;
          } else {
            throw fkError; // Re-throw if not FK error
          }
        }
      }

      console.log(`✅ Đã nhập ${processedData.length} records vào bảng ${table}`);
    } else {
      console.log(`⚠️  Bảng ${table} không có dữ liệu để restore`);
    }
  } catch (error) {
    console.error(`❌ Lỗi khôi phục bảng ${table}:`, error);
  }
}

async function restoreAllTablesFromJson(): Promise<void> {
  const tables: string[] = await getTables();
  console.log(`Tìm thấy ${tables.length} bảng trong cơ sở dữ liệu.`);
  
  // Define table restore order based on foreign key dependencies
  const tableOrder = [
    // Core tables without dependencies first
    'khachhang',
    'nhacungcap',
    'sanpham',
    'users',
    'kho',
    'tonkho',
    
    // Tables with dependencies
    'dathang',
    'donhang',
    'phieugiaohang',
    'phieunhapkho',
    
    // Junction/relationship tables last
    'dathangsanpham',
    'donhangsanpham',
    'phieugiaohangsanpham',
    'phieunhapkhosanpham',
    
    // Any remaining tables
    ...tables.filter(t => ![
      'khachhang', 'nhacungcap', 'sanpham', 'users', 'kho', 'tonkho',
      'dathang', 'donhang', 'phieugiaohang', 'phieunhapkho',
      'dathangsanpham', 'donhangsanpham', 'phieugiaohangsanpham', 'phieunhapkhosanpham'
    ].includes(t))
  ];
  
  // Filter to only include tables that actually exist
  const orderedTables = tableOrder.filter(table => tables.includes(table));
  
  for (const table of orderedTables) {
    await restoreTableFromJson(table);
  }
}

async function main(): Promise<void> {
  console.log('🚀 Bắt đầu quá trình restore dữ liệu...');
  
  // Step 1: Clean up existing data
  await cleanupBeforeRestore();
  
  // Step 2: Restore data in proper order
  await restoreAllTablesFromJson();
  
  console.log('🎉 Hoàn thành restore dữ liệu!');
}

main()
  .then(() => console.log('✅ Restore process completed successfully!'))
  .catch((err) => {
    console.error('❌ Restore process failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
