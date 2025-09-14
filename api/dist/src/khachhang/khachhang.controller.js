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
exports.KhachhangController = void 0;
const common_1 = require("@nestjs/common");
const khachhang_service_1 = require("./khachhang.service");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const client_1 = require("@prisma/client");
const cache_interceptor_1 = require("../common/cache.interceptor");
let KhachhangController = class KhachhangController {
    constructor(khachhangService) {
        this.khachhangService = khachhangService;
    }
    async getLastUpdated() {
        try {
            return await this.khachhangService.getLastUpdated();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    create(createKhachhangDto) {
        return this.khachhangService.create(createKhachhangDto);
    }
    import(data) {
        return this.khachhangService.import(data);
    }
    async findby(param) {
        const result = await this.khachhangService.findby(param);
        return result;
    }
    async searchfield(searchParams) {
        return this.khachhangService.searchfield(searchParams);
    }
    async findAllForSelect() {
        try {
            return await this.khachhangService.findAllForSelect();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch khachhangs', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query) {
        try {
            return await this.khachhangService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch khachhangs', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        return this.khachhangService.findOne(id);
    }
    update(id, updateKhachhangDto) {
        return this.khachhangService.update(id, updateKhachhangDto);
    }
    remove(id) {
        return this.khachhangService.remove(id);
    }
};
exports.KhachhangController = KhachhangController;
__decorate([
    (0, common_1.Get)('lastupdated'),
    (0, cache_interceptor_1.Cache)(300, 'khachhang'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "getLastUpdated", null);
__decorate([
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Create Khachhang', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['khachhang:*']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KhachhangController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, audit_decorator_1.Audit)({ entity: 'Import Khachhang', action: client_1.AuditAction.IMPORT, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['khachhang:*']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KhachhangController.prototype, "import", null);
__decorate([
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "findby", null);
__decorate([
    (0, common_1.Post)('searchfield'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "searchfield", null);
__decorate([
    (0, common_1.Get)('forselect'),
    (0, cache_interceptor_1.Cache)(1800, 'khachhang'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "findAllForSelect", null);
__decorate([
    (0, common_1.Get)(),
    (0, cache_interceptor_1.Cache)(1800, 'khachhang'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, cache_interceptor_1.Cache)(1800, 'khachhang'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KhachhangController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update Khachhang', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['khachhang:*']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], KhachhangController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Khachhang', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['khachhang:*']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KhachhangController.prototype, "remove", null);
exports.KhachhangController = KhachhangController = __decorate([
    (0, common_1.Controller)('khachhang'),
    __metadata("design:paramtypes", [khachhang_service_1.KhachhangService])
], KhachhangController);
//# sourceMappingURL=khachhang.controller.js.map