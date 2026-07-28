import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';

async function testRestoreAuditLog() {
  try {
    const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
    console.log(`📂 Backup folder: ${latestBackupDir}`);
    
    const backupPath = path.join(BACKUP_ROOT_DIR, latestBackupDir);
    const table = 'AuditLog';
    const singleFilePath = path.join(backupPath, `${table}.json`);
    const firstChunkPath = path.join(backupPath, `${table}_part1.json`);
    const metadataPath = path.join(backupPath, `${table}_metadata.json`);
    
    console.log(`\n🔍 Kiểm tra files:`);
    console.log(`   Single file: ${fs.existsSync(singleFilePath) ? '✅' : '❌'} ${singleFilePath}`);
    console.log(`   First chunk: ${fs.existsSync(firstChunkPath) ? '✅' : '❌'} ${firstChunkPath}`);
    console.log(`   Metadata: ${fs.existsSync(metadataPath) ? '✅' : '❌'} ${metadataPath}`);
    
    let rawData: any[] = [];
    
    if (fs.existsSync(firstChunkPath)) {
      console.log(`\n📦 Đọc từ chunk files...`);
      
      let chunks = 1;
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        chunks = metadata.chunks;
        console.log(`   Metadata: ${chunks} chunks, ${metadata.totalRecords} total records`);
      } else {
        while (fs.existsSync(path.join(backupPath, `${table}_part${chunks + 1}.json`))) {
          chunks++;
        }
        console.log(`   Auto-detect: ${chunks} chunks`);
      }
      
      for (let i = 1; i <= chunks; i++) {
        const chunkPath = path.join(backupPath, `${table}_part${i}.json`);
        const chunkData = JSON.parse(fs.readFileSync(chunkPath, 'utf8'));
        rawData = rawData.concat(chunkData);
        console.log(`   ✅ Chunk ${i}/${chunks}: ${chunkData.length} records`);
      }
      
      console.log(`\n✅ Total records read: ${rawData.length}`);
    } else {
      console.log(`❌ Không tìm thấy chunk files`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testRestoreAuditLog();
