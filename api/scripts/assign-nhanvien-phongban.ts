import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Phân bổ nhân viên vào phòng ban dựa trên tên/chức danh
// Có thể adjust mapping này theo yêu cầu thực tế
const nhanvienAssignments = [
  // Kho vận - Chia hàng (CH)
  { maNV: 'NV0012', phongbanMa: 'CH', chucVu: 'Nhân viên chia hàng' },
  { maNV: 'NV0013', phongbanMa: 'CH', chucVu: 'Nhân viên chia hàng' },
  { maNV: 'NV0014', phongbanMa: 'CH', chucVu: 'Nhân viên chia hàng' },
  
  // Kho vận - Sơ chế (SC)
  { maNV: 'NV0015', phongbanMa: 'SC', chucVu: 'Nhân viên sơ chế' },
  { maNV: 'NV0016', phongbanMa: 'SC', chucVu: 'Nhân viên sơ chế' },
  { maNV: 'NV0017', phongbanMa: 'SC', chucVu: 'Nhân viên sơ chế' },
  { maNV: 'NV0018', phongbanMa: 'SC', chucVu: 'Nhân viên sơ chế' },
  
  // Kho vận - Shipper (SHIP)
  { maNV: 'NV0019', phongbanMa: 'SHIP', chucVu: 'Shipper' },
  { maNV: 'NV0020', phongbanMa: 'SHIP', chucVu: 'Shipper' },
  { maNV: 'NV0021', phongbanMa: 'SHIP', chucVu: 'Shipper' },
  { maNV: 'NV0022', phongbanMa: 'SHIP', chucVu: 'Shipper' },
  { maNV: 'NV0023', phongbanMa: 'SHIP', chucVu: 'Shipper' },
  
  // Kho vận - Kế toán kho (KTK)
  { maNV: 'NV0024', phongbanMa: 'KTK', chucVu: 'Kế toán kho' },
  { maNV: 'NV0025', phongbanMa: 'KTK', chucVu: 'Kế toán kho' },
  
  // Marketing (MKT)
  { maNV: 'NV0026', phongbanMa: 'MKT', chucVu: 'Nhân viên Marketing' },
  { maNV: 'NV0027', phongbanMa: 'MKT', chucVu: 'Nhân viên Marketing' },
  { maNV: 'NV0028', phongbanMa: 'MKT', chucVu: 'Nhân viên Marketing' },
  
  // Ban giám đốc (BGD)
  { maNV: 'NV0029', phongbanMa: 'BGD', chucVu: 'Trợ lý giám đốc' },
  { maNV: 'NV0030', phongbanMa: 'BGD', chucVu: 'Trợ lý giám đốc' },
  
  // Kho vận chung (KV) - nhân viên kho tổng hợp
  { maNV: 'NV0031', phongbanMa: 'KV', chucVu: 'Nhân viên kho' },
  { maNV: 'NV0032', phongbanMa: 'KV', chucVu: 'Nhân viên kho' },
];

async function assignNhanvienToPhongban() {
  console.log('📋 Assigning 21 nhân viên to phòng ban...\n');

  try {
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const assignment of nhanvienAssignments) {
      try {
        // Tìm phòng ban theo mã
        const phongban = await prisma.phongban.findUnique({
          where: { ma: assignment.phongbanMa }
        });

        if (!phongban) {
          throw new Error(`Phòng ban ${assignment.phongbanMa} không tồn tại`);
        }

        // Cập nhật nhân viên
        await prisma.nhanvien.update({
          where: { maNV: assignment.maNV },
          data: {
            phongbanId: phongban.id,
            chucVu: assignment.chucVu
          }
        });

        console.log(`✅ ${assignment.maNV} → ${assignment.phongbanMa} (${phongban.ten}) - ${assignment.chucVu}`);
        successCount++;

      } catch (error) {
        const errorMsg = `❌ ${assignment.maNV}: ${error instanceof Error ? error.message : String(error)}`;
        console.log(errorMsg);
        errors.push(errorMsg);
        errorCount++;
      }
    }

    // Verify kết quả
    console.log('\n📊 Verification Results:\n');
    
    const phongbanStats = await prisma.phongban.findMany({
      include: {
        _count: {
          select: { nhanviens: true }
        },
        parent: true
      },
      orderBy: [
        { level: 'asc' },
        { ma: 'asc' }
      ]
    });

    for (const pb of phongbanStats) {
      const parentInfo = pb.parentId ? ` (thuộc ${pb.parent?.ten})` : '';
      console.log(`📁 ${pb.ma} - ${pb.ten}${parentInfo}: ${pb._count.nhanviens} nhân viên`);
    }

    // Kiểm tra nhân viên chưa có phòng ban
    const unassignedCount = await prisma.nhanvien.count({
      where: { phongbanId: null }
    });

    console.log(`\n📌 Summary:`);
    console.log(`   ✅ Assigned: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   ⚠️  Unassigned remaining: ${unassignedCount}`);
    console.log(`   📦 Total nhân viên: ${await prisma.nhanvien.count()}`);

    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(err => console.log(err));
    }

    console.log('\n✅ Assignment completed!');

  } catch (error) {
    console.error('❌ Error assigning nhân viên:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the assignment
assignNhanvienToPhongban()
  .catch(console.error);
