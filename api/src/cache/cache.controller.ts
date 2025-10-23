import {
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import Redis from 'ioredis';

@ApiTags('cache')
@Controller('cache')
export class CacheController {
  private redis: Redis;

  constructor() {
    // Connect to Redis
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || undefined,
      db: 0,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

    this.redis.on('connect', () => {
      console.log('[CACHE] Redis connected');
    });

    this.redis.on('error', (err) => {
      console.error('[CACHE] Redis error:', err);
    });
  }

  @Post('invalidate/:model')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Invalidate cache for a model' })
  @ApiResponse({ status: 200, description: 'Cache invalidated successfully' })
  async invalidateCache(@Param('model') model: string) {
    console.log(`[CACHE] Invalidating cache for model: ${model}`);
    
    try {
      // Get all keys matching the pattern
      const pattern = `*${model.toLowerCase()}*`;
      const keys = await this.redis.keys(pattern);
      
      console.log(`[CACHE] Found ${keys?.length || 0} cache keys matching pattern: ${pattern}`);
      console.log(`[CACHE] Keys:`, keys);
      
      // Delete matching keys
      if (keys && keys.length > 0) {
        await this.redis.del(...keys);
        console.log(`[CACHE] ✅ Deleted ${keys.length} cache keys`);
      }
      
      // Also try to delete common cache key patterns
      const commonPatterns = [
        `findMany_banggia*`,
        `findUnique_banggia*`,
        `banggia_*`,
      ];
      
      for (const pattern of commonPatterns) {
        const patternKeys = await this.redis.keys(pattern);
        if (patternKeys && patternKeys.length > 0) {
          await this.redis.del(...patternKeys);
          console.log(`[CACHE] ✅ Deleted ${patternKeys.length} keys for pattern: ${pattern}`);
        }
      }
      
      console.log(`[CACHE] ✅ Cache invalidation completed for '${model}'`);
      
      return {
        success: true,
        message: `Cache invalidated for model: ${model}`,
        deletedKeys: keys?.length || 0,
      };
    } catch (error) {
      console.error(`[CACHE] ❌ Error invalidating cache:`, error);
      return {
        success: false,
        message: `Error invalidating cache: ${error.message}`,
        error: error.message,
      };
    }
  }

  @Post('invalidate-all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Invalidate all cache' })
  @ApiResponse({ status: 200, description: 'All cache invalidated successfully' })
  async invalidateAllCache() {
    console.log(`[CACHE] Invalidating ALL cache`);
    
    try {
      await this.redis.flushdb();
      console.log(`[CACHE] ✅ All cache cleared successfully`);
      
      return {
        success: true,
        message: 'All cache invalidated successfully',
      };
    } catch (error) {
      console.error(`[CACHE] ❌ Error clearing all cache:`, error);
      return {
        success: false,
        message: `Error clearing all cache: ${error.message}`,
        error: error.message,
      };
    }
  }

  @Post('stats')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get cache statistics' })
  @ApiResponse({ status: 200, description: 'Cache statistics' })
  async getCacheStats() {
    try {
      const keys = await this.redis.keys('*');
      const dbSize = await this.redis.dbsize();
      const info = await this.redis.info('memory');
      
      console.log(`[CACHE] Cache has ${keys?.length || 0} keys, DB size: ${dbSize}`);
      
      return {
        success: true,
        totalKeys: keys?.length || 0,
        dbSize: dbSize,
        memoryInfo: info,
        sampleKeys: keys?.slice(0, 10) || [],
      };
    } catch (error) {
      console.error(`[CACHE] ❌ Error getting cache stats:`, error);
      return {
        success: false,
        message: `Error getting cache stats: ${error.message}`,
      };
    }
  }
}
