import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule} from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import { CacheController } from './cache.component';
@Global()
@Module({
  controllers: [CacheController],
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        console.log({
          host: process.env.REDIS_HOST || 'localhost',
          port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
          password: process.env.REDIS_PASSWORD,
          db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0,
          ttl: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 300,
        });
        return {
          store: redisStore,
          host: process.env.REDIS_HOST || 'localhost',
          port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
          password: process.env.REDIS_PASSWORD,
          db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0,
          ttl: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 300,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService, NestCacheModule],
})
export class CacheModule {}