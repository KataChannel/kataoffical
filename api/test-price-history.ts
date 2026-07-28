import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testPriceHistory() {
  const banggiaId = '693b9b8c-8d5a-462d-9e2a-826fdc81c589';
  const sanphamId = '6b567353-7d8b-4dda-be20-0819c6b35b41';
  
  console.log('🔍 Testing Price History for:');
  console.log('- Banggia ID:', banggiaId);
  console.log('- Sanpham ID:', sanphamId);
  console.log('');
  
  // 1. Check if banggiasanpham exists
  const bgsp = await prisma.banggiasanpham.findFirst({
    where: { banggiaId, sanphamId },
    include: {
      banggia: { select: { mabanggia: true, title: true } },
      sanpham: { select: { masp: true, title: true } }
    }
  });
  
  if (!bgsp) {
    console.log('❌ Banggiasanpham not found!');
    await prisma.$disconnect();
    return;
  }
  
  console.log('✅ Banggiasanpham found:');
  console.log('- ID:', bgsp.id);
  console.log('- Banggia:', bgsp.banggia.mabanggia, '-', bgsp.banggia.title);
  console.log('- Sanpham:', bgsp.sanpham.masp, '-', bgsp.sanpham.title);
  console.log('- Current Price:', bgsp.giaban);
  console.log('');
  
  // 2. Check audit logs
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      entityName: 'Banggiasanpham',
      entityId: bgsp.id,
      action: { in: ['CREATE', 'UPDATE'] }
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      action: true,
      oldValues: true,
      newValues: true,
      metadata: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  });
  
  console.log(`📝 Found ${auditLogs.length} audit logs:`);
  console.log('');
  
  if (auditLogs.length === 0) {
    console.log('❌ No audit logs found for this banggiasanpham!');
    console.log('');
    console.log('Checking all audit logs for Banggiasanpham entity...');
    
    const allBgspLogs = await prisma.auditLog.findMany({
      where: {
        entityName: 'Banggiasanpham'
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        entityId: true,
        action: true,
        metadata: true,
        createdAt: true
      }
    });
    
    console.log(`Found ${allBgspLogs.length} total Banggiasanpham logs (showing first 5):`);
    allBgspLogs.forEach((log, i) => {
      console.log(`${i + 1}. Entity ID: ${log.entityId}`);
      console.log(`   Action: ${log.action}`);
      console.log(`   Created: ${log.createdAt}`);
      console.log(`   Metadata:`, JSON.stringify(log.metadata, null, 2));
      console.log('');
    });
  } else {
    auditLogs.forEach((log, i) => {
      console.log(`${i + 1}. [${log.action}] at ${log.createdAt}`);
      console.log(`   User: ${log.user?.name || log.user?.email || 'Unknown'} (${log.userId})`);
      console.log(`   Old Price: ${log.oldValues?.['giaban'] || 'N/A'}`);
      console.log(`   New Price: ${log.newValues?.['giaban'] || 'N/A'}`);
      if (log.metadata) {
        console.log(`   Metadata:`, JSON.stringify(log.metadata, null, 2));
      }
      console.log('');
    });
  }
  
  await prisma.$disconnect();
}

testPriceHistory().catch(console.error);
