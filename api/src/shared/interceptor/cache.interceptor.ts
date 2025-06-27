import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../redis/cache.service';
import { CACHE_PREFIX, CACHE_TTL } from '../decorators/cache.decorator';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private cacheService: CacheService,
    private reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const prefix = this.reflector.get<string>(CACHE_PREFIX, context.getHandler());
    const ttl = this.reflector.get<number>(CACHE_TTL, context.getHandler());

    if (!prefix) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const { params, query, body } = request;
    
    // Create cache key from request parameters
    const cacheIdentifier = { ...params, ...query, ...body };
    const cacheKey = this.generateCacheKey(prefix, cacheIdentifier);

    // Try to get from cache
    const cachedResult = await this.cacheService.get(cacheKey);
    if (cachedResult) {
      return of(cachedResult);
    }

    // If not cached, execute and cache the result
    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheService.set(cacheKey, data, { ttl });
      }),
    );
  }

  private generateCacheKey(prefix: string, identifier: any): string {
    if (typeof identifier === 'object' && Object.keys(identifier).length > 0) {
      const sortedKeys = Object.keys(identifier).sort();
      const keyString = sortedKeys.map(key => `${key}:${identifier[key]}`).join('|');
      return `${prefix}:${Buffer.from(keyString).toString('base64')}`;
    }
    return `${prefix}:default`;
  }
}