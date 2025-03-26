import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    });
  }

  async create(key: string, value: any, ttl: number = 3600) {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async read(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async update(key: string, value: any, ttl: number = 3600) {
    const exists = await this.client.exists(key);
    if (exists === 1) {
      await this.client.set(key, JSON.stringify(value), 'EX', ttl);
    } else {
      throw new Error(`Key "${key}" does not exist`);
    }
  }

  async delete(key: string) {
    await this.client.del(key);
  }

  async exists(key: string) {
    const exists = await this.client.exists(key);
    return exists === 1;
  }

  async expire(key: string, ttl: number) {
    await this.client.expire(key, ttl);
  }

  async keys(pattern: string) {
    const keys = await this.client.keys(pattern);
    return keys;
  }
  async clearAll() {
    const keys = await this.client.keys('*');
    if (keys.length > 0) {
      await this.client.del(keys);
    }
  }
}
