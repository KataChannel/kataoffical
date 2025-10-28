const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Script chuyển khách hàng từ banggia BG24_2 sang banggia BG24
 */
async function migrateKhachhangBanggia() {
  try {
    console.log('🔍 [MIGRATE] Bắt đầu migrate khách hàng từ BG24_2 sang BG24');
    console.log('═══════════════════════════════════════════════════════════\n');

    // 1. Tìm banggia BG24_2
    console.log('1️⃣ [SEARCH] Tìm kiếm banggia BG24_2...');
    const banggiaSource = await prisma.banggia.findFirst({
      where: {
        mabanggia: 'BG24_2'
      },
      include: {
        khachhang: {
          select: {
            id: true,
            name: true,
            makh: true,
            email: true,
            sdt: true
          }
        }
      }
    });

    if (!banggiaSource) {
      console.error('❌ [ERROR] Không tìm thấy banggia với mabanggia = BG24_2');
      console.log('Vui lòng kiểm tra lại tên bảng giá\n');
      return;
    }

    console.log(`✅ [FOUND] Tìm thấy banggia BG24_2`);
    console.log(`   ID: ${banggiaSource.id}`);
    console.log(`   Title: ${banggiaSource.title}`);
    console.log(`   Số lượng khách hàng: ${banggiaSource.khachhang.length}\n`);

    if (banggiaSource.khachhang.length === 0) {
      console.warn('⚠️ [WARNING] BG24_2 không có khách hàng để chuyển!');
      return;
    }

    console.log('📋 [LIST] Danh sách khách hàng trong BG24_2:');
    banggiaSource.khachhang.forEach((kh, idx) => {
      console.log(`   ${idx + 1}. [${kh.makh}] ${kh.name} | Email: ${kh.email} | SĐT: ${kh.sdt}`);
    });
    console.log('');

    // 2. Tìm banggia BG24
    console.log('2️⃣ [SEARCH] Tìm kiếm banggia BG24...');
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
      console.error('❌ [ERROR] Không tìm thấy banggia với mabanggia = BG24');
      console.log('Vui lòng kiểm tra lại tên bảng giá\n');
      return;
    }

    console.log(`✅ [FOUND] Tìm thấy banggia BG24`);
    console.log(`   ID: ${banggiaTarget.id}`);
    console.log(`   Title: ${banggiaTarget.title}`);
    console.log(`   Số lượng khách hàng hiện tại: ${banggiaTarget.khachhang.length}\n`);

    // 3. Lấy danh sách ID khách hàng từ BG24_2
    const khachhangIdsToMigrate = banggiaSource.khachhang.map(kh => kh.id);
    console.log(`3️⃣ [PREPARE] Chuẩn bị chuyển ${khachhangIdsToMigrate.length} khách hàng...\n`);

    // 4. Disconnect khachhang từ BG24_2
    console.log(`4️⃣ [DISCONNECT] Ngắt kết nối khách hàng khỏi BG24_2...`);
    const disconnectResult = await prisma.banggia.update({
      where: { id: banggiaSource.id },
      data: {
        khachhang: {
          disconnect: khachhangIdsToMigrate.map(id => ({ id }))
        }
      }
    });
    console.log(`✅ [SUCCESS] Đã ngắt kết nối ${khachhangIdsToMigrate.length} khách hàng\n`);

    // 5. Connect khachhang tới BG24
    console.log(`5️⃣ [CONNECT] Kết nối khách hàng vào BG24...`);
    const connectResult = await prisma.banggia.update({
      where: { id: banggiaTarget.id },
      data: {
        khachhang: {
          connect: khachhangIdsToMigrate.map(id => ({ id }))
        }
      }
    });
    console.log(`✅ [SUCCESS] Đã kết nối ${khachhangIdsToMigrate.length} khách hàng\n`);

    // 6. Verify kết quả
    console.log(`6️⃣ [VERIFY] Kiểm tra kết quả migrate...\n`);
    
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

    // In kết quả
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 [RESULT] KẾT QUẢ MIGRATE:');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    console.log(`📌 BG24_2 - Số khách hàng sau migrate: ${banggiaSourceVerify?.khachhang.length || 0}`);
    if (banggiaSourceVerify?.khachhang.length === 0) {
      console.log('   ✓ Không còn khách hàng (đã chuyển hết)\n');
    }

    console.log(`📌 BG24 - Số khách hàng sau migrate: ${banggiaTargetVerify?.khachhang.length || 0}`);
    if (banggiaTargetVerify?.khachhang) {
      console.log('   Danh sách khách hàng:');
      banggiaTargetVerify.khachhang.forEach((kh, idx) => {
        console.log(`   ${idx + 1}. [${kh.makh}] ${kh.name}`);
      });
    }

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ ✅ ✅ MIGRATE HOÀN TẤT THÀNH CÔNG! ✅ ✅ ✅');
    console.log('═══════════════════════════════════════════════════════════\n');

    return {
      success: true,
      migratedCount: khachhangIdsToMigrate.length,
      source: 'BG24_2',
      target: 'BG24'
    };

  } catch (error) {
    console.error('\n❌ [ERROR] Lỗi migrate khách hàng:');
    console.error(error.message || error);
    console.error('\n❌ MIGRATE THẤT BẠI!\n');
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Chạy script nếu được gọi trực tiếp
if (require.main === module) {
  migrateKhachhangBanggia()
    .then(result => {
      if (result) {
        console.log('✨ Script hoàn tất\n');
      }
      process.exit(0);
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

// Export để sử dụng trong file khác
module.exports = { migrateKhachhangBanggia };
