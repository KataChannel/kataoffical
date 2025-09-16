import { Controller, Get, Post } from '@nestjs/common';
import { PerformanceLogger } from '../shared/performance-logger';

@Controller('test-performance')
export class TestPerformanceController {

  @Get('fast')
  async testFastOperation() {
    return await PerformanceLogger.logAsync('Test.FastOperation', async () => {
      // Simulate fast operation
      await new Promise(resolve => setTimeout(resolve, 100));
      return { message: 'Fast operation completed', duration: '~100ms' };
    });
  }

  @Get('slow')
  async testSlowOperation() {
    return await PerformanceLogger.logAsync('Test.SlowOperation', async () => {
      // Simulate slow operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { message: 'Slow operation completed', duration: '~2000ms' };
    });
  }

  @Get('error')
  async testErrorOperation() {
    try {
      return await PerformanceLogger.logAsync('Test.ErrorOperation', async () => {
        // Simulate error
        await new Promise(resolve => setTimeout(resolve, 500));
        throw new Error('Simulated error for testing');
      });
    } catch (error) {
      return { error: error.message, caught: true };
    }
  }

  @Post('bulk')
  async testBulkOperations() {
    const results: Array<{ success: boolean; result?: any; error?: string }> = [];
    
    // Generate multiple operations for testing
    for (let i = 0; i < 10; i++) {
      const duration = Math.random() * 1000 + 100; // 100-1100ms
      const shouldError = Math.random() < 0.2; // 20% chance of error
      
      try {
        const result = await PerformanceLogger.logAsync(`Test.BulkOperation_${i}`, async () => {
          await new Promise(resolve => setTimeout(resolve, duration));
          
          if (shouldError) {
            throw new Error(`Bulk operation ${i} failed`);
          }
          
          return { operationId: i, duration: Math.round(duration) };
        });
        
        results.push({ success: true, result });
      } catch (error) {
        results.push({ success: false, error: error.message });
      }
    }
    
    return {
      message: 'Bulk operations completed',
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      }
    };
  }
}
