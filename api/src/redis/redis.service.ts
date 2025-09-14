import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || '116.118.49.243',
      port: Number(process.env.REDIS_PORT) || 56379,
      password: process.env.REDIS_PASSWORD || undefined,
      db: Number(process.env.REDIS_DB) || 0,
      maxRetriesPerRequest: 5,
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times >= 5) {
          this.logger.error('Redis: Quá số lần thử lại, dừng kết nối.');
          return null;
        }
        const delay = Math.min(times * 100, 2000);
        this.logger.warn(`Redis: Thử lại lần ${times}, delay ${delay}ms`);
        return delay;
      },
      reconnectOnError: (err) => {
        this.logger.error('Redis reconnection error:', err.message);
        return true;
      }
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected successfully');
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis error:', err.message);
    });

    this.client.on('close', () => {
      this.logger.warn('Redis connection closed');
    });
  }

  async onModuleDestroy() {
    await this.client.disconnect();
  }

  async create(key: string, value: any, ttl: number = 3600) {
    try {
      await this.client.set(key, JSON.stringify(value), 'EX', ttl);
      this.logger.debug(`Cache set: ${key}`);
    } catch (error) {
      this.logger.error(`Error setting cache for key ${key}:`, error.message);
    }
  }

  async read(key: string) {
    try {
      const data = await this.client.get(key);
      this.logger.debug(`Cache ${data ? 'hit' : 'miss'}: ${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      this.logger.error(`Error reading cache for key ${key}:`, error.message);
      return null;
    }
  }

  async update(key: string, value: any, ttl: number = 3600) {
    try {
      const exists = await this.client.exists(key);
      if (exists === 1) {
        await this.client.set(key, JSON.stringify(value), 'EX', ttl);
        this.logger.debug(`Cache updated: ${key}`);
      } else {
        throw new Error(`Key "${key}" does not exist`);
      }
    } catch (error) {
      this.logger.error(`Error updating cache for key ${key}:`, error.message);
      throw error;
    }
  }

  async delete(key: string) {
    try {
      await this.client.del(key);
      this.logger.debug(`Cache deleted: ${key}`);
    } catch (error) {
      this.logger.error(`Error deleting cache for key ${key}:`, error.message);
    }
  }

  async deletePattern(pattern: string) {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
        this.logger.debug(`Cache pattern deleted: ${pattern} (${keys.length} keys)`);
      }
    } catch (error) {
      this.logger.error(`Error deleting cache pattern ${pattern}:`, error.message);
    }
  }

  async exists(key: string) {
    try {
      const exists = await this.client.exists(key);
      return exists === 1;
    } catch (error) {
      this.logger.error(`Error checking existence for key ${key}:`, error.message);
      return false;
    }
  }

  async expire(key: string, ttl: number) {
    try {
      await this.client.expire(key, ttl);
      this.logger.debug(`Cache expiry set: ${key} (${ttl}s)`);
    } catch (error) {
      this.logger.error(`Error setting expiry for key ${key}:`, error.message);
    }
  }

  async keys(pattern: string) {
    try {
      const keys = await this.client.keys(pattern);
      return keys;
    } catch (error) {
      this.logger.error(`Error getting keys for pattern ${pattern}:`, error.message);
      return [];
    }
  }

  async clearAll() {
    try {
      const keys = await this.client.keys('*');
      if (keys.length > 0) {
        await this.client.del(keys);
        this.logger.debug(`All cache cleared (${keys.length} keys)`);
      }
    } catch (error) {
      this.logger.error('Error clearing all cache:', error.message);
    }
  }

  async showAll() {
    try {
      const keys = await this.client.keys('*');
      const allData = {};
      for (const key of keys) {
        const value = await this.read(key);
        allData[key] = value;
      }
      return allData;
    } catch (error) {
      this.logger.error('Error showing all cache:', error.message);
      return {};
    }
  }

  // Helper methods for common caching patterns
  async cacheOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 3600
  ): Promise<T> {
    try {
      const cached = await this.read(key);
      if (cached) {
        return cached;
      }

      const data = await fetchFn();
      await this.create(key, data, ttl);
      return data;
    } catch (error) {
      this.logger.error(`Error in cacheOrFetch for key ${key}:`, error.message);
      // Fallback to direct fetch if cache fails
      return fetchFn();
    }
  }

  generateKey(prefix: string, ...parts: string[]): string {
    return `${prefix}:${parts.join(':')}`;
  }
}
