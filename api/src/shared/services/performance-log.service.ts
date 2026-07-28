import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  context?: any;
  success: boolean;
  error?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  memoryUsage?: number;
}

interface PerformanceQueryOptions {
  startDate?: Date;
  endDate?: Date;
  operation?: string;
  success?: boolean;
  minDuration?: number;
  maxDuration?: number;
  limit?: number;
  offset?: number;
}

@Injectable()
export class PerformanceLogService {
  private readonly logger = new Logger('PerformanceLogService');

  constructor(private readonly prisma: PrismaService) {}

  // Lưu performance metric vào database
  async saveMetric(metric: PerformanceMetric): Promise<void> {
    try {
      await this.prisma.performanceLog.create({
        data: {
          name: metric.name,
          duration: metric.duration,
          timestamp: new Date(metric.timestamp),
          context: metric.context,
          success: metric.success,
          error: metric.error,
          method: metric.method,
          url: metric.url,
          statusCode: metric.statusCode,
          memoryUsage: metric.memoryUsage,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to save performance metric: ${error.message}`);
    }
  }

  // Lưu nhiều metrics cùng lúc
  async saveMetrics(metrics: PerformanceMetric[]): Promise<void> {
    try {
      await this.prisma.performanceLog.createMany({
        data: metrics.map(metric => ({
          name: metric.name,
          duration: metric.duration,
          timestamp: new Date(metric.timestamp),
          context: metric.context,
          success: metric.success,
          error: metric.error,
          method: metric.method,
          url: metric.url,
          statusCode: metric.statusCode,
          memoryUsage: metric.memoryUsage,
        })),
      });
    } catch (error) {
      this.logger.error(`Failed to save performance metrics: ${error.message}`);
    }
  }

  // Lấy performance logs với filters
  async getLogs(options: PerformanceQueryOptions = {}) {
    const where: any = {};

    if (options.startDate || options.endDate) {
      where.timestamp = {};
      if (options.startDate) where.timestamp.gte = options.startDate;
      if (options.endDate) where.timestamp.lte = options.endDate;
    }

    if (options.operation) {
      where.name = { contains: options.operation };
    }

    if (options.success !== undefined) {
      where.success = options.success;
    }

    if (options.minDuration || options.maxDuration) {
      where.duration = {};
      if (options.minDuration) where.duration.gte = options.minDuration;
      if (options.maxDuration) where.duration.lte = options.maxDuration;
    }

    return await this.prisma.performanceLog.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: options.limit || 100,
      skip: options.offset || 0,
    });
  }

  // Lấy thống kê performance
  async getStatistics(hours: number = 24) {
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);

    const [
      totalCount,
      successCount,
      avgDuration,
      slowestOperations,
      errorLogs,
      operationBreakdown
    ] = await Promise.all([
      // Tổng số operations
      this.prisma.performanceLog.count({
        where: { timestamp: { gte: startTime } }
      }),

      // Số operations thành công
      this.prisma.performanceLog.count({
        where: { 
          timestamp: { gte: startTime },
          success: true 
        }
      }),

      // Thời gian trung bình
      this.prisma.performanceLog.aggregate({
        where: { timestamp: { gte: startTime } },
        _avg: { duration: true },
        _max: { duration: true },
        _min: { duration: true }
      }),

      // Top operations chậm nhất
      this.prisma.performanceLog.findMany({
        where: { timestamp: { gte: startTime } },
        orderBy: { duration: 'desc' },
        take: 10,
        select: {
          name: true,
          duration: true,
          timestamp: true,
          url: true,
          error: true
        }
      }),

      // Logs lỗi
      this.prisma.performanceLog.findMany({
        where: { 
          timestamp: { gte: startTime },
          success: false 
        },
        orderBy: { timestamp: 'desc' },
        take: 20
      }),

      // Breakdown theo operation
      this.prisma.performanceLog.groupBy({
        by: ['name'],
        where: { timestamp: { gte: startTime } },
        _count: { name: true },
        _avg: { duration: true },
        _max: { duration: true },
        _min: { duration: true },
        orderBy: { _avg: { duration: 'desc' } }
      })
    ]);

    return {
      timeRange: `Last ${hours} hours`,
      overview: {
        totalOperations: totalCount,
        successfulOperations: successCount,
        failedOperations: totalCount - successCount,
        successRate: totalCount > 0 ? ((successCount / totalCount) * 100).toFixed(2) + '%' : '100%',
        avgDuration: avgDuration._avg?.duration?.toFixed(2) + 'ms' || '0ms',
        maxDuration: avgDuration._max?.duration?.toFixed(2) + 'ms' || '0ms',
        minDuration: avgDuration._min?.duration?.toFixed(2) + 'ms' || '0ms'
      },
      slowestOperations: slowestOperations.map(op => ({
        name: op.name,
        duration: op.duration.toFixed(2) + 'ms',
        timestamp: op.timestamp.toISOString(),
        url: op.url,
        error: op.error
      })),
      recentErrors: errorLogs.map(log => ({
        name: log.name,
        error: log.error,
        duration: log.duration.toFixed(2) + 'ms',
        timestamp: log.timestamp.toISOString(),
        url: log.url
      })),
      operationBreakdown: operationBreakdown.map(op => ({
        operation: op.name,
        count: op._count.name,
        avgDuration: op._avg.duration?.toFixed(2) + 'ms' || '0ms',
        maxDuration: op._max.duration?.toFixed(2) + 'ms' || '0ms',
        minDuration: op._min.duration?.toFixed(2) + 'ms' || '0ms'
      }))
    };
  }

  // Xóa logs cũ (cleanup)
  async cleanupOldLogs(daysToKeep: number = 30): Promise<number> {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
    
    const result = await this.prisma.performanceLog.deleteMany({
      where: {
        timestamp: { lt: cutoffDate }
      }
    });

    this.logger.log(`Cleaned up ${result.count} old performance logs`);
    return result.count;
  }

  // Lấy trends theo thời gian
  async getTrends(hours: number = 24) {
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    // Group by hour
    const trends = await this.prisma.$queryRaw<any[]>`
      SELECT 
        DATE_TRUNC('hour', timestamp) as hour,
        COUNT(*) as total_operations,
        AVG(duration) as avg_duration,
        MAX(duration) as max_duration,
        COUNT(CASE WHEN success = false THEN 1 END) as error_count
      FROM performance_logs 
      WHERE timestamp >= ${startTime}
      GROUP BY DATE_TRUNC('hour', timestamp)
      ORDER BY hour DESC
    `;

    return trends.map(trend => ({
      hour: trend.hour,
      totalOperations: parseInt(trend.total_operations),
      avgDuration: parseFloat(trend.avg_duration).toFixed(2) + 'ms',
      maxDuration: parseFloat(trend.max_duration).toFixed(2) + 'ms',
      errorCount: parseInt(trend.error_count),
      errorRate: (parseInt(trend.error_count) / parseInt(trend.total_operations) * 100).toFixed(2) + '%'
    }));
  }
}
