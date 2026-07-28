import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Server Stability Service
 * Provides monitoring, circuit breakers, and fail-safe mechanisms
 * to prevent server hangs and cascading failures
 */
@Injectable()
export class ServerStabilityService {
  private readonly logger = new Logger(ServerStabilityService.name);
  
  // Circuit breaker state
  private circuitBreakers = new Map<string, {
    failureCount: number;
    lastFailureTime: number;
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
    threshold: number;
    timeout: number;
  }>();

  // Request timeout tracking
  private activeRequests = new Map<string, {
    startTime: number;
    route: string;
    timeout: number;
  }>();

  constructor(private readonly prisma: PrismaService) {
    this.initializeHealthChecks();
  }

  /**
   * Initialize periodic health checks
   */
  private initializeHealthChecks(): void {
    // Database connection health check every 30 seconds
    setInterval(async () => {
      await this.checkDatabaseHealth();
    }, 30000);

    // Memory usage monitoring every 60 seconds
    setInterval(() => {
      this.checkMemoryUsage();
    }, 60000);

    // Active request timeout monitoring every 10 seconds
    setInterval(() => {
      this.checkRequestTimeouts();
    }, 10000);

    // Circuit breaker state reset every 5 minutes
    setInterval(() => {
      this.updateCircuitBreakerStates();
    }, 300000);
  }

  /**
   * Wrap database transaction with timeout and circuit breaker
   */
  async safeTransaction<T>(
    operation: (prisma: any) => Promise<T>,
    options: {
      timeout?: number;
      maxWait?: number;
      circuitBreakerKey?: string;
      retryCount?: number;
    } = {}
  ): Promise<T> {
    const {
      timeout = 15000,
      maxWait = 20000,
      circuitBreakerKey,
      retryCount = 0
    } = options;

    // Check circuit breaker if key provided
    if (circuitBreakerKey && !this.isCircuitBreakerClosed(circuitBreakerKey)) {
      throw new Error(`Circuit breaker OPEN for ${circuitBreakerKey}`);
    }

    const operationId = `tx_${Date.now()}_${Math.random().toString(36)}`;
    
    try {
      // Track the transaction
      this.activeRequests.set(operationId, {
        startTime: Date.now(),
        route: circuitBreakerKey || 'database_transaction',
        timeout: timeout
      });

      const result = await this.prisma.$transaction(operation, {
        timeout,
        maxWait
      });

      // Success - reset circuit breaker failure count
      if (circuitBreakerKey) {
        this.recordCircuitBreakerSuccess(circuitBreakerKey);
      }

      return result;
    } catch (error) {
      this.logger.error(`Transaction failed: ${error.message}`, error.stack);
      
      // Record circuit breaker failure
      if (circuitBreakerKey) {
        this.recordCircuitBreakerFailure(circuitBreakerKey);
      }

      // Retry logic for transient failures
      if (retryCount < 2 && this.isRetryableError(error)) {
        this.logger.warn(`Retrying transaction, attempt ${retryCount + 1}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return this.safeTransaction(operation, { ...options, retryCount: retryCount + 1 });
      }

      throw error;
    } finally {
      this.activeRequests.delete(operationId);
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: any): boolean {
    const retryableMessages = [
      'timeout',
      'connection',
      'ECONNRESET',
      'ENOTFOUND',
      'ETIMEDOUT'
    ];
    
    return retryableMessages.some(msg => 
      error.message?.toLowerCase().includes(msg.toLowerCase())
    );
  }

  /**
   * Database health check
   */
  private async checkDatabaseHealth(): Promise<void> {
    try {
      const start = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      const duration = Date.now() - start;
      
      if (duration > 5000) {
        this.logger.warn(`Database response slow: ${duration}ms`);
      }
      
      // Reset database circuit breaker on success
      this.recordCircuitBreakerSuccess('database');
    } catch (error) {
      this.logger.error('Database health check failed', error);
      this.recordCircuitBreakerFailure('database');
    }
  }

  /**
   * Memory usage monitoring
   */
  private checkMemoryUsage(): void {
    const memUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
    
    if (heapUsedMB > 512) { // Alert if heap usage > 512MB
      this.logger.warn(`High memory usage: ${heapUsedMB}MB / ${heapTotalMB}MB`);
    }
    
    // Force garbage collection if memory usage is very high
    if (heapUsedMB > 1024 && global.gc) {
      this.logger.warn('Forcing garbage collection due to high memory usage');
      global.gc();
    }
  }

  /**
   * Check for requests that exceeded timeout
   */
  private checkRequestTimeouts(): void {
    const now = Date.now();
    
    for (const [id, request] of this.activeRequests) {
      const duration = now - request.startTime;
      if (duration > request.timeout) {
        this.logger.error(`Request timeout detected: ${request.route} running for ${duration}ms`);
        // Consider this a failure for circuit breaker
        this.recordCircuitBreakerFailure(request.route);
      }
    }
  }

  /**
   * Circuit breaker implementation
   */
  private isCircuitBreakerClosed(key: string): boolean {
    const breaker = this.circuitBreakers.get(key);
    if (!breaker) return true;
    
    const now = Date.now();
    
    switch (breaker.state) {
      case 'CLOSED':
        return true;
      case 'OPEN':
        if (now - breaker.lastFailureTime > breaker.timeout) {
          breaker.state = 'HALF_OPEN';
          return true;
        }
        return false;
      case 'HALF_OPEN':
        return true;
      default:
        return true;
    }
  }

  private recordCircuitBreakerSuccess(key: string): void {
    const breaker = this.circuitBreakers.get(key);
    if (breaker) {
      breaker.failureCount = 0;
      breaker.state = 'CLOSED';
    }
  }

  private recordCircuitBreakerFailure(key: string): void {
    let breaker = this.circuitBreakers.get(key);
    if (!breaker) {
      breaker = {
        failureCount: 0,
        lastFailureTime: 0,
        state: 'CLOSED',
        threshold: 5,
        timeout: 60000 // 1 minute
      };
      this.circuitBreakers.set(key, breaker);
    }
    
    breaker.failureCount++;
    breaker.lastFailureTime = Date.now();
    
    if (breaker.failureCount >= breaker.threshold) {
      breaker.state = 'OPEN';
      this.logger.error(`Circuit breaker OPEN for ${key} after ${breaker.failureCount} failures`);
    }
  }

  private updateCircuitBreakerStates(): void {
    const now = Date.now();
    for (const [key, breaker] of this.circuitBreakers) {
      if (breaker.state === 'OPEN' && now - breaker.lastFailureTime > breaker.timeout) {
        breaker.state = 'HALF_OPEN';
        this.logger.log(`Circuit breaker ${key} moved to HALF_OPEN state`);
      }
    }
  }

  /**
   * Get health status
   */
  async getHealthStatus(): Promise<any> {
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();
    
    // Check database connectivity
    let dbStatus = 'healthy';
    let dbResponseTime = 0;
    try {
      const start = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      dbResponseTime = Date.now() - start;
    } catch (error) {
      dbStatus = 'unhealthy';
    }

    return {
      status: dbStatus === 'healthy' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
      memory: {
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024)
      },
      database: {
        status: dbStatus,
        responseTime: dbResponseTime
      },
      activeRequests: this.activeRequests.size,
      circuitBreakers: Array.from(this.circuitBreakers.entries()).map(([key, breaker]) => ({
        key,
        state: breaker.state,
        failureCount: breaker.failureCount
      }))
    };
  }
}
