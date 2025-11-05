/**
 * Test script to verify audit logs for import functions
 * Run: bun run test-audit-import.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAuditImportLogs() {
  console.log('🔍 Kiểm tra Audit Logs cho các chức năng Import\n');
  console.log('='.repeat(80));

  try {
    // 1. Kiểm tra Import Donhang logs
    console.log('\n📦 1. Kiểm tra Import Donhang Logs');
    console.log('-'.repeat(80));
    
    const donhangImportLogs = await prisma.auditLog.findMany({
      where: {
        entityName: {
          contains: 'Import Donhang',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        user: {
          select: {
            email: true,
            SDT: true,
          },
        },
      },
    });

    console.log(`\n✅ Tìm thấy ${donhangImportLogs.length} log Import Donhang (10 gần nhất)`);
    
    if (donhangImportLogs.length > 0) {
      console.log('\nChi tiết:');
      donhangImportLogs.forEach((log, index) => {
        console.log(`\n${index + 1}. ${log.entityName} - ${log.action}`);
        console.log(`   User: ${log.user?.email || 'N/A'}`);
        console.log(`   Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
        console.log(`   Has oldValues: ${!!log.oldValues}`);
        console.log(`   Has newValues: ${!!log.newValues}`);
        
        // Show sample of newValues if exists
        if (log.newValues) {
          const newValues = log.newValues as any;
          if (newValues.success !== undefined) {
            console.log(`   Result: Success=${newValues.success}, Fail=${newValues.fail}`);
          }
        }
      });
    } else {
      console.log('\n⚠️ Chưa có log nào cho Import Donhang');
    }

    // 2. Kiểm tra Import Dathang logs
    console.log('\n\n📦 2. Kiểm tra Import Dathang Logs');
    console.log('-'.repeat(80));
    
    const dathangImportLogs = await prisma.auditLog.findMany({
      where: {
        entityName: {
          contains: 'Import Dathang',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        user: {
          select: {
            email: true,
            SDT: true,
          },
        },
      },
    });

    console.log(`\n✅ Tìm thấy ${dathangImportLogs.length} log Import Dathang (10 gần nhất)`);
    
    if (dathangImportLogs.length > 0) {
      console.log('\nChi tiết:');
      dathangImportLogs.forEach((log, index) => {
        console.log(`\n${index + 1}. ${log.entityName} - ${log.action}`);
        console.log(`   User: ${log.user?.email || 'N/A'}`);
        console.log(`   Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
        console.log(`   Has oldValues: ${!!log.oldValues}`);
        console.log(`   Has newValues: ${!!log.newValues}`);
      });
    } else {
      console.log('\n⚠️ Chưa có log nào cho Import Dathang');
    }

    // 3. Kiểm tra Create Donhang/Dathang logs (được gọi từ import)
    console.log('\n\n📦 3. Kiểm tra Create Donhang/Dathang Logs (từ Import)');
    console.log('-'.repeat(80));
    
    const createLogs = await prisma.auditLog.findMany({
      where: {
        OR: [
          { entityName: 'Create Donhang' },
          { entityName: 'Create Dathang' },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        user: {
          select: {
            email: true,
            SDT: true,
          },
        },
      },
    });

    console.log(`\n✅ Tìm thấy ${createLogs.length} log Create (10 gần nhất)`);
    
    if (createLogs.length > 0) {
      console.log('\nChi tiết:');
      createLogs.forEach((log, index) => {
        console.log(`\n${index + 1}. ${log.entityName} - ${log.action}`);
        console.log(`   User: ${log.user?.email || 'N/A'}`);
        console.log(`   Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
        
        // Show madonhang if available
        if (log.newValues) {
          const newValues = log.newValues as any;
          if (newValues.madonhang) {
            console.log(`   Mã đơn: ${newValues.madonhang}`);
          }
          if (newValues.madathang) {
            console.log(`   Mã đặt: ${newValues.madathang}`);
          }
        }
      });
    } else {
      console.log('\n⚠️ Chưa có log nào cho Create Donhang/Dathang');
    }

    // 4. Thống kê tổng quan
    console.log('\n\n📊 4. Thống kê Tổng quan');
    console.log('-'.repeat(80));
    
    const stats = await prisma.auditLog.groupBy({
      by: ['entityName', 'action'],
      where: {
        OR: [
          { entityName: { contains: 'Import Donhang' } },
          { entityName: { contains: 'Import Dathang' } },
          { entityName: 'Create Donhang' },
          { entityName: 'Create Dathang' },
        ],
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    console.log('\nSố lượng log theo chức năng:');
    stats.forEach((stat) => {
      console.log(`  ${stat.entityName} (${stat.action}): ${stat._count.id} logs`);
    });

    // 5. Kiểm tra log trong 7 ngày gần nhất
    console.log('\n\n📅 5. Logs trong 7 ngày gần nhất');
    console.log('-'.repeat(80));
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentLogs = await prisma.auditLog.count({
      where: {
        AND: [
          {
            OR: [
              { entityName: { contains: 'Import Donhang' } },
              { entityName: { contains: 'Import Dathang' } },
            ],
          },
          {
            createdAt: {
              gte: sevenDaysAgo,
            },
          },
        ],
      },
    });

    console.log(`\n✅ Tổng số log Import trong 7 ngày: ${recentLogs}`);

    // 6. Kiểm tra sample log để verify JSON search hoạt động
    console.log('\n\n🔍 6. Kiểm tra JSON Search (Sample)');
    console.log('-'.repeat(80));
    
    const sampleLog = await prisma.auditLog.findFirst({
      where: {
        OR: [
          { entityName: { contains: 'Import Donhang' } },
          { entityName: { contains: 'Create Donhang' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (sampleLog) {
      console.log('\n✅ Sample log tìm thấy:');
      console.log(`   Entity: ${sampleLog.entityName}`);
      console.log(`   Action: ${sampleLog.action}`);
      console.log(`   Created: ${sampleLog.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
      
      // Try to extract some searchable values
      const newValues = sampleLog.newValues as any;
      console.log('\n   Dữ liệu có thể tìm kiếm trong JSON:');
      
      if (newValues.madonhang) {
        console.log(`   - Mã đơn hàng: ${newValues.madonhang}`);
        
        // Test raw SQL search
        console.log('\n   🧪 Test JSON search với mã đơn này:');
        const searchResult = await prisma.$queryRawUnsafe(`
          SELECT COUNT(*) as count 
          FROM "AuditLog" 
          WHERE ("oldValues"::text ILIKE '%${newValues.madonhang}%' 
             OR "newValues"::text ILIKE '%${newValues.madonhang}%')
        `);
        console.log(`   ✅ Tìm thấy ${(searchResult as any)[0].count} log chứa mã đơn này`);
      }
      
      if (newValues.successList && Array.isArray(newValues.successList)) {
        console.log(`   - Số đơn import thành công: ${newValues.successList.length}`);
        if (newValues.successList.length > 0) {
          const firstOrder = newValues.successList[0];
          if (firstOrder.makh) {
            console.log(`   - Mã khách hàng: ${firstOrder.makh}`);
          }
        }
      }
    } else {
      console.log('\n⚠️ Không tìm thấy sample log với newValues');
    }

  } catch (error) {
    console.error('\n❌ Lỗi khi kiểm tra audit logs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testAuditImportLogs()
  .then(() => {
    console.log('\n' + '='.repeat(80));
    console.log('✅ Hoàn tất kiểm tra audit logs');
    console.log('='.repeat(80) + '\n');
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
