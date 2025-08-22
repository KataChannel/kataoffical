/**
 * Debug script for phieukho import transaction errors
 * Testing xuatnhapton import functionality
 */

const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function debugPhieukhoImportError() {
  console.log('🔍 Debugging phieukho import transaction errors...');
  
  try {
    // 1. Test basic phieukho creation first
    console.log('\n📝 Step 1: Testing basic phieukho creation...');
    
    const testPhieukhoData = {
      title: 'Test Debug Phieukho',
      type: 'nhap',
      ngay: new Date().toISOString(),
      ghichu: 'Debug test creation',
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258',
      isActive: true,
      sanpham: [
        {
          sanphamId: 'test-sp-001',
          soluong: 10,
          ghichu: 'Test product 1'
        }
      ]
    };

    try {
      const basicCreateResponse = await axios.post(`${API_BASE}/api/phieukho`, testPhieukhoData);
      console.log('✅ Basic phieukho creation works:', basicCreateResponse.data.id);
    } catch (error) {
      console.log('❌ Basic phieukho creation failed:', error.response?.data || error.message);
      console.log('This indicates the core phieukho service has issues');
      return;
    }

    // 2. Test concurrent phieukho creation (simulating import scenario)
    console.log('\n🔄 Step 2: Testing concurrent phieukho creation...');
    
    const concurrentPhieukhoData1 = {
      title: 'Concurrent Test 1',
      type: 'nhap',
      ngay: new Date().toISOString(),
      ghichu: 'Concurrent test 1',
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258',
      sanpham: [
        {
          sanphamId: 'test-sp-002',
          soluong: 5,
          ghichu: 'Concurrent test product 1'
        }
      ]
    };

    const concurrentPhieukhoData2 = {
      title: 'Concurrent Test 2',
      type: 'xuat',
      ngay: new Date().toISOString(),
      ghichu: 'Concurrent test 2',
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258',
      sanpham: [
        {
          sanphamId: 'test-sp-003',
          soluong: 3,
          ghichu: 'Concurrent test product 2'
        }
      ]
    };

    try {
      // Create both phieukho simultaneously 
      const [result1, result2] = await Promise.all([
        axios.post(`${API_BASE}/api/phieukho`, concurrentPhieukhoData1),
        axios.post(`${API_BASE}/api/phieukho`, concurrentPhieukhoData2)
      ]);
      
      console.log('✅ Concurrent creation successful:', result1.data.id, result2.data.id);
    } catch (error) {
      console.log('❌ Concurrent creation failed:', error.response?.data || error.message);
      console.log('This indicates race condition issues in generateNextOrderCode');
    }

    // 3. Test rapid sequential creation (simulating delay scenario)
    console.log('\n⚡ Step 3: Testing rapid sequential creation...');
    
    const rapidTestData = Array.from({ length: 5 }, (_, i) => ({
      title: `Rapid Test ${i + 1}`,
      type: i % 2 === 0 ? 'nhap' : 'xuat',
      ngay: new Date().toISOString(),
      ghichu: `Rapid test ${i + 1}`,
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258',
      sanpham: [
        {
          sanphamId: `rapid-sp-${i + 1}`,
          soluong: i + 1,
          ghichu: `Rapid test product ${i + 1}`
        }
      ]
    }));

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < rapidTestData.length; i++) {
      try {
        const response = await axios.post(`${API_BASE}/api/phieukho`, rapidTestData[i]);
        console.log(`  ✅ Rapid test ${i + 1} success: ${response.data.id}`);
        successCount++;
        
        // Small delay to prevent overwhelming
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.log(`  ❌ Rapid test ${i + 1} failed:`, error.response?.data?.message || error.message);
        errorCount++;
      }
    }

    console.log(`📊 Rapid test results: ${successCount} success, ${errorCount} errors`);

    // 4. Test generateNextOrderCode endpoint if exists
    console.log('\n🔢 Step 4: Testing maphieu generation...');
    
    try {
      // Check current latest phieukho
      const latestResponse = await axios.get(`${API_BASE}/api/phieukho`);
      const latestPhieukho = latestResponse.data[0];
      console.log('Latest phieukho maphieu:', latestPhieukho?.maphieu);
      
      // Show pattern analysis
      if (latestPhieukho?.maphieu) {
        const maphieu = latestPhieukho.maphieu;
        const prefix = maphieu.slice(0, 3);
        const letters = maphieu.slice(3, 5);
        const numbers = maphieu.slice(5);
        
        console.log(`Maphieu pattern: ${prefix} + ${letters} + ${numbers}`);
        console.log(`Type: ${latestPhieukho.type}, Expected prefix: ${latestPhieukho.type === 'nhap' ? 'PKN' : 'PKX'}`);
        
        if ((latestPhieukho.type === 'nhap' && prefix !== 'PKN') || 
            (latestPhieukho.type === 'xuat' && prefix !== 'PKX')) {
          console.log('⚠️  Maphieu prefix mismatch detected!');
        }
      }
    } catch (error) {
      console.log('❌ Could not analyze maphieu pattern:', error.message);
    }

    // 5. Database connection test
    console.log('\n🗄️  Step 5: Testing database connectivity...');
    
    try {
      const healthResponse = await axios.get(`${API_BASE}/health`);
      console.log('✅ Database health check:', healthResponse.data);
    } catch (error) {
      console.log('❌ Database health check failed:', error.message);
    }

    console.log('\n🎯 Debug Summary:');
    console.log('- Test basic phieukho creation to verify service works');
    console.log('- Test concurrent creation to check race conditions');
    console.log('- Test rapid sequential creation to check transaction handling');
    console.log('- Analyze maphieu generation pattern');
    console.log('- Check database connectivity');
    
  } catch (error) {
    console.error('❌ Debug session failed:', error.message);
  }
}

