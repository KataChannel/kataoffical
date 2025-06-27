import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';
@Controller('redis')
export class CacheController {
  constructor(private readonly _CacheService: CacheService) {}

  @Get('check')
  async checkRedis() {
    return await this._CacheService.checkRedisConnection();
  }
  @Get('all')
  async getAllCachedData() {
    return await this._CacheService.getAllCachedData();
  }
  @Get('clearall')
  async clearAllCache() {
    return await this._CacheService.clearAllCache();
  }
}