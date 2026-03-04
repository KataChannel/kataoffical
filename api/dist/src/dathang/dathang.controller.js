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
exports.DathangController = void 0;
const common_1 = require("@nestjs/common");
const dathang_service_1 = require("./dathang.service");
const client_1 = require("@prisma/client");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const cache_interceptor_1 = require("../common/cache.interceptor");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DathangController = class DathangController {
    constructor(dathangService) {
        this.dathangService = dathangService;
    }
    create(createDathangDto) {
        return this.dathangService.create(createDathangDto);
    }
    import(data) {
        return this.dathangService.import(data);
    }
    importcu(data) {
        return this.dathangService.importcu(data);
    }
    createbynhucau(data) {
        return this.dathangService.createbynhucau(data);
    }
    async getchonhap(params) {
        return this.dathangService.getchonhap(params);
    }
    async search(params) {
        return this.dathangService.search(params);
    }
    async congnoncc(params) {
        return this.dathangService.congnoncc(params);
    }
    async downloadcongnoncc(params, res) {
        try {
            const result = await this.dathangService.downloadcongnoncc(params);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=congnoncc.xlsx');
            res.send(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    findAll() {
        return this.dathangService.findAll();
    }
    findby(param) {
        return this.dathangService.findby(param);
    }
    findOne(id) {
        return this.dathangService.findOne(id);
    }
    findByProductId(id) {
        return this.dathangService.findByProductId(id);
    }
    update(id, updateDathangDto) {
        return this.dathangService.update(id, updateDathangDto);
    }
    remove(id) {
        return this.dathangService.remove(id);
    }
    reorder(body) {
        return this.dathangService.reorderDathangs(body.dathangIds);
    }
    deletebulk(data) {
        return this.dathangService.deletebulk(data);
    }
    async completePendingReceipts(sanphamId) {
        try {
            const result = await this.dathangService.completePendingReceiptsForProduct(sanphamId);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to complete pending receipts',
                error: error.message
            };
        }
    }
};
exports.DathangController = DathangController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Create Dathang', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Import Dathang', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "import", null);
__decorate([
    (0, common_1.Post)('importcu'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Import Dathang Cu', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "importcu", null);
__decorate([
    (0, common_1.Post)('bynhucau'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Create Dathang by nhu cau', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "createbynhucau", null);
__decorate([
    (0, common_1.Post)('getchonhap'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DathangController.prototype, "getchonhap", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DathangController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('congnoncc'),
    (0, cache_interceptor_1.Cache)(60),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DathangController.prototype, "congnoncc", null);
__decorate([
    (0, common_1.Post)('downloadcongnoncc'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DathangController.prototype, "downloadcongnoncc", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "findby", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('findbysanpham/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "findByProductId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Update Dathang', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Dathang', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "reorder", null);
__decorate([
    (0, common_1.Post)('deletebulk'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Bulk Dathang', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DathangController.prototype, "deletebulk", null);
__decorate([
    (0, common_1.Post)('complete-pending-receipts/:sanphamId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Complete Pending Receipts', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('sanphamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DathangController.prototype, "completePendingReceipts", null);
exports.DathangController = DathangController = __decorate([
    (0, common_1.Controller)('dathang'),
    __metadata("design:paramtypes", [dathang_service_1.DathangService])
], DathangController);
//# sourceMappingURL=dathang.controller.js.map