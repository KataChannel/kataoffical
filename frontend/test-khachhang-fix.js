const https = require('https');
const http = require('http');

// Simple fetch replacement for Node.js
function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const module = urlObj.protocol === 'https:' ? https : http;
    
    const req = module.request({
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          json: () => Promise.resolve(JSON.parse(data))
        });
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Test script to verify Khachhang GraphQL fix
async function testKhachhangFix() {
  console.log('🧪 Testing Khachhang GraphQL fix...\n');

  try {
    // Test 1: Test the original failing query (should now work)
    console.log('1. Testing original failing query with lowercase "khachhang"...');
    const response1 = await fetch('http://localhost:3331/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query FindMany($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Float, $take: Float, $include: JSON) {
            findMany(
              modelName: $modelName
              where: $where
              orderBy: $orderBy
              skip: $skip
              take: $take
              include: $include
            )
          }
        `,
        variables: { "modelName": "khachhang" }
      })
    });

    const result1 = await response1.json();
    if (response1.ok && !result1.errors) {
      console.log('✅ Lowercase "khachhang" query: SUCCESS');
      console.log('   Result type:', typeof result1.data.findMany);
      try {
        const parsed = JSON.parse(result1.data.findMany);
        console.log('   Total records:', parsed.total || 'Unknown');
      } catch {
        console.log('   Raw result:', result1.data.findMany);
      }
    } else {
      console.log('❌ Lowercase "khachhang" query: FAILED');
      console.log('   Error:', result1.errors?.[0]?.message || 'Unknown error');
    }

    // Test 2: Test with uppercase (should fail as expected)
    console.log('\n2. Testing with uppercase "Khachhang" (should fail)...');
    const response2 = await fetch('http://localhost:3331/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query FindMany($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Float, $take: Float, $include: JSON) {
            findMany(
              modelName: $modelName
              where: $where
              orderBy: $orderBy
              skip: $skip
              take: $take
              include: $include
            )
          }
        `,
        variables: { "modelName": "Khachhang" }
      })
    });

    const result2 = await response2.json();
    if (result2.errors) {
      console.log('✅ Uppercase "Khachhang" query: FAILED as expected');
      console.log('   Error:', result2.errors[0]?.message);
    } else {
      console.log('⚠️  Uppercase "Khachhang" query: Unexpectedly succeeded');
    }

    // Test 3: Test specific model query
    console.log('\n3. Testing specific model query "khachhang"...');
    const response3 = await fetch('http://localhost:3331/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetKhachhangs($pagination: PaginationInput) {
            khachhangs(pagination: $pagination) {
              data {
                id
                name
                makh
                isActive
              }
              pagination {
                total
                page
                pageSize
              }
            }
          }
        `,
        variables: { 
          "pagination": { "page": 1, "pageSize": 5 }
        }
      })
    });

    const result3 = await response3.json();
    if (response3.ok && !result3.errors) {
      console.log('✅ Specific "khachhangs" query: SUCCESS');
      console.log('   Total records:', result3.data.khachhangs?.pagination?.total || 'Unknown');
    } else {
      console.log('❌ Specific "khachhangs" query: FAILED');
      console.log('   Error:', result3.errors?.[0]?.message || 'Unknown error');
    }

    // Test 4: Get available models
    console.log('\n4. Getting available models...');
    const response4 = await fetch('http://localhost:3331/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetAvailableModels {
            getAvailableModels
          }
        `
      })
    });

    const result4 = await response4.json();
    if (response4.ok && !result4.errors) {
      console.log('✅ Available models query: SUCCESS');
      console.log('   Models:', result4.data.getAvailableModels?.slice(0, 10).join(', ') + '...');
      
      // Check if khachhang is in the list
      const hasKhachhang = result4.data.getAvailableModels?.includes('khachhang');
      console.log('   Contains "khachhang":', hasKhachhang ? '✅ YES' : '❌ NO');
    } else {
      console.log('❌ Available models query: FAILED');
      console.log('   Error:', result4.errors?.[0]?.message || 'Unknown error');
    }

    console.log('\n🎉 Test completed!');
    console.log('\n📝 Summary:');
    console.log('- Use lowercase model names: "khachhang", "sanpham", "donhang", etc.');
    console.log('- The GraphQL service now automatically normalizes model names');
    console.log('- Your original query should now work properly');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testKhachhangFix();
