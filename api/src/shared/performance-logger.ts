import { performance } from 'perf_hooks';
import { Logger } from '@nestjs/common';

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

export class PerformanceLogger {
  private static logger = new Logger('PerformanceLogger');
  private static metrics: PerformanceMetric[] = [];
  private static readonly MAX_METRICS = 1000; // Giới hạn số lượng metrics lưu trữ trong memory
  private static performanceLogService: any; // Will be injected

  // Inject PerformanceLogService
  static setPerformanceLogService(service: any) {
    this.performanceLogService = service;
  }

  static async logAsync<T>(name: string, fn: () => Promise<T>, context?: any): Promise<T> {
    const start = performance.now();
    const timestamp = Date.now();
    
    try {
      const result = await fn();
      const duration = performance.now() - start;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        timestamp,
        context,
        success: true
      };

      this.recordMetric(metric);
      this.logPerformance(name, duration, context, true);
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        timestamp,
        context,
        success: false,
        error: error.message
      };

      this.recordMetric(metric);
      this.logPerformance(name, duration, context, false, error.message);
      
      throw error;
    }
  }

  static logSync<T>(name: string, fn: () => T, context?: any): T {
    const start = performance.now();
    const timestamp = Date.now();
    
    try {
      const result = fn();
      const duration = performance.now() - start;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        timestamp,
        context,
        success: true
      };

      this.recordMetric(metric);
      this.logPerformance(name, duration, context, true);
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        timestamp,
        context,
        success: false,
        error: error.message
      };

      this.recordMetric(metric);
      this.logPerformance(name, duration, context, false, error.message);
      
      throw error;
    }
  }

  // Log với duration đã tính sẵn (dành cho interceptor)
  static logDuration(name: string, duration: number, context?: any): void {
    const timestamp = Date.now();
    
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp,
      context,
      success: true
    };

    this.recordMetric(metric);
    this.logPerformance(name, duration, context, true);
  }

  private static recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    // Giữ chỉ MAX_METRICS metrics gần nhất
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics.shift();
    }

    // Lưu vào database nếu service có sẵn
    if (this.performanceLogService) {
      this.performanceLogService.saveMetric(metric).catch((error: any) => {
        this.logger.error(`Failed to save metric to database: ${error.message}`);
      });
    }
  }

  private static logPerformance(
    name: string, 
    duration: number, 
    context?: any, 
    success = true, 
    error?: string
  ) {
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    const statusEmoji = success ? '✅' : '❌';
    
    if (duration > 1000) {
      // Slow operations (>1s)
      this.logger.warn(
        `${statusEmoji} [SLOW] ${name} | Duration: ${duration.toFixed(2)}ms${contextStr}${error ? ` | Error: ${error}` : ''}`
      );
    } else if (duration > 500) {
      // Medium operations (>500ms)
      this.logger.log(
        `${statusEmoji} [MEDIUM] ${name} | Duration: ${duration.toFixed(2)}ms${contextStr}${error ? ` | Error: ${error}` : ''}`
      );
    } else {
      // Fast operations (<500ms)
      this.logger.debug(
        `${statusEmoji} [FAST] ${name} | Duration: ${duration.toFixed(2)}ms${contextStr}${error ? ` | Error: ${error}` : ''}`
      );
    }
  }

  // Lấy thống kê performance
  static getStatistics() {
    const now = Date.now();
    const last5Minutes = this.metrics.filter(m => now - m.timestamp < 5 * 60 * 1000);
    const last1Hour = this.metrics.filter(m => now - m.timestamp < 60 * 60 * 1000);
    
    return {
      total: this.metrics.length,
      last5Minutes: {
        count: last5Minutes.length,
        avgDuration: last5Minutes.length > 0 
          ? last5Minutes.reduce((sum, m) => sum + m.duration, 0) / last5Minutes.length 
          : 0,
        successRate: last5Minutes.length > 0 
          ? (last5Minutes.filter(m => m.success).length / last5Minutes.length) * 100 
          : 100
      },
      last1Hour: {
        count: last1Hour.length,
        avgDuration: last1Hour.length > 0 
          ? last1Hour.reduce((sum, m) => sum + m.duration, 0) / last1Hour.length 
          : 0,
        successRate: last1Hour.length > 0 
          ? (last1Hour.filter(m => m.success).length / last1Hour.length) * 100 
          : 100
      },
      slowest: [...this.metrics]
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 10)
        .map(m => ({ name: m.name, duration: m.duration, timestamp: m.timestamp })),
      errorRate: this.metrics.length > 0 
        ? (this.metrics.filter(m => !m.success).length / this.metrics.length) * 100 
        : 0
    };
  }

  // Xóa metrics cũ
  static clearMetrics() {
    this.metrics = [];
    this.logger.log('🧹 Performance metrics cleared');
  }
}
