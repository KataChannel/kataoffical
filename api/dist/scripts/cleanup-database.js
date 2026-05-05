"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getTableStats() {
    console.log('\n📊 ═══════════════════════════════════════');
    console.log('       THỐNG KÊ DUNG LƯỢNG DATABASE        ');
    console.log('═══════════════════════════════════════════\n');
    const stats = [
        { name: 'AuditLog', count: await prisma.auditLog.count() },
        { name: 'PerformanceLog', count: await prisma.performanceLog.count() },
        { name: 'ErrorLog', count: await prisma.errorLog.count() },
        { name: 'ImportHistory', count: await prisma.importHistory.count() },
        { name: 'ChatAIMessage', count: await prisma.chatAIMessage.count() },
        { name: 'ChatAIHistory', count: await prisma.chatAIHistory.count() },
        { name: 'BanggiasanphamHistory', count: await prisma.banggiasanphamHistory.count() },
        { name: 'DonhangPriceAudit', count: await prisma.donhangPriceAudit.count() },
        { name: 'Donhang', count: await prisma.donhang.count() },
        { name: 'Donhangsanpham', count: await prisma.donhangsanpham.count() },
        { name: 'Dathang', count: await prisma.dathang.count() },
        { name: 'Dathangsanpham', count: await prisma.dathangsanpham.count() },
        { name: 'Chotkho', count: await prisma.chotkho.count() },
        { name: 'Chotkhodetail', count: await prisma.chotkhodetail.count() },
        { name: 'PhieuKho', count: await prisma.phieuKho.count() },
        { name: 'PhieuKhoSanpham', count: await prisma.phieuKhoSanpham.count() },
        { name: 'Sanpham', count: await prisma.sanpham.count() },
        { name: 'Khachhang', count: await prisma.khachhang.count() },
        { name: 'Nhacungcap', count: await prisma.nhacungcap.count() },
    ];
    stats.sort((a, b) => b.count - a.count);
    console.log('  Bảng                          | Số dòng');
    console.log('  ──────────────────────────────┼──────────');
    for (const s of stats) {
        const name = s.name.padEnd(30);
        const count = s.count.toLocaleString().padStart(10);
        const bar = '█'.repeat(Math.min(Math.floor(s.count / 500), 30));
        console.log(`  ${name}| ${count} ${bar}`);
    }
    const totalRows = stats.reduce((sum, s) => sum + s.count, 0);
    console.log('  ──────────────────────────────┼──────────');
    console.log(`  ${'TỔNG'.padEnd(30)}| ${totalRows.toLocaleString().padStart(10)}`);
    return stats;
}
async function cleanupLogTables(dryRun = false) {
    const results = [];
    const now = new Date();
    const cleanupConfig = [
        {
            name: 'AuditLog',
            keepDays: 30,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.auditLog.count({ where: { createdAt: { lt: beforeDate } } }) };
                return prisma.auditLog.deleteMany({ where: { createdAt: { lt: beforeDate } } });
            },
            countFunc: () => prisma.auditLog.count(),
        },
        {
            name: 'PerformanceLog',
            keepDays: 7,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.performanceLog.count({ where: { timestamp: { lt: beforeDate } } }) };
                return prisma.performanceLog.deleteMany({ where: { timestamp: { lt: beforeDate } } });
            },
            countFunc: () => prisma.performanceLog.count(),
        },
        {
            name: 'ErrorLog',
            keepDays: 14,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.errorLog.count({ where: { createdAt: { lt: beforeDate } } }) };
                return prisma.errorLog.deleteMany({ where: { createdAt: { lt: beforeDate } } });
            },
            countFunc: () => prisma.errorLog.count(),
        },
        {
            name: 'ImportHistory',
            keepDays: 30,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.importHistory.count({ where: { createdAt: { lt: beforeDate } } }) };
                return prisma.importHistory.deleteMany({ where: { createdAt: { lt: beforeDate } } });
            },
            countFunc: () => prisma.importHistory.count(),
        },
        {
            name: 'ChatAIMessage',
            keepDays: 30,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.chatAIMessage.count({ where: { createdAt: { lt: beforeDate } } }) };
                return prisma.chatAIMessage.deleteMany({ where: { createdAt: { lt: beforeDate } } });
            },
            countFunc: () => prisma.chatAIMessage.count(),
        },
        {
            name: 'ChatAIHistory',
            keepDays: 30,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.chatAIHistory.count({ where: { createdAt: { lt: beforeDate } } }) };
                return prisma.chatAIHistory.deleteMany({ where: { createdAt: { lt: beforeDate } } });
            },
            countFunc: () => prisma.chatAIHistory.count(),
        },
        {
            name: 'BanggiasanphamHistory (> 90 ngày)',
            keepDays: 90,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.banggiasanphamHistory.count({ where: { changedAt: { lt: beforeDate } } }) };
                return prisma.banggiasanphamHistory.deleteMany({ where: { changedAt: { lt: beforeDate } } });
            },
            countFunc: () => prisma.banggiasanphamHistory.count(),
        },
        {
            name: 'DonhangPriceAudit (> 90 ngày)',
            keepDays: 90,
            deleteFunc: async (beforeDate) => {
                if (dryRun)
                    return { count: await prisma.donhangPriceAudit.count({ where: { createdAt: { lt: beforeDate } } }) };
                return prisma.donhangPriceAudit.deleteMany({ where: { createdAt: { lt: beforeDate } } });
            },
            countFunc: () => prisma.donhangPriceAudit.count(),
        },
    ];
    console.log(`\n${dryRun ? '🔍 CHẾ ĐỘ XEM TRƯỚC (DRY RUN)' : '🗑️  ĐANG DỌN DẸP'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    for (const config of cleanupConfig) {
        const beforeDate = new Date(now.getTime() - config.keepDays * 24 * 60 * 60 * 1000);
        const beforeStr = beforeDate.toLocaleDateString('vi-VN');
        try {
            const result = await config.deleteFunc(beforeDate);
            const remaining = await config.countFunc();
            const deleted = result.count;
            const savedKB = deleted * 1;
            const savedEstimate = savedKB > 1024
                ? `~${(savedKB / 1024).toFixed(1)} MB`
                : `~${savedKB} KB`;
            results.push({
                table: config.name,
                deleted,
                remaining,
                savedEstimate,
            });
            const icon = deleted > 0 ? '✅' : '⏭️';
            console.log(`  ${icon} ${config.name}`);
            console.log(`     Giữ: ${config.keepDays} ngày | Trước: ${beforeStr}`);
            console.log(`     ${dryRun ? 'Sẽ xóa' : 'Đã xóa'}: ${deleted.toLocaleString()} | Còn lại: ${remaining.toLocaleString()} | Tiết kiệm: ${savedEstimate}`);
            console.log('');
        }
        catch (error) {
            console.log(`  ❌ ${config.name}: Lỗi - ${error.message}`);
        }
    }
    return results;
}
async function main() {
    const args = process.argv.slice(2);
    const isDryRun = !args.includes('--execute');
    const showStats = args.includes('--stats') || args.length === 0;
    console.log('╔═══════════════════════════════════════════════╗');
    console.log('║   🧹 DỌN DẸP DATABASE - RAUSACHFINAL         ║');
    console.log('║   Tối ưu hóa lưu trữ & tăng tốc hệ thống    ║');
    console.log('╚═══════════════════════════════════════════════╝');
    await getTableStats();
    if (showStats && !args.includes('--dry-run') && !args.includes('--execute')) {
        console.log('\n💡 Cách sử dụng:');
        console.log('   --stats      Chỉ xem thống kê (mặc định)');
        console.log('   --dry-run    Xem trước sẽ xóa bao nhiêu (không xóa thật)');
        console.log('   --execute    Thực hiện dọn dẹp thật');
        console.log('\n   Ví dụ: cd api && npx ts-node scripts/cleanup-database.ts --dry-run');
        console.log('   Ví dụ: cd api && npx ts-node scripts/cleanup-database.ts --execute');
        return;
    }
    if (isDryRun || args.includes('--dry-run')) {
        const results = await cleanupLogTables(true);
        const totalWillDelete = results.reduce((sum, r) => sum + r.deleted, 0);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n📋 TỔNG KẾT: Sẽ xóa ${totalWillDelete.toLocaleString()} dòng`);
        console.log('\n⚠️  Đây chỉ là XEM TRƯỚC. Dùng --execute để xóa thật.');
        return;
    }
    console.log('\n⚠️  CẢNH BÁO: Sẽ XÓA dữ liệu thật!');
    console.log('   Hãy đảm bảo đã BACKUP trước khi tiếp tục.\n');
    const results = await cleanupLogTables(false);
    const totalDeleted = results.reduce((sum, r) => sum + r.deleted, 0);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n🎉 ĐÃ DỌN DẸP: ${totalDeleted.toLocaleString()} dòng`);
    console.log('\n💡 Tip: Chạy VACUUM ANALYZE trên PostgreSQL để thu hồi disk space:');
    console.log('   psql -d testdata -c "VACUUM (VERBOSE, ANALYZE);"');
}
main()
    .catch((error) => {
    console.error('❌ Lỗi:', error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=cleanup-database.js.map