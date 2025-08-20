const axios = require('axios');

// Test the chotkho createXuatnhapton API endpoint
async function testCreateXuatnhapton() {
  try {
    console.log('Testing chotkho createXuatnhapton endpoint...');
    
    // Sample GraphQL mutation for creating chotkho using universal service
    const graphqlQuery = {
      query: `
        mutation CreateChotkho($modelName: String!, $data: JSON!, $include: JSON) {
          createOne(modelName: $modelName, data: $data, include: $include)
        }
      `,
      variables: {
        modelName: "chotkho",
        include: {
          details: true
        },
        data: {
          khoId: 1,
          ngay: new Date().toISOString(),
          title: "Test Chốt Kho " + new Date().toISOString().slice(0, 10),
          ghichu: "Test chotkho creation after schema fix",
          details: {
            create: [
              {
                sanphamId: 1,
                tonkhoId: 1,
                slthucte: 100.0,
                slhethong: 95.0,
                chenhlech: 5.0,
                ghichu: "Test product 1"
              },
              {
                sanphamId: 2,
                tonkhoId: 2,
                slthucte: 50.0,
                slhethong: 48.0,
                chenhlech: 2.0,
                ghichu: "Test product 2"
              }
            ]
          }
        }
      }
    };

    const response = await axios.post('http://localhost:3331/graphql', graphqlQuery, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': 'Bearer your-token-here'
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
    console.log('❌ Error testing createXuatnhapton:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Test basic server connectivity
async function testServerConnectivity() {
  try {
    console.log('Testing server connectivity...');
    const response = await axios.get('http://localhost:3331/');
    console.log('✅ Server is running on port 3331');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Server connectivity test failed:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting chotkho functionality tests...');
  await testServerConnectivity();
  await testCreateXuatnhapton();
  console.log('🏁 Tests completed');
}

runTests();
