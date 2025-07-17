import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function truncateTable(tableName: string) {
    try {
        // Xóa bỏ ràng buộc khóa ngoại tạm thời
        await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
        await prisma.$executeRaw`TRUNCATE TABLE ${tableName};`;
        await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
        console.log(`✅ Đã truncate bảng ${tableName}`);
    } catch (error) {
        console.error(`❌ Lỗi khi truncate bảng ${tableName}:`);
        console.error(`   - Mã lỗi: ${error.code || 'N/A'}`);
        console.error(`   - Chi tiết: ${error.message}`);
        console.error(`   - Meta: ${JSON.stringify(error.meta || {}, null, 2)}`);
        console.log(`🔄 Tiếp tục với bảng tiếp theo...`);
    }
}

async function main() {
    console.log('🔄 Bắt đầu reset dữ liệu...');

    const tables = [
        'ThanhToanHoaHong',
        'HoaHong',
        'Doanhthu',
        'Doanhso',
        'TrackingEvent',
        'Dichvu',
        'Lichhen',
        'Khoahoc',
        'User'
    ];

    for (const table of tables) {
        await truncateTable(table);
    }

    console.log('🎉 Hoàn thành reset dữ liệu!');
}

main()
    .catch((e) => {
        console.error('❌ Lỗi nghiêm trọng:');
        console.error(`   - Mã lỗi: ${e.code || 'N/A'}`);
        console.error(`   - Chi tiết: ${e.message}`);
        console.error(`   - Stack trace: ${e.stack}`);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
