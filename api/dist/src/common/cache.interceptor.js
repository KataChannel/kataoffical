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
var CacheInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheInterceptor = exports.CacheInvalidate = exports.Cache = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const redis_service_1 = require("../redis/redis.service");
const Cache = (ttl, keyPrefix) => (0, common_1.SetMetadata)('cache', { ttl, keyPrefix });
exports.Cache = Cache;
const CacheInvalidate = (patterns) => (0, common_1.SetMetadata)('cacheInvalidate', patterns);
exports.CacheInvalidate = CacheInvalidate;
let CacheInterceptor = CacheInterceptor_1 = class CacheInterceptor {
    constructor(redisService, reflector) {
        this.redisService = redisService;
        this.reflector = reflector;
        this.logger = new common_1.Logger(CacheInterceptor_1.name);
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (request.method !== 'GET') {
            return this.handleNonGetRequest(context, next);
        }
        const cacheConfig = this.reflector.get('cache', context.getHandler());
        if (!cacheConfig) {
            return next.handle();
        }
        const cacheKey = this.generateCacheKey(request, cacheConfig.keyPrefix);
        const ttl = cacheConfig.ttl || 3600;
        try {
            const cachedData = await this.redisService.read(cacheKey);
            if (cachedData) {
                this.logger.debug(`Cache hit: ${cacheKey}`);
                response.set('X-Cache', 'HIT');
                return (0, rxjs_1.of)(cachedData);
            }
            response.set('X-Cache', 'MISS');
            return next.handle().pipe((0, operators_1.tap)(async (data) => {
                try {
                    await this.redisService.create(cacheKey, data, ttl);
                    this.logger.debug(`Cached response: ${cacheKey}`);
                }
                catch (error) {
                    this.logger.error(`Failed to cache response: ${cacheKey}`, error.message);
                }
            }));
        }
        catch (error) {
            this.logger.error(`Cache error for key ${cacheKey}:`, error.message);
            return next.handle();
        }
    }
    async handleNonGetRequest(context, next) {
        const request = context.switchToHttp().getRequest();
        const invalidationPatterns = this.reflector.get('cacheInvalidate', context.getHandler());
        if (invalidationPatterns && (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH' || request.method === 'DELETE')) {
            return next.handle().pipe((0, operators_1.tap)(async () => {
                try {
                    for (const pattern of invalidationPatterns) {
                        await this.redisService.deletePattern(pattern);
                        this.logger.debug(`Invalidated cache pattern: ${pattern}`);
                    }
                }
                catch (error) {
                    this.logger.error('Failed to invalidate cache:', error.message);
                }
            }));
        }
        return next.handle();
    }
    generateCacheKey(request, keyPrefix) {
        const prefix = keyPrefix || 'api';
        const url = request.url;
        const method = request.method;
        const query = JSON.stringify(request.query || {});
        return this.redisService.generateKey(prefix, method, url, query);
    }
};
exports.CacheInterceptor = CacheInterceptor;
exports.CacheInterceptor = CacheInterceptor = CacheInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        core_1.Reflector])
], CacheInterceptor);
//# sourceMappingURL=cache.interceptor.js.map