/**
 * Test script for AuditLog date filtering
 * Run with: bun run test-auditlog-date-filter.ts
 */

const API_URL = 'http://localhost:3000';

interface TestCase {
  name: string;
  payload: any;
  description: string;
}

const testCases: TestCase[] = [
  {
    name: 'Test 1: Date Range (2025-10-27 to 2025-10-28)',
    description: 'Should return all logs created between Oct 27 and Oct 28, 2025',
    payload: {
      createdAtFrom: '2025-10-27',
      createdAtTo: '2025-10-28',
      pageSize: 50,
      page: 1,
    },
  },
  {
    name: 'Test 2: Single Date From (2025-10-27)',
    description: 'Should return all logs created on or after Oct 27, 2025',
    payload: {
      createdAtFrom: '2025-10-27',
      pageSize: 50,
      page: 1,
    },
  },
  {
    name: 'Test 3: Single Date To (2025-10-28)',
    description: 'Should return all logs created on or before Oct 28, 2025',
    payload: {
      createdAtTo: '2025-10-28',
      pageSize: 50,
      page: 1,
    },
  },
  {
    name: 'Test 4: Module + Date Range',
    description: 'Should return sanpham logs in date range',
    payload: {
      entityName: 'sanpham',
      createdAtFrom: '2025-10-27',
      createdAtTo: '2025-10-28',
      pageSize: 50,
      page: 1,
    },
  },
  {
    name: 'Test 5: Action + Date Range',
    description: 'Should return CREATE actions in date range',
    payload: {
      action: 'CREATE',
      createdAtFrom: '2025-10-27',
      createdAtTo: '2025-10-28',
      pageSize: 50,
      page: 1,
    },
  },
  {
    name: 'Test 6: All Filters Combined',
    description: 'Should return sanpham UPDATE logs in date range',
    payload: {
      entityName: 'sanpham',
      action: 'UPDATE',
      createdAtFrom: '2025-10-27',
      createdAtTo: '2025-10-28',
      pageSize: 50,
      page: 1,
    },
  },
  {
    name: 'Test 7: Today Only',
    description: 'Should return only today\'s logs',
    payload: {
      createdAtFrom: new Date().toISOString().split('T')[0],
      createdAtTo: new Date().toISOString().split('T')[0],
      pageSize: 50,
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
      console.log('\n📝 Sample Record:');
      const sample = result.data[0];
      console.log({
        id: sample.id,
        entityName: sample.entityName,
        action: sample.action,
        status: sample.status,
        createdAt: sample.createdAt,
        userId: sample.userId,
      });
      
      // Show date range of results
      if (result.data.length > 1) {
        const dates = result.data.map((r: any) => new Date(r.createdAt));
        const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
        const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
        console.log(`\n📅 Date Range in Results:`);
        console.log(`   From: ${minDate.toISOString()}`);
        console.log(`   To:   ${maxDate.toISOString()}`);
      }
    } else {
      console.log('\n⚠️  No records found');
    }
    
  } catch (error) {
    console.log(`❌ Error:`, error);
  }
}

async function main() {
  console.log('\n');
  console.log('🚀 AuditLog Date Filter Test Suite');
  console.log('=' .repeat(80));
  console.log(`📍 API URL: ${API_URL}`);
  console.log(`📅 Current Date: ${new Date().toISOString()}`);
  
  // Get token from environment or command line
  const token = process.env.TOKEN || process.argv[2];
  
  if (!token) {
    console.log('\n⚠️  Warning: No authentication token provided');
    console.log('   Set TOKEN environment variable or pass as argument');
    console.log('   Example: TOKEN=your-token bun run test-auditlog-date-filter.ts');
    console.log('   Or: bun run test-auditlog-date-filter.ts your-token');
  }

  for (const testCase of testCases) {
    await runTest(testCase, token);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ All tests completed!');
  console.log('='.repeat(80) + '\n');
}

main().catch(console.error);
