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
exports.CacheController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const ioredis_1 = require("ioredis");
let CacheController = class CacheController {
    constructor() {
        this.redis = new ioredis_1.default({
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
    async invalidateCache(model) {
        console.log(`[CACHE] Invalidating cache for model: ${model}`);
        try {
            const pattern = `*${model.toLowerCase()}*`;
            const keys = await this.redis.keys(pattern);
            console.log(`[CACHE] Found ${keys?.length || 0} cache keys matching pattern: ${pattern}`);
            console.log(`[CACHE] Keys:`, keys);
            if (keys && keys.length > 0) {
                await this.redis.del(...keys);
                console.log(`[CACHE] ✅ Deleted ${keys.length} cache keys`);
            }
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
        }
        catch (error) {
            console.error(`[CACHE] ❌ Error invalidating cache:`, error);
            return {
                success: false,
                message: `Error invalidating cache: ${error.message}`,
                error: error.message,
            };
        }
    }
    async invalidateAllCache() {
        console.log(`[CACHE] Invalidating ALL cache`);
        try {
            await this.redis.flushdb();
            console.log(`[CACHE] ✅ All cache cleared successfully`);
            return {
                success: true,
                message: 'All cache invalidated successfully',
            };
        }
        catch (error) {
            console.error(`[CACHE] ❌ Error clearing all cache:`, error);
            return {
                success: false,
                message: `Error clearing all cache: ${error.message}`,
                error: error.message,
            };
        }
    }
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
        }
        catch (error) {
            console.error(`[CACHE] ❌ Error getting cache stats:`, error);
            return {
                success: false,
                message: `Error getting cache stats: ${error.message}`,
            };
        }
    }
};
exports.CacheController = CacheController;
__decorate([
    (0, common_1.Post)('invalidate/:model'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Invalidate cache for a model' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cache invalidated successfully' }),
    __param(0, (0, common_1.Param)('model')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "invalidateCache", null);
__decorate([
    (0, common_1.Post)('invalidate-all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Invalidate all cache' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All cache invalidated successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "invalidateAllCache", null);
__decorate([
    (0, common_1.Post)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get cache statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cache statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "getCacheStats", null);
exports.CacheController = CacheController = __decorate([
    (0, swagger_1.ApiTags)('cache'),
    (0, common_1.Controller)('cache'),
    __metadata("design:paramtypes", [])
], CacheController);
//# sourceMappingURL=cache.controller.js.map