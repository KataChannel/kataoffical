// Using built-in fetch instead of axios

const GRAPHQL_URL = 'http://localhost:3331/graphql';

async function testTonKhoQueries() {
  console.log('🔍 Testing tonKho Model Queries After Fix');
  console.log('='.repeat(50));

  const queries = [
    {
      name: 'Basic tonKho query (lowercase)',
      query: `
        query {
          findMany(modelName: "tonkho", take: 5) {
            data
            count
          }
        }
      `
    },
    {
      name: 'TonKho query (proper case)',
      query: `
        query {
          findMany(modelName: "TonKho", take: 5) {
            data
            count
          }
        }
      `
    },
    {
      name: 'getAvailableModels query',
      query: `
        query {
          getAvailableModels
        }
      `
    },
    {
      name: 'Model metadata for tonkho',
      query: `
        query {
          modelMetadata(modelName: "tonkho")
        }
      `
    }
  ];

  for (const { name, query } of queries) {
    try {
      console.log(`\n📋 ${name}:`);
      
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      const result = await response.json();

      if (result.errors) {
        console.log(`  ❌ Errors:`, result.errors.map(e => e.message));
      } else {
        console.log(`  ✅ Success!`);
        if (result.data.findMany) {
          console.log(`    📊 Records count: ${result.data.findMany.count || 'N/A'}`);
        } else if (result.data.getAvailableModels) {
          console.log(`    📋 Available models: ${result.data.getAvailableModels.length} models`);
          console.log(`    📝 Models list: ${result.data.getAvailableModels.slice(0, 5).join(', ')}...`);
        } else if (result.data.modelMetadata) {
          console.log(`    📊 Metadata:`, result.data.modelMetadata);
        } else {
          console.log(`    📋 Result:`, JSON.stringify(result.data, null, 2));
        }
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('🏁 tonKho Model Testing Complete');
}

// Run the test
testTonKhoQueries().catch(console.error);
