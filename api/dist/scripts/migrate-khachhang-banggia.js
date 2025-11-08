"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function migrateKhachhang() {
    try {
        console.log('🔍 [MIGRATE] Bắt đầu migrate khách hàng từ BG24_2 sang BG24');
        const banggiaSource = await prisma.banggia.findFirst({
            where: {
                mabanggia: 'BG24_2'
            },
            include: {
                khachhang: {
                    select: {
                        id: true,
                        name: true,
                        makh: true
                    }
                }
            }
        });
        if (!banggiaSource) {
            console.error('❌ Không tìm thấy banggia với mabanggia = BG24_2');
            return;
        }
        console.log(`✅ Tìm thấy banggia BG24_2 với ID: ${banggiaSource.id}`);
        console.log(`📊 Số lượng khách hàng trong BG24_2: ${banggiaSource.khachhang.length}`);
        console.log('   Danh sách khách hàng:', banggiaSource.khachhang.map(kh => `${kh.makh} - ${kh.name}`));
        const banggiaTarget = await prisma.banggia.findFirst({
            where: {
                mabanggia: 'BG24'
            },
            include: {
                khachhang: {
                    select: {
                        id: true,
                        name: true,
                        makh: true
                    }
                }
            }
        });
        if (!banggiaTarget) {
            console.error('❌ Không tìm thấy banggia với mabanggia = BG24');
            return;
        }
        console.log(`\n✅ Tìm thấy banggia BG24 với ID: ${banggiaTarget.id}`);
        console.log(`📊 Số lượng khách hàng hiện tại trong BG24: ${banggiaTarget.khachhang.length}`);
        console.log('   Danh sách khách hàng:', banggiaTarget.khachhang.map(kh => `${kh.makh} - ${kh.name}`));
        const khachhangIdsToMigrate = banggiaSource.khachhang.map(kh => kh.id);
        console.log(`\n🔄 [MIGRATE] Sẽ chuyển ${khachhangIdsToMigrate.length} khách hàng từ BG24_2 sang BG24`);
        console.log(`\n🔌 [DISCONNECT] Đang ngắt kết nối khách hàng khỏi BG24_2...`);
        await prisma.banggia.update({
            where: { id: banggiaSource.id },
            data: {
                khachhang: {
                    disconnect: khachhangIdsToMigrate.map(id => ({ id }))
                }
            }
        });
        console.log(`✅ Đã ngắt kết nối ${khachhangIdsToMigrate.length} khách hàng khỏi BG24_2`);
        console.log(`\n🔗 [CONNECT] Đang kết nối khách hàng vào BG24...`);
        await prisma.banggia.update({
            where: { id: banggiaTarget.id },
            data: {
                khachhang: {
                    connect: khachhangIdsToMigrate.map(id => ({ id }))
                }
            }
        });
        console.log(`✅ Đã kết nối ${khachhangIdsToMigrate.length} khách hàng vào BG24`);
        console.log(`\n✔️ [VERIFY] Kiểm tra kết quả migrate...`);
        const banggiaSourceVerify = await prisma.banggia.findFirst({
            where: {
                mabanggia: 'BG24_2'
            },
            include: {
                khachhang: {
                    select: {
                        id: true,
                        name: true,
                        makh: true
                    }
                }
            }
        });
        const banggiaTargetVerify = await prisma.banggia.findFirst({
            where: {
                mabanggia: 'BG24'
            },
            include: {
                khachhang: {
                    select: {
                        id: true,
                        name: true,
                        makh: true
                    }
                }
            }
        });
        console.log(`\n📊 KẾT QUẢ MIGRATE:`);
        console.log(`   BG24_2 hiện có: ${banggiaSourceVerify?.khachhang.length || 0} khách hàng`);
        console.log(`   BG24 hiện có: ${banggiaTargetVerify?.khachhang.length || 0} khách hàng`);
        if (banggiaTargetVerify?.khachhang) {
            console.log(`\n   Danh sách khách hàng trong BG24 sau migrate:`);
            banggiaTargetVerify.khachhang.forEach(kh => {
                console.log(`   ✓ ${kh.makh} - ${kh.name}`);
            });
        }
        console.log(`\n✅ ✅ ✅ MIGRATE HOÀN TẤT THÀNH CÔNG! ✅ ✅ ✅`);
    }
    catch (error) {
        console.error('❌ Lỗi migrate:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
migrateKhachhang().catch(error => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=migrate-khachhang-banggia.js.map