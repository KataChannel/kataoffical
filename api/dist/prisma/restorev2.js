"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';
async function cleanupBeforeRestore() {
    console.log('🧹 Dọn dẹp dữ liệu cũ trước khi restore...');
    try {
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
        ];
        for (const table of cleanupOrder) {
            try {
                const model = prisma[table];
                if (model && typeof model.deleteMany === 'function') {
                    const result = await model.deleteMany({});
                    console.log(`🗑️  Đã xóa ${result.count || 0} records từ bảng ${table}`);
                }
            }
            catch (error) {
                console.log(`⚠️  Không thể xóa bảng ${table}: ${error}`);
            }
        }
        console.log('✅ Hoàn thành dọn dẹp dữ liệu cũ');
    }
    catch (error) {
        console.error('❌ Lỗi khi dọn dẹp:', error);
    }
}
async function getTables() {
    const tables = await prisma.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    return tables.map((table) => table.tablename);
}
async function restoreTableFromJson(table) {
    try {
        const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
        console.log(`Đang khôi phục bảng: ${table} từ ${latestBackupDir}`);
        if (!latestBackupDir) {
            console.error(`❌ Không tìm thấy thư mục backup.`);
            return;
        }
        const filePath = path.join(BACKUP_ROOT_DIR, latestBackupDir, `${table}.json`);
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Không tìm thấy file backup cho bảng ${table}, bỏ qua.`);
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
                try {
                    await model.createMany({
                        data: processedData,
                        skipDuplicates: true,
                    });
                }
                catch (fkError) {
                    if (fkError.message && fkError.message.includes('Foreign key constraint')) {
                        console.log(`⚠️  Foreign key constraint lỗi cho bảng ${table}, thử từng record riêng lẻ...`);
                        let successCount = 0;
                        let errorCount = 0;
                        for (const record of processedData) {
                            try {
                                await model.create({
                                    data: record
                                });
                                successCount++;
                            }
                            catch (recordError) {
                                errorCount++;
                                console.log(`⚠️  Lỗi insert record: ${JSON.stringify(record).substring(0, 100)}...`);
                            }
                        }
                        console.log(`✅ Bảng ${table}: ${successCount} thành công, ${errorCount} lỗi`);
                        return;
                    }
                    else {
                        throw fkError;
                    }
                }
            }
            console.log(`✅ Đã nhập ${processedData.length} records vào bảng ${table}`);
        }
        else {
            console.log(`⚠️  Bảng ${table} không có dữ liệu để restore`);
        }
    }
    catch (error) {
        console.error(`❌ Lỗi khôi phục bảng ${table}:`, error);
    }
}
async function restoreAllTablesFromJson() {
    const tables = await getTables();
    console.log(`Tìm thấy ${tables.length} bảng trong cơ sở dữ liệu.`);
    const tableOrder = [
        'khachhang',
        'nhacungcap',
        'sanpham',
        'users',
        'kho',
        'tonkho',
        'dathang',
        'donhang',
        'phieugiaohang',
        'phieunhapkho',
        'dathangsanpham',
        'donhangsanpham',
        'phieugiaohangsanpham',
        'phieunhapkhosanpham',
        ...tables.filter(t => ![
            'khachhang', 'nhacungcap', 'sanpham', 'users', 'kho', 'tonkho',
            'dathang', 'donhang', 'phieugiaohang', 'phieunhapkho',
            'dathangsanpham', 'donhangsanpham', 'phieugiaohangsanpham', 'phieunhapkhosanpham'
        ].includes(t))
    ];
    const orderedTables = tableOrder.filter(table => tables.includes(table));
    for (const table of orderedTables) {
        await restoreTableFromJson(table);
    }
}
async function main() {
    console.log('🚀 Bắt đầu quá trình restore dữ liệu...');
    await cleanupBeforeRestore();
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
//# sourceMappingURL=restorev2.js.map