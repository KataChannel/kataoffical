"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const BACKUP_ROOT_DIR = './rausach_json';
const tables = [
    'AuditLog', 'Banggiasanpham', 'Donhang', 'PhieuKho',
    'Donhangsanpham', 'Dathangsanpham', 'PhieuKhoSanpham', 'performance_logs'
];
async function verifyChunks() {
    const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
    const backupPath = path.join(BACKUP_ROOT_DIR, latestBackupDir);
    console.log(`📂 Backup folder: ${latestBackupDir}\n`);
    console.log('🔍 Verifying chunk detection for all tables:\n');
    for (const table of tables) {
        const firstChunkPath = path.join(backupPath, `${table}_part1.json`);
        const metadataPath = path.join(backupPath, `${table}_metadata.json`);
        if (fs.existsSync(firstChunkPath)) {
            let totalRecords = 0;
            let chunks = 0;
            if (fs.existsSync(metadataPath)) {
                const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                chunks = metadata.chunks;
                totalRecords = metadata.totalRecords;
            }
            else {
                chunks = 1;
                while (fs.existsSync(path.join(backupPath, `${table}_part${chunks + 1}.json`))) {
                    chunks++;
                }
                for (let i = 1; i <= chunks; i++) {
                    const chunkData = JSON.parse(fs.readFileSync(path.join(backupPath, `${table}_part${i}.json`), 'utf8'));
                    totalRecords += chunkData.length;
                }
            }
            console.log(`✅ ${table.padEnd(20)} - ${chunks} chunks, ${totalRecords.toLocaleString()} records`);
        }
        else {
            console.log(`❌ ${table.padEnd(20)} - NO CHUNKS FOUND`);
        }
    }
}
verifyChunks();
//# sourceMappingURL=verify-all-chunks.js.map