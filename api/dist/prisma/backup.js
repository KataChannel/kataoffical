"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';
function getFormattedDate() {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}
const BACKUP_DIR = path.join(BACKUP_ROOT_DIR, getFormattedDate());
async function getTables() {
    const tables = await prisma.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    return tables.map((table) => table.tablename);
}
async function backupTableToJson(table) {
    try {
        const data = await prisma.$queryRawUnsafe(`SELECT * FROM "${table}"`);
        const filePath = path.join(BACKUP_DIR, `${table}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`✅ Backup JSON thành công: ${filePath}`);
    }
    catch (error) {
        console.error(`❌ Lỗi backup bảng ${table}:`, error);
    }
}
async function backupAllTablesToJson() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const tables = await getTables();
    for (const table of tables) {
        await backupTableToJson(table);
    }
}
async function restoreTableFromJson(table) {
    try {
        const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
        if (!latestBackupDir) {
            console.error(`❌ Không tìm thấy thư mục backup.`);
            return;
        }
        const filePath = path.join(BACKUP_ROOT_DIR, latestBackupDir, `${table}.json`);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ Không tìm thấy file backup cho bảng ${table}`);
            return;
        }
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        for (const row of data) {
            await prisma.$queryRawUnsafe(`INSERT INTO "${table}" (${Object.keys(row).join(', ')}) VALUES (${Object.values(row).map((_, i) => `$${i + 1}`).join(', ')})`, ...Object.values(row));
        }
        console.log(`✅ Khôi phục dữ liệu thành công cho bảng ${table}`);
    }
    catch (error) {
        console.error(`❌ Lỗi khôi phục bảng ${table}:`, error);
    }
}
async function restoreAllTablesFromJson() {
    const tables = await getTables();
    for (const table of tables) {
        await restoreTableFromJson(table);
    }
}
backupAllTablesToJson()
    .then(() => console.log('🎉 Backup JSON hoàn tất!'))
    .catch((err) => console.error('Lỗi:', err))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=backup.js.map