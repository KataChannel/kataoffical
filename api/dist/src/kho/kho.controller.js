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
exports.khoController = void 0;
const common_1 = require("@nestjs/common");
const kho_service_1 = require("./kho.service");
const client_1 = require("@prisma/client");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const cache_interceptor_1 = require("../common/cache.interceptor");
const smart_cache_decorator_1 = require("../common/smart-cache.decorator");
let khoController = class khoController {
    constructor(khoService) {
        this.khoService = khoService;
    }
    create(createkhoDto) {
        return this.khoService.create(createkhoDto);
    }
    getPaginated(page, limit) {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        return this.khoService.gettonkho(pageNumber, limitNumber);
    }
    findAll() {
        return this.khoService.findAll();
    }
    findOne(id) {
        return this.khoService.findOne(id);
    }
    update(id, updatekhoDto) {
        return this.khoService.update(id, updatekhoDto);
    }
    remove(id) {
        return this.khoService.remove(id);
    }
};
exports.khoController = khoController;
__decorate([
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Create Kho', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['kho'],
        get: { ttl: 1800, keyPrefix: 'kho' },
        updateCache: true
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], khoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('tonkho'),
    (0, cache_interceptor_1.Cache)(600, 'kho:tonkho'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], khoController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Get)(),
    (0, cache_interceptor_1.Cache)(1800, 'kho'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], khoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    (0, cache_interceptor_1.Cache)(1800, 'kho'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], khoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update Kho', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['kho'],
        get: { ttl: 1800, keyPrefix: 'kho' },
        updateCache: true
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], khoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Kho', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['kho']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], khoController.prototype, "remove", null);
exports.khoController = khoController = __decorate([
    (0, common_1.Controller)('kho'),
    __metadata("design:paramtypes", [kho_service_1.khoService])
], khoController);
//# sourceMappingURL=kho.controller.js.map