/**
 * Test specific case: TG-AA09079 on 27/10/2025 - 28/10/2025
 */

const API_URL = 'http://localhost:3000';

async function testSpecificCase(token?: string) {
  console.log('\n' + '='.repeat(80));
  console.log('🧪 Testing specific case: TG-AA09079');
  console.log('='.repeat(80));
  
  const testPayload = {
    searchValue: 'TG-AA09079',
    createdAtFrom: '2025-10-27',
    createdAtTo: '2025-10-28',
    pageSize: 50,
    page: 1,
  };
  
  console.log('\n📦 Test Payload:');
  console.log(JSON.stringify(testPayload, null, 2));
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    console.log('\n🔄 Sending request...');
    const response = await fetch(`${API_URL}/auditlog/findby`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testPayload),
    });

    if (!response.ok) {
      console.log(`\n❌ HTTP Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.log('Response:', text);
      return;
    }

    const result = await response.json();
    
    console.log('\n✅ Response received!');
    console.log(`📊 Total records found: ${result.total}`);
    console.log(`📄 Page ${result.page}/${result.pageCount}`);
    console.log(`📋 Records in current page: ${result.data?.length || 0}`);
    
    if (result.data && result.data.length > 0) {
      console.log('\n📝 Found Records:');
      
      result.data.forEach((record: any, index: number) => {
        console.log(`\n  Record ${index + 1}:`);
        console.log(`    ID: ${record.id}`);
        console.log(`    Entity: ${record.entityName} (${record.entityId})`);
        console.log(`    Action: ${record.action}`);
        console.log(`    Status: ${record.status}`);
        console.log(`    Created: ${new Date(record.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
        console.log(`    User: ${record.user?.email || record.userEmail || 'N/A'}`);
        
        // Check where TG-AA09079 was found
        let foundIn = [];
        
        if (record.oldValues) {
          const oldStr = JSON.stringify(record.oldValues);
          if (oldStr.includes('TG-AA09079')) {
            foundIn.push('oldValues');
            console.log(`    ✓ Found in oldValues:`);
            console.log(`      ${oldStr.substring(0, 200)}...`);
          }
        }
        
        if (record.newValues) {
          const newStr = JSON.stringify(record.newValues);
          if (newStr.includes('TG-AA09079')) {
            foundIn.push('newValues');
            console.log(`    ✓ Found in newValues:`);
            console.log(`      ${newStr.substring(0, 200)}...`);
          }
        }
        
        if (foundIn.length === 0) {
          console.log(`    ⚠️  'TG-AA09079' NOT found in oldValues or newValues!`);
          console.log(`    Old: ${JSON.stringify(record.oldValues)?.substring(0, 100)}`);
          console.log(`    New: ${JSON.stringify(record.newValues)?.substring(0, 100)}`);
        } else {
          console.log(`    Found in: ${foundIn.join(', ')}`);
        }
      });
    } else {
      console.log('\n⚠️  No records found!');
      console.log('\nPossible reasons:');
      console.log('1. The search value "TG-AA09079" does not exist in oldValues/newValues');
      console.log('2. The date range does not match (check timezone)');
      console.log('3. The data exists but JSON search is not working correctly');
      console.log('\nTroubleshooting steps:');
      console.log('- Check database directly with SQL query');
      console.log('- Verify the exact date of the record');
      console.log('- Check if JSON contains the exact string');
    }
    
  } catch (error) {
    console.log('\n❌ Error:', error);
  }
}

async function testWithoutDateFilter(token?: string) {
  console.log('\n' + '='.repeat(80));
  console.log('🧪 Testing WITHOUT date filter (to see if data exists)');
  console.log('='.repeat(80));
  
  const testPayload = {
    searchValue: 'TG-AA09079',
    pageSize: 50,
    page: 1,
  };
  
  console.log('\n📦 Test Payload:');
  console.log(JSON.stringify(testPayload, null, 2));
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_URL}/auditlog/findby`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testPayload),
    });

    if (!response.ok) {
      console.log(`\n❌ HTTP Error: ${response.status} ${response.statusText}`);
      return;
    }

    const result = await response.json();
    
    console.log(`\n✅ Found ${result.total} total records with "TG-AA09079"`);
    
    if (result.data && result.data.length > 0) {
      console.log('\nDate distribution:');
      result.data.forEach((record: any) => {
        const date = new Date(record.createdAt);
        console.log(`  - ${date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} (${record.action})`);
      });
    }
    
  } catch (error) {
    console.log('\n❌ Error:', error);
  }
}

async function testDirectSQLQuery() {
  console.log('\n' + '='.repeat(80));
  console.log('📋 Suggested SQL Query to check database:');
  console.log('='.repeat(80));
  console.log(`
SELECT 
  id,
  "entityName",
  "entityId",
  action,
  status,
  "createdAt",
  "oldValues"::text as old_values_text,
  "newValues"::text as new_values_text
FROM "AuditLog"
WHERE 
  (
    "oldValues"::text ILIKE '%TG-AA09079%' 
    OR "newValues"::text ILIKE '%TG-AA09079%'
  )
  AND "createdAt" >= '2025-10-27 00:00:00'::timestamp
  AND "createdAt" <= '2025-10-28 23:59:59.999'::timestamp
ORDER BY "createdAt" DESC
LIMIT 50;
`);
  
  console.log('\n💡 Copy and run this query in your PostgreSQL client to verify data exists');
}

async function main() {
  console.log('\n');
  console.log('🔍 AuditLog Search Debugging Tool');
  console.log('=' .repeat(80));
  console.log(`📍 API URL: ${API_URL}`);
  console.log(`📅 Target: TG-AA09079 on 27/10/2025 - 28/10/2025`);
  
  const token = process.env.TOKEN || process.argv[2];
  
  if (!token) {
    console.log('\n⚠️  Warning: No authentication token provided');
    console.log('   Usage: TOKEN=your-token bun run test-specific-search.ts');
    console.log('   Or: bun run test-specific-search.ts your-token');
  }

  // Test 1: With date filter (your original query)
  await testSpecificCase(token);
  
  // Test 2: Without date filter (to see if data exists at all)
  await testWithoutDateFilter(token);
  
  // Test 3: Show SQL query
  await testDirectSQLQuery();

  console.log('\n' + '='.repeat(80));
  console.log('✅ Testing completed!');
  console.log('\nNext steps:');
  console.log('1. Run the SQL query above in PostgreSQL');
  console.log('2. Check if records are returned');
  console.log('3. Compare the createdAt dates with your search range');
  console.log('4. Verify the JSON contains exact string "TG-AA09079"');
  console.log('='.repeat(80) + '\n');
}

main().catch(console.error);
