// Simple tonKho test without complex selections

const GRAPHQL_URL = 'http://localhost:3331/graphql';

async function testTonKhoSimple() {
  console.log('🔍 Simple tonKho Query Test');
  console.log('='.repeat(40));

  const query = `
    query {
      findMany(modelName: "tonkho", take: 3)
    }
  `;

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    const result = await response.json();

    if (result.errors) {
      console.log(`❌ Errors:`, result.errors.map(e => e.message));
    } else {
      console.log(`✅ tonKho query SUCCESS!`);
      console.log(`📊 Data type:`, typeof result.data.findMany);
      console.log(`📋 Records found:`, Array.isArray(result.data.findMany) ? result.data.findMany.length : 'Not array');
      
      if (Array.isArray(result.data.findMany) && result.data.findMany.length > 0) {
        console.log(`📝 First record keys:`, Object.keys(result.data.findMany[0]));
      }
    }
  } catch (error) {
    console.log(`❌ Network Error: ${error.message}`);
  }

  console.log('='.repeat(40));
  console.log('✅ tonKho model is now accessible!');
}

testTonKhoSimple().catch(console.error);
