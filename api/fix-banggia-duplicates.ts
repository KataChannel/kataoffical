import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAndFixDuplicates() {
  console.log('🔍 Checking for duplicate Banggia records...\n');

  try {
    // Find all Banggia records
    const allBanggia = await prisma.banggia.findMany({
      where: {
        mabanggia: { not: null },
        batdau: { not: null },
        ketthuc: { not: null }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    console.log(`📊 Total Banggia records: ${allBanggia.length}\n`);

    // Group by mabanggia + batdau + ketthuc
    const groups = new Map();
    
    allBanggia.forEach(banggia => {
      const key = `${banggia.mabanggia}_${banggia.batdau?.toISOString()}_${banggia.ketthuc?.toISOString()}`;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(banggia);
    });

    // Find duplicates
    const duplicates = Array.from(groups.entries()).filter(([_, items]) => items.length > 1);

    if (duplicates.length === 0) {
      console.log('✅ No duplicates found! Safe to add unique constraint.\n');
      return { hasDuplicates: false, duplicates: [] };
    }

    console.log(`⚠️  Found ${duplicates.length} groups with duplicates:\n`);

    const duplicateInfo: any[] = [];
    
    for (const [key, items] of duplicates) {
      const [mabanggia, batdau, ketthuc] = key.split('_');
      console.log(`📋 Mã: ${mabanggia}`);
      console.log(`   Từ: ${new Date(batdau).toLocaleDateString('vi-VN')}`);
      console.log(`   Đến: ${new Date(ketthuc).toLocaleDateString('vi-VN')}`);
      console.log(`   Số bản ghi trùng: ${items.length}`);
      
      items.forEach((item, idx) => {
        console.log(`   ${idx + 1}. ID: ${item.id}, Title: ${item.title || 'N/A'}, Created: ${item.createdAt.toLocaleString('vi-VN')}`);
      });
      console.log('');

      duplicateInfo.push({
        mabanggia,
        batdau,
        ketthuc,
        count: items.length,
        records: items
      });
    }

    return { hasDuplicates: true, duplicates: duplicateInfo };

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

async function fixDuplicates(duplicateInfo, strategy = 'keep-newest') {
  console.log('\n🔧 Fixing duplicates...\n');
  
  let totalDeleted = 0;

  for (const group of duplicateInfo) {
    const records = group.records;
    
    // Sort by createdAt
    records.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    // Keep the first one (newest or oldest based on strategy)
    const toKeep = strategy === 'keep-newest' ? records[0] : records[records.length - 1];
    const toDelete = records.filter(r => r.id !== toKeep.id);

    console.log(`📋 Group: ${group.mabanggia} (${new Date(group.batdau).toLocaleDateString('vi-VN')} - ${new Date(group.ketthuc).toLocaleDateString('vi-VN')})`);
    console.log(`   ✅ Keeping: ${toKeep.id} (${toKeep.title || 'N/A'})`);
    console.log(`   🗑️  Deleting: ${toDelete.length} record(s)`);

    // Delete duplicates
    for (const record of toDelete) {
      try {
        // First, delete related records
        await prisma.banggiasanpham.deleteMany({
          where: { banggiaId: record.id }
        });

        // Delete the banggia
        await prisma.banggia.delete({
          where: { id: record.id }
        });

        console.log(`      ✅ Deleted: ${record.id}`);
        totalDeleted++;
      } catch (error) {
        console.error(`      ❌ Error deleting ${record.id}:`, error.message);
      }
    }
    console.log('');
  }

  console.log(`\n✅ Total deleted: ${totalDeleted} records\n`);
  return totalDeleted;
}

async function addUniqueConstraint() {
  console.log('\n🔧 Adding unique constraint...\n');
  
  try {
    // Execute raw SQL to add constraint
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "unique_banggia_time_range" 
      ON "Banggia"("mabanggia", "batdau", "ketthuc");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "Banggia_mabanggia_idx" 
      ON "Banggia"("mabanggia");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "Banggia_batdau_ketthuc_idx" 
      ON "Banggia"("batdau", "ketthuc");
    `;

    console.log('✅ Unique constraint and indexes added successfully!\n');
  } catch (error) {
    console.error('❌ Error adding constraint:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting Banggia duplicate check and fix...\n');

  try {
    // Step 1: Find duplicates
    const result = await findAndFixDuplicates();

    if (result.hasDuplicates) {
      console.log('⚠️  Action required: Duplicates found!\n');
      console.log('Options:');
      console.log('1. Run with --fix to automatically delete duplicates (keeps newest)');
      console.log('2. Manually review and delete duplicates');
      console.log('\nTo fix automatically, run:');
      console.log('  bun run fix-banggia-duplicates.ts --fix\n');

      // Check if --fix flag is present
      if (process.argv.includes('--fix')) {
        console.log('🔧 Auto-fix enabled, proceeding...\n');
        await fixDuplicates(result.duplicates, 'keep-newest');
        
        // Step 2: Add unique constraint
        await addUniqueConstraint();
        
        console.log('✅ All done! Banggia unique constraint is now active.\n');
      } else {
        console.log('ℹ️  No changes made. Use --fix flag to proceed.\n');
      }
    } else {
      // No duplicates, safe to add constraint
      await addUniqueConstraint();
      console.log('✅ All done! Banggia unique constraint is now active.\n');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
