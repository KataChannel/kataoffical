import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';

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

    console.log(`✅ Đọc thành công ${allData.length} records từ bảng ${table}`);
  } catch (error) {
    console.error(`❌ Lỗi khôi phục bảng ${table}:`, error);
  }
}

// Test với AuditLog
restoreTableFromJson('AuditLog')
  .then(() => console.log('🎉 Test hoàn tất!'))
  .catch((err) => console.error('Lỗi:', err))
  .finally(() => prisma.$disconnect());
