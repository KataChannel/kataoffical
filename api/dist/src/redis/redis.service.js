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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor() {
        this.client = new ioredis_1.Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
        });
    }
    async create(key, value, ttl = 3600) {
        await this.client.set(key, JSON.stringify(value), 'EX', ttl);
    }
    async read(key) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }
    async update(key, value, ttl = 3600) {
        const exists = await this.client.exists(key);
        if (exists === 1) {
            await this.client.set(key, JSON.stringify(value), 'EX', ttl);
        }
        else {
            throw new Error(`Key "${key}" does not exist`);
        }
    }
    async delete(key) {
        await this.client.del(key);
    }
    async exists(key) {
        const exists = await this.client.exists(key);
        return exists === 1;
    }
    async expire(key, ttl) {
        await this.client.expire(key, ttl);
    }
    async keys(pattern) {
        const keys = await this.client.keys(pattern);
        return keys;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map