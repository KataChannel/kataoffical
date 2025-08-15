"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const BACKUP_ROOT_DIR = './rausach_json';
const stats = {
    tablesProcessed: 0,
    recordsRestored: 0,
    errors: [],
    warnings: []
};
function getLatestBackupFolder() {
    try {
        const folders = fs.readdirSync(BACKUP_ROOT_DIR)
            .filter(folder => fs.statSync(path.join(BACKUP_ROOT_DIR, folder)).isDirectory())
            .sort()
            .reverse();
        return folders[0] || null;
    }
    catch (error) {
        console.error(`⚠️ Không thể đọc thư mục backup: ${error}`);
        return null;
    }
}
async function cleanupBeforeRestore() {
    console.log('🧹 Dọn dẹp dữ liệu cũ trước khi restore...');
    try {
        const cleanupOrder = [
            'Dathangsanpham',
            'Donhangsanpham',
            'Donhang',
            'Dathang',
        ];
        let totalDeleted = 0;
        for (const table of cleanupOrder) {
            try {
                const model = prisma[table];
                if (model && typeof model.deleteMany === 'function') {
                    const result = await model.deleteMany({});
                    const deletedCount = result.count || 0;
                    totalDeleted += deletedCount;
                    console.log(`🗑️  Đã xóa ${deletedCount} records từ bảng ${table}`);
                }
            }
            catch (error) {
                const errorMsg = `Không thể xóa bảng ${table}: ${error}`;
                console.log(`⚠️  ${errorMsg} - Bỏ qua và tiếp tục`);
                stats.warnings.push(errorMsg);
            }
        }
        console.log(`✅ Hoàn thành dọn dẹp ${totalDeleted} records`);
    }
    catch (error) {
        const errorMsg = `Lỗi khi dọn dẹp: ${error}`;
        console.error(`⚠️ ${errorMsg} - Bỏ qua và tiếp tục`);
        stats.warnings.push(errorMsg);
    }
}
async function getTables() {
    try {
        const tables = await prisma.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname='public'`;
        return tables.map((table) => table.tablename);
    }
    catch (error) {
        console.error(`⚠️ Không thể lấy danh sách bảng: ${error}`);
        return [];
    }
}
async function validateForeignKeys(table, data) {
    console.log(`🔍 Validating foreign keys cho bảng ${table}...`);
    try {
        switch (table) {
            case 'Profile':
                const existingUserIds = await prisma.user.findMany({ select: { id: true } });
                const validUserIds = new Set(existingUserIds.map(u => u.id));
                return data.filter(record => !record.userId || validUserIds.has(record.userId));
            case 'UserRole':
                const [users, roles] = await Promise.all([
                    prisma.user.findMany({ select: { id: true } }),
                    prisma.role.findMany({ select: { id: true } })
                ]);
                const validUserIds2 = new Set(users.map(u => u.id));
                const validRoleIds = new Set(roles.map(r => r.id));
                return data.filter(record => validUserIds2.has(record.userId) && validRoleIds.has(record.roleId));
            case 'RolePermission':
                const [roles2, permissions] = await Promise.all([
                    prisma.role.findMany({ select: { id: true } }),
                    prisma.permission.findMany({ select: { id: true } })
                ]);
                const validRoleIds2 = new Set(roles2.map(r => r.id));
                const validPermissionIds = new Set(permissions.map(p => p.id));
                return data.filter(record => validRoleIds2.has(record.roleId) && validPermissionIds.has(record.permissionId));
            case 'AuditLog':
                const existingUserIds3 = await prisma.user.findMany({ select: { id: true } });
                const validUserIds3 = new Set(existingUserIds3.map(u => u.id));
                return data.filter(record => !record.userId || validUserIds3.has(record.userId));
            case 'Banggiasanpham':
                const [banggia, sanpham] = await Promise.all([
                    prisma.banggia.findMany({ select: { id: true } }),
                    prisma.sanpham.findMany({ select: { id: true } })
                ]);
                const validBanggiaIds = new Set(banggia.map(b => b.id));
                const validSanphamIds = new Set(sanpham.map(s => s.id));
                return data.filter(record => validBanggiaIds.has(record.banggiaId) && validSanphamIds.has(record.sanphamId));
            case 'Khachhang':
                const [banggia2, nhomkh] = await Promise.all([
                    prisma.banggia.findMany({ select: { id: true } }),
                    prisma.nhomkhachhang.findMany({ select: { id: true } })
                ]);
                const validBanggiaIds2 = new Set(banggia2.map(b => b.id));
                const validNhomIds = new Set(nhomkh.map(n => n.id));
                return data.filter(record => {
                    const banggiaValid = !record.banggiaId || validBanggiaIds2.has(record.banggiaId);
                    return banggiaValid;
                });
            case 'SanphamKho':
                const [sanpham2, kho] = await Promise.all([
                    prisma.sanpham.findMany({ select: { id: true } }),
                    prisma.kho.findMany({ select: { id: true } })
                ]);
                const validSanphamIds2 = new Set(sanpham2.map(s => s.id));
                const validKhoIds = new Set(kho.map(k => k.id));
                return data.filter(record => validSanphamIds2.has(record.sanphamId) && validKhoIds.has(record.khoId));
            case 'TonKho':
                const sanpham3 = await prisma.sanpham.findMany({ select: { id: true } });
                const validSanphamIds3 = new Set(sanpham3.map(s => s.id));
                return data.filter(record => validSanphamIds3.has(record.sanphamId));
            case 'Donhang':
                const khachhang = await prisma.khachhang.findMany({ select: { id: true } });
                const validKhachhangIds = new Set(khachhang.map(k => k.id));
                return data.filter(record => validKhachhangIds.has(record.khachhangId));
            case 'Dathang':
                const [nhacungcap, kho2] = await Promise.all([
                    prisma.nhacungcap.findMany({ select: { id: true } }),
                    prisma.kho.findMany({ select: { id: true } })
                ]);
                const validNhacungcapIds = new Set(nhacungcap.map(n => n.id));
                const validKhoIds2 = new Set(kho2.map(k => k.id));
                return data.filter(record => {
                    const nhacungcapValid = !record.nhacungcapId || validNhacungcapIds.has(record.nhacungcapId);
                    const khoValid = !record.khoId || validKhoIds2.has(record.khoId);
                    return nhacungcapValid && khoValid;
                });
            case 'PhieuKho':
                const [donhang, dathang, kho3] = await Promise.all([
                    prisma.donhang.findMany({ select: { madonhang: true } }),
                    prisma.dathang.findMany({ select: { madncc: true } }),
                    prisma.kho.findMany({ select: { id: true } })
                ]);
                const validMadonhang = new Set(donhang.map(d => d.madonhang).filter(Boolean));
                const validMadncc = new Set(dathang.map(d => d.madncc).filter(Boolean));
                const validKhoIds3 = new Set(kho3.map(k => k.id));
                return data.filter(record => {
                    const donhangValid = !record.madonhang || validMadonhang.has(record.madonhang);
                    const dathangValid = !record.madncc || validMadncc.has(record.madncc);
                    const khoValid = !record.khoId || validKhoIds3.has(record.khoId);
                    return donhangValid && dathangValid && khoValid;
                });
            case 'Donhangsanpham':
                const [donhang2, sanpham4] = await Promise.all([
                    prisma.donhang.findMany({ select: { id: true } }),
                    prisma.sanpham.findMany({ select: { id: true } })
                ]);
                const validDonhangIds = new Set(donhang2.map(d => d.id));
                const validSanphamIds4 = new Set(sanpham4.map(s => s.id));
                return data.filter(record => validDonhangIds.has(record.donhangId) && validSanphamIds4.has(record.idSP));
            case 'Dathangsanpham':
                const [dathang2, sanpham5] = await Promise.all([
                    prisma.dathang.findMany({ select: { id: true } }),
                    prisma.sanpham.findMany({ select: { id: true } })
                ]);
                const validDathangIds = new Set(dathang2.map(d => d.id));
                const validSanphamIds5 = new Set(sanpham5.map(s => s.id));
                return data.filter(record => validDathangIds.has(record.dathangId) && validSanphamIds5.has(record.idSP));
            case 'PhieuKhoSanpham':
                const [phieukho, sanpham6] = await Promise.all([
                    prisma.phieuKho.findMany({ select: { id: true } }),
                    prisma.sanpham.findMany({ select: { id: true } })
                ]);
                const validPhieuKhoIds = new Set(phieukho.map(p => p.id));
                const validSanphamIds6 = new Set(sanpham6.map(s => s.id));
                return data.filter(record => validPhieuKhoIds.has(record.phieuKhoId) && validSanphamIds6.has(record.sanphamId));
            case 'Chotkho':
                const [kho4, sanpham7, tonkho, phieukho2, user] = await Promise.all([
                    prisma.kho.findMany({ select: { id: true } }),
                    prisma.sanpham.findMany({ select: { id: true } }),
                    prisma.tonKho.findMany({ select: { id: true } }),
                    prisma.phieuKho.findMany({ select: { id: true } }),
                    prisma.user.findMany({ select: { id: true } })
                ]);
                const validKhoIds4 = new Set(kho4.map(k => k.id));
                const validSanphamIds7 = new Set(sanpham7.map(s => s.id));
                const validTonkhoIds = new Set(tonkho.map(t => t.id));
                const validPhieuKhoIds2 = new Set(phieukho2.map(p => p.id));
                const validUserIds4 = new Set(user.map(u => u.id));
                return data.filter(record => {
                    const khoValid = !record.khoId || validKhoIds4.has(record.khoId);
                    const sanphamValid = !record.sanphamId || validSanphamIds7.has(record.sanphamId);
                    const tonkhoValid = !record.tonkhoId || validTonkhoIds.has(record.tonkhoId);
                    const phieukhoValid = !record.phieukhoId || validPhieuKhoIds2.has(record.phieukhoId);
                    const userValid = !record.userId || validUserIds4.has(record.userId);
                    return khoValid && sanphamValid && tonkhoValid && phieukhoValid && userValid;
                });
            case 'UserguidBlock':
                const steps = await prisma.userguidStep.findMany({ select: { id: true } });
                const validStepIds = new Set(steps.map(s => s.id));
                return data.filter(record => !record.stepId || validStepIds.has(record.stepId));
            case 'Kho':
                const congty = await prisma.congty.findMany({ select: { id: true } });
                const validCongtyIds = new Set(congty.map(c => c.id));
                return data.filter(record => !record.congtyId || validCongtyIds.has(record.congtyId));
            default:
                console.log(`➡️ ${table}: No FK validation needed, returning all ${data.length} records`);
                return data;
        }
    }
    catch (error) {
        console.error(`❌ Error validating FK for ${table}:`, error);
        stats.warnings.push(`FK validation failed for ${table}: ${error}`);
        return [];
    }
}
async function validateBackupData(data, table) {
    if (!Array.isArray(data)) {
        stats.warnings.push(`Dữ liệu backup cho bảng ${table} không phải là array`);
        return [];
    }
    if (data.length === 0) {
        return data;
    }
    const cleanedData = data.map((item, index) => {
        try {
            if (!item || typeof item !== 'object') {
                stats.warnings.push(`Record ${index} trong bảng ${table} không hợp lệ`);
                return null;
            }
            const newItem = { ...item };
            ['size', 'slton', 'slchogiao', 'slchonhap', 'soluong', 'giaban', 'giagoc'].forEach(field => {
                if (newItem[field] && typeof newItem[field] === 'string') {
                    const trimmed = newItem[field].trim();
                    if (trimmed === '') {
                        newItem[field] = null;
                    }
                    else {
                        const parsed = parseFloat(trimmed);
                        newItem[field] = isNaN(parsed) ? null : parsed;
                    }
                }
            });
            Object.keys(newItem).forEach(key => {
                if (typeof newItem[key] === 'string') {
                    newItem[key] = newItem[key].trim();
                }
            });
            return newItem;
        }
        catch (error) {
            stats.warnings.push(`Lỗi validate record ${index} trong bảng ${table}: ${error}`);
            return null;
        }
    }).filter(item => item !== null);
    const validatedData = await validateForeignKeys(table, cleanedData);
    console.log(`🔍 Đã validate ${data.length} records cho bảng ${table}, ${validatedData.length} records hợp lệ`);
    if (validatedData.length !== data.length) {
        stats.warnings.push(`${table}: Filtered out ${data.length - validatedData.length} invalid FK records`);
    }
    return validatedData;
}
async function restoreTableFromJson(table, backupFolder) {
    try {
        const filePath = path.join(BACKUP_ROOT_DIR, backupFolder, `${table}.json`);
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Không tìm thấy file backup cho bảng ${table}, bỏ qua.`);
            stats.warnings.push(`File backup không tồn tại cho bảng ${table}`);
            return;
        }
        console.log(`📥 Đọc dữ liệu cho bảng: ${table}`);
        let rawData;
        try {
            rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        catch (error) {
            console.log(`⚠️ Không thể đọc file ${table}.json: ${error} - Bỏ qua`);
            stats.warnings.push(`Không thể đọc file backup cho bảng ${table}`);
            return;
        }
        if (!Array.isArray(rawData) || rawData.length === 0) {
            console.log(`⚠️  Bảng ${table} không có dữ liệu để restore`);
            return;
        }
        const processedData = await validateBackupData(rawData, table);
        if (processedData.length === 0) {
            console.log(`⚠️  Bảng ${table} không có dữ liệu hợp lệ sau validation`);
            return;
        }
        const model = prisma[table];
        if (!model || typeof model.createMany !== 'function') {
            console.log(`🔧 Bảng ${table} không có Prisma model, sử dụng raw SQL...`);
            await restoreWithRawSQL(table, processedData);
            return;
        }
        try {
            console.log(`⏳ Đang restore ${processedData.length} records cho bảng ${table}...`);
            await model.createMany({
                data: processedData,
                skipDuplicates: true,
            });
            stats.recordsRestored += processedData.length;
            console.log(`✅ Đã nhập ${processedData.length} records vào bảng ${table}`);
        }
        catch (batchError) {
            console.log(`⚠️  Batch insert failed cho bảng ${table}: ${batchError.message}, thử từng record...`);
            await restoreRecordsIndividually(model, table, processedData);
        }
        stats.tablesProcessed++;
    }
    catch (error) {
        const errorMsg = `Lỗi khôi phục bảng ${table}: ${error}`;
        console.error(`⚠️ ${errorMsg} - Bỏ qua và tiếp tục`);
        stats.warnings.push(errorMsg);
    }
}
async function restoreWithRawSQL(table, data) {
    try {
        const columns = Object.keys(data[0])
            .map((col) => `"${col}"`)
            .join(', ');
        const batchSize = 100;
        let totalInserted = 0;
        for (let i = 0; i < data.length; i += batchSize) {
            try {
                const batch = data.slice(i, i + batchSize);
                const values = batch
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
                totalInserted += batch.length;
            }
            catch (batchError) {
                console.log(`⚠️ Raw SQL batch ${i / batchSize + 1} failed: ${batchError} - Bỏ qua`);
                stats.warnings.push(`Raw SQL batch failed cho bảng ${table}: ${batchError}`);
            }
        }
        stats.recordsRestored += totalInserted;
        console.log(`✅ Đã nhập ${totalInserted} records vào bảng ${table} (raw SQL)`);
    }
    catch (error) {
        console.log(`⚠️ Raw SQL insert failed cho bảng ${table}: ${error} - Bỏ qua`);
        stats.warnings.push(`Raw SQL insert failed cho bảng ${table}`);
    }
}
async function restoreRecordsIndividually(model, table, data) {
    let successCount = 0;
    let errorCount = 0;
    for (let i = 0; i < data.length; i++) {
        try {
            await model.create({
                data: data[i]
            });
            successCount++;
            if (i % 100 === 0 && i > 0) {
                console.log(`   Progress: ${i}/${data.length} records processed...`);
            }
        }
        catch (recordError) {
            errorCount++;
            if (errorCount <= 5) {
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
async function restoreAllTablesFromJson() {
    const backupFolder = getLatestBackupFolder();
    if (!backupFolder) {
        console.error('❌ Không tìm thấy thư mục backup nào!');
        stats.errors.push('Không tìm thấy thư mục backup');
        return;
    }
    stats.backupFolder = backupFolder;
    console.log(`📂 Đang restore từ thư mục: ${backupFolder}`);
    console.log(`📁 Đường dẫn đầy đủ: ${path.join(BACKUP_ROOT_DIR, backupFolder)}`);
    const tables = await getTables();
    console.log(tables);
    if (tables.length === 0) {
        console.log('⚠️ Không thể lấy danh sách bảng - Tiếp tục với danh sách mặc định');
    }
    else {
        console.log(`📊 Tìm thấy ${tables.length} bảng trong cơ sở dữ liệu.`);
    }
    const tableOrder = [
        'Role',
        'Permission',
        'Menu',
        'Congty',
        'Nhomkhachhang',
        'ErrorLog',
        'FileManager',
        'ChatAIMessage',
        'ChatAIHistory',
        'File',
        'ImportHistory',
        'UserguidStep',
        'User',
        'Profile',
        'UserRole',
        'RolePermission',
        'AuditLog',
        'Banggia',
        'Sanpham',
        'Nhacungcap',
        'Kho',
        'Banggiasanpham',
        'Khachhang',
        'SanphamKho',
        'TonKho',
        'Donhang',
        'Dathang',
        'PhieuKho',
        'Donhangsanpham',
        'Dathangsanpham',
        'PhieuKhoSanpham',
        'Chotkho',
        'UserguidBlock',
        ...tables.filter(t => ![
            'Role', 'Permission', 'Menu', 'Congty', 'Nhomkhachhang', 'ErrorLog',
            'FileManager', 'ChatAIMessage', 'ChatAIHistory', 'File', 'ImportHistory',
            'UserguidStep', 'User', 'Profile', 'UserRole', 'RolePermission', 'AuditLog',
            'Banggia', 'Sanpham', 'Nhacungcap', 'Kho', 'Banggiasanpham', 'Khachhang',
            'SanphamKho', 'TonKho', 'Donhang', 'Dathang', 'PhieuKho', 'Donhangsanpham',
            'Dathangsanpham', 'PhieuKhoSanpham', 'Chotkho', 'UserguidBlock'
        ].includes(t))
    ];
    const orderedTables = tables.length > 0
        ? tableOrder.filter(table => tables.includes(table))
        : tableOrder.slice(0, 14);
    console.log(`🔄 Sẽ restore ${orderedTables.length} bảng theo thứ tự dependency`);
    for (let i = 0; i < orderedTables.length; i++) {
        const table = orderedTables[i];
        console.log(`\n[${i + 1}/${orderedTables.length}] Restore bảng: ${table}`);
        await restoreTableFromJson(table, backupFolder);
    }
}
function printFinalStats() {
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
async function main() {
    const startTime = Date.now();
    console.log('🚀 BẮT ĐẦU QUÁ TRÌNH RESTORE DỮ LIỆU');
    console.log(`⏰ Thời gian bắt đầu: ${new Date().toLocaleString()}`);
    console.log('📌 Chế độ: Bỏ qua lỗi và tiếp tục xử lý');
    try {
        await cleanupBeforeRestore();
        await restoreAllTablesFromJson();
    }
    catch (error) {
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
    }
    else {
        console.log('\n⚠️  Restore completed với một số warnings/errors đã bỏ qua!');
    }
    process.exit(0);
})
    .catch((err) => {
    console.error('⚠️ Process error:', err);
    process.exit(0);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=restore.js.map