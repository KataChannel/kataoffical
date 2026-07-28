import { Injectable, NestMiddleware, RequestTimeoutException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TimeoutMiddleware.name);
  private readonly activeRequests = new Map<string, NodeJS.Timeout>();

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = `${Date.now()}_${Math.random().toString(36)}`;
    const startTime = Date.now();
    
    // Default timeout configurations by route pattern
    const timeout = this.getTimeoutForRoute(req.path);
    
    // Set request timeout
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        this.logger.error(`Request timeout: ${req.method} ${req.path} after ${timeout}ms`);
        res.status(408).json({
          error: 'Request Timeout',
          message: `Request timed out after ${timeout}ms`,
          path: req.path,
          timestamp: new Date().toISOString()
        });
      }
      this.activeRequests.delete(requestId);
    }, timeout);

    this.activeRequests.set(requestId, timeoutId);

    // Clean up on response finish
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      
      if (this.activeRequests.has(requestId)) {
        clearTimeout(this.activeRequests.get(requestId));
        this.activeRequests.delete(requestId);
      }
      
      // Log slow requests
      if (duration > 3000) {
        this.logger.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);
      }
    });

    // Clean up on connection close
    res.on('close', () => {
      if (this.activeRequests.has(requestId)) {
        clearTimeout(this.activeRequests.get(requestId));
        this.activeRequests.delete(requestId);
      }
    });

    next();
  }

  private getTimeoutForRoute(path: string): number {
    // Configure timeouts based on route patterns
    const timeoutConfig = [
      { pattern: /\/graphql/, timeout: 30000 },          // GraphQL queries - 30s
      { pattern: /\/api\/.*\/dongbogia/, timeout: 60000 }, // Price sync - 60s
      { pattern: /\/api\/.*\/import/, timeout: 120000 },    // Import operations - 2 minutes
      { pattern: /\/api\/.*\/download/, timeout: 45000 },   // File downloads - 45s
      { pattern: /\/api\/.*\/upload/, timeout: 30000 },     // File uploads - 30s
      { pattern: /\/api\/.*\/congno/, timeout: 15000 },     // Debt reports - 15s
      { pattern: /\/api\/.*\/phieugiao/, timeout: 10000 },  // Delivery notes - 10s
      { pattern: /\/api\/health/, timeout: 5000 },          // Health checks - 5s
    ];

    for (const config of timeoutConfig) {
      if (config.pattern.test(path)) {
        return config.timeout;
      }
    }

    // Default timeout for other routes
    return 20000; // 20 seconds
  }

  /**
   * Get current active request count (for monitoring)
   */
  getActiveRequestCount(): number {
    return this.activeRequests.size;
  }

  /**
   * Clear all timeouts (for graceful shutdown)
   */
  clearAllTimeouts(): void {
    for (const [requestId, timeoutId] of this.activeRequests) {
      clearTimeout(timeoutId);
    }
    this.activeRequests.clear();
    this.logger.log('Cleared all request timeouts');
  }
}
