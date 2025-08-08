import { Injectable } from '@nestjs/common';

/**
 * Performance monitoring service for GraphQL operations
 * Tracks query performance, caching effectiveness, and optimization metrics
 */
@Injectable()
export class GraphQLPerformanceService {
  private metrics = new Map<string, any>();
  private queryCache = new Map<string, any>();

  constructor() {
    console.log('🚀 GraphQL Performance Service initialized');
    
    // Clean up old metrics every hour
    setInterval(() => {
      this.cleanupOldMetrics();
    }, 60 * 60 * 1000);
  }

  /**
   * Start tracking a GraphQL operation
   */
  startOperation(operationName: string, modelName: string, context: any = {}): string {
    const operationId = `${operationName}_${modelName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.metrics.set(operationId, {
      operationName,
      modelName,
      startTime: Date.now(),
      context,
      status: 'running'
    });

    return operationId;
  }

  /**
   * End tracking a GraphQL operation
   */
  endOperation(
    operationId: string, 
    result: { 
      success: boolean; 
      recordCount?: number; 
      error?: string;
      queryOptimized?: boolean;
      cacheHit?: boolean;
    }
  ): void {
    const metric = this.metrics.get(operationId);
    if (!metric) return;

    const endTime = Date.now();
    const duration = endTime - metric.startTime;

    const finalMetric = {
      ...metric,
      endTime,
      duration,
      status: result.success ? 'completed' : 'failed',
      recordCount: result.recordCount || 0,
      error: result.error,
      queryOptimized: result.queryOptimized || false,
      cacheHit: result.cacheHit || false,
    };

    this.metrics.set(operationId, finalMetric);

    // Log performance info
    this.logPerformanceInfo(finalMetric);

    // Update aggregated stats
    this.updateAggregatedStats(finalMetric);
  }

  /**
   * Get performance statistics
   */
  getPerformanceStats(modelName?: string): any {
    const stats = {
      totalOperations: 0,
      averageDuration: 0,
      successRate: 0,
      optimizedQueryRate: 0,
      cacheHitRate: 0,
      operationsByModel: new Map<string, any>(),
      slowestQueries: [] as any[],
      fastestQueries: [] as any[],
      recentErrors: [] as any[]
    };

    const relevantMetrics = Array.from(this.metrics.values()).filter(
      metric => !modelName || metric.modelName === modelName
    );

    if (relevantMetrics.length === 0) return stats;

    // Calculate basic stats
    stats.totalOperations = relevantMetrics.length;
    
    const completedOperations = relevantMetrics.filter(m => m.status === 'completed');
    const successfulOperations = completedOperations.filter(m => !m.error);
    
    if (completedOperations.length > 0) {
      stats.averageDuration = completedOperations.reduce((sum, m) => sum + m.duration, 0) / completedOperations.length;
      stats.successRate = (successfulOperations.length / completedOperations.length) * 100;
      stats.optimizedQueryRate = (completedOperations.filter(m => m.queryOptimized).length / completedOperations.length) * 100;
      stats.cacheHitRate = (completedOperations.filter(m => m.cacheHit).length / completedOperations.length) * 100;
    }

    // Group by model
    relevantMetrics.forEach(metric => {
      const modelStats = stats.operationsByModel.get(metric.modelName) || {
        count: 0,
        averageDuration: 0,
        successRate: 0
      };
      
      modelStats.count++;
      stats.operationsByModel.set(metric.modelName, modelStats);
    });

    // Find slowest and fastest queries
    const sortedByDuration = completedOperations.sort((a, b) => b.duration - a.duration);
    stats.slowestQueries = sortedByDuration.slice(0, 5).map(this.formatMetricForDisplay);
    stats.fastestQueries = sortedByDuration.slice(-5).reverse().map(this.formatMetricForDisplay);

    // Recent errors
    stats.recentErrors = relevantMetrics
      .filter(m => m.error)
      .sort((a, b) => b.startTime - a.startTime)
      .slice(0, 10)
      .map(this.formatMetricForDisplay);

    return stats;
  }

  /**
   * Cache a query result
   */
  cacheQueryResult(queryKey: string, result: any, ttl: number = 300000): void {
    const cacheEntry = {
      result,
      timestamp: Date.now(),
      ttl,
      hits: 0
    };

    this.queryCache.set(queryKey, cacheEntry);

    // Clean up expired entries
    this.cleanupExpiredCache();
  }

  /**
   * Get cached query result
   */
  getCachedQueryResult(queryKey: string): any {
    const cacheEntry = this.queryCache.get(queryKey);
    
    if (!cacheEntry) return null;
    
    // Check if expired
    if (Date.now() - cacheEntry.timestamp > cacheEntry.ttl) {
      this.queryCache.delete(queryKey);
      return null;
    }

    // Increment hit counter
    cacheEntry.hits++;
    
    return cacheEntry.result;
  }

  /**
   * Generate query cache key
   */
  generateQueryKey(modelName: string, operation: string, args: any): string {
    const argsHash = this.hashObject(args);
    return `${modelName}:${operation}:${argsHash}`;
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): any {
    const totalEntries = this.queryCache.size;
    const totalHits = Array.from(this.queryCache.values()).reduce((sum, entry) => sum + entry.hits, 0);
    
    return {
      totalEntries,
      totalHits,
      memoryUsage: this.estimateCacheMemoryUsage(),
      topCachedQueries: this.getTopCachedQueries()
    };
  }

  /**
   * Clear all caches and metrics
   */
  clearAll(): void {
    this.metrics.clear();
    this.queryCache.clear();
    console.log('🗑️ All GraphQL performance data cleared');
  }

  /**
   * Export performance data for analysis
   */
  exportPerformanceData(): any {
    return {
      metrics: Array.from(this.metrics.entries()),
      cacheStats: this.getCacheStats(),
      performanceStats: this.getPerformanceStats(),
      exportedAt: new Date().toISOString()
    };
  }

  // Private helper methods

  private logPerformanceInfo(metric: any): void {
    const { operationName, modelName, duration, recordCount, queryOptimized, cacheHit, error } = metric;
    
    const logMessage = `📊 ${operationName}(${modelName}): ${duration}ms`;
    const details = [
      recordCount ? `${recordCount} records` : '',
      queryOptimized ? '🚀 optimized' : '',
      cacheHit ? '💾 cache hit' : '',
      error ? `❌ error: ${error}` : '✅ success'
    ].filter(Boolean).join(', ');

    if (error) {
      console.error(`${logMessage} - ${details}`);
    } else if (duration > 1000) {
      console.warn(`${logMessage} - ${details} (SLOW QUERY)`);
    } else {
      console.log(`${logMessage} - ${details}`);
    }
  }

  private updateAggregatedStats(metric: any): void {
    // Could update aggregated statistics in database or external monitoring system
    // For now, we just keep in-memory stats
  }

  private formatMetricForDisplay(metric: any): any {
    return {
      operation: `${metric.operationName}(${metric.modelName})`,
      duration: `${metric.duration}ms`,
      recordCount: metric.recordCount,
      optimized: metric.queryOptimized,
      cacheHit: metric.cacheHit,
      timestamp: new Date(metric.startTime).toISOString()
    };
  }

  private hashObject(obj: any): string {
    // Simple hash function for objects
    const str = JSON.stringify(obj, Object.keys(obj).sort());
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  private cleanupOldMetrics(): void {
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
    
    for (const [id, metric] of this.metrics) {
      if (metric.startTime < cutoffTime) {
        this.metrics.delete(id);
      }
    }

    console.log(`🧹 Cleaned up old performance metrics. Current count: ${this.metrics.size}`);
  }

  private cleanupExpiredCache(): void {
    const now = Date.now();
    
    for (const [key, entry] of this.queryCache) {
      if (now - entry.timestamp > entry.ttl) {
        this.queryCache.delete(key);
      }
    }
  }

  private estimateCacheMemoryUsage(): string {
    // Rough estimation of cache memory usage
    const totalSize = Array.from(this.queryCache.values()).reduce((size, entry) => {
      return size + JSON.stringify(entry.result).length;
    }, 0);

    if (totalSize < 1024) return `${totalSize} bytes`;
    if (totalSize < 1024 * 1024) return `${(totalSize / 1024).toFixed(2)} KB`;
    return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
  }

  private getTopCachedQueries(): any[] {
    return Array.from(this.queryCache.entries())
      .map(([key, entry]) => ({
        query: key,
        hits: entry.hits,
        age: Date.now() - entry.timestamp
      }))
      .sort((a, b) => b.hits - a.hits)
      .slice(0, 10);
  }
}
