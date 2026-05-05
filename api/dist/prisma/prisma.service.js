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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const redis_service_1 = require("../src/redis/redis.service");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor(redisService) {
        super({
            log: ['error', 'warn'],
        });
        this.redisService = redisService;
        this.logger = new common_1.Logger(PrismaService_1.name);
    }
    async onModuleInit() {
        await this.$connect();
        const writeActions = [
            'create', 'update', 'delete',
            'updateMany', 'deleteMany', 'createMany',
            'upsert'
        ];
        const propertyNames = Object.getOwnPropertyNames(this);
        const modelNames = propertyNames.filter(prop => !prop.startsWith('$') &&
            !prop.startsWith('_') &&
            typeof this[prop] === 'object' &&
            this[prop] !== null &&
            typeof this[prop].findMany === 'function');
        this.logger.log(`🚀 [GlobalCache] Initializing auto-invalidation for ${modelNames.length} models`);
        for (const modelName of modelNames) {
            const originalModel = this[modelName];
            this[modelName] = new Proxy(originalModel, {
                get: (target, prop) => {
                    const value = target[prop];
                    if (typeof value === 'function' && writeActions.includes(prop)) {
                        return async (...args) => {
                            const result = await value.apply(target, args);
                            const skipInvalidation = ['performanceLog', 'auditLog'].includes(modelName);
                            if (!skipInvalidation) {
                                this.logger.debug(`[GlobalCache] Action '${prop.toString()}' detected on ${modelName}, invalidating cache...`);
                                this.redisService.invalidateModelCache(modelName).catch(err => this.logger.error(`[GlobalCache] Invalidation fail for ${modelName}: ${err.message}`));
                            }
                            return result;
                        };
                    }
                    return value;
                }
            });
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async executeWithRetry(operation, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation(this);
            }
            catch (error) {
                lastError = error;
                if (error.code === 'P2024' || error.code === 'P2034' || error.message?.includes('timed out')) {
                    const delay = baseDelay * Math.pow(2, attempt - 1);
                    console.warn(`Transaction attempt ${attempt} failed, retrying in ${delay}ms...`);
                    if (attempt < maxRetries) {
                        await new Promise(resolve => setTimeout(resolve, delay));
                        continue;
                    }
                }
                throw error;
            }
        }
        throw lastError;
    }
    async safeTransaction(fn, options) {
        const { timeout = 30000, maxWait = 5000, retries = 2 } = options || {};
        return this.executeWithRetry(async (prisma) => {
            return prisma.$transaction(fn, {
                timeout,
                maxWait,
            });
        }, retries);
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map