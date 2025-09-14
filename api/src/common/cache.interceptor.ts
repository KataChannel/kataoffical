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
    try {
      const contextType = context.getType();
      if (contextType !== 'http') {
        return next.handle();
      }

      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      
      if (!request || !request.method) {
        this.logger.warn('Invalid request object, skipping cache');
        return next.handle();
      }
      
      if (request.method !== 'GET') {
        return this.handleNonGetRequest(context, next);
      }

      const cacheConfig = this.reflector.get<{ttl?: number, keyPrefix?: string}>('cache', context.getHandler());
      
      if (!cacheConfig) {
        return next.handle();
      }

      const cacheKey = this.generateCacheKey(request, cacheConfig.keyPrefix);
      const ttl = cacheConfig.ttl || 3600;

      try {
        const cachedData = await this.redisService.read(cacheKey);
        if (cachedData) {
          this.logger.debug(`Cache hit: ${cacheKey}`);
          response.setHeader('X-Cache', 'HIT');
          return of(cachedData);
        }
      } catch (error) {
        this.logger.error(`Failed to read from cache: ${cacheKey}`, error.message);
      }

      this.logger.debug(`Cache miss: ${cacheKey}`);
      response.setHeader('X-Cache', 'MISS');

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
      this.logger.error(`Cache interceptor error:`, error.message);
      return next.handle();
    }
  }

  private handleNonGetRequest(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const contextType = context.getType();
      if (contextType !== 'http') {
        return next.handle();
      }

      const request = context.switchToHttp().getRequest();
      
      if (!request || !request.method) {
        return next.handle();
      }
      
      const invalidationPatterns = this.reflector.get<string[]>('cacheInvalidate', context.getHandler());
      const cacheConfig = this.reflector.get<{ttl?: number, keyPrefix?: string}>('cache', context.getHandler());
      
      if (invalidationPatterns && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
        return next.handle().pipe(
          tap(async (responseData) => {
            try {
              // 1. First, invalidate old cache patterns
              for (const pattern of invalidationPatterns) {
                await this.redisService.deletePattern(`*${pattern}*`);
                this.logger.debug(`Invalidated cache pattern: ${pattern}`);
              }

              // 2. Then, immediately cache new data for CREATE/UPDATE operations
              if (responseData && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
                await this.cacheNewData(request, responseData, cacheConfig);
              }
            } catch (error) {
              this.logger.error('Failed to handle cache operations:', error.message);
            }
          }),
        );
      }

      return next.handle();
    } catch (error) {
      this.logger.error('Cache invalidation error:', error.message);
      return next.handle();
    }
  }

  private generateCacheKey(request: any, keyPrefix?: string): string {
    const prefix = keyPrefix || 'api';
    const url = request.url;
    const method = request.method;
    const query = JSON.stringify(request.query || {});
    
    return this.redisService.generateKey(prefix, method, url, query);
  }

  /**
   * Cache new data immediately after CREATE/UPDATE operations
   */
  private async cacheNewData(request: any, responseData: any, cacheConfig?: {ttl?: number, keyPrefix?: string}): Promise<void> {
    try {
      if (!responseData || !cacheConfig) {
        return;
      }

      const ttl = cacheConfig.ttl || 3600;

      // Cache individual item if response contains single object
      if (responseData.id) {
        const itemCacheKey = this.generateCacheKey({
          ...request,
          url: `${request.url.split('?')[0]}/${responseData.id}`,
          method: 'GET'
        }, cacheConfig.keyPrefix);
        
        await this.redisService.create(itemCacheKey, responseData, ttl);
        this.logger.debug(`Cached new item: ${itemCacheKey}`);
      }

      // Update list cache with new data
      const listCacheKey = this.generateCacheKey({
        ...request,
        url: request.url.split('?')[0],
        method: 'GET',
        query: {}
      }, cacheConfig.keyPrefix);

      try {
        const existingList = await this.redisService.read(listCacheKey);
        if (existingList && Array.isArray(existingList)) {
          let updatedList = [...existingList];
          
          if (request.method === 'POST') {
            // Add new item to list
            updatedList.unshift(responseData);
          } else if (request.method === 'PUT' || request.method === 'PATCH') {
            // Update existing item in list
            const index = updatedList.findIndex(item => item.id === responseData.id);
            if (index !== -1) {
              updatedList[index] = responseData;
            }
          }

          await this.redisService.create(listCacheKey, updatedList, ttl);
          this.logger.debug(`Updated list cache: ${listCacheKey}`);
        }
      } catch (error) {
        // List cache doesn't exist or error reading it - skip update
        this.logger.debug(`Skipped list cache update: ${error.message}`);
      }

    } catch (error) {
      this.logger.error('Failed to cache new data:', error.message);
    }
  }
}