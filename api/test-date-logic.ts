/**
 * Quick test for date filtering issue
 */

console.log('Testing Date Conversion Logic\n');
console.log('=' .repeat(60));

// Test case from the issue
const testPayload = {
  createdAtFrom: '2025-10-27',
  createdAtTo: '2025-10-28',
  pageSize: 50,
  page: 1,
};

console.log('Input payload:', testPayload);
console.log('');

// Simulate the service logic
const where = testPayload;
const dateFrom = where.createdAtFrom;
const dateTo = where.createdAtTo;

const whereClause: any = {};

if (dateFrom || dateTo) {
  whereClause.createdAt = {};
  
  if (dateFrom) {
    // Set to start of day (00:00:00)
    const fromDate = new Date(dateFrom);
    fromDate.setHours(0, 0, 0, 0);
    whereClause.createdAt.gte = fromDate;
    
    console.log('From Date Processing:');
    console.log('  Input:  ', dateFrom);
    console.log('  Parsed: ', fromDate.toISOString());
    console.log('  Local:  ', fromDate.toString());
    console.log('');
  }
  
  if (dateTo) {
    // Set to end of day (23:59:59.999)
    const toDate = new Date(dateTo);
    toDate.setHours(23, 59, 59, 999);
    whereClause.createdAt.lte = toDate;
    
    console.log('To Date Processing:');
    console.log('  Input:  ', dateTo);
    console.log('  Parsed: ', toDate.toISOString());
    console.log('  Local:  ', toDate.toString());
    console.log('');
  }
}

console.log('Generated Where Clause:');
console.log(JSON.stringify(whereClause, null, 2));
console.log('');

console.log('Expected Behavior:');
console.log('  - Should include all records from 2025-10-27 00:00:00');
console.log('  - Should include all records until 2025-10-28 23:59:59.999');
console.log('  - This means the entire day of Oct 27 and Oct 28 are included');
console.log('');

console.log('=' .repeat(60));

// Test edge cases
console.log('\nEdge Case Tests:');
console.log('=' .repeat(60));

const edgeCases = [
  {
    name: 'Same day range',
    from: '2025-10-27',
    to: '2025-10-27',
  },
  {
    name: 'One day apart',
    from: '2025-10-27',
    to: '2025-10-28',
  },
  {
    name: 'Only from date',
    from: '2025-10-27',
    to: undefined,
  },
  {
    name: 'Only to date',
    from: undefined,
    to: '2025-10-28',
  },
];

edgeCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: ${testCase.name}`);
  
  if (testCase.from) {
    const fromDate = new Date(testCase.from);
    fromDate.setHours(0, 0, 0, 0);
    console.log(`  From: ${fromDate.toISOString()}`);
  }
  
  if (testCase.to) {
    const toDate = new Date(testCase.to);
    toDate.setHours(23, 59, 59, 999);
    console.log(`  To:   ${toDate.toISOString()}`);
  }
  
  if (testCase.from && testCase.to) {
    const fromDate = new Date(testCase.from);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(testCase.to);
    toDate.setHours(23, 59, 59, 999);
    const diffMs = toDate.getTime() - fromDate.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    console.log(`  Range: ${diffDays} day(s)`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('✅ Date logic test completed');
