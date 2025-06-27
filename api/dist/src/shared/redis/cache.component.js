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
exports.CacheController = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("./cache.service");
let CacheController = class CacheController {
    constructor(_CacheService) {
        this._CacheService = _CacheService;
    }
    async checkRedis() {
        return await this._CacheService.checkRedisConnection();
    }
    async getAllCachedData() {
        return await this._CacheService.getAllCachedData();
    }
    async clearAllCache() {
        return await this._CacheService.clearAllCache();
    }
};
exports.CacheController = CacheController;
__decorate([
    (0, common_1.Get)('check'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "checkRedis", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "getAllCachedData", null);
__decorate([
    (0, common_1.Get)('clearall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "clearAllCache", null);
exports.CacheController = CacheController = __decorate([
    (0, common_1.Controller)('redis'),
    __metadata("design:paramtypes", [cache_service_1.CacheService])
], CacheController);
//# sourceMappingURL=cache.component.js.map