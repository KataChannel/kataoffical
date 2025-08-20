const axios = require('axios');

// Test the fixed chotkho createXuatnhapton without phieukhoId
async function testFixedCreateChotkho() {
  try {
    console.log('Testing fixed chotkho createXuatnhapton (without phieukhoId)...');
    
    // Get valid data first
    const khoResponse = await axios.post('http://localhost:3331/graphql', {
      query: `query GetKho($modelName: String!, $take: Float) { findMany(modelName: $modelName, take: $take) }`,
      variables: { modelName: "kho", take: 1 }
    }, { headers: { 'Content-Type': 'application/json' } });

    const tonkhoResponse = await axios.post('http://localhost:3331/graphql', {
      query: `query GetTonkho($modelName: String!, $take: Float) { findMany(modelName: $modelName, take: $take) }`,
      variables: { modelName: "tonkho", take: 2 }
    }, { headers: { 'Content-Type': 'application/json' } });

    const kho = khoResponse.data.data?.findMany?.[0];
    const tonkhoList = tonkhoResponse.data.data?.findMany || [];

    if (!kho || tonkhoList.length === 0) {
      console.log('❌ No valid test data found');
      return;
    }

    // Test data similar to the error case but without phieukhoId
    const graphqlQuery = {
      query: `
        mutation CreateChotkho($modelName: String!, $data: JSON!, $include: JSON) {
          createOne(modelName: $modelName, data: $data, include: $include)
        }
      `,
      variables: {
        modelName: "chotkho",
        include: {
          details: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true,
                  giagoc: true
                }
              },
              tonkho: {
                select: {
                  id: true,
                  slton: true,
                  slchogiao: true,
                  slchonhap: true
                }
              }
            }
          },
          kho: {
            select: {
              id: true,
              name: true,
              makho: true,
              diachi: true
            }
          }
        },
        data: {
          khoId: kho.id,
          ngay: new Date().toISOString(),
          title: "Chốt Kho Ngày " + new Date().toLocaleDateString('vi-VN'),
          ghichu: "Chốt kho tự động - " + new Date().toLocaleDateString('vi-VN', {
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) + " | Đã hoàn tất giao/nhập hàng",
          isActive: true,
          userId: null,
          details: {
            create: tonkhoList.slice(0, 2).map((tonkho, index) => ({
              sanphamId: tonkho.sanphamId,
              tonkhoId: tonkho.id,
              slthucte: 4.5 + index,
              slhethong: 0,
              chenhlech: 4.5 + index,
              ghichu: "Import từ Excel - " + new Date().toLocaleDateString('vi-VN', {
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) + " | Đã hoàn tất giao/nhập hàng",
              isActive: true
            }))
          }
        }
      }
    };

    console.log('📤 Sending fixed mutation...');

    const response = await axios.post('http://localhost:3331/graphql', graphqlQuery, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ GraphQL Response Status:', response.status);
    
    if (response.data.errors) {
      console.log('❌ GraphQL Errors:', JSON.stringify(response.data.errors, null, 2));
    } else {
      console.log('✅ Chotkho created successfully!');
      console.log('✅ Created chotkho ID:', response.data.data.createOne.id);
      console.log('✅ Details count:', response.data.data.createOne.details?.length || 0);
      console.log('✅ Full response:', JSON.stringify(response.data.data.createOne, null, 2));
    }

  } catch (error) {
    console.log('❌ Error testing fixed createChotkho:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Run the test
testFixedCreateChotkho();
