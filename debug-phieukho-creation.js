/**
 * Debug script to test phieukho creation during chotkho workflow
 */

const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function debugPhieukhoCreation() {
  console.log('🔍 Debugging phieukho creation in chotkho workflow...');
  
  try {
    // 1. Test tạo chotkho với chênh lệch
    console.log('\n📝 Step 1: Creating test chotkho with discrepancies...');
    
    const testChotkhoData = {
      codeId: `TEST-PHIEUKHO-${Date.now()}`,
      ngay: new Date().toISOString(),
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258', // Default kho ID
      ghichu: 'Test debug phieukho creation',
      details: [
        {
          sanphamId: 'SP001',
          slhethong: 100,
          slthucte: 110,
          chenhlech: 10,  // Thừa 10 -> cần phiếu xuất
          ghichu: 'Test positive discrepancy'
        },
        {
          sanphamId: 'SP002', 
          slhethong: 50,
          slthucte: 45,
          chenhlech: -5,  // Thiếu 5 -> cần phiếu nhập
          ghichu: 'Test negative discrepancy'
        },
        {
          sanphamId: 'SP003',
          slhethong: 75,
          slthucte: 75,
          chenhlech: 0,   // Không chênh lệch
          ghichu: 'No discrepancy'
        }
      ]
    };

    const createResponse = await axios.post(`${API_BASE}/api/chotkho`, testChotkhoData);
    const chotkhoId = createResponse.data.id;
    console.log(`✅ Created chotkho: ${chotkhoId}`);
    
    // 2. Test updateTonkhoAfterClose để xem có tạo phiếu kho không
    console.log('\n🔄 Step 2: Testing updateTonkhoAfterClose...');
    
    const updateResponse = await axios.post(`${API_BASE}/api/chotkho/${chotkhoId}/update-tonkho`);
    console.log('✅ UpdateTonkhoAfterClose response:', updateResponse.data);
    
    // 3. Kiểm tra phiếu kho đã được tạo chưa
    console.log('\n🔍 Step 3: Checking if phieukho were created...');
    
    const phieukhoResponse = await axios.get(`${API_BASE}/api/phieukho?isChotkho=true&recent=true`);
    const recentPhieukho = phieukhoResponse.data.filter(pk => 
      pk.ghichu && pk.ghichu.includes(testChotkhoData.codeId)
    );
    
    console.log(`Found ${recentPhieukho.length} phieukho related to test chotkho:`);
    recentPhieukho.forEach(pk => {
      console.log(`  - ${pk.maphieu} (${pk.type}): ${pk.ghichu}`);
    });
    
    // 4. Kiểm tra chi tiết phiếu kho
    console.log('\n📋 Step 4: Checking phieukho details...');
    
    for (const phieukho of recentPhieukho) {
      const detailResponse = await axios.get(`${API_BASE}/api/phieukho/findid/${phieukho.id}`);
      const details = detailResponse.data.sanpham || [];
      
      console.log(`  Phiếu ${phieukho.maphieu} has ${details.length} items:`);
      details.forEach(item => {
        console.log(`    - SP: ${item.sanphamId}, SL: ${item.soluong}, Note: ${item.ghichu}`);
      });
    }
    
    // 5. Kiểm tra tonkho đã được update chưa
    console.log('\n📊 Step 5: Checking tonkho updates...');
    
    for (const detail of testChotkhoData.details) {
      try {
        const tonkhoResponse = await axios.get(`${API_BASE}/api/tonkho?sanphamId=${detail.sanphamId}`);
        const tonkho = tonkhoResponse.data[0];
        
        if (tonkho) {
          console.log(`  ${detail.sanphamId}: slton=${tonkho.slton} (expected: ${detail.slthucte})`);
          if (tonkho.slton !== detail.slthucte) {
            console.log(`    ⚠️  Mismatch! Expected ${detail.slthucte}, got ${tonkho.slton}`);
          }
        } else {
          console.log(`    ❌ TonKho not found for ${detail.sanphamId}`);
        }
      } catch (error) {
        console.log(`    ❌ Error checking tonkho for ${detail.sanphamId}:`, error.message);
      }
    }
    
    console.log('\n🎉 Debug completed!');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Test riêng createAdjustmentPhieuKho method
async function testCreateAdjustmentPhieuKho() {
  console.log('\n🧪 Testing createAdjustmentPhieuKho directly...');
  
  try {
    const testData = {
      type: 'xuat',
      sanphamId: 'SP001',
      soluong: 5,
      ghichu: 'Test direct adjustment',
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258'
    };
    
    const response = await axios.post(`${API_BASE}/api/phieukho/adjustment`, testData);
    console.log('✅ Direct createAdjustmentPhieuKho response:', response.data);
    
  } catch (error) {
    console.error('❌ Direct test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Check existing phieukho
async function checkExistingPhieukho() {
  console.log('\n📋 Checking existing phieukho with isChotkho=true...');
  
  try {
    const response = await axios.get(`${API_BASE}/api/phieukho?isChotkho=true`);
    const chothkoPhieukho = response.data;
    
    console.log(`Found ${chothkoPhieukho.length} chotkho-related phieukho:`);
    chothkoPhieukho.forEach((pk, index) => {
      console.log(`${index + 1}. ${pk.maphieu} (${pk.type}) - ${pk.ngay} - ${pk.ghichu}`);
    });
    
    if (chothkoPhieukho.length === 0) {
      console.log('❌ No chotkho phieukho found! This indicates the issue.');
    }
    
  } catch (error) {
    console.error('❌ Failed to check existing phieukho:', error.message);
  }
}

// Run all tests
if (require.main === module) {
  console.log('🚀 Starting phieukho debug session...');
  
  checkExistingPhieukho()
    .then(() => testCreateAdjustmentPhieuKho())
    .then(() => debugPhieukhoCreation())
    .catch(console.error);
}

module.exports = {
  debugPhieukhoCreation,
  testCreateAdjustmentPhieuKho,
  checkExistingPhieukho
};
