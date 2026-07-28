import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyImport() {
  console.log('🔍 Verifying import data...\n');
  console.log('=' .repeat(70));
  
  // 1. Phòng ban statistics
  console.log('\n📊 PHÒNG BAN STATISTICS:');
  console.log('─'.repeat(70));
  
  const allPhongban = await prisma.phongban.findMany({
    include: {
      _count: {
        select: {
          nhanviens: true,
          children: true,
        }
      },
      parent: {
        select: {
          ma: true,
          ten: true,
        }
      }
    },
    orderBy: [
      { level: 'asc' },
      { ma: 'asc' }
    ]
  });
  
  console.log(`\nTotal: ${allPhongban.length} phòng ban\n`);
  
  for (const pb of allPhongban) {
    const parentInfo = pb.parent ? ` (thuộc ${pb.parent.ma})` : '';
    console.log(`${pb.ma.padEnd(8)} | ${pb.ten.padEnd(30)} | Level ${pb.level} | ${pb.loai.padEnd(10)} | ${pb._count.nhanviens} NV | ${pb._count.children} BP con${parentInfo}`);
  }
  
  // 2. Nhân viên by phòng ban
  console.log('\n\n📊 NHÂN VIÊN BY PHÒNG BAN:');
  console.log('─'.repeat(70));
  
  const phongbanWithNhanvien = await prisma.phongban.findMany({
    include: {
      nhanviens: {
        select: {
          maNV: true,
          hoTen: true,
          trangThai: true,
        },
        orderBy: {
          maNV: 'asc'
        }
      }
    },
    orderBy: {
      ma: 'asc'
    }
  });
  
  for (const pb of phongbanWithNhanvien) {
    if (pb.nhanviens.length > 0) {
      console.log(`\n🏢 ${pb.ma} - ${pb.ten} (${pb.nhanviens.length} nhân viên):`);
      for (const nv of pb.nhanviens) {
        console.log(`   • ${nv.maNV} - ${nv.hoTen} [${nv.trangThai}]`);
      }
    }
  }
  
  // 3. Nhân viên không có phòng ban
  console.log('\n\n📊 NHÂN VIÊN KHÔNG CÓ PHÒNG BAN:');
  console.log('─'.repeat(70));
  
  const nhanvienNoPhongban = await prisma.nhanvien.findMany({
    where: {
      phongbanId: null
    },
    select: {
      maNV: true,
      hoTen: true,
      trangThai: true,
    },
    orderBy: {
      maNV: 'asc'
    }
  });
  
  if (nhanvienNoPhongban.length > 0) {
    console.log(`\nTotal: ${nhanvienNoPhongban.length} nhân viên\n`);
    for (const nv of nhanvienNoPhongban) {
      console.log(`   • ${nv.maNV} - ${nv.hoTen} [${nv.trangThai}]`);
    }
  } else {
    console.log('\n✅ Tất cả nhân viên đều đã được phân công phòng ban!');
  }
  
  // 4. Summary
  console.log('\n\n📊 SUMMARY:');
  console.log('─'.repeat(70));
  
  const totalPhongban = await prisma.phongban.count();
  const totalNhanvien = await prisma.nhanvien.count();
  const nhanvienWithPhongban = await prisma.nhanvien.count({
    where: { phongbanId: { not: null } }
  });
  const nhanvienWithoutPhongban = totalNhanvien - nhanvienWithPhongban;
  
  const phongbanByLevel = await prisma.$queryRaw`
    SELECT level, COUNT(*) as count
    FROM "Phongban"
    GROUP BY level
    ORDER BY level
  ` as Array<{ level: number; count: bigint }>;
  
  console.log(`
📌 Tổng quan:
   • Tổng phòng ban: ${totalPhongban}
   • Tổng nhân viên: ${totalNhanvien}
   • Nhân viên có phòng ban: ${nhanvienWithPhongban}
   • Nhân viên chưa phân công: ${nhanvienWithoutPhongban}

📌 Phòng ban theo cấp:
${phongbanByLevel.map(item => `   • Level ${item.level}: ${item.count} phòng ban`).join('\n')}

📌 Phòng ban có nhiều nhân viên nhất:
  `);
  
  const topPhongban = await prisma.phongban.findMany({
    include: {
      _count: {
        select: { nhanviens: true }
      }
    },
    orderBy: {
      nhanviens: {
        _count: 'desc'
      }
    },
    take: 5
  });
  
  for (const pb of topPhongban) {
    if (pb._count.nhanviens > 0) {
      console.log(`   • ${pb.ma} - ${pb.ten}: ${pb._count.nhanviens} nhân viên`);
    }
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ Verification completed!\n');
}

async function main() {
  try {
    await verifyImport();
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
