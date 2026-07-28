import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { PerformanceLogger } from '../performance-logger';
import { PerformanceLogService } from '../services/performance-log.service';

@Controller('performance')
export class PerformanceController {

  constructor(private readonly performanceLogService: PerformanceLogService) {}

  // Memory-based stats (real-time)
  @Get('stats')
  getPerformanceStats() {
    return PerformanceLogger.getStatistics();
  }

  // Database-based comprehensive stats
  @Get('db-stats')
  async getDatabaseStats(@Query('hours', new ParseIntPipe({ optional: true })) hours: number = 24) {
    return await this.performanceLogService.getStatistics(hours);
  }

  // Lấy logs từ database với filtering
  @Get('logs')
  async getLogs(
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 100,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number = 0,
    @Query('operation') operation?: string,
    @Query('success') success?: string,
    @Query('minDuration', new ParseIntPipe({ optional: true })) minDuration?: number,
    @Query('hours', new ParseIntPipe({ optional: true })) hours: number = 24
  ) {
    const startDate = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return await this.performanceLogService.getLogs({
      startDate,
      operation,
      success: success ? success === 'true' : undefined,
      minDuration,
      limit,
      offset
    });
  }

  // Trends theo thời gian
  @Get('trends')
  async getTrends(@Query('hours', new ParseIntPipe({ optional: true })) hours: number = 24) {
    return await this.performanceLogService.getTrends(hours);
  }

  // Dashboard tổng hợp (memory + database)
  @Get('summary')
  async getPerformanceSummary(@Query('hours', new ParseIntPipe({ optional: true })) hours: number = 24) {
    const [memoryStats, dbStats, trends] = await Promise.all([
      PerformanceLogger.getStatistics(),
      this.performanceLogService.getStatistics(hours),
      this.performanceLogService.getTrends(hours)
    ]);
    
    return {
      realTime: {
        totalOperations: memoryStats.total,
        errorRate: `${memoryStats.errorRate.toFixed(2)}%`,
        recent: {
          last5Minutes: {
            count: memoryStats.last5Minutes.count,
            averageResponseTime: `${memoryStats.last5Minutes.avgDuration.toFixed(2)}ms`,
            successRate: `${memoryStats.last5Minutes.successRate.toFixed(2)}%`,
          },
          last1Hour: {
            count: memoryStats.last1Hour.count,
            averageResponseTime: `${memoryStats.last1Hour.avgDuration.toFixed(2)}ms`,
            successRate: `${memoryStats.last1Hour.successRate.toFixed(2)}%`,
          }
        },
        slowestOperations: memoryStats.slowest.map(metric => ({
          operation: metric.name,
          duration: `${metric.duration.toFixed(2)}ms`,
          timestamp: new Date(metric.timestamp).toISOString(),
        }))
      },
      historical: dbStats,
      trends: trends
    };
  }

  // Cleanup old logs
  @Get('cleanup')
  async cleanupOldLogs(@Query('days', new ParseIntPipe({ optional: true })) days: number = 30) {
    const deletedCount = await this.performanceLogService.cleanupOldLogs(days);
    return { 
      message: `Cleaned up ${deletedCount} old performance logs older than ${days} days` 
    };
  }

  // Clear memory metrics only
  @Get('clear')
  clearMemoryMetrics() {
    PerformanceLogger.clearMetrics();
    return { message: 'Memory performance metrics cleared successfully' };
  }
}
