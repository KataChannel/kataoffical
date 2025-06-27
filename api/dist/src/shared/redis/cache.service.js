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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const ioredis_1 = require("ioredis");
let CacheService = class CacheService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.redis = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
            password: process.env.REDIS_PASSWORD,
            db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0,
        });
    }
    async checkRedisConnection() {
        try {
            await this.cacheManager.set('health-check', 'ok', 10);
            const result = await this.cacheManager.get('health-check');
            if (result === 'ok') {
                return 'Redis connection is healthy' + result;
            }
            else {
                throw new Error('Redis health check failed');
            }
        }
        catch (error) {
            throw new Error(`Redis connection failed: ${error.message}`);
        }
    }
    async getAllCachedData() {
        try {
            const keys = await this.redis.keys('*');
            if (keys.length === 0) {
                return [];
            }
            const results = [];
            for (const key of keys) {
                const value = await this.redis.get(key);
                results.push({ key, value });
            }
            return results;
        }
        catch (error) {
            throw new Error(`Không thể lấy dữ liệu cache: ${error.message}`);
        }
    }
    async deleteCachedData(key) {
        try {
            await this.cacheManager.del(key);
        }
        catch (error) {
            throw new Error(`Không thể xóa khóa ${key}: ${error.message}`);
        }
    }
    async clearAllCache() {
        try {
            await this.redis.flushdb();
        }
        catch (error) {
            throw new Error(`Không thể xóa toàn bộ cache: ${error.message}`);
        }
    }
    generateKey(prefix, identifier) {
        if (typeof identifier === 'object') {
            const sortedKeys = Object.keys(identifier).sort();
            const keyString = sortedKeys.map(key => `${key}:${identifier[key]}`).join('|');
            return `${prefix}:${Buffer.from(keyString).toString('base64')}`;
        }
        return `${prefix}:${identifier}`;
    }
    async get(key) {
        try {
            const value = await this.redis.get(key);
            if (value === null)
                return null;
            return JSON.parse(value);
        }
        catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }
    async set(key, value, options) {
        try {
            const stringValue = JSON.stringify(value);
            if (options?.ttl) {
                await this.redis.set(key, stringValue, 'EX', options.ttl);
            }
            else {
                await this.redis.set(key, stringValue);
            }
        }
        catch (error) {
            console.error('Cache set error:', error);
        }
    }
    async del(key) {
        try {
            await this.redis.del(key);
        }
        catch (error) {
            console.error('Cache delete error:', error);
        }
    }
    async delByPattern(pattern) {
        try {
            const keys = await this.redis.keys(pattern);
            if (keys.length > 0) {
                await this.redis.del(...keys);
            }
        }
        catch (error) {
            console.error('Cache delete by pattern error:', error);
        }
    }
    async getOrSet(prefix, identifier, fetchFunction, options) {
        const cacheKey = this.generateKey(options?.prefix || prefix, identifier);
        const cached = await this.get(cacheKey);
        if (cached !== null) {
            return cached;
        }
        const data = await fetchFunction();
        await this.set(cacheKey, data, options);
        return data;
    }
    async clearByPrefix(prefix) {
        await this.delByPattern(`${prefix}:*`);
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheService);
//# sourceMappingURL=cache.service.js.map