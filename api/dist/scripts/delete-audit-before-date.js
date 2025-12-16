"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const readline = require("readline");
const prisma = new client_1.PrismaClient();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}
function parseDate(dateStr) {
    let date = null;
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        date = new Date(dateStr);
    }
    else if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}/.test(dateStr)) {
        const parts = dateStr.split(/[\/\-]/);
        date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    return date && !isNaN(date.getTime()) ? date : null;
}
async function main() {
    console.log('========================================');
    console.log('   XÓA AUDIT LOG TRƯỚC NGÀY CHỈ ĐỊNH   ');
    console.log('========================================\n');
    const totalAuditLogs = await prisma.auditLog.count();
    const oldestLog = await prisma.auditLog.findFirst({
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true }
    });
    const newestLog = await prisma.auditLog.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true }
    });
    console.log(`📊 Thống kê hiện tại:`);
    console.log(`   - Tổng số audit log: ${totalAuditLogs.toLocaleString()}`);
    if (oldestLog) {
        console.log(`   - Log cũ nhất: ${oldestLog.createdAt.toLocaleString('vi-VN')}`);
    }
    if (newestLog) {
        console.log(`   - Log mới nhất: ${newestLog.createdAt.toLocaleString('vi-VN')}`);
    }
    console.log('');
    const dateInput = await question('📅 Nhập ngày (YYYY-MM-DD hoặc DD/MM/YYYY): ');
    const beforeDate = parseDate(dateInput.trim());
    if (!beforeDate) {
        console.log('\n❌ Định dạng ngày không hợp lệ! Vui lòng sử dụng: YYYY-MM-DD hoặc DD/MM/YYYY');
        rl.close();
        return;
    }
    const countToDelete = await prisma.auditLog.count({
        where: {
            createdAt: {
                lt: beforeDate
            }
        }
    });
    if (countToDelete === 0) {
        console.log(`\n✅ Không có audit log nào trước ngày ${beforeDate.toLocaleString('vi-VN')}`);
        rl.close();
        return;
    }
    console.log(`\n⚠️  Sẽ xóa ${countToDelete.toLocaleString()} audit log trước ngày ${beforeDate.toLocaleString('vi-VN')}`);
    const confirm = await question('❓ Bạn có chắc chắn muốn xóa? (yes/no): ');
    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
        console.log('\n🚫 Đã hủy thao tác xóa.');
        rl.close();
        return;
    }
    console.log('\n🔄 Đang xóa audit log...');
    const startTime = Date.now();
    const deleted = await prisma.auditLog.deleteMany({
        where: {
            createdAt: {
                lt: beforeDate
            }
        }
    });
    const endTime = Date.now();
    console.log(`\n✅ Đã xóa ${deleted.count.toLocaleString()} audit log trong ${((endTime - startTime) / 1000).toFixed(2)} giây`);
    const remainingCount = await prisma.auditLog.count();
    console.log(`📊 Còn lại: ${remainingCount.toLocaleString()} audit log`);
    rl.close();
}
main()
    .catch((error) => {
    console.error('❌ Lỗi:', error);
    rl.close();
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=delete-audit-before-date.js.map