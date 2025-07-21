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
exports.DonhangController = void 0;
const common_1 = require("@nestjs/common");
const donhang_service_1 = require("./donhang.service");
const client_1 = require("@prisma/client");
const audit_decorator_1 = require("../auditlog/audit.decorator");
let DonhangController = class DonhangController {
    constructor(donhangService) {
        this.donhangService = donhangService;
    }
    create(createDonhangDto) {
        return this.donhangService.create(createDonhangDto);
    }
    ImportDonhangOld(data) {
        return this.donhangService.ImportDonhangOld(data);
    }
    ImportDonhang(data) {
        return this.donhangService.ImportDonhang(data);
    }
    async search(params) {
        console.log('search params', params);
        return this.donhangService.search(params);
    }
    async phieuchuyen(params) {
        return this.donhangService.phieuchuyen(params);
    }
    async dongbogia(params) {
        return this.donhangService.dongbogia(params);
    }
    async getchogiao(params) {
        return this.donhangService.getchogiao(params);
    }
    async phieugiao(params) {
        const result = await this.donhangService.phieugiao(params);
        return result;
    }
    async searchfield(searchParams) {
        return this.donhangService.searchfield(searchParams);
    }
    findAll() {
        return this.donhangService.findAll();
    }
    findByProductId(id) {
        console.log(id);
        return this.donhangService.findByProductId(id);
    }
    findOne(id) {
        return this.donhangService.findOne(id);
    }
    async updatePhieugiao(id, updateDonhangDto) {
        const result = await this.donhangService.updatePhieugiao(id, updateDonhangDto);
        return result;
    }
    updateBulk(data) {
        return this.donhangService.updateBulk(data, 'danhan');
    }
    update(id, updateDonhangDto) {
        return this.donhangService.update(id, updateDonhangDto);
    }
    async removeBulk(ids) {
        return await this.donhangService.removeBulk(ids);
    }
    remove(id) {
        return this.donhangService.remove(id);
    }
    reorder(body) {
        return this.donhangService.reorderDonHangs(body.donhangIds);
    }
    async dagiao(id, data) {
        const result = await this.donhangService.dagiao(id, data);
        console.log('result', result);
        return result;
    }
    async danhan(id, data) {
        const result = await this.donhangService.danhan(id, data);
        console.log('result', result);
        return result;
    }
};
exports.DonhangController = DonhangController;
__decorate([
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Create Donhang', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('importold'),
    (0, audit_decorator_1.Audit)({ entity: 'Import Donhang Cu', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "ImportDonhangOld", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, audit_decorator_1.Audit)({ entity: 'Import Donhang', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "ImportDonhang", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('phieuchuyen'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "phieuchuyen", null);
__decorate([
    (0, common_1.Post)('dongbogia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "dongbogia", null);
__decorate([
    (0, common_1.Post)('getchogiao'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "getchogiao", null);
__decorate([
    (0, common_1.Post)('phieugiao'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "phieugiao", null);
__decorate([
    (0, common_1.Post)('searchfield'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "searchfield", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findbysanpham/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "findByProductId", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('phieugiao/:id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update Phieugiao', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "updatePhieugiao", null);
__decorate([
    (0, common_1.Patch)('bulk'),
    (0, audit_decorator_1.Audit)({ entity: 'Update bulk Donhang', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "updateBulk", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update Donhang', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('bulk'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Donhang', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "removeBulk", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete Donhang', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DonhangController.prototype, "reorder", null);
__decorate([
    (0, common_1.Post)(':id/dagiao'),
    (0, audit_decorator_1.Audit)({ entity: 'Create Donhang', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "dagiao", null);
__decorate([
    (0, common_1.Post)(':id/danhan'),
    (0, audit_decorator_1.Audit)({ entity: 'Create Donhang', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DonhangController.prototype, "danhan", null);
exports.DonhangController = DonhangController = __decorate([
    (0, common_1.Controller)('donhang'),
    __metadata("design:paramtypes", [donhang_service_1.DonhangService])
], DonhangController);
//# sourceMappingURL=donhang.controller.js.map