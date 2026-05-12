"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const tables = ['AuditLog', 'performance_logs', 'ImportHistory', 'BanggiasanphamHistory'];
    for (const table of tables) {
        console.log(`🌐 Đang thực thi VACUUE ANALYZE trên bảng "${table}"...`);
        try {
            await prisma.$executeRawUnsafe(`VACUUM ANALYZE "${table}"`);
            console.log(`✅ Hoàn tất tối ưu bảng "${table}"`);
        }
        catch (error) {
            console.error(`❌ Lỗi khi tối ưu bảng "${table}":`, error.message);
        }
    }
    await prisma.$disconnect();
}
main();
//# sourceMappingURL=vacuum-tables.js.map