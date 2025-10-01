"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        this.logger = new common_1.Logger(RedisService_1.name);
        this.client = new ioredis_1.Redis({
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
    async create(key, value, ttl = 3600) {
        try {
            await this.client.set(key, JSON.stringify(value), 'EX', ttl);
            this.logger.debug(`Cache set: ${key}`);
        }
        catch (error) {
            this.logger.error(`Error setting cache for key ${key}:`, error.message);
        }
    }
    async read(key) {
        try {
            const data = await this.client.get(key);
            this.logger.debug(`Cache ${data ? 'hit' : 'miss'}: ${key}`);
            return data ? JSON.parse(data) : null;
        }
        catch (error) {
            this.logger.error(`Error reading cache for key ${key}:`, error.message);
            return null;
        }
    }
    async update(key, value, ttl = 3600) {
        try {
            const exists = await this.client.exists(key);
            if (exists === 1) {
                await this.client.set(key, JSON.stringify(value), 'EX', ttl);
                this.logger.debug(`Cache updated: ${key}`);
            }
            else {
                throw new Error(`Key "${key}" does not exist`);
            }
        }
        catch (error) {
            this.logger.error(`Error updating cache for key ${key}:`, error.message);
            throw error;
        }
    }
    async delete(key) {
        try {
            await this.client.del(key);
            this.logger.debug(`Cache deleted: ${key}`);
        }
        catch (error) {
            this.logger.error(`Error deleting cache for key ${key}:`, error.message);
        }
    }
    async deletePattern(pattern) {
        try {
            const keys = await this.client.keys(pattern);
            if (keys.length > 0) {
                await this.client.del(keys);
                this.logger.debug(`Cache pattern deleted: ${pattern} (${keys.length} keys)`);
            }
        }
        catch (error) {
            this.logger.error(`Error deleting cache pattern ${pattern}:`, error.message);
        }
    }
    async exists(key) {
        try {
            const exists = await this.client.exists(key);
            return exists === 1;
        }
        catch (error) {
            this.logger.error(`Error checking existence for key ${key}:`, error.message);
            return false;
        }
    }
    async expire(key, ttl) {
        try {
            await this.client.expire(key, ttl);
            this.logger.debug(`Cache expiry set: ${key} (${ttl}s)`);
        }
        catch (error) {
            this.logger.error(`Error setting expiry for key ${key}:`, error.message);
        }
    }
    async keys(pattern) {
        try {
            const keys = await this.client.keys(pattern);
            return keys;
        }
        catch (error) {
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
        }
        catch (error) {
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
        }
        catch (error) {
            this.logger.error('Error showing all cache:', error.message);
            return {};
        }
    }
    async cacheOrFetch(key, fetchFn, ttl = 3600) {
        try {
            const cached = await this.read(key);
            if (cached) {
                return cached;
            }
            const data = await fetchFn();
            await this.create(key, data, ttl);
            return data;
        }
        catch (error) {
            this.logger.error(`Error in cacheOrFetch for key ${key}:`, error.message);
            return fetchFn();
        }
    }
    generateKey(prefix, ...parts) {
        return `${prefix}:${parts.join(':')}`;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map