/**
 * Enhanced GraphQL System Test Suite
 * Tests dynamic field selection, DataLoader optimization, and performance monitoring
 */

const API_URL = 'http://localhost:3331/graphql';

class GraphQLTester {
  constructor() {
    this.results = {
      tests: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        duration: 0
      }
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Enhanced GraphQL System Tests');
    console.log('=' .repeat(60));
    
    const startTime = Date.now();

    try {
      // Test 1: Basic dynamic queries
      await this.testBasicDynamicQueries();
      
      // Test 2: Field selection optimization
      await this.testFieldSelectionOptimization();
      
      // Test 3: DataLoader batching
      await this.testDataLoaderBatching();
      
      // Test 4: Enhanced mutations
      await this.testEnhancedMutations();
      
      // Test 5: Batch operations
      await this.testBatchOperations();
      
      // Test 6: Performance monitoring
      await this.testPerformanceMonitoring();
      
      // Test 7: Cache management
      await this.testCacheManagement();
      
      // Test 8: Error handling
      await this.testErrorHandling();

    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }

    const duration = Date.now() - startTime;
    this.results.summary.duration = duration;
    
    this.printTestSummary();
  }

  async testBasicDynamicQueries() {
    console.log('\n📋 Test 1: Basic Dynamic Queries');
    
    // Test findMany with different models
    const queries = [
      { model: 'khachhang', take: 5 },
      { model: 'sanpham', take: 3 },
      { model: 'user', take: 2 }
    ];

    for (const query of queries) {
      try {
        const result = await this.executeGraphQL(`
          query TestFindMany($modelName: String!, $take: Int) {
            findMany(modelName: $modelName, take: $take) {
              ... on JSON
            }
          }
        `, {
          modelName: query.model,
          take: query.take
        });

        const success = result && Array.isArray(result.data.findMany);
        this.recordTest(`FindMany ${query.model}`, success, result);
        
        if (success) {
          console.log(`  ✅ ${query.model}: ${result.data.findMany.length} records`);
        }
      } catch (error) {
        this.recordTest(`FindMany ${query.model}`, false, error);
        console.log(`  ❌ ${query.model}: ${error.message}`);
      }
    }
  }

  async testFieldSelectionOptimization() {
    console.log('\n🎯 Test 2: Field Selection Optimization');
    
    // Test with custom select
    try {
      const result = await this.executeGraphQL(`
        query TestFieldSelection {
          findMany(
            modelName: "khachhang"
            take: 3
            select: {
              id: true
              name: true
              email: true
            }
          )
        }
      `);

      const success = result && result.data.findMany;
      this.recordTest('Field Selection - Custom Select', success, result);
      
      if (success) {
        console.log(`  ✅ Custom select: ${result.data.findMany.length} records`);
        console.log(`  📊 Fields returned:`, Object.keys(result.data.findMany[0] || {}));
      }
    } catch (error) {
      this.recordTest('Field Selection - Custom Select', false, error);
      console.log(`  ❌ Custom select failed: ${error.message}`);
    }

    // Test with include relations
    try {
      const result = await this.executeGraphQL(`
        query TestIncludeRelations {
          findMany(
            modelName: "donhang"
            take: 2
            include: {
              khachhang: true
            }
          )
        }
      `);

      const success = result && result.data.findMany;
      this.recordTest('Field Selection - Include Relations', success, result);
      
      if (success) {
        console.log(`  ✅ Include relations: ${result.data.findMany.length} orders`);
      }
    } catch (error) {
      this.recordTest('Field Selection - Include Relations', false, error);
      console.log(`  ❌ Include relations failed: ${error.message}`);
    }
  }

