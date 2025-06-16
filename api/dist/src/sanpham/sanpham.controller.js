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
exports.SanphamController = void 0;
const common_1 = require("@nestjs/common");
const sanpham_service_1 = require("./sanpham.service");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const client_1 = require("@prisma/client");
let SanphamController = class SanphamController {
    constructor(sanphamService) {
        this.sanphamService = sanphamService;
    }
    create(createSanphamDto) {
        return this.sanphamService.create(createSanphamDto);
    }
    import(data) {
        return this.sanphamService.import(data);
    }
    async findby(param) {
        const result = await this.sanphamService.findby(param);
        return result;
    }
    async findAll(query) {
        try {
            return await this.sanphamService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch khachhangs', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    nhucaudathang() {
        return this.sanphamService.nhucaudathang();
    }
    async getLastUpdated() {
        try {
            return await this.sanphamService.getLastUpdated();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        return this.sanphamService.findOne(id);
    }
    update(id, updateSanphamDto) {
        return this.sanphamService.update(id, updateSanphamDto);
    }
    remove(id) {
        return this.sanphamService.remove(id);
    }
    reorder(body) {
        return this.sanphamService.reorderSanphams(body.sanphamIds);
    }
};
exports.SanphamController = SanphamController;
__decorate([
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Create Sanpham', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SanphamController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, audit_decorator_1.Audit)({ entity: 'Import Sanpham', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SanphamController.prototype, "import", null);
__decorate([
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "findby", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('nhucaudathang'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SanphamController.prototype, "nhucaudathang", null);
__decorate([
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "getLastUpdated", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SanphamController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update Sanpham', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SanphamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Sanpham', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SanphamController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SanphamController.prototype, "reorder", null);
exports.SanphamController = SanphamController = __decorate([
    (0, common_1.Controller)('sanpham'),
    __metadata("design:paramtypes", [sanpham_service_1.SanphamService])
], SanphamController);
//# sourceMappingURL=sanpham.controller.js.map