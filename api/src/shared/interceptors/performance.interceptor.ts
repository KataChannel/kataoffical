import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { performance } from 'perf_hooks';
import { PerformanceLogger } from '../performance-logger';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger('PerformanceInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = performance.now();
    
    // Safely get HTTP context - might be undefined for GraphQL/WebSocket contexts
    const httpContext = context.switchToHttp();
    const request = httpContext?.getRequest();
    
    // Only destructure if request exists
    let method = 'UNKNOWN';
    let url = 'UNKNOWN';
    let ip = 'UNKNOWN';
    let headers = {};
    
    if (request) {
      ({ method = 'UNKNOWN', url = 'UNKNOWN', ip = 'UNKNOWN', headers = {} } = request);
    }
    
    // Tạo unique request ID
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const requestInfo = {
      id: requestId,
      method,
      url,
      ip,
      userAgent: headers['user-agent'] || 'UNKNOWN',
      timestamp: new Date().toISOString(),
    };

    // Log start của request
    this.logger.debug(`🚀 [${requestId}] ${method} ${url} started`);

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = performance.now() - start;
          
          // Safely get response context
          const httpContext = context.switchToHttp();
          const response = httpContext?.getResponse();
          
          const logData = {
            ...requestInfo,
            duration: parseFloat(duration.toFixed(2)),
            statusCode: response?.statusCode || 200,
            success: true,
            responseSize: data ? JSON.stringify(data).length : 0,
          };

          this.logRequest(logData);
        },
        error: (error) => {
          const duration = performance.now() - start;
          
          const logData = {
            ...requestInfo,
            duration: parseFloat(duration.toFixed(2)),
            statusCode: error.status || 500,
            success: false,
            error: error.message,
          };

          this.logRequest(logData);
        },
      }),
    );
  }

  private logRequest(data: any) {
    const { id, method, url, duration, statusCode, success, error } = data;
    const emoji = success ? '✅' : '❌';
    const speedLevel = duration > 1000 ? 'SLOW' : duration > 500 ? 'MEDIUM' : 'FAST';
    
    const message = `${emoji} [${speedLevel}] ${method} ${url} | ${duration}ms | ${statusCode} | ${data.responseSize || 0}bytes${error ? ` | Error: ${error}` : ''}`;
    
    if (duration > 1000) {
      this.logger.warn(message);
    } else if (duration > 500) {
      this.logger.log(message);
    } else {
      this.logger.debug(message);
    }

    // Lưu vào PerformanceLogger để persistent storage
    const operationName = `HTTP_${method}_${url}`;
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB
    
    if (success) {
      PerformanceLogger.logDuration(operationName, duration, {
        method,
        url,
        statusCode,
        responseSize: data.responseSize || 0,
        memoryUsage,
        requestId: id
      });
    } else {
      // For errors, we manually record the metric
      const metric = {
        name: operationName,
        duration,
        timestamp: Date.now(),
        context: {
          method,
          url,
          statusCode,
          memoryUsage,
          requestId: id
        },
        success: false,
        error,
        method,
        url,
        statusCode,
        memoryUsage
      };
      
      // Access private method through any cast (not ideal but works for this case)
      (PerformanceLogger as any).recordMetric(metric);
    }

    // Lưu vào database nếu cần
    this.saveToMetrics(data);
  }

  private saveToMetrics(data: any) {
    // Có thể lưu vào database hoặc cache để phân tích sau
    // Ở đây chỉ log ra console
    if (data.duration > 2000) {
      this.logger.error(`🐌 Very slow request detected: ${data.method} ${data.url} took ${data.duration}ms`);
    }
  }
}