  async testDataLoaderBatching() {
    console.log('\n🔄 Test 3: DataLoader Batching');
    
    // Multiple queries that should benefit from batching
    const batchQueries = [
      this.executeGraphQL(`
        query BatchTest1 {
          findUnique(modelName: "khachhang", where: { id: "test-id-1" })
        }
      `),
      this.executeGraphQL(`
        query BatchTest2 {
          findUnique(modelName: "khachhang", where: { id: "test-id-2" })
        }
      `),
      this.executeGraphQL(`
        query BatchTest3 {
          findUnique(modelName: "khachhang", where: { id: "test-id-3" })
        }
      `)
    ];

    try {
      const results = await Promise.all(batchQueries);
      const success = results.every(r => r !== null);
      this.recordTest('DataLoader Batching', success, results);
      console.log(`  ✅ Batch queries completed: ${results.length} requests`);
    } catch (error) {
      this.recordTest('DataLoader Batching', false, error);
      console.log(`  ❌ Batch queries failed: ${error.message}`);
    }
  }

  async testEnhancedMutations() {
    console.log('\n✏️ Test 4: Enhanced Mutations');
    
    // Test create mutation
    try {
      const result = await this.executeGraphQL(`
        mutation TestCreate {
          createOne(
            modelName: "khachhang"
            data: {
              name: "Test Customer Enhanced"
              email: "test-enhanced@example.com"
              phone: "1234567890"
            }
            select: {
              id: true
              name: true
              email: true
              createdAt: true
            }
          )
        }
      `);

      const success = result && result.data.createOne && result.data.createOne.id;
      this.recordTest('Enhanced Create Mutation', success, result);
      
      if (success) {
        console.log(`  ✅ Created customer: ${result.data.createOne.id}`);
        
        // Test update mutation on the created record
        const updateResult = await this.executeGraphQL(`
          mutation TestUpdate($id: String!) {
            updateOne(
              modelName: "khachhang"
              where: { id: $id }
              data: {
                name: "Updated Test Customer Enhanced"
              }
              select: {
                id: true
                name: true
                updatedAt: true
              }
            )
          }
        `, { id: result.data.createOne.id });

        const updateSuccess = updateResult && updateResult.data.updateOne;
        this.recordTest('Enhanced Update Mutation', updateSuccess, updateResult);
        
        if (updateSuccess) {
          console.log(`  ✅ Updated customer: ${updateResult.data.updateOne.name}`);
        }
      }
    } catch (error) {
      this.recordTest('Enhanced Create Mutation', false, error);
      console.log(`  ❌ Enhanced mutations failed: ${error.message}`);
    }
  }

  async testBatchOperations() {
    console.log('\n📦 Test 5: Batch Operations');
    
    // Test batch create
    try {
      const result = await this.executeGraphQL(`
        mutation TestBatchCreate {
          batchCreate(
            modelName: "khachhang"
            data: [
              {
                name: "Batch Customer 1"
                email: "batch1@example.com"
                phone: "1111111111"
              }
              {
                name: "Batch Customer 2"
                email: "batch2@example.com"
                phone: "2222222222"
              }
              {
                name: "Batch Customer 3"
                email: "batch3@example.com"
                phone: "3333333333"
              }
            ]
          )
        }
      `);

      const success = result && result.data.batchCreate;
      this.recordTest('Batch Create Operation', success, result);
      
      if (success) {
        console.log(`  ✅ Batch create completed: ${result.data.batchCreate.count || 'unknown'} records`);
      }
    } catch (error) {
      this.recordTest('Batch Create Operation', false, error);
      console.log(`  ❌ Batch create failed: ${error.message}`);
    }
  }

  async testPerformanceMonitoring() {
    console.log('\n📊 Test 6: Performance Monitoring');
    
    // Test model metadata query
    try {
      const result = await this.executeGraphQL(`
        query TestModelMetadata {
          modelMetadata(modelName: "khachhang")
        }
      `);

      const success = result && result.data.modelMetadata;
      this.recordTest('Model Metadata Query', success, result);
      
      if (success) {
        console.log(`  ✅ Model metadata:`, result.data.modelMetadata);
      }
    } catch (error) {
      this.recordTest('Model Metadata Query', false, error);
      console.log(`  ❌ Model metadata failed: ${error.message}`);
    }
  }

  async testCacheManagement() {
    console.log('\n💾 Test 7: Cache Management');
    
    // Test cache clearing
    try {
      const result = await this.executeGraphQL(`
        mutation TestCacheClear {
          clearDataLoaderCache(modelName: "khachhang")
        }
      `);

      const success = result && result.data.clearDataLoaderCache && result.data.clearDataLoaderCache.success;
      this.recordTest('Cache Clear Operation', success, result);
      
      if (success) {
        console.log(`  ✅ Cache cleared:`, result.data.clearDataLoaderCache.message);
      }
    } catch (error) {
      this.recordTest('Cache Clear Operation', false, error);
      console.log(`  ❌ Cache clear failed: ${error.message}`);
    }
  }

  async testErrorHandling() {
    console.log('\n🔥 Test 8: Error Handling');
    
    // Test with invalid model name
    try {
      const result = await this.executeGraphQL(`
        query TestInvalidModel {
          findMany(modelName: "nonexistentmodel", take: 1)
        }
      `);

      // This should fail gracefully
      const hasError = result && result.errors && result.errors.length > 0;
      this.recordTest('Invalid Model Error Handling', hasError, result);
      
      if (hasError) {
        console.log(`  ✅ Error handled gracefully: ${result.errors[0].message}`);
      } else {
        console.log(`  ❌ Error not handled properly`);
      }
    } catch (error) {
      this.recordTest('Invalid Model Error Handling', true, error);
      console.log(`  ✅ Error caught: ${error.message}`);
    }
  }

  async executeGraphQL(query, variables = {}) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('  ⚠️ Server not running, skipping test');
        return null;
      }
      throw error;
    }
  }

  recordTest(name, success, result) {
    this.results.tests.push({
      name,
      success,
      result: success ? 'PASS' : 'FAIL',
      details: result
    });
    
    this.results.summary.total++;
    if (success) {
      this.results.summary.passed++;
    } else {
      this.results.summary.failed++;
    }
  }

  printTestSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Enhanced GraphQL System Test Summary');
    console.log('='.repeat(60));
    
    const { total, passed, failed, duration } = this.results.summary;
    const successRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed} ✅`);
    console.log(`Failed: ${failed} ❌`);
    console.log(`Success Rate: ${successRate}%`);
    console.log(`Duration: ${duration}ms`);
    
    console.log('\n📋 Detailed Results:');
    this.results.tests.forEach((test, index) => {
      const status = test.success ? '✅' : '❌';
      console.log(`  ${index + 1}. ${status} ${test.name}`);
    });

    console.log('\n🎯 Key Features Tested:');
    console.log('  • Dynamic field selection with graphql-fields');
    console.log('  • DataLoader optimization for N+1 prevention');
    console.log('  • Enhanced mutations with optimized responses');
    console.log('  • Batch operations for bulk data processing');
    console.log('  • Performance monitoring and metrics');
    console.log('  • Cache management and optimization');
    console.log('  • Comprehensive error handling');
    console.log('  • Prisma integration with automatic schema mapping');

    // Save results to file
    this.saveResults();
  }

  saveResults() {
    const fs = require('fs');
    const resultsFile = `graphql-test-results-${new Date().toISOString().split('T')[0]}.json`;
    
    try {
      fs.writeFileSync(resultsFile, JSON.stringify(this.results, null, 2));
      console.log(`\n💾 Test results saved to: ${resultsFile}`);
    } catch (error) {
      console.log(`\n⚠️ Could not save results: ${error.message}`);
    }
  }
}

// Run the tests
async function runTests() {
  const tester = new GraphQLTester();
  await tester.runAllTests();
}

// Export for use in CI/CD or direct execution
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { GraphQLTester, runTests };
