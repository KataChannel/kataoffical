/**
 * Direct Prisma test for JSON search
 * This helps debug the exact query being generated
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enable query logging
});

async function testCase1() {
  console.log('\n' + '='.repeat(80));
  console.log('Test 1: Search with date range AND JSON search');
  console.log('='.repeat(80));
  
  const whereClause: any = {
    createdAt: {
      gte: new Date('2025-10-27T00:00:00.000Z'),
      lte: new Date('2025-10-28T23:59:59.999Z'),
    },
    AND: [
      {
        OR: [
          {
            oldValues: {
              string_contains: 'TG-AA09079'
            }
          },
          {
            newValues: {
              string_contains: 'TG-AA09079'
            }
          }
        ]
      }
    ]
  };
  
  console.log('\nWhere clause:');
  console.log(JSON.stringify(whereClause, null, 2));
  
  try {
    const result = await prisma.auditLog.findMany({
      where: whereClause,
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
    
    console.log(`\n✅ Found ${result.length} records`);
    
    result.forEach((r, i) => {
      console.log(`\nRecord ${i + 1}:`);
      console.log(`  ID: ${r.id}`);
      console.log(`  Entity: ${r.entityName}`);
      console.log(`  Action: ${r.action}`);
      console.log(`  Created: ${r.createdAt}`);
      console.log(`  Old: ${JSON.stringify(r.oldValues)?.substring(0, 100)}`);
      console.log(`  New: ${JSON.stringify(r.newValues)?.substring(0, 100)}`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function testCase2() {
  console.log('\n' + '='.repeat(80));
  console.log('Test 2: Search without date filter');
  console.log('='.repeat(80));
  
  const whereClause: any = {
    AND: [
      {
        OR: [
          {
            oldValues: {
              string_contains: 'TG-AA09079'
            }
          },
          {
            newValues: {
              string_contains: 'TG-AA09079'
            }
          }
        ]
      }
    ]
  };
  
  console.log('\nWhere clause:');
  console.log(JSON.stringify(whereClause, null, 2));
  
  try {
    const result = await prisma.auditLog.findMany({
      where: whereClause,
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
    
    console.log(`\n✅ Found ${result.length} records`);
    
    result.forEach((r, i) => {
      console.log(`\nRecord ${i + 1}:`);
      console.log(`  Created: ${r.createdAt}`);
      console.log(`  Entity: ${r.entityName}`);
      console.log(`  Action: ${r.action}`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function testCase3() {
  console.log('\n' + '='.repeat(80));
  console.log('Test 3: Raw SQL query');
  console.log('='.repeat(80));
  
  try {
    const result: any = await prisma.$queryRaw`
      SELECT 
        id,
        "entityName",
        action,
        "createdAt",
        "oldValues",
        "newValues"
      FROM "AuditLog"
      WHERE 
        (
          "oldValues"::text ILIKE '%TG-AA09079%' 
          OR "newValues"::text ILIKE '%TG-AA09079%'
        )
        AND "createdAt" >= '2025-10-27 00:00:00'::timestamp
        AND "createdAt" <= '2025-10-28 23:59:59.999'::timestamp
      ORDER BY "createdAt" DESC
      LIMIT 10
    `;
    
    console.log(`\n✅ Found ${result.length} records via raw SQL`);
    
    result.forEach((r: any, i: number) => {
      console.log(`\nRecord ${i + 1}:`);
      console.log(`  ID: ${r.id}`);
      console.log(`  Entity: ${r.entityName}`);
      console.log(`  Action: ${r.action}`);
      console.log(`  Created: ${r.createdAt}`);
      
      // Check which field contains the search term
      const oldStr = JSON.stringify(r.oldValues);
      const newStr = JSON.stringify(r.newValues);
      
      if (oldStr.includes('TG-AA09079')) {
        console.log(`  ✓ Found in oldValues`);
      }
      if (newStr.includes('TG-AA09079')) {
        console.log(`  ✓ Found in newValues`);
      }
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function testCase4() {
  console.log('\n' + '='.repeat(80));
  console.log('Test 4: Check total count in date range');
  console.log('='.repeat(80));
  
  try {
    const total = await prisma.auditLog.count({
      where: {
        createdAt: {
          gte: new Date('2025-10-27T00:00:00.000Z'),
          lte: new Date('2025-10-28T23:59:59.999Z'),
        }
      }
    });
    
    console.log(`\n✅ Total records in date range: ${total}`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function main() {
  console.log('\n🔍 Prisma JSON Search Debug Tool\n');
  
  try {
    // Test different query variations
    await testCase1(); // With date + JSON search
    await testCase2(); // Only JSON search
    await testCase3(); // Raw SQL
    await testCase4(); // Count in date range
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ All tests completed!');
    console.log('='.repeat(80) + '\n');
    
  } catch (error) {
    console.error('Fatal error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
