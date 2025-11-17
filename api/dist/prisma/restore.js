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
                return data.map(record => {
                    if (record.userId && !validUserIds3.has(record.userId)) {
                        return { ...record, userId: null };
                    }
                    return record;
                });
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
                return data
                    .filter(record => !record.khachhangId || validKhachhangIds.has(record.khachhangId))
                    .map(record => {
                    const cleaned = { ...record };
                    delete cleaned.nhanvienchiahangId;
                    delete cleaned.shipperId;
                    if (!cleaned.nhanvienchiahang)
                        cleaned.nhanvienchiahang = '';
                    if (!cleaned.shipper)
                        cleaned.shipper = '';
                    return cleaned;
                });
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
            case '_KhachhangNhom':
                const [khachhangList, nhomList] = await Promise.all([
                    prisma.khachhang.findMany({ select: { id: true } }),
                    prisma.nhomkhachhang.findMany({ select: { id: true } })
                ]);
                const validKhIds = new Set(khachhangList.map(k => k.id));
                const validNhomIds2 = new Set(nhomList.map(n => n.id));
                return data.filter(record => validKhIds.has(record.A) && validNhomIds2.has(record.B));
            case '_MenuRole':
                const [menuList, roleList] = await Promise.all([
                    prisma.menu.findMany({ select: { id: true } }),
                    prisma.role.findMany({ select: { id: true } })
                ]);
                const validMenuIds = new Set(menuList.map(m => m.id));
                const validRoleIds3 = new Set(roleList.map(r => r.id));
                return data.filter(record => validMenuIds.has(record.A) && validRoleIds3.has(record.B));
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
        const backupPath = path.join(BACKUP_ROOT_DIR, backupFolder);
        const singleFilePath = path.join(backupPath, `${table}.json`);
        const firstChunkPath = path.join(backupPath, `${table}_part1.json`);
        const metadataPath = path.join(backupPath, `${table}_metadata.json`);
        let rawData = [];
        if (fs.existsSync(firstChunkPath)) {
            console.log(`📥 Đọc dữ liệu cho bảng: ${table} (từ chunks)`);
            let chunks = 1;
            if (fs.existsSync(metadataPath)) {
                try {
                    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                    chunks = metadata.chunks;
                    console.log(`   📦 Phát hiện ${chunks} chunks (${metadata.totalRecords} records)`);
                }
                catch (error) {
                    console.log(`   ⚠️  Không đọc được metadata, tự detect chunks`);
                }
            }
            if (chunks === 1) {
                while (fs.existsSync(path.join(backupPath, `${table}_part${chunks + 1}.json`))) {
                    chunks++;
                }
                console.log(`   📦 Auto-detect: ${chunks} chunks`);
            }
            for (let i = 1; i <= chunks; i++) {
                const chunkPath = path.join(backupPath, `${table}_part${i}.json`);
                try {
                    const chunkData = JSON.parse(fs.readFileSync(chunkPath, 'utf8'));
                    rawData = rawData.concat(chunkData);
                    console.log(`   ✅ Chunk ${i}/${chunks}: ${chunkData.length} records`);
                }
                catch (error) {
                    console.log(`   ⚠️  Lỗi đọc chunk ${i}: ${error}`);
                    stats.warnings.push(`Không thể đọc chunk ${i} của bảng ${table}`);
                }
            }
        }
        else if (fs.existsSync(singleFilePath)) {
            console.log(`📥 Đọc dữ liệu cho bảng: ${table}`);
            try {
                rawData = JSON.parse(fs.readFileSync(singleFilePath, 'utf8'));
            }
            catch (error) {
                console.log(`⚠️ Không thể đọc file ${table}.json: ${error} - Bỏ qua`);
                stats.warnings.push(`Không thể đọc file backup cho bảng ${table}`);
                return;
            }
        }
        else {
            console.log(`⚠️  Không tìm thấy file backup cho bảng ${table}, bỏ qua.`);
            stats.warnings.push(`File backup không tồn tại cho bảng ${table}`);
            return;
        }
        if (!Array.isArray(rawData) || rawData.length === 0) {
            console.log(`⚠️  Bảng ${table} không có dữ liệu để restore`);
            return;
        }
        if (table === 'AuditLog') {
            await restoreAuditLogWithFix(rawData);
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
async function restoreAuditLogWithFix(auditLogs) {
    console.log('🔧 Đang sửa lỗi fields trong bảng AuditLog...');
    console.log(`📊 Tìm thấy ${auditLogs.length} records AuditLog`);
    console.log('🗑️ Xóa dữ liệu AuditLog hiện tại...');
    await prisma.auditLog.deleteMany({});
    let successCount = 0;
    let errorCount = 0;
    console.log('💾 Đang insert dữ liệu với batch processing...');
    const transformedRecords = [];
    const recordsWithRelation = [];
    for (const record of auditLogs) {
        const transformedRecord = {
            id: record.id,
            entityName: record.entityName,
            entityId: record.entityId,
            action: record.action,
            userEmail: record.userEmail,
            oldValues: record.oldValues,
            newValues: record.newValues,
            changedFields: record.changedFields || [],
            ipAddress: record.ipAddress,
            userAgent: record.userAgent,
            sessionId: record.sessionId,
            status: record.status || 'SUCCESS',
            errorDetails: record.error_details,
            metadata: record.metadata,
            createdAt: record.createdAt ? new Date(record.createdAt) : new Date(),
            updatedAt: record.updatedAt ? new Date(record.updatedAt) : new Date(),
            userId: record.userId && record.userId.trim() !== '' ? record.userId : null
        };
        if (record.userId && record.userId.trim() !== '') {
            recordsWithRelation.push(transformedRecord);
        }
        else {
            transformedRecords.push(transformedRecord);
        }
    }
    if (transformedRecords.length > 0) {
        console.log(`   📦 Batch insert ${transformedRecords.length} records without relations...`);
        const BATCH_SIZE = 1000;
        for (let i = 0; i < transformedRecords.length; i += BATCH_SIZE) {
            const batch = transformedRecords.slice(i, i + BATCH_SIZE);
            try {
                await prisma.auditLog.createMany({
                    data: batch,
                    skipDuplicates: true
                });
                successCount += batch.length;
                console.log(`   ✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} records (${successCount}/${auditLogs.length})`);
            }
            catch (error) {
                console.log(`   ⚠️  Batch error, trying individual inserts for this batch...`);
                for (const record of batch) {
                    try {
                        await prisma.auditLog.create({ data: record });
                        successCount++;
                    }
                    catch (err) {
                        errorCount++;
                        if (errorCount <= 5) {
                            console.log(`   ⚠️  Error: ${err.message}`);
                        }
                    }
                }
            }
        }
    }
    if (recordsWithRelation.length > 0) {
        console.log(`   📦 Inserting ${recordsWithRelation.length} records with user relations (raw SQL)...`);
        const BATCH_SIZE = 1000;
        const totalBatches = Math.ceil(recordsWithRelation.length / BATCH_SIZE);
        for (let i = 0; i < recordsWithRelation.length; i += BATCH_SIZE) {
            const batch = recordsWithRelation.slice(i, i + BATCH_SIZE);
            const currentBatch = Math.floor(i / BATCH_SIZE) + 1;
            try {
                const values = batch.map(record => {
                    const id = record.id ? `'${record.id}'` : 'uuid_generate_v4()';
                    const entityName = record.entityName ? `'${record.entityName.replace(/'/g, "''")}'` : 'NULL';
                    const entityId = record.entityId ? `'${record.entityId.replace(/'/g, "''")}'` : 'NULL';
                    const action = record.action ? `'${record.action.replace(/'/g, "''")}'` : 'NULL';
                    const userEmail = record.userEmail ? `'${record.userEmail.replace(/'/g, "''")}'` : 'NULL';
                    const userId = record.userId ? `'${record.userId.replace(/'/g, "''")}'` : 'NULL';
                    const oldValues = record.oldValues ? `'${JSON.stringify(record.oldValues).replace(/'/g, "''")}'::jsonb` : 'NULL';
                    const newValues = record.newValues ? `'${JSON.stringify(record.newValues).replace(/'/g, "''")}'::jsonb` : 'NULL';
                    const changedFields = record.changedFields ? `'${JSON.stringify(record.changedFields).replace(/'/g, "''")}'::jsonb` : 'NULL';
                    const ipAddress = record.ipAddress ? `'${record.ipAddress.replace(/'/g, "''")}'` : 'NULL';
                    const userAgent = record.userAgent ? `'${record.userAgent.replace(/'/g, "''")}'` : 'NULL';
                    const sessionId = record.sessionId ? `'${record.sessionId.replace(/'/g, "''")}'` : 'NULL';
                    const status = record.status ? `'${record.status.replace(/'/g, "''")}'` : "'SUCCESS'";
                    const errorDetails = record.errorDetails ?
                        (typeof record.errorDetails === 'string' ?
                            `'${record.errorDetails.replace(/'/g, "''")}'` :
                            `'${JSON.stringify(record.errorDetails).replace(/'/g, "''")}'`) :
                        'NULL';
                    const metadata = record.metadata ? `'${JSON.stringify(record.metadata).replace(/'/g, "''")}'::jsonb` : 'NULL';
                    const createdAt = record.createdAt ? `'${new Date(record.createdAt).toISOString()}'` : 'NOW()';
                    const updatedAt = record.updatedAt ? `'${new Date(record.updatedAt).toISOString()}'` : 'NOW()';
                    return `(${id}, ${entityName}, ${entityId}, ${action}, ${userEmail}, ${userId}, ${oldValues}, ${newValues}, ${changedFields}, ${ipAddress}, ${userAgent}, ${sessionId}, ${status}, ${errorDetails}, ${metadata}, ${createdAt}, ${updatedAt})`;
                }).join(', ');
                await prisma.$executeRawUnsafe(`
          INSERT INTO "AuditLog" (
            "id", "entityName", "entityId", "action", "userEmail", "userId",
            "oldValues", "newValues", "changedFields", "ipAddress", "userAgent",
            "sessionId", "status", "errorDetails", "metadata", "createdAt", "updatedAt"
          ) VALUES ${values}
          ON CONFLICT (id) DO NOTHING
        `);
                successCount += batch.length;
                console.log(`   ✅ Batch ${currentBatch}/${totalBatches}: ${batch.length} records (${successCount}/${auditLogs.length})`);
            }
            catch (error) {
                console.log(`   ⚠️  Batch ${currentBatch} error: ${error.message}`);
                errorCount += batch.length;
            }
        }
    }
    console.log(`✅ AuditLog fix hoàn thành:`);
    console.log(`   - Thành công: ${successCount} records`);
    console.log(`   - Lỗi: ${errorCount} records`);
    stats.recordsRestored += successCount;
    stats.tablesProcessed++;
    if (errorCount > 0) {
        stats.warnings.push(`AuditLog: ${errorCount} records không thể restore`);
    }
}
async function restoreWithRawSQL(table, data) {
    try {
        if (table === 'performance_logs') {
            console.log(`⚠️  Bỏ qua bảng ${table} - có JSON array syntax issues`);
            stats.warnings.push(`${table}: Skipped due to JSON array syntax`);
            return;
        }
        const columns = Object.keys(data[0])
            .map((col) => `"${col}"`)
            .join(', ');
        const batchSize = 500;
        let totalInserted = 0;
        const totalBatches = Math.ceil(data.length / batchSize);
        for (let i = 0; i < data.length; i += batchSize) {
            try {
                const batch = data.slice(i, i + batchSize);
                const values = batch
                    .map((item) => {
                    return ('(' +
                        Object.values(item)
                            .map((val) => {
                            if (val === null || val === undefined) {
                                return 'NULL';
                            }
                            else if (typeof val === 'string') {
                                return `'${val.replace(/'/g, "''")}'`;
                            }
                            else if (typeof val === 'object') {
                                try {
                                    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
                                }
                                catch {
                                    return 'NULL';
                                }
                            }
                            else if (typeof val === 'boolean') {
                                return val ? 'true' : 'false';
                            }
                            return val;
                        })
                            .join(', ') +
                        ')');
                })
                    .join(', ');
                await prisma.$executeRawUnsafe(`INSERT INTO "${table}" (${columns}) VALUES ${values} ON CONFLICT DO NOTHING`);
                totalInserted += batch.length;
                const currentBatch = Math.floor(i / batchSize) + 1;
                if (currentBatch % 5 === 0 || currentBatch === totalBatches) {
                    console.log(`   📝 Batch ${currentBatch}/${totalBatches}: ${totalInserted}/${data.length} records`);
                }
            }
            catch (batchError) {
                console.log(`⚠️ Raw SQL batch ${Math.floor(i / batchSize) + 1} failed: ${batchError} - Bỏ qua`);
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
    console.log(`   🔄 Đang thử insert với transaction batching...`);
    const TRANSACTION_BATCH = 500;
    const totalBatches = Math.ceil(data.length / TRANSACTION_BATCH);
    for (let i = 0; i < data.length; i += TRANSACTION_BATCH) {
        const batch = data.slice(i, i + TRANSACTION_BATCH);
        const currentBatch = Math.floor(i / TRANSACTION_BATCH) + 1;
        try {
            await prisma.$transaction(async (tx) => {
                for (const record of batch) {
                    await tx[table].create({ data: record });
                }
            });
            successCount += batch.length;
            if (currentBatch % 5 === 0 || currentBatch === totalBatches) {
                console.log(`   ✅ Batch ${currentBatch}/${totalBatches}: ${successCount}/${data.length} records`);
            }
        }
        catch (batchError) {
            console.log(`   ⚠️  Transaction batch ${currentBatch} failed, trying individual inserts...`);
            for (let j = 0; j < batch.length; j++) {
                try {
                    await model.create({ data: batch[j] });
                    successCount++;
                }
                catch (recordError) {
                    errorCount++;
                    if (errorCount <= 5) {
                        console.log(`   ⚠️  Error at record ${i + j}: ${recordError.message}`);
                    }
                }
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
        '_KhachhangNhom',
        '_MenuRole',
        ...tables.filter(t => ![
            'Role', 'Permission', 'Menu', 'Congty', 'Nhomkhachhang', 'ErrorLog',
            'FileManager', 'ChatAIMessage', 'ChatAIHistory', 'File', 'ImportHistory',
            'UserguidStep', 'User', 'Profile', 'UserRole', 'RolePermission', 'AuditLog',
            'Banggia', 'Sanpham', 'Nhacungcap', 'Kho', 'Banggiasanpham',
            'Khachhang', 'SanphamKho', 'TonKho', 'Donhang', 'Dathang', 'PhieuKho',
            'Donhangsanpham', 'Dathangsanpham', 'PhieuKhoSanpham', 'Chotkho',
            'UserguidBlock', '_KhachhangNhom', '_MenuRole'
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
    const args = process.argv.slice(2);
    const fixAuditLogOnly = args.includes('--fix-audit-log');
    if (fixAuditLogOnly) {
        console.log('🔧 CHẠY CHẾ ĐỘ FIX AUDITLOG');
        await runAuditLogFixOnly();
        return;
    }
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
async function runAuditLogFixOnly() {
    try {
        const backupFolder = getLatestBackupFolder();
        if (!backupFolder) {
            console.error('❌ Không tìm thấy thư mục backup nào!');
            return;
        }
        const auditLogFile = path.join(BACKUP_ROOT_DIR, backupFolder, 'AuditLog.json');
        if (!fs.existsSync(auditLogFile)) {
            console.error('❌ Không tìm thấy file AuditLog.json!');
            return;
        }
        console.log(`📂 Đọc dữ liệu từ: ${auditLogFile}`);
        const rawData = fs.readFileSync(auditLogFile, 'utf8');
        const auditLogs = JSON.parse(rawData);
        await restoreAuditLogWithFix(auditLogs);
        console.log('\n✅ Fix AuditLog hoàn thành!');
        console.log(`📊 Kết quả: ${stats.recordsRestored} records restored`);
    }
    catch (error) {
        console.error(`❌ Lỗi khi fix AuditLog: ${error}`);
        stats.errors.push(`AuditLog fix error: ${error}`);
    }
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