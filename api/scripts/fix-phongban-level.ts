import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixPhongbanLevels() {
  console.log('🔧 Fixing Phòng ban levels...\n');

  try {
    // Lấy tất cả phòng ban có parent
    const childDepartments = await prisma.phongban.findMany({
      where: {
        parentId: {
          not: null
        }
      },
      include: {
        parent: true
      }
    });

    console.log(`📋 Found ${childDepartments.length} child departments to fix\n`);

    // Cập nhật level cho từng phòng ban
    for (const dept of childDepartments) {
      const parentLevel = dept.parent?.level || 0;
      const correctLevel = parentLevel + 1;

      if (dept.level !== correctLevel) {
        console.log(`🔄 Updating ${dept.ma} (${dept.ten}): level ${dept.level} → ${correctLevel}`);
        
        await prisma.phongban.update({
          where: { id: dept.id },
          data: { level: correctLevel }
        });
      } else {
        console.log(`✅ ${dept.ma} (${dept.ten}): level ${dept.level} is correct`);
      }
    }

    // Verify kết quả
    console.log('\n📊 Verification:\n');
    const allDepartments = await prisma.phongban.findMany({
      orderBy: [{ level: 'asc' }, { ma: 'asc' }],
      include: {
        parent: true,
        _count: {
          select: { children: true }
        }
      }
    });

    const levelGroups = new Map<number, typeof allDepartments>();
    
    for (const dept of allDepartments) {
      if (!levelGroups.has(dept.level)) {
        levelGroups.set(dept.level, []);
      }
      levelGroups.get(dept.level)!.push(dept);
    }

    for (const [level, depts] of Array.from(levelGroups.entries()).sort((a, b) => a[0] - b[0])) {
      console.log(`\n📁 Level ${level} (${depts.length} phòng ban):`);
      for (const dept of depts) {
        const parentInfo = dept.parentId ? ` (thuộc ${dept.parent?.ten})` : '';
        const childrenInfo = dept._count.children > 0 ? ` [${dept._count.children} bộ phận con]` : '';
        console.log(`   - ${dept.ma}: ${dept.ten}${parentInfo}${childrenInfo}`);
      }
    }

    console.log('\n✅ Fix level completed successfully!');

  } catch (error) {
    console.error('❌ Error fixing levels:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix
fixPhongbanLevels()
  .catch(console.error);
