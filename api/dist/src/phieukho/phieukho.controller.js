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
exports.PhieukhoController = void 0;
const common_1 = require("@nestjs/common");
const phieukho_service_1 = require("./phieukho.service");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const client_1 = require("@prisma/client");
const cache_interceptor_1 = require("../common/cache.interceptor");
const smart_cache_decorator_1 = require("../common/smart-cache.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PhieukhoController = class PhieukhoController {
    constructor(phieukhoService) {
        this.phieukhoService = phieukhoService;
    }
    create(createPhieukhoDto) {
        return this.phieukhoService.create(createPhieukhoDto);
    }
    findAll() {
        return this.phieukhoService.findAll();
    }
    xuatnhapton(query) {
        return this.phieukhoService.xuatnhapton(query);
    }
    createAdjustment(data) {
        return this.phieukhoService.createAdjustmentPhieuKho(data);
    }
    findOne(id) {
        return this.phieukhoService.findOne(id);
    }
    update(id, updatePhieukhoDto) {
        return this.phieukhoService.update(id, updatePhieukhoDto);
    }
    remove(id) {
        return this.phieukhoService.remove(id);
    }
};
exports.PhieukhoController = PhieukhoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Create Phieukho', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['phieukho', 'kho'],
        get: { ttl: 600, keyPrefix: 'phieukho' },
        updateCache: true
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhieukhoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, cache_interceptor_1.Cache)(600, 'phieukho'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhieukhoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('xuatnhapton'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Xuat Nhap Ton', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['phieukho', 'kho', 'sanpham']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhieukhoController.prototype, "xuatnhapton", null);
__decorate([
    (0, common_1.Post)('adjustment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Create Adjustment Phieukho', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['phieukho', 'kho', 'sanpham']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhieukhoController.prototype, "createAdjustment", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    (0, cache_interceptor_1.Cache)(600, 'phieukho'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhieukhoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Update Phieukho', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['phieukho', 'kho'],
        get: { ttl: 600, keyPrefix: 'phieukho' },
        updateCache: true
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PhieukhoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Remove Phieukho', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['phieukho', 'kho']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhieukhoController.prototype, "remove", null);
exports.PhieukhoController = PhieukhoController = __decorate([
    (0, common_1.Controller)('phieukho'),
    __metadata("design:paramtypes", [phieukho_service_1.PhieukhoService])
], PhieukhoController);
//# sourceMappingURL=phieukho.controller.js.map