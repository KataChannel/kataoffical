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
exports.RedisController = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
let RedisController = class RedisController {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async create(key, value, ttl) {
        await this.redisService.create(key, value, ttl);
        return { message: 'Key created successfully' };
    }
    async read(key) {
        const data = await this.redisService.read(key);
        return { key, data };
    }
    async update(key, value, ttl) {
        await this.redisService.update(key, value, ttl);
        return { message: 'Key updated successfully' };
    }
    async clearAll() {
        await this.redisService.clearAll();
        return { message: 'All keys cleared successfully' };
    }
    async delete(key) {
        await this.redisService.delete(key);
        return { message: 'Key deleted successfully' };
    }
    async exists(key) {
        const exists = await this.redisService.exists(key);
        return { key, exists };
    }
    async expire(key, ttl) {
        await this.redisService.expire(key, ttl);
        return { message: 'TTL updated successfully' };
    }
    async keys(pattern) {
        const keys = await this.redisService.keys(pattern || '*');
        return { keys };
    }
};
exports.RedisController = RedisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('key')),
    __param(1, (0, common_1.Body)('value')),
    __param(2, (0, common_1.Body)('ttl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "read", null);
__decorate([
    (0, common_1.Put)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)('value')),
    __param(2, (0, common_1.Body)('ttl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('clear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "clearAll", null);
__decorate([
    (0, common_1.Delete)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':key/exists'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "exists", null);
__decorate([
    (0, common_1.Post)(':key/expire'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)('ttl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "expire", null);
__decorate([
    (0, common_1.Get)('keys'),
    __param(0, (0, common_1.Query)('pattern')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "keys", null);
exports.RedisController = RedisController = __decorate([
    (0, common_1.Controller)('redis'),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisController);
//# sourceMappingURL=redis.controller.js.map