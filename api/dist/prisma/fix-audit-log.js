"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
async function fixAuditLogFields() {
    console.log('🔧 Đang sửa lỗi fields trong bảng AuditLog...');
    const backupRootDir = './rausach_json';
    const folders = fs.readdirSync(backupRootDir)
        .filter(folder => /^\d{8}_\d{6}$/.test(folder))
        .sort()
        .reverse();
    if (folders.length === 0) {
        console.error('❌ Không tìm thấy thư mục backup!');
        return;
    }
    const latestFolder = folders[0];
    const auditLogFile = path.join(backupRootDir, latestFolder, 'AuditLog.json');
    if (!fs.existsSync(auditLogFile)) {
        console.error('❌ Không tìm thấy file AuditLog.json!');
        return;
    }
    console.log(`📂 Đọc dữ liệu từ: ${auditLogFile}`);
    const rawData = fs.readFileSync(auditLogFile, 'utf8');
    const auditLogs = JSON.parse(rawData);
    console.log(`📊 Tìm thấy ${auditLogs.length} records AuditLog`);
    console.log('🗑️ Xóa dữ liệu AuditLog hiện tại...');
    await prisma.auditLog.deleteMany({});
    let successCount = 0;
    let errorCount = 0;
    console.log('💾 Đang insert dữ liệu đã fix...');
    for (let i = 0; i < auditLogs.length; i++) {
        try {
            const record = auditLogs[i];
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
                ...(record.userId && record.userId.trim() !== '' ? {
                    user: {
                        connect: { id: record.userId }
                    }
                } : {})
            };
            await prisma.auditLog.create({
                data: transformedRecord
            });
            successCount++;
            if (i % 100 === 0 && i > 0) {
                console.log(`   Progress: ${i}/${auditLogs.length} processed...`);
            }
        }
        catch (error) {
            errorCount++;
            if (errorCount <= 5) {
                console.log(`   ⚠️  Error at record ${i}: ${error.message}`);
            }
        }
    }
    console.log(`✅ AuditLog fix hoàn thành:`);
    console.log(`   - Thành công: ${successCount} records`);
    console.log(`   - Lỗi: ${errorCount} records`);
    await prisma.$disconnect();
}
fixAuditLogFields().catch(console.error);
//# sourceMappingURL=fix-audit-log.js.map