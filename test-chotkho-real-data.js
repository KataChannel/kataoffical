const axios = require('axios');

// Query existing data to get valid IDs
async function getValidIds() {
  try {
    console.log('Querying existing data for valid IDs...');
    
    // Get first available kho
    const khoQuery = {
      query: `
        query GetKho($modelName: String!, $take: Float) {
          findMany(modelName: $modelName, take: $take) 
        }
      `,
      variables: {
        modelName: "kho",
        take: 1
      }
    };

    const khoResponse = await axios.post('http://localhost:3331/graphql', khoQuery, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Get first available sanpham
    const sanphamQuery = {
      query: `
        query GetSanpham($modelName: String!, $take: Float) {
          findMany(modelName: $modelName, take: $take)
        }
      `,
      variables: {
        modelName: "sanpham",
        take: 2
      }
    };

    const sanphamResponse = await axios.post('http://localhost:3331/graphql', sanphamQuery, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Get tonkho records
    const tonkhoQuery = {
      query: `
        query GetTonkho($modelName: String!, $take: Float) {
          findMany(modelName: $modelName, take: $take)
        }
      `,
      variables: {
        modelName: "tonkho",
        take: 2
      }
    };

    const tonkhoResponse = await axios.post('http://localhost:3331/graphql', tonkhoQuery, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('✅ Kho data:', khoResponse.data.data?.findMany || []);
    console.log('✅ Sanpham data:', sanphamResponse.data.data?.findMany || []);
    console.log('✅ Tonkho data:', tonkhoResponse.data.data?.findMany || []);

    return {
      kho: khoResponse.data.data?.findMany?.[0],
      sanpham: sanphamResponse.data.data?.findMany || [],
      tonkho: tonkhoResponse.data.data?.findMany || []
    };

  } catch (error) {
    console.log('❌ Error querying data:', error.message);
    return null;
  }
}

// Test the chotkho createXuatnhapton API endpoint with real data
async function testCreateChotkhoWithRealData() {
  try {
    const validData = await getValidIds();
    if (!validData || !validData.kho) {
      console.log('❌ No valid kho found, cannot test chotkho creation');
      return;
    }

    console.log('Testing chotkho createXuatnhapton with real data...');
    
    // Prepare test data with valid IDs
    const testDetails = [];
    if (validData.tonkho.length > 0) {
      validData.tonkho.slice(0, 2).forEach((tonkho, index) => {
        testDetails.push({
          sanphamId: tonkho.sanphamId,
          tonkhoId: tonkho.id,
          slthucte: parseFloat((tonkho.tonhientai || 0) + 5 + index).toFixed(3),
          slhethong: parseFloat(tonkho.tonhientai || 0).toFixed(3),
          chenhlech: parseFloat(5 + index).toFixed(3),
          ghichu: `Test product ${index + 1}`
        });
      });
    }

    // If no tonkho data, create minimal test with just kho info
    if (testDetails.length === 0 && validData.sanpham.length > 0) {
      validData.sanpham.slice(0, 2).forEach((sanpham, index) => {
        testDetails.push({
          sanphamId: sanpham.id,
          slthucte: parseFloat(100 + index * 10).toFixed(3),
          slhethong: parseFloat(95 + index * 10).toFixed(3),
          chenhlech: parseFloat(5).toFixed(3),
          ghichu: `Test product ${index + 1}`
        });
      });
    }

    const graphqlQuery = {
      query: `
        mutation CreateChotkho($modelName: String!, $data: JSON!, $include: JSON) {
          createOne(modelName: $modelName, data: $data, include: $include)
        }
      `,
      variables: {
        modelName: "chotkho",
        include: {
          details: true,
          kho: true
        },
        data: {
          khoId: validData.kho.id,
          ngay: new Date().toISOString(),
          title: "Test Chốt Kho " + new Date().toISOString().slice(0, 16),
          ghichu: "Test chotkho creation after schema fix - with real data",
          details: {
            create: testDetails
          }
        }
      }
    };

    console.log('📤 Sending mutation with data:', JSON.stringify(graphqlQuery.variables, null, 2));

    const response = await axios.post('http://localhost:3331/graphql', graphqlQuery, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ GraphQL Response Status:', response.status);
    console.log('✅ Response Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.errors) {
      console.log('❌ GraphQL Errors:', response.data.errors);
    } else {
      console.log('✅ Chotkho created successfully!');
      console.log('✅ Response data:', response.data.data.createOne);
    }

  } catch (error) {
    console.log('❌ Error testing createChotkho:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting chotkho functionality tests with real data...');
  await testCreateChotkhoWithRealData();
  console.log('🏁 Tests completed');
}

runTests();
