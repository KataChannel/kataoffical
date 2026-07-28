import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';

function getFormattedDate(): string {
  const now = new Date();
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

const BACKUP_DIR = path.join(BACKUP_ROOT_DIR, getFormattedDate());

async function getTables(): Promise<string[]> {
  const tables: { tablename: string }[] = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  return tables.map((table) => table.tablename);
}

async function backupTableToJson(table: string): Promise<void> {
  try {
    const data: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM "${table}"`);
    
    // Nếu bảng có quá nhiều records (>10000), chia thành nhiều file
    const CHUNK_SIZE = 10000;
    if (data.length > CHUNK_SIZE) {
      console.log(`⚠️  Bảng ${table} có ${data.length} records, đang chia thành chunks...`);
      
      const chunks = Math.ceil(data.length / CHUNK_SIZE);
      for (let i = 0; i < chunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, data.length);
        const chunk = data.slice(start, end);
        const filePath = path.join(BACKUP_DIR, `${table}_part${i + 1}.json`);
        fs.writeFileSync(filePath, JSON.stringify(chunk, null, 2));
        console.log(`✅ Backup chunk ${i + 1}/${chunks} thành công: ${filePath} (${chunk.length} records)`);
      }
      
      // Tạo metadata file để track số chunks
      const metadataPath = path.join(BACKUP_DIR, `${table}_metadata.json`);
      fs.writeFileSync(metadataPath, JSON.stringify({ 
        table, 
        totalRecords: data.length, 
        chunks,
        chunkSize: CHUNK_SIZE 
      }, null, 2));
    } else {
      // Bảng nhỏ, backup bình thường
      const filePath: string = path.join(BACKUP_DIR, `${table}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Backup JSON thành công: ${filePath} (${data.length} records)`);
    }
  } catch (error) {
    console.error(`❌ Lỗi backup bảng ${table}:`, error);
  }
}

async function backupAllTablesToJson(): Promise<void> {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const tables: string[] = await getTables();
  for (const table of tables) {
    await backupTableToJson(table);
  }
}

async function restoreTableFromJson(table: string): Promise<void> {
  try {
    const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
    if (!latestBackupDir) {
      console.error(`❌ Không tìm thấy thư mục backup.`);
      return;
    }
    
    const backupPath = path.join(BACKUP_ROOT_DIR, latestBackupDir);
    const metadataPath = path.join(backupPath, `${table}_metadata.json`);
    const singleFilePath = path.join(backupPath, `${table}.json`);
    const firstChunkPath = path.join(backupPath, `${table}_part1.json`);
    
    let allData: any[] = [];
    
    // Kiểm tra có chunk files không (ưu tiên check chunk trước)
    if (fs.existsSync(firstChunkPath)) {
      // Có chunk files - đọc metadata hoặc tự detect số chunks
      let chunks = 1;
      
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        chunks = metadata.chunks;
        console.log(`📦 Đang restore bảng ${table} từ ${chunks} chunks (${metadata.totalRecords} records)...`);
      } else {
        // Không có metadata, tự detect số chunks
        while (fs.existsSync(path.join(backupPath, `${table}_part${chunks + 1}.json`))) {
          chunks++;
        }
        console.log(`📦 Đang restore bảng ${table} từ ${chunks} chunks (auto-detected)...`);
      }
      
      // Đọc tất cả chunks
      for (let i = 1; i <= chunks; i++) {
        const chunkPath = path.join(backupPath, `${table}_part${i}.json`);
        if (!fs.existsSync(chunkPath)) {
          console.error(`⚠️  Không tìm thấy chunk file: ${chunkPath}`);
          continue;
        }
        const chunkData = JSON.parse(fs.readFileSync(chunkPath, 'utf8'));
        allData = allData.concat(chunkData);
        console.log(`  ✅ Đọc chunk ${i}/${chunks} (${chunkData.length} records)`);
      }
    } else if (fs.existsSync(singleFilePath)) {
      // Bảng không được chia chunks, đọc file đơn
      allData = JSON.parse(fs.readFileSync(singleFilePath, 'utf8'));
      console.log(`📄 Đang restore bảng ${table} từ file đơn (${allData.length} records)...`);
    } else {
      console.error(`❌ Không tìm thấy file backup cho bảng ${table}`);
      console.error(`   Đã tìm: ${singleFilePath}`);
      console.error(`   Đã tìm: ${firstChunkPath}`);
      return;
    }

    // Kiểm tra có data không
    if (allData.length === 0) {
      console.log(`⚠️  Bảng ${table} không có dữ liệu để restore`);
      return;
    }

    // Insert data
    console.log(`🔄 Bắt đầu insert ${allData.length} records vào bảng ${table}...`);
    let insertedCount = 0;
    let errorCount = 0;
    
    for (const row of allData) {
      try {
        await prisma.$queryRawUnsafe(
          `INSERT INTO "${table}" (${Object.keys(row).join(', ')}) VALUES (${Object.values(row).map((_, i) => `$${i + 1}`).join(', ')})`,
          ...Object.values(row)
        );
        insertedCount++;
        if (insertedCount % 1000 === 0) {
          console.log(`  📝 Đã insert ${insertedCount}/${allData.length} records...`);
        }
      } catch (insertError: any) {
        errorCount++;
        if (errorCount <= 5) { // Chỉ log 5 lỗi đầu tiên
          console.error(`  ⚠️  Lỗi insert record:`, insertError.message);
        }
      }
    }
    
    if (errorCount > 0) {
      console.log(`⚠️  Khôi phục bảng ${table} với ${insertedCount} records thành công, ${errorCount} lỗi`);
    } else {
      console.log(`✅ Khôi phục dữ liệu thành công cho bảng ${table} (${insertedCount} records)`);
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

backupAllTablesToJson()
  .then(() => console.log('🎉 Backup JSON hoàn tất!'))
  .catch((err) => console.error('Lỗi:', err))
  .finally(() => prisma.$disconnect());

// Để khôi phục dữ liệu, chạy restoreAllTablesFromJson()
// restoreAllTablesFromJson()
//   .then(() => console.log('🎉 Khôi phục dữ liệu JSON hoàn tất!'))
//   .catch((err) => console.error('Lỗi:', err))
//   .finally(() => prisma.$disconnect());
