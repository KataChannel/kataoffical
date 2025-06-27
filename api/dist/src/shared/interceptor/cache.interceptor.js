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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const cache_service_1 = require("../redis/cache.service");
const cache_decorator_1 = require("../decorators/cache.decorator");
let CacheInterceptor = class CacheInterceptor {
    constructor(cacheService, reflector) {
        this.cacheService = cacheService;
        this.reflector = reflector;
    }
    async intercept(context, next) {
        const prefix = this.reflector.get(cache_decorator_1.CACHE_PREFIX, context.getHandler());
        const ttl = this.reflector.get(cache_decorator_1.CACHE_TTL, context.getHandler());
        if (!prefix) {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const { params, query, body } = request;
        const cacheIdentifier = { ...params, ...query, ...body };
        const cacheKey = this.generateCacheKey(prefix, cacheIdentifier);
        const cachedResult = await this.cacheService.get(cacheKey);
        if (cachedResult) {
            return (0, rxjs_1.of)(cachedResult);
        }
        return next.handle().pipe((0, operators_1.tap)(async (data) => {
            await this.cacheService.set(cacheKey, data, { ttl });
        }));
    }
    generateCacheKey(prefix, identifier) {
        if (typeof identifier === 'object' && Object.keys(identifier).length > 0) {
            const sortedKeys = Object.keys(identifier).sort();
            const keyString = sortedKeys.map(key => `${key}:${identifier[key]}`).join('|');
            return `${prefix}:${Buffer.from(keyString).toString('base64')}`;
        }
        return `${prefix}:default`;
    }
};
exports.CacheInterceptor = CacheInterceptor;
exports.CacheInterceptor = CacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        core_1.Reflector])
], CacheInterceptor);
//# sourceMappingURL=cache.interceptor.js.map