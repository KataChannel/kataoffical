/**
 * Test JSON search in AuditLog oldValues/newValues
 * Run with: bun run test-json-search.ts
 */

const API_URL = 'http://localhost:3000';

interface TestCase {
  name: string;
  payload: any;
  description: string;
}

const testCases: TestCase[] = [
  {
    name: 'Test 1: Search for specific value in JSON',
    description: 'Search for "sanpham" in oldValues/newValues',
    payload: {
      searchValue: 'sanpham',
      pageSize: 20,
      page: 1,
    },
  },
  {
    name: 'Test 2: Search for email in JSON',
    description: 'Search for email addresses',
    payload: {
      searchValue: '@gmail.com',
      pageSize: 20,
      page: 1,
    },
  },
  {
    name: 'Test 3: Search for number/ID',
    description: 'Search for specific ID or number',
    payload: {
      searchValue: '123',
      pageSize: 20,
      page: 1,
    },
  },
  {
    name: 'Test 4: Search with module filter',
    description: 'Search for value in specific module',
    payload: {
      entityName: 'donhang',
      searchValue: 'khachhang',
      pageSize: 20,
      page: 1,
    },
  },
  {
    name: 'Test 5: Search with action filter',
    description: 'Search in UPDATE actions only',
    payload: {
      action: 'UPDATE',
      searchValue: 'price',
      pageSize: 20,
      page: 1,
    },
  },
  {
    name: 'Test 6: Search with date range',
    description: 'Search in specific date range',
    payload: {
      searchValue: 'active',
      createdAtFrom: '2025-11-01',
      createdAtTo: '2025-11-05',
      pageSize: 20,
      page: 1,
    },
  },
  {
    name: 'Test 7: Combined search',
    description: 'Search with all filters',
    payload: {
      entityName: 'sanpham',
      action: 'UPDATE',
      searchValue: 'giaban',
      createdAtFrom: '2025-11-01',
      createdAtTo: '2025-11-05',
      pageSize: 20,
      page: 1,
    },
  },
];

async function runTest(testCase: TestCase, token?: string) {
  console.log('\n' + '='.repeat(80));
  console.log(`🧪 ${testCase.name}`);
  console.log('='.repeat(80));
  console.log(`📝 Description: ${testCase.description}`);
  console.log(`📦 Payload:`, JSON.stringify(testCase.payload, null, 2));
  
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
      body: JSON.stringify(testCase.payload),
    });

    if (!response.ok) {
      console.log(`❌ HTTP Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.log('Response:', text);
      return;
    }

    const result = await response.json();
    
    console.log('\n✅ Success!');
    console.log(`📊 Results: ${result.total} total records found`);
    console.log(`📄 Page ${result.page}/${result.pageCount}`);
    console.log(`📋 Showing ${result.data?.length || 0} records`);
    
    if (result.data && result.data.length > 0) {
      console.log('\n📝 Sample Records:');
      
      // Show first 3 records
      const samplesToShow = Math.min(3, result.data.length);
      for (let i = 0; i < samplesToShow; i++) {
        const sample = result.data[i];
        console.log(`\n  Record ${i + 1}:`);
        console.log(`    Entity: ${sample.entityName} (${sample.entityId})`);
        console.log(`    Action: ${sample.action}`);
        console.log(`    Status: ${sample.status}`);
        console.log(`    Date: ${new Date(sample.createdAt).toLocaleString()}`);
        
        // Show matched content in oldValues/newValues
        if (testCase.payload.searchValue) {
          const searchTerm = testCase.payload.searchValue.toLowerCase();
          
          if (sample.oldValues) {
            const oldStr = JSON.stringify(sample.oldValues).toLowerCase();
            if (oldStr.includes(searchTerm)) {
              console.log(`    ✓ Found in oldValues: ${JSON.stringify(sample.oldValues).substring(0, 100)}...`);
            }
          }
          
          if (sample.newValues) {
            const newStr = JSON.stringify(sample.newValues).toLowerCase();
            if (newStr.includes(searchTerm)) {
              console.log(`    ✓ Found in newValues: ${JSON.stringify(sample.newValues).substring(0, 100)}...`);
            }
          }
        }
      }
    } else {
      console.log('\n⚠️  No records found');
      console.log('   This might mean:');
      console.log('   - No data matches the search criteria');
      console.log('   - The search value doesn\'t exist in oldValues/newValues');
      console.log('   - Try a different search term');
    }
    
  } catch (error) {
    console.log(`❌ Error:`, error);
  }
}

async function main() {
  console.log('\n');
  console.log('🔍 AuditLog JSON Search Test Suite');
  console.log('=' .repeat(80));
  console.log(`📍 API URL: ${API_URL}`);
  console.log(`📅 Current Date: ${new Date().toISOString()}`);
  console.log('\n📖 This test searches for values within oldValues/newValues JSON fields');
  
  // Get token from environment or command line
  const token = process.env.TOKEN || process.argv[2];
  
  if (!token) {
    console.log('\n⚠️  Warning: No authentication token provided');
    console.log('   Set TOKEN environment variable or pass as argument');
    console.log('   Example: TOKEN=your-token bun run test-json-search.ts');
    console.log('   Or: bun run test-json-search.ts your-token');
  }

  for (const testCase of testCases) {
    await runTest(testCase, token);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ All tests completed!');
  console.log('\n💡 Tips:');
  console.log('   - The search is case-insensitive for PostgreSQL JSON');
  console.log('   - It searches in both oldValues AND newValues fields');
  console.log('   - Combine with other filters for more precise results');
  console.log('   - Use short, specific search terms for better performance');
  console.log('='.repeat(80) + '\n');
}

main().catch(console.error);
