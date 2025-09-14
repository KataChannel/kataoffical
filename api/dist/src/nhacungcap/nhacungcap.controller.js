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
exports.NhacungcapController = void 0;
const common_1 = require("@nestjs/common");
const nhacungcap_service_1 = require("./nhacungcap.service");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const cache_interceptor_1 = require("../common/cache.interceptor");
const smart_cache_decorator_1 = require("../common/smart-cache.decorator");
let NhacungcapController = class NhacungcapController {
    constructor(nhacungcapService) {
        this.nhacungcapService = nhacungcapService;
    }
    async create(data) {
        try {
            return await this.nhacungcapService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLastUpdatedNhacungcap() {
        try {
            return await this.nhacungcapService.getLastUpdatedNhacungcap();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    import(data) {
        return this.nhacungcapService.import(data);
    }
    async findByProductIds(productIds) {
        try {
            const result = await this.nhacungcapService.findByProductIds(productIds);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Nhà cung cấp(s) fetched successfully',
                data: result,
            };
        }
        catch (error) {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to fetch nhà cung cấp(s)',
                error: error.message || error,
            };
        }
    }
    async findAll(query) {
        try {
            return await this.nhacungcapService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch nhacungcaps', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const result = await this.nhacungcapService.findOne(id);
            if (!result) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Nhà cung cấp not found',
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Nhà cung cấp fetched successfully',
                data: result,
            };
        }
        catch (error) {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to fetch nhà cung cấp',
                error: error.message || error,
            };
        }
    }
    async findby(param) {
        try {
            return await this.nhacungcapService.findBy(param);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateNhacungcapDto) {
        try {
            const result = await this.nhacungcapService.update(id, updateNhacungcapDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Nhà cung cấp updated successfully',
                data: result,
            };
        }
        catch (error) {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to update nhà cung cấp',
                error: error.message || error,
            };
        }
    }
    async remove(id) {
        try {
            const result = await this.nhacungcapService.remove(id);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Nhà cung cấp deleted successfully',
                data: result,
            };
        }
        catch (error) {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete nhà cung cấp',
                error: error.message || error,
            };
        }
    }
};
exports.NhacungcapController = NhacungcapController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new nhacungcap' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Nhacungcap', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['nhacungcap'],
        get: { ttl: 1800, keyPrefix: 'nhacungcap' },
        updateCache: true
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated nhacungcap' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "getLastUpdatedNhacungcap", null);
__decorate([
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NhacungcapController.prototype, "import", null);
__decorate([
    (0, common_1.Post)('finbyids'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "findByProductIds", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all nhacungcaps with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of nhacungcaps with pagination info' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find nhacungcaps by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "findby", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update Nhacungcap', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['nhacungcap'],
        get: { ttl: 1800, keyPrefix: 'nhacungcap' },
        updateCache: true
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Nhacungcap', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['nhacungcap']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NhacungcapController.prototype, "remove", null);
exports.NhacungcapController = NhacungcapController = __decorate([
    (0, common_1.Controller)('nhacungcap'),
    __metadata("design:paramtypes", [nhacungcap_service_1.NhacungcapService])
], NhacungcapController);
//# sourceMappingURL=nhacungcap.controller.js.map