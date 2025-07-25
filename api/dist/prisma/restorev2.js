"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';
async function getTables() {
    const tables = await prisma.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    return tables.map((table) => table.tablename);
}
async function restoreTableFromJson(table) {
    try {
        const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
        console.log(`Đang khôi phục dữ liệu: ${latestBackupDir}`);
        if (!latestBackupDir) {
            console.error(`❌ Không tìm thấy thư mục backup.`);
            return;
        }
        const filePath = path.join(BACKUP_ROOT_DIR, latestBackupDir, `${table}.json`);
        if (!fs.existsSync(filePath)) {
            return;
        }
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (Array.isArray(data) && data.length > 0) {
            const processedData = data.map((item) => {
                const newItem = { ...item };
                if (newItem.size && typeof newItem.size === 'string') {
                    newItem.size =
                        newItem.size.trim() === '' ? null : parseInt(newItem.size, 10);
                }
                return newItem;
            });
            const model = prisma[table];
            if (!model || typeof model.createMany !== 'function') {
                console.log(`Bảng join ${table} không có model. Sử dụng raw SQL để restore dữ liệu.`);
                const columns = Object.keys(processedData[0])
                    .map((col) => `"${col}"`)
                    .join(', ');
                const values = processedData
                    .map((item) => {
                    return ('(' +
                        Object.values(item)
                            .map((val) => {
                            if (typeof val === 'string') {
                                return `'${val.replace(/'/g, "''")}'`;
                            }
                            else if (val === null || val === undefined) {
                                return 'NULL';
                            }
                            return val;
                        })
                            .join(', ') +
                        ')');
                })
                    .join(', ');
                await prisma.$executeRawUnsafe(`INSERT INTO "${table}" (${columns}) VALUES ${values} ON CONFLICT DO NOTHING`);
                return;
            }
            else {
                await model.createMany({
                    data: processedData,
                    skipDuplicates: true,
                });
            }
            console.log(`✅ Đã nhập dữ liệu vào bảng ${table}`);
        }
    }
    catch (error) {
        console.error(`❌ Lỗi khôi phục bảng ${table}:`, error);
    }
}
async function restoreAllTablesFromJson() {
    const tables = await getTables();
    console.log(`Tìm thấy ${tables.length} bảng trong cơ sở dữ liệu.`);
    for (const table of tables) {
        await restoreTableFromJson(table);
    }
}
restoreAllTablesFromJson()
    .then(() => console.log('🎉 Khôi phục dữ liệu JSON hoàn tất!'))
    .catch((err) => console.error('Lỗi:', err))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=restorev2.js.map