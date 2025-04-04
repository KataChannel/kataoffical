// import { Injectable } from '@nestjs/common';
// import { Redis } from 'ioredis';

// @Injectable()
// export class RedisService {
//   private client: Redis;

//   constructor() {
//     this.client = new Redis({
//       host: process.env.REDIS_HOST || '116.118.49.243',
//       port: Number(process.env.REDIS_PORT) || 6379,
//       maxRetriesPerRequest: 5, // Giới hạn tối đa 5 lần thử lại khi request lỗi
//       retryStrategy(times) {
//         if (times >= 5) {
//           console.error('Redis: Quá số lần thử lại, dừng kết nối.');
//           return null; // Ngừng thử lại
//         }
//         const delay = Math.min(times * 100, 2000); // Delay tăng dần, tối đa 2s
//         console.warn(`Redis: Thử lại lần ${times}, delay ${delay}ms`);
//         return delay;
//       },
//     });
    
//   }

//   async create(key: string, value: any, ttl: number = 60) {
//     await this.client.set(key, JSON.stringify(value), 'EX', ttl);
//   }

//   async read(key: string) {
//     const data = await this.client.get(key);
//     return data ? JSON.parse(data) : null;
//   }

//   async update(key: string, value: any, ttl: number = 60) {
//     const exists = await this.client.exists(key);
//     if (exists === 1) {
//       await this.client.set(key, JSON.stringify(value), 'EX', ttl);
//     } else {
//       throw new Error(`Key "${key}" does not exist`);
//     }
//   }

//   async delete(key: string) {
//     await this.client.del(key);
//   }

//   async exists(key: string) {
//     const exists = await this.client.exists(key);
//     return exists === 1;
//   }

//   async expire(key: string, ttl: number) {
//     await this.client.expire(key, ttl);
//   }

//   async keys(pattern: string) {
//     const keys = await this.client.keys(pattern);
//     return keys;
//   }
//   async clearAll() {
//     const keys = await this.client.keys('*');
//     if (keys.length > 0) {
//       await this.client.del(keys);
//     }
//   }
//   async showAll() {
//     const keys = await this.client.keys('*');
//     const allData = {};
//     for (const key of keys) {
//       const value = await this.read(key);
//       allData[key] = value;
//     }
//     return allData;
//   }
// }
