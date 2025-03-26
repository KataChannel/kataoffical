import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
  @Get()
  async getAll() {
    const allData = await this.redisService.showAll();
    return { data: allData };
  }
  
  @Get('keys')
  async keys(@Query('pattern') pattern: string) {
    const keys = await this.redisService.keys(pattern || '*');
    return { keys };
  }
  @Post()
  async create(
    @Body('key') key: string,
    @Body('value') value: any,
    @Body('ttl') ttl?: number,
  ) {
    await this.redisService.create(key, value, ttl);
    return { message: 'Key created successfully' };
  }

  @Get(':key')
  async read(@Param('key') key: string) {
    const data = await this.redisService.read(key);
    return { key, data };
  }

  @Put(':key')
  async update(
    @Param('key') key: string,
    @Body('value') value: any,
    @Body('ttl') ttl?: number,
  ) {
    await this.redisService.update(key, value, ttl);
    return { message: 'Key updated successfully' };
  }

  @Delete('clear')
  async clearAll() {
    await this.redisService.clearAll();
    return { message: 'All keys cleared successfully' };
  }
  @Delete(':key')
  async delete(@Param('key') key: string) {
    await this.redisService.delete(key);
    return { message: 'Key deleted successfully' };
  }

  @Get(':key/exists')
  async exists(@Param('key') key: string) {
    const exists = await this.redisService.exists(key);
    return { key, exists };
  }

  @Post(':key/expire')
  async expire(@Param('key') key: string, @Body('ttl') ttl: number) {
    await this.redisService.expire(key, ttl);
    return { message: 'TTL updated successfully' };
  }
}
