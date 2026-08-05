const path = require('path');
const { PrismaClient } = require(path.resolve('./api/node_modules/@prisma/client'));

async function compareDBs() {
  console.log("Connecting to databases using Prisma Client...");
  const url1 = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';
  const url2 = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public';
  
  const prisma1 = new PrismaClient({ datasources: { postgres: { url: url1 } } });
  const prisma2 = new PrismaClient({ datasources: { postgres: { url: url2 } } });
  
  try {
    const tables1Res = await prisma1.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`;
    const tables2Res = await prisma2.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`;
    
    const t1 = tables1Res.map(r => r.table_name).sort();
    const t2 = tables2Res.map(r => r.table_name).sort();
    
    console.log('\n================ TABLE COUNT ================');
    console.log(`rausachfinal tables: ${t1.length}`);
    console.log(`testdata tables:     ${t2.length}`);
    
    const inRauOnly = t1.filter(t => !t2.includes(t));
    const inTestOnly = t2.filter(t => !t1.includes(t));
    const common = t1.filter(t => t2.includes(t));
    
    console.log('\nTables in rausachfinal ONLY:', inRauOnly);
    console.log('Tables in testdata ONLY:', inTestOnly);

    console.log('\n================ ROW COUNT COMPARISON ================');
    console.log(String('Table Name').padEnd(30) + String('rausachfinal').padStart(15) + String('testdata').padStart(15) + String('Diff').padStart(15));
    console.log('-'.repeat(75));

    let totalRauRows = 0;
    let totalTestRows = 0;

    for (const table of common) {
      try {
        const r1 = await prisma1.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM "${table}"`);
        const r2 = await prisma2.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM "${table}"`);
        const count1 = Number(r1[0].cnt);
        const count2 = Number(r2[0].cnt);
        totalRauRows += count1;
        totalTestRows += count2;
        const diff = count1 - count2;
        const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
        if (count1 !== count2 || count1 > 0) {
          console.log(table.padEnd(30) + String(count1).padStart(15) + String(count2).padStart(15) + String(diffStr).padStart(15));
        }
      } catch (e) {
        console.log(`Error counting ${table}: ${e.message}`);
      }
    }

    for (const table of inRauOnly) {
      try {
        const r1 = await prisma1.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM "${table}"`);
        const count1 = Number(r1[0].cnt);
        totalRauRows += count1;
        console.log((table + ' (NEW)').padEnd(30) + String(count1).padStart(15) + String(0).padStart(15) + String(`+${count1}`).padStart(15));
      } catch (e) {}
    }

    console.log('-'.repeat(75));
    console.log(`TOTAL ROWS ESTIMATE:         ${String(totalRauRows).padStart(15)} ${String(totalTestRows).padStart(15)} ${String(totalRauRows - totalTestRows).padStart(15)}`);

    console.log('\n================ LATEST RECORD DATES ================');
    const sampleTables = ['Order', 'PhieuKho', 'ChotKhoSession', 'AuditLog', 'Product', 'User', 'Dathang', 'SupportTicket'];
    for (const table of sampleTables) {
      if (t1.includes(table)) {
        try {
          const l1 = await prisma1.$queryRawUnsafe(`SELECT "createdAt" FROM "${table}" ORDER BY "createdAt" DESC LIMIT 1`);
          const l2 = t2.includes(table) ? await prisma2.$queryRawUnsafe(`SELECT "createdAt" FROM "${table}" ORDER BY "createdAt" DESC LIMIT 1`) : [];
          
          const date1 = l1[0]?.createdAt ? new Date(l1[0].createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : 'N/A';
          const date2 = l2[0]?.createdAt ? new Date(l2[0].createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : 'N/A';
          
          console.log(`${table.padEnd(18)}: rausachfinal = ${date1.padEnd(25)} | testdata = ${date2}`);
        } catch (e) {
          // Table might not have createdAt column
        }
      }
    }

  } finally {
    await prisma1.$disconnect();
    await prisma2.$disconnect();
  }
}

compareDBs().catch(console.error);
