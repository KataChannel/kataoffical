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
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger('PerformanceInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = performance.now();
    
    // Determine context type
    const contextType = context.getType();
    let requestInfo: any;
    
    if (contextType as string === 'graphql') {
      // Handle GraphQL context
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const args = gqlContext.getArgs();
      const gqlRequest = gqlContext.getContext().req;
      
      const requestId = `gql-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      requestInfo = {
        id: requestId,
        method: 'GRAPHQL',
        url: `/graphql/${info.fieldName}`,
        operation: info.operation.operation, // query, mutation, subscription
        fieldName: info.fieldName,
        parentType: info.parentType.name,
        ip: gqlRequest?.ip || 'UNKNOWN',
        userAgent: gqlRequest?.headers?.['user-agent'] || 'UNKNOWN',
        args: args,
        timestamp: new Date().toISOString(),
      };
      
      this.logger.debug(`🔮 [${requestId}] GraphQL ${info.operation.operation.toUpperCase()} ${info.fieldName} started`);
      
    } else {
      // Handle HTTP context
      const httpContext = context.switchToHttp();
      const request = httpContext?.getRequest();
      
      let method = 'UNKNOWN';
      let url = 'UNKNOWN';
      let ip = 'UNKNOWN';
      let headers = {};
      
      if (request) {
        ({ method = 'UNKNOWN', url = 'UNKNOWN', ip = 'UNKNOWN', headers = {} } = request);
      }
      
      const requestId = `http-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      requestInfo = {
        id: requestId,
        method,
        url,
        ip,
        userAgent: headers['user-agent'] || 'UNKNOWN',
        timestamp: new Date().toISOString(),
      };

      this.logger.debug(`🚀 [${requestId}] ${method} ${url} started`);
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = performance.now() - start;
          
          let logData: any;
          
          if (contextType as string === 'graphql') {
            // GraphQL success
            logData = {
              ...requestInfo,
              duration: parseFloat(duration.toFixed(2)),
              statusCode: 200,
              success: true,
              responseSize: data ? JSON.stringify(data).length : 0,
              dataType: 'GraphQL Response',
            };
          } else {
            // HTTP success
            const httpContext = context.switchToHttp();
            const response = httpContext?.getResponse();
            
            logData = {
              ...requestInfo,
              duration: parseFloat(duration.toFixed(2)),
              statusCode: response?.statusCode || 200,
              success: true,
              responseSize: data ? JSON.stringify(data).length : 0,
            };
          }

          this.logRequest(logData);
        },
        error: (error) => {
          const duration = performance.now() - start;
          
          let logData: any;
          
          if (contextType as string === 'graphql') {
            // GraphQL error
            logData = {
              ...requestInfo,
              duration: parseFloat(duration.toFixed(2)),
              statusCode: 400, // GraphQL typically returns 400 for client errors
              success: false,
              error: error.message,
              errorCode: error.extensions?.code || 'GRAPHQL_ERROR',
              dataType: 'GraphQL Error',
            };
          } else {
            // HTTP error
            logData = {
              ...requestInfo,
              duration: parseFloat(duration.toFixed(2)),
              statusCode: error.status || 500,
              success: false,
              error: error.message,
            };
          }

          this.logRequest(logData);
        },
      }),
    );
  }

  private logRequest(data: any) {
    const { id, method, url, duration, statusCode, success, error, fieldName, operation, dataType } = data;
    const emoji = success ? '✅' : '❌';
    const speedLevel = duration > 1000 ? 'SLOW' : duration > 500 ? 'MEDIUM' : 'FAST';
    
    let message: string;
    
    if (method === 'GRAPHQL') {
      // GraphQL specific logging
      const operationType = operation || 'query';
      const field = fieldName || 'unknown';
      message = `${emoji} [${speedLevel}] GraphQL ${operationType.toUpperCase()} ${field} | ${duration}ms | ${statusCode} | ${data.responseSize || 0}bytes${error ? ` | Error: ${error}` : ''}`;
      
      if (data.args && Object.keys(data.args).length > 0) {
        this.logger.debug(`📋 [${id}] GraphQL Args: ${JSON.stringify(data.args)}`);
      }
    } else {
      // HTTP specific logging
      message = `${emoji} [${speedLevel}] ${method} ${url} | ${duration}ms | ${statusCode} | ${data.responseSize || 0}bytes${error ? ` | Error: ${error}` : ''}`;
    }
    
    if (duration > 1000) {
      this.logger.warn(message);
    } else if (duration > 500) {
      this.logger.log(message);
    } else {
      this.logger.debug(message);
    }

    // Save to PerformanceLogger for persistent storage
    let operationName: string;
    
    if (method === 'GRAPHQL') {
      operationName = `GraphQL_${operation || 'query'}_${fieldName || 'unknown'}`;
    } else {
      operationName = `HTTP_${method}_${url}`;
    }
    
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB
    
    if (success) {
      PerformanceLogger.logDuration(operationName, duration, {
        method,
        url,
        statusCode,
        responseSize: data.responseSize || 0,
        memoryUsage,
        requestId: id,
        ...(method === 'GRAPHQL' && {
          operation: data.operation,
          fieldName: data.fieldName,
          parentType: data.parentType,
          args: data.args,
        })
      });
    } else {
      // For errors, manually record the metric
      const metric = {
        name: operationName,
        duration,
        timestamp: Date.now(),
        context: {
          method,
          url,
          statusCode,
          memoryUsage,
          requestId: id,
          ...(method === 'GRAPHQL' && {
            operation: data.operation,
            fieldName: data.fieldName,
            parentType: data.parentType,
            args: data.args,
            errorCode: data.errorCode,
          })
        },
        success: false,
        error,
        method,
        url,
        statusCode,
        memoryUsage
      };
      
      // Access private method through any cast
      (PerformanceLogger as any).recordMetric(metric);
    }

    // Save to metrics for analysis
    this.saveToMetrics(data);
  }

  private saveToMetrics(data: any) {
    // Enhanced metrics saving for both HTTP and GraphQL
    if (data.duration > 2000) {
      if (data.method === 'GRAPHQL') {
        this.logger.error(`🐌 Very slow GraphQL ${data.operation || 'query'} detected: ${data.fieldName} took ${data.duration}ms`);
      } else {
        this.logger.error(`🐌 Very slow request detected: ${data.method} ${data.url} took ${data.duration}ms`);
      }
    }
    
    // Log GraphQL-specific insights
    if (data.method === 'GRAPHQL' && data.args) {
      const argCount = Object.keys(data.args).length;
      if (argCount > 5) {
        this.logger.warn(`📊 GraphQL ${data.fieldName} has many arguments (${argCount}), consider optimizing`);
      }
    }
    
    // Memory usage warnings
    const currentMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    if (currentMemory > 500) { // Over 500MB
      this.logger.warn(`🧠 High memory usage detected: ${currentMemory.toFixed(2)}MB during ${data.method === 'GRAPHQL' ? `GraphQL ${data.fieldName}` : `${data.method} ${data.url}`}`);
    }
  }
}
