import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
  console.log('🔍 Verifying BanggiasanphamHistory table...\n');
  
  try {
    // Check if table exists by trying to count
    const count = await prisma.banggiasanphamHistory.count();
    console.log(`✅ BanggiasanphamHistory table EXISTS`);
    console.log(`📊 Current records: ${count}\n`);
    
    // Check Banggiasanpham count
    const bgspCount = await prisma.banggiasanpham.count();
    console.log(`📊 Banggiasanpham records: ${bgspCount}`);
    console.log(`📊 Expected history records after migration: ${bgspCount}\n`);
    
    if (count === 0 && bgspCount > 0) {
      console.log('⚠️  BanggiasanphamHistory is empty but Banggiasanpham has data');
      console.log('💡 Run migration script to populate history:\n');
      console.log('   bun run prisma/migrate-existing-prices.ts\n');
    } else if (count > 0) {
      console.log('✅ BanggiasanphamHistory has data!');
      
      // Show sample
      const sample = await prisma.banggiasanphamHistory.findFirst({
        include: {
          banggia: { select: { mabanggia: true, title: true } },
          sanpham: { select: { masp: true, title: true } }
        }
      });
      
      if (sample) {
        console.log('\n📝 Sample history record:');
        console.log(`   Banggia: ${sample.banggia.mabanggia} - ${sample.banggia.title}`);
        console.log(`   Sanpham: ${sample.sanpham.masp} - ${sample.sanpham.title}`);
        console.log(`   Giaban: ${sample.giaban}`);
        console.log(`   ValidFrom: ${sample.validFrom}`);
        console.log(`   ValidTo: ${sample.validTo || 'NULL (current)'}`);
      }
    }
    
    // Check Donhangsanpham new fields
    const dhspSample = await prisma.donhangsanpham.findFirst();
    if (dhspSample) {
      console.log('\n✅ Donhangsanpham price tracking fields:');
      console.log(`   priceHistoryId: ${dhspSample.priceHistoryId || 'NULL (not yet linked)'}`);
      console.log(`   priceSnapshotAt: ${dhspSample.priceSnapshotAt || 'NULL (not yet set)'}`);
      console.log(`   originalBanggiaId: ${dhspSample.originalBanggiaId || 'NULL (not yet set)'}`);
      console.log(`   priceSource: ${dhspSample.priceSource || 'NULL (not yet set)'}`);
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('does not exist')) {
      console.log('\n❌ BanggiasanphamHistory table does NOT exist in database');
      console.log('💡 Run: npx prisma db push\n');
    }
  } finally {
    await prisma.$disconnect();
  }
}

verify();