// Test specific transaction error scenarios
async function testTransactionErrorScenarios() {
  console.log('\n🧪 Testing specific transaction error scenarios...');
  
  // Scenario 1: Invalid sanphamId
  console.log('\n📋 Scenario 1: Invalid sanphamId');
  try {
    await axios.post(`${API_BASE}/api/phieukho`, {
      title: 'Invalid SanphamId Test',
      type: 'nhap',
      ngay: new Date().toISOString(),
      ghichu: 'Testing invalid sanphamId',
      sanpham: [
        {
          sanphamId: 'invalid-id-999999',
          soluong: 10,
          ghichu: 'Invalid product'
        }
      ]
    });
    console.log('❌ Should have failed but succeeded');
  } catch (error) {
    console.log('✅ Correctly failed with invalid sanphamId:', error.response?.data?.message);
  }

  // Scenario 2: Empty sanpham array
  console.log('\n📋 Scenario 2: Empty sanpham array');
  try {
    await axios.post(`${API_BASE}/api/phieukho`, {
      title: 'Empty Sanpham Test',
      type: 'nhap',
      ngay: new Date().toISOString(),
      ghichu: 'Testing empty sanpham',
      sanpham: []
    });
    console.log('❌ Should have failed but succeeded');
  } catch (error) {
    console.log('✅ Correctly failed with empty sanpham:', error.response?.data?.message);
  }

  // Scenario 3: Invalid type
  console.log('\n📋 Scenario 3: Invalid type');
  try {
    await axios.post(`${API_BASE}/api/phieukho`, {
      title: 'Invalid Type Test',
      type: 'invalid-type',
      ngay: new Date().toISOString(),
      ghichu: 'Testing invalid type',
      sanpham: [
        {
          sanphamId: 'test-sp-001',
          soluong: 10,
          ghichu: 'Test'
        }
      ]
    });
    console.log('❌ Should have failed but succeeded');
  } catch (error) {
    console.log('✅ Correctly failed with invalid type:', error.response?.data?.message);
  }
}

// Main execution
if (require.main === module) {
  console.log('🚀 Starting phieukho import error debug session...');
  
  debugPhieukhoImportError()
    .then(() => testTransactionErrorScenarios())
    .catch(console.error);
}

module.exports = {
  debugPhieukhoImportError,
  testTransactionErrorScenarios
};
