"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const redisStore = require("cache-manager-redis-store");
const cache_service_1 = require("./cache.service");
const cache_component_1 = require("./cache.component");
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [cache_component_1.CacheController],
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
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
        providers: [cache_service_1.CacheService],
        exports: [cache_service_1.CacheService, cache_manager_1.CacheModule],
    })
], CacheModule);
//# sourceMappingURL=cache.module.js.map