#!/usr/bin/env node

/**
 * Summary script to verify Redis cache implementation across all controllers and GraphQL
 */

const fs = require('fs');
const path = require('path');

class CacheImplementationChecker {
  constructor() {
    this.apiPath = path.join(__dirname, 'api', 'src');
    this.results = {
      controllers: {},
      graphql: {},
      summary: {
        total: 0,
        withCache: 0,
        missingCache: 0,
        percentage: 0
      }
    };
  }

  log(message, type = 'info') {
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '🔍';
    console.log(`${prefix} ${message}`);
  }

  // Check if file contains cache decorators
  checkCacheDecorators(filePath, content) {
    const hasSmartCache = content.includes('@SmartCache');
    const hasCacheInvalidate = content.includes('@CacheInvalidate');
    const hasCache = content.includes('@Cache(');
    const hasImports = content.includes('SmartCache') || content.includes('CacheInvalidate') || content.includes('Cache');
    
    const crudMethods = {
      create: /@Post\(\)\s*(?:.*\s*)*?[^@]*(?:create|Create)/s.test(content),
      update: /@(?:Put|Patch)\(\)/g.test(content),
      delete: /@Delete\(\)/g.test(content),
      read: /@Get\(\)/g.test(content)
    };

    return {
      hasCache: hasSmartCache || hasCacheInvalidate || hasCache,
      hasImports,
      decorators: {
        smartCache: hasSmartCache,
        cacheInvalidate: hasCacheInvalidate,
        cache: hasCache
      },
      methods: crudMethods,
      methodCount: Object.values(crudMethods).filter(Boolean).length
    };
  }

  // Scan all controllers
  async scanControllers() {
    this.log('🔍 Scanning controllers for cache implementation...');
    
    const controllersPath = path.join(this.apiPath);
    const entries = fs.readdirSync(controllersPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const controllerFile = path.join(controllersPath, entry.name, `${entry.name}.controller.ts`);
        
        try {
          if (fs.existsSync(controllerFile)) {
            const content = fs.readFileSync(controllerFile, 'utf-8');
            const analysis = this.checkCacheDecorators(controllerFile, content);
            
            this.results.controllers[entry.name] = {
              file: controllerFile,
              ...analysis
            };
            
            this.results.summary.total++;
            if (analysis.hasCache) {
              this.results.summary.withCache++;
            } else {
              this.results.summary.missingCache++;
            }
            
            this.log(`✓ Scanned ${entry.name} controller`);
          } else {
            this.log(`⚠️ Controller file not found: ${controllerFile}`);
          }
        } catch (error) {
          this.log(`Error scanning ${entry.name}: ${error.message}`);
        }
      }
    }
  }

  // Check GraphQL implementation
  async scanGraphQL() {
    this.log('🔍 Scanning GraphQL service for cache implementation...');
    
    const graphqlFiles = [
      path.join(this.apiPath, 'graphql', 'enhanced-universal.service.ts'),
      path.join(this.apiPath, 'graphql', 'enhanced-universal.resolver.ts')
    ];
    
    for (const filePath of graphqlFiles) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const fileName = path.basename(filePath);
        
        this.results.graphql[fileName] = {
          file: filePath,
          hasRedisService: content.includes('RedisService'),
          hasInvalidateCache: content.includes('invalidateCache'),
          hasCacheRead: content.includes('redisService.read'),
          hasCacheWrite: content.includes('redisService.create'),
          hasDataLoaderClear: content.includes('clearLoaderCache')
        };
      }
    }
  }

  // Generate report
  generateReport() {
    this.log('📊 Generating cache implementation report...\n');
    
    // Summary
    this.results.summary.percentage = ((this.results.summary.withCache / this.results.summary.total) * 100).toFixed(1);
    
    console.log('='.repeat(60));
    console.log('              REDIS CACHE IMPLEMENTATION REPORT');
    console.log('='.repeat(60));
    console.log(`Total Controllers: ${this.results.summary.total}`);
    console.log(`With Cache: ${this.results.summary.withCache}`);
    console.log(`Missing Cache: ${this.results.summary.missingCache}`);
    console.log(`Coverage: ${this.results.summary.percentage}%\n`);

    // Controllers Detail
    console.log('📁 CONTROLLERS ANALYSIS:');
    console.log('-'.repeat(60));
    
    for (const [name, analysis] of Object.entries(this.results.controllers)) {
      const status = analysis.hasCache ? '✅' : '❌';
      console.log(`${status} ${name.padEnd(20)} | Methods: ${analysis.methodCount} | Cache: ${analysis.hasCache ? 'YES' : 'NO'}`);
      
      if (analysis.hasCache) {
        const decorators = [];
        if (analysis.decorators.smartCache) decorators.push('@SmartCache');
        if (analysis.decorators.cacheInvalidate) decorators.push('@CacheInvalidate');
        if (analysis.decorators.cache) decorators.push('@Cache');
        console.log(`   └─ Using: ${decorators.join(', ')}`);
      }
      
      if (!analysis.hasCache && analysis.methodCount > 0) {
        console.log(`   └─ ⚠️  Has ${analysis.methodCount} CRUD methods but NO cache implementation`);
      }
    }

    // GraphQL Analysis
    console.log('\n🚀 GRAPHQL ANALYSIS:');
    console.log('-'.repeat(60));
    
    for (const [fileName, analysis] of Object.entries(this.results.graphql)) {
      console.log(`📄 ${fileName}:`);
      console.log(`   ├─ Redis Service: ${analysis.hasRedisService ? '✅' : '❌'}`);
      console.log(`   ├─ Cache Invalidation: ${analysis.hasInvalidateCache ? '✅' : '❌'}`);
      console.log(`   ├─ Cache Read: ${analysis.hasCacheRead ? '✅' : '❌'}`);
      console.log(`   ├─ Cache Write: ${analysis.hasCacheWrite ? '✅' : '❌'}`);
      console.log(`   └─ DataLoader Clear: ${analysis.hasDataLoaderClear ? '✅' : '❌'}`);
    }

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('-'.repeat(60));
    
    const missingCache = Object.entries(this.results.controllers).filter(([_, analysis]) => !analysis.hasCache && analysis.methodCount > 0);
    
    if (missingCache.length > 0) {
      console.log('⚠️  Controllers missing cache implementation:');
      missingCache.forEach(([name]) => {
        console.log(`   • ${name}.controller.ts - Add @SmartCache, @CacheInvalidate decorators`);
      });
    } else {
      console.log('✅ All controllers with CRUD operations have cache implementation!');
    }

    // GraphQL recommendations
    const graphqlIssues = [];
    for (const [fileName, analysis] of Object.entries(this.results.graphql)) {
      if (!analysis.hasRedisService) graphqlIssues.push(`${fileName}: Missing RedisService injection`);
      if (!analysis.hasInvalidateCache) graphqlIssues.push(`${fileName}: Missing cache invalidation`);
      if (!analysis.hasCacheRead) graphqlIssues.push(`${fileName}: Missing cache read operations`);
      if (!analysis.hasCacheWrite) graphqlIssues.push(`${fileName}: Missing cache write operations`);
    }

    if (graphqlIssues.length > 0) {
      console.log('\n⚠️  GraphQL issues:');
      graphqlIssues.forEach(issue => console.log(`   • ${issue}`));
    } else {
      console.log('✅ GraphQL cache implementation looks good!');
    }

    console.log('\n' + '='.repeat(60));
    
    // Overall status
    if (this.results.summary.percentage >= 90) {
      this.log('🎉 EXCELLENT: Redis cache implementation coverage is very good!', 'success');
    } else if (this.results.summary.percentage >= 70) {
      this.log('👍 GOOD: Most controllers have cache implementation', 'success');
    } else {
      this.log('⚠️  NEEDS IMPROVEMENT: Many controllers missing cache implementation', 'warning');
    }
  }

  // Main execution
  async run() {
    this.log('🚀 Starting Redis cache implementation analysis...\n');
    
    try {
      await this.scanControllers();
      await this.scanGraphQL();
      this.generateReport();
      
      // Save report to file
      const reportData = {
        timestamp: new Date().toISOString(),
        ...this.results
      };
      
      fs.writeFileSync(
        path.join(__dirname, 'cache-implementation-report.json'), 
        JSON.stringify(reportData, null, 2)
      );
      
      this.log('\n💾 Report saved to cache-implementation-report.json', 'success');
      
    } catch (error) {
      this.log(`Error during analysis: ${error.message}`, 'error');
    }
  }
}

// Run the checker
if (require.main === module) {
  const checker = new CacheImplementationChecker();
  checker.run().catch(console.error);
}

module.exports = CacheImplementationChecker;
