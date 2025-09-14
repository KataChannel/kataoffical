import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '../redis/redis.service';

// Decorator for caching configuration
export const Cache = (ttl?: number, keyPrefix?: string) => 
  SetMetadata('cache', { ttl, keyPrefix });

export const CacheInvalidate = (patterns: string[]) =>
  SetMetadata('cacheInvalidate', patterns);

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheInterceptor.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    // Only cache GET requests
    if (request.method !== 'GET') {
      return this.handleNonGetRequest(context, next);
    }

    const cacheConfig = this.reflector.get<{ttl?: number, keyPrefix?: string}>('cache', context.getHandler());
    
    // Skip if no cache configuration
    if (!cacheConfig) {
      return next.handle();
    }

    const cacheKey = this.generateCacheKey(request, cacheConfig.keyPrefix);
    const ttl = cacheConfig.ttl || 3600; // Default 1 hour

    try {
      // Try to get from cache first
      const cachedData = await this.redisService.read(cacheKey);
      if (cachedData) {
        this.logger.debug(`Cache hit: ${cacheKey}`);
        response.set('X-Cache', 'HIT');
        return of(cachedData);
      }

      // If not in cache, execute handler and cache result
      response.set('X-Cache', 'MISS');
      return next.handle().pipe(
        tap(async (data) => {
          try {
            await this.redisService.create(cacheKey, data, ttl);
            this.logger.debug(`Cached response: ${cacheKey}`);
          } catch (error) {
            this.logger.error(`Failed to cache response: ${cacheKey}`, error.message);
          }
        }),
      );
    } catch (error) {
      this.logger.error(`Cache error for key ${cacheKey}:`, error.message);
      // Fall back to handler execution if cache fails
      return next.handle();
    }
  }

  private async handleNonGetRequest(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    
    // Check for cache invalidation patterns
    const invalidationPatterns = this.reflector.get<string[]>('cacheInvalidate', context.getHandler());
    
    if (invalidationPatterns && (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH' || request.method === 'DELETE')) {
      return next.handle().pipe(
        tap(async () => {
          try {
            // Invalidate cache patterns after successful operation
            for (const pattern of invalidationPatterns) {
              await this.redisService.deletePattern(pattern);
              this.logger.debug(`Invalidated cache pattern: ${pattern}`);
            }
          } catch (error) {
            this.logger.error('Failed to invalidate cache:', error.message);
          }
        }),
      );
    }

    return next.handle();
  }

  private generateCacheKey(request: any, keyPrefix?: string): string {
    const prefix = keyPrefix || 'api';
    const url = request.url;
    const method = request.method;
    const query = JSON.stringify(request.query || {});
    
    // Create a unique key based on URL, method, and query params
    return this.redisService.generateKey(prefix, method, url, query);
  }
}