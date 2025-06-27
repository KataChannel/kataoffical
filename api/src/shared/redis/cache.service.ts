import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';
export interface CacheOptions {
  ttl?: number;
  prefix?: string;
}

@Injectable()
export class CacheService {
  private readonly redis: Redis;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
        password: process.env.REDIS_PASSWORD,
        db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0,
    });
  }


    async checkRedisConnection(): Promise<string> {
    try {
      // Perform a simple Redis operation (e.g., set and get a test key)
      await this.cacheManager.set('health-check', 'ok', 10);
      const result = await this.cacheManager.get('health-check');
      
      if (result === 'ok') {
        return 'Redis connection is healthy' + result;
      } else {
        throw new Error('Redis health check failed');
      }
    } catch (error) {
      throw new Error(`Redis connection failed: ${error.message}`);
    }
  }

async getAllCachedData(): Promise<{ key: string; value: string }[]> {
    try {
      // Lấy tất cả các khóa trong Redis
      const keys = await this.redis.keys('*');
      if (keys.length === 0) {
        return [];
      }

      // Lấy giá trị của từng khóa
      const results:any = [];
      for (const key of keys) {
        const value = await this.redis.get(key);
        results.push({ key, value });
      }

      return results;
    } catch (error) {
      throw new Error(`Không thể lấy dữ liệu cache: ${error.message}`);
    }
  }

  async deleteCachedData(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      throw new Error(`Không thể xóa khóa ${key}: ${error.message}`);
    }
  }

  // Thêm phương thức để xóa tất cả dữ liệu cache
  async clearAllCache(): Promise<void> {
    try {
      await this.redis.flushdb();
    } catch (error) {
      throw new Error(`Không thể xóa toàn bộ cache: ${error.message}`);
    }
  }
  
  // Generate dynamic cache key
  private generateKey(prefix: string, identifier: string | number | object): string {
    if (typeof identifier === 'object') {
      const sortedKeys = Object.keys(identifier).sort();
      const keyString = sortedKeys.map(key => `${key}:${(identifier as any)[key]}`).join('|');
      return `${prefix}:${Buffer.from(keyString).toString('base64')}`;
    }
    return `${prefix}:${identifier}`;
  }

  // Get cached data using ioredis
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Set cached data using ioredis
  async set<T>(key: string, value: T, options?: CacheOptions): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      if (options?.ttl) {
        await this.redis.set(key, stringValue, 'EX', options.ttl);
      } else {
        await this.redis.set(key, stringValue);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  // Delete cached data using ioredis
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  // Delete multiple keys by pattern using ioredis
  async delByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache delete by pattern error:', error);
    }
  }

  // Generic cache wrapper for any function using ioredis
  async getOrSet<T>(
    prefix: string,
    identifier: string | number | object,
    fetchFunction: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    const cacheKey = this.generateKey(options?.prefix || prefix, identifier);

    // Try to get from cache first
    const cached = await this.get<T>(cacheKey);
    // console.log(cached);  
    if (cached !== null) {
      return cached;
    }
    // If not in cache, fetch and store
    const data = await fetchFunction();
    await this.set(cacheKey, data, options);
    return data;
  }

  // Clear cache by prefix using ioredis
  async clearByPrefix(prefix: string): Promise<void> {
    await this.delByPattern(`${prefix}:*`);
  }
}
