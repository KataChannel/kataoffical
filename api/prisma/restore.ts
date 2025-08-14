import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';

interface RestoreStats {
  tablesProcessed: number;
  recordsRestored: number;
  errors: string[];
  warnings: string[];
  backupFolder?: string; // Add this field
}

const stats: RestoreStats = {
  tablesProcessed: 0,
  recordsRestored: 0,
  errors: [],
  warnings: []
};

// Add this function to get latest backup folder
function getLatestBackupFolder(): string | null {
  try {
    const folders = fs.readdirSync(BACKUP_ROOT_DIR)
      .filter(folder => fs.statSync(path.join(BACKUP_ROOT_DIR, folder)).isDirectory())
      .sort()
      .reverse();
    return folders[0] || null;
  } catch (error) {
    console.error(`⚠️ Không thể đọc thư mục backup: ${error}`);
    return null;
  }
}

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
    
    let totalDeleted = 0;
    for (const table of cleanupOrder) {
      try {
        const model = (prisma as any)[table];
        if (model && typeof model.deleteMany === 'function') {
          const result = await model.deleteMany({});
          const deletedCount = result.count || 0;
          totalDeleted += deletedCount;
          console.log(`🗑️  Đã xóa ${deletedCount} records từ bảng ${table}`);
        }
      } catch (error) {
        const errorMsg = `Không thể xóa bảng ${table}: ${error}`;
        console.log(`⚠️  ${errorMsg} - Bỏ qua và tiếp tục`);
        stats.warnings.push(errorMsg);
      }
    }
    
    console.log(`✅ Hoàn thành dọn dẹp ${totalDeleted} records`);
  } catch (error) {
    const errorMsg = `Lỗi khi dọn dẹp: ${error}`;
    console.error(`⚠️ ${errorMsg} - Bỏ qua và tiếp tục`);
    stats.warnings.push(errorMsg);
  }
}

async function getTables(): Promise<string[]> {
  try {
    const tables: { tablename: string }[] =
      await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    return tables.map((table) => table.tablename);
  } catch (error) {
    console.error(`⚠️ Không thể lấy danh sách bảng: ${error}`);
    return [];
  }
}

async function validateBackupData(data: any[], table: string): Promise<any[]> {
  if (!Array.isArray(data)) {
    stats.warnings.push(`Dữ liệu backup cho bảng ${table} không phải là array`);
    return [];
  }
  
  if (data.length === 0) {
    return data;
  }
  
  // Basic data validation and cleaning
  const cleanedData = data.map((item, index) => {
    try {
      if (!item || typeof item !== 'object') {
        stats.warnings.push(`Record ${index} trong bảng ${table} không hợp lệ`);
        return null;
      }
      
      const newItem = { ...item };
      
      // Convert string numbers to actual numbers for common fields
      ['size', 'slton', 'slchogiao', 'slchonhap', 'soluong', 'giaban', 'giagoc'].forEach(field => {
        if (newItem[field] && typeof newItem[field] === 'string') {
          const trimmed = newItem[field].trim();
          if (trimmed === '') {
            newItem[field] = null;
          } else {
            const parsed = parseFloat(trimmed);
            newItem[field] = isNaN(parsed) ? null : parsed;
          }
        }
      });
      
      // Clean string fields
      Object.keys(newItem).forEach(key => {
        if (typeof newItem[key] === 'string') {
          newItem[key] = newItem[key].trim();
        }
      });
      
      return newItem;
    } catch (error) {
      stats.warnings.push(`Lỗi validate record ${index} trong bảng ${table}: ${error}`);
      return null;
    }
  }).filter(item => item !== null);
  
  console.log(`🔍 Đã validate ${data.length} records cho bảng ${table}, ${cleanedData.length} records hợp lệ`);
  
  return cleanedData;
}

async function restoreTableFromJson(table: string, backupFolder: string): Promise<void> {
  try {
    const filePath: string = path.join(
      BACKUP_ROOT_DIR,
      backupFolder,
      `${table}.json`,
    );
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Không tìm thấy file backup cho bảng ${table}, bỏ qua.`);
      stats.warnings.push(`File backup không tồn tại cho bảng ${table}`);
      return;
    }
    
    console.log(`📥 Đọc dữ liệu cho bảng: ${table}`);
    let rawData: any[];
    
    try {
      rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.log(`⚠️ Không thể đọc file ${table}.json: ${error} - Bỏ qua`);
      stats.warnings.push(`Không thể đọc file backup cho bảng ${table}`);
      return;
    }
    
    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.log(`⚠️  Bảng ${table} không có dữ liệu để restore`);
      return;
    }
    
    // Validate and clean data
    const processedData = await validateBackupData(rawData, table);
    
    if (processedData.length === 0) {
      console.log(`⚠️  Bảng ${table} không có dữ liệu hợp lệ sau validation`);
      return;
    }

    const model = (prisma as any)[table];
    if (!model || typeof model.createMany !== 'function') {
      console.log(`🔧 Bảng ${table} không có Prisma model, sử dụng raw SQL...`);
      await restoreWithRawSQL(table, processedData);
      return;
    }

    // Try batch insert first
    try {
      console.log(`⏳ Đang restore ${processedData.length} records cho bảng ${table}...`);
      
      await model.createMany({
        data: processedData,
        skipDuplicates: true,
      });
      
      stats.recordsRestored += processedData.length;
      console.log(`✅ Đã nhập ${processedData.length} records vào bảng ${table}`);
      
    } catch (batchError: any) {
      console.log(`⚠️  Batch insert failed cho bảng ${table}: ${batchError.message}, thử từng record...`);
      await restoreRecordsIndividually(model, table, processedData);
    }
    
    stats.tablesProcessed++;
    
  } catch (error) {
    const errorMsg = `Lỗi khôi phục bảng ${table}: ${error}`;
    console.error(`⚠️ ${errorMsg} - Bỏ qua và tiếp tục`);
    stats.warnings.push(errorMsg);
  }
}

async function restoreWithRawSQL(table: string, data: any[]): Promise<void> {
  try {
    const columns = Object.keys(data[0])
      .map((col) => `"${col}"`)
      .join(', ');

    // Process in smaller batches
    const batchSize = 100;
    let totalInserted = 0;
    
    for (let i = 0; i < data.length; i += batchSize) {
      try {
        const batch = data.slice(i, i + batchSize);
        const values = batch
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
        
        totalInserted += batch.length;
      } catch (batchError) {
        console.log(`⚠️ Raw SQL batch ${i/batchSize + 1} failed: ${batchError} - Bỏ qua`);
        stats.warnings.push(`Raw SQL batch failed cho bảng ${table}: ${batchError}`);
      }
    }
    
    stats.recordsRestored += totalInserted;
    console.log(`✅ Đã nhập ${totalInserted} records vào bảng ${table} (raw SQL)`);
    
  } catch (error) {
    console.log(`⚠️ Raw SQL insert failed cho bảng ${table}: ${error} - Bỏ qua`);
    stats.warnings.push(`Raw SQL insert failed cho bảng ${table}`);
  }
}

async function restoreRecordsIndividually(model: any, table: string, data: any[]): Promise<void> {
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < data.length; i++) {
    try {
      await model.create({
        data: data[i]
      });
      successCount++;
      
      // Progress indicator for large datasets
      if (i % 100 === 0 && i > 0) {
        console.log(`   Progress: ${i}/${data.length} records processed...`);
      }
      
    } catch (recordError: any) {
      errorCount++;
      if (errorCount <= 5) { // Only log first 5 errors to avoid spam
        console.log(`   ⚠️  Error inserting record ${i}: ${recordError.message}`);
      }
    }
  }
  
  stats.recordsRestored += successCount;
  console.log(`✅ Bảng ${table}: ${successCount} thành công, ${errorCount} lỗi (đã bỏ qua)`);
  
  if (errorCount > 0) {
    stats.warnings.push(`Bảng ${table}: ${errorCount} records không thể restore`);
  }
}

async function restoreAllTablesFromJson(): Promise<void> {
  const backupFolder = getLatestBackupFolder();
  if (!backupFolder) {
    console.error('❌ Không tìm thấy thư mục backup nào!');
    stats.errors.push('Không tìm thấy thư mục backup');
    return;
  }
  
  stats.backupFolder = backupFolder;
  console.log(`📂 Đang restore từ thư mục: ${backupFolder}`);
  console.log(`📁 Đường dẫn đầy đủ: ${path.join(BACKUP_ROOT_DIR, backupFolder)}`);
  
  const tables: string[] = await getTables();
  
  if (tables.length === 0) {
    console.log('⚠️ Không thể lấy danh sách bảng - Tiếp tục với danh sách mặc định');
  } else {
    console.log(`📊 Tìm thấy ${tables.length} bảng trong cơ sở dữ liệu.`);
  }
  
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
  
  // Filter to only include tables that actually exist (or use default if tables is empty)
  const orderedTables = tables.length > 0 
    ? tableOrder.filter(table => tables.includes(table))
    : tableOrder.slice(0, 14); // Use first 14 tables if can't get table list
  
  console.log(`🔄 Sẽ restore ${orderedTables.length} bảng theo thứ tự dependency`);
  
  for (let i = 0; i < orderedTables.length; i++) {
    const table = orderedTables[i];
    console.log(`\n[${i + 1}/${orderedTables.length}] Restore bảng: ${table}`);
    await restoreTableFromJson(table, backupFolder);
  }
}

function printFinalStats(): void {
  console.log('\n' + '='.repeat(60));
  console.log('📊 KẾT QUẢ RESTORE DATA');
  console.log('='.repeat(60));
  console.log(`📂 Thư mục backup: ${stats.backupFolder || 'N/A'}`);
  console.log(`✅ Số bảng đã xử lý: ${stats.tablesProcessed}`);
  console.log(`📝 Tổng records restored: ${stats.recordsRestored.toLocaleString()}`);
  console.log(`⚠️  Số warnings: ${stats.warnings.length}`);
  console.log(`❌ Số errors: ${stats.errors.length}`);
  
  if (stats.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    stats.warnings.slice(0, 10).forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning}`);
    });
    if (stats.warnings.length > 10) {
      console.log(`   ... và ${stats.warnings.length - 10} warnings khác`);
    }
  }
  
  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    stats.errors.slice(0, 5).forEach((error, i) => {
      console.log(`   ${i + 1}. ${error}`);
    });
    if (stats.errors.length > 5) {
      console.log(`   ... và ${stats.errors.length - 5} errors khác`);
    }
  }
  
  console.log('='.repeat(60));
}

async function main(): Promise<void> {
  const startTime = Date.now();
  console.log('🚀 BẮT ĐẦU QUÁ TRÌNH RESTORE DỮ LIỆU');
  console.log(`⏰ Thời gian bắt đầu: ${new Date().toLocaleString()}`);
  console.log('📌 Chế độ: Bỏ qua lỗi và tiếp tục xử lý');
  
  try {
    // Step 1: Clean up existing data
    await cleanupBeforeRestore();
    
    // Step 2: Restore data in proper order
    await restoreAllTablesFromJson();
    
  } catch (error) {
    console.error(`⚠️ Unexpected error in restore process: ${error} - Tiếp tục`);
    stats.warnings.push(`Main process error: ${error}`);
  }
  
  const duration = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n🎉 HOÀN THÀNH RESTORE! (${duration}s)`);
  printFinalStats();
}

main()
  .then(() => {
    if (stats.warnings.length === 0 && stats.errors.length === 0) {
      console.log('\n✅ Restore process completed successfully!');
    } else {
      console.log('\n⚠️  Restore completed với một số warnings/errors đã bỏ qua!');
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error('⚠️ Process error:', err);
    process.exit(0); // Exit with 0 to continue even on errors
  })
  .finally(() => prisma.$disconnect());
