"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const BACKUP_ROOT_DIR = './backups_json';
async function getTables() {
    const tables = await prisma.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    return tables.map((table) => table.tablename);
}
async function restoreTableFromJson(table) {
    try {
        const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
        if (!latestBackupDir) {
            console.error(`❌ Không tìm thấy thư mục backup.`);
            return;
        }
        const filePath = path.join(BACKUP_ROOT_DIR, latestBackupDir, `${table}.json`);
        console.log(filePath);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ Không tìm thấy file backup cho bảng ${table}`);
            return;
        }
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (Array.isArray(data) && data.length > 0) {
            try {
                await prisma[table].createMany({
                    data: data,
                    skipDuplicates: true,
                });
                console.log(`✅ Đã nhập dữ liệu vào bảng ${table}`);
            }
            catch (error) {
                console.error(`⚠️ Lỗi khi nhập dữ liệu vào bảng ${table}:`, error.message);
            }
        }
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
restoreAllTablesFromJson()
    .then(() => console.log('🎉 Khôi phục dữ liệu JSON hoàn tất!'))
    .catch((err) => console.error('Lỗi:', err))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=restore.js.map