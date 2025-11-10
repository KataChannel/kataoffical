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
exports.NhanvienController = void 0;
const common_1 = require("@nestjs/common");
const nhanvien_service_1 = require("./nhanvien.service");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const client_1 = require("@prisma/client");
const cache_interceptor_1 = require("../common/cache.interceptor");
const smart_cache_decorator_1 = require("../common/smart-cache.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NhanvienController = class NhanvienController {
    constructor(nhanvienService) {
        this.nhanvienService = nhanvienService;
    }
    async getLastUpdated() {
        try {
            return await this.nhanvienService.getLastUpdated();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    create(createNhanvienDto) {
        return this.nhanvienService.create(createNhanvienDto);
    }
    import(data) {
        return this.nhanvienService.import(data);
    }
    async searchfield(searchParams) {
        return this.nhanvienService.searchfield(searchParams);
    }
    async findAllForSelect() {
        try {
            return await this.nhanvienService.findAllForSelect();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch nhanviens', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query) {
        try {
            return await this.nhanvienService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch nhanviens', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        return this.nhanvienService.findOne(id);
    }
    findByManv(manv) {
        return this.nhanvienService.findByManv(manv);
    }
    update(id, updateNhanvienDto) {
        return this.nhanvienService.update(id, updateNhanvienDto);
    }
    remove(id) {
        return this.nhanvienService.remove(id);
    }
};
exports.NhanvienController = NhanvienController;
__decorate([
    (0, common_1.Get)('lastupdated'),
    (0, cache_interceptor_1.Cache)(300, 'nhanvien'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NhanvienController.prototype, "getLastUpdated", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Create Nhanvien', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['nhanvien'],
        get: { ttl: 1800, keyPrefix: 'nhanvien' },
        updateCache: true
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('import'),
    (0, audit_decorator_1.Audit)({ entity: 'Import Nhanvien', action: client_1.AuditAction.IMPORT, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['nhanvien']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "import", null);
__decorate([
    (0, common_1.Post)('searchfield'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NhanvienController.prototype, "searchfield", null);
__decorate([
    (0, common_1.Get)('forselect'),
    (0, cache_interceptor_1.Cache)(1800, 'nhanvien'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NhanvienController.prototype, "findAllForSelect", null);
__decorate([
    (0, common_1.Get)(),
    (0, cache_interceptor_1.Cache)(1800, 'nhanvien'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NhanvienController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, cache_interceptor_1.Cache)(1800, 'nhanvien'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('manv/:manv'),
    (0, cache_interceptor_1.Cache)(1800, 'nhanvien'),
    __param(0, (0, common_1.Param)('manv')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "findByManv", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update Nhanvien', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['nhanvien'],
        get: { ttl: 1800, keyPrefix: 'nhanvien' },
        updateCache: true
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Nhanvien', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['nhanvien']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "remove", null);
exports.NhanvienController = NhanvienController = __decorate([
    (0, common_1.Controller)('nhanvien'),
    __metadata("design:paramtypes", [nhanvien_service_1.NhanvienService])
], NhanvienController);
//# sourceMappingURL=nhanvien.controller.js.map