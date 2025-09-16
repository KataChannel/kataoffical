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
exports.ChotkhoController = void 0;
const common_1 = require("@nestjs/common");
const chotkho_service_1 = require("./chotkho.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const client_1 = require("@prisma/client");
const cache_interceptor_1 = require("../common/cache.interceptor");
const smart_cache_decorator_1 = require("../common/smart-cache.decorator");
let ChotkhoController = class ChotkhoController {
    constructor(chotkhoService) {
        this.chotkhoService = chotkhoService;
    }
    async create(data) {
        try {
            return await this.chotkhoService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create inventory check failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllProductsByKho(khoId) {
        try {
            return await this.chotkhoService.getAllProductsByKho(khoId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get products failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this.chotkhoService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(page = '1', limit = '10') {
        try {
            const pageNum = parseInt(page, 10) || 1;
            const limitNum = parseInt(limit, 10) || 10;
            return await this.chotkhoService.findAll(pageNum, limitNum);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find all failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            return await this.chotkhoService.update(id, data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.chotkhoService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ChotkhoController = ChotkhoController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new inventory check - New Logic: Process all products in warehouse' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                khoId: { type: 'string', description: 'Warehouse ID' },
                products: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            sanphamId: { type: 'string' },
                            sltonthucte: { type: 'number' },
                            slhuy: { type: 'number' },
                            ghichu: { type: 'string' }
                        }
                    }
                }
            }
        }
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['chotkho'],
        get: { ttl: 600, keyPrefix: 'chotkho' },
        updateCache: true
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all products with inventory by warehouse' }),
    (0, swagger_1.ApiParam)({ name: 'khoId', type: String, description: 'Warehouse ID' }),
    (0, common_1.Get)('products/by-warehouse/:khoId'),
    (0, cache_interceptor_1.Cache)(300, 'chotkho:products'),
    __param(0, (0, common_1.Param)('khoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "getAllProductsByKho", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find chotkho by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)(':id'),
    (0, cache_interceptor_1.Cache)(600, 'chotkho'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chotkho records' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, common_1.Get)(),
    (0, cache_interceptor_1.Cache)(300, 'chotkho'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update chotkho by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['chotkho'],
        get: { ttl: 600, keyPrefix: 'chotkho' },
        updateCache: true
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete chotkho by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['chotkho']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "remove", null);
exports.ChotkhoController = ChotkhoController = __decorate([
    (0, swagger_1.ApiTags)('chotkho'),
    (0, common_1.Controller)('chotkho'),
    __metadata("design:paramtypes", [chotkho_service_1.ChotkhoService])
], ChotkhoController);
//# sourceMappingURL=chotkho.controller.js.map