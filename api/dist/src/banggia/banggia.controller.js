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
exports.BanggiaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const banggia_service_1 = require("./banggia.service");
const client_1 = require("@prisma/client");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BanggiaController = class BanggiaController {
    constructor(banggiaService) {
        this.banggiaService = banggiaService;
    }
    import(data) {
        console.log('Importing banggia data:', data);
        return this.banggiaService.importBanggia(data);
    }
    importspbg(data) {
        return this.banggiaService.importSPBG(data);
    }
    importbgkh(data) {
        return this.banggiaService.importBGKH(data);
    }
    create(createBanggiaDto) {
        return this.banggiaService.createBanggia(createBanggiaDto);
    }
    findAll() {
        return this.banggiaService.findAll();
    }
    getbgsp() {
        return this.banggiaService.getbgsp();
    }
    getbgkh() {
        return this.banggiaService.getbgkh();
    }
    reorder(body) {
        return this.banggiaService.reorderBanggias(body.banggiaIds);
    }
    addMultipleKhachhangToBanggia(data) {
        return this.banggiaService.addKHtoBG(data.banggiaId, data.khachhangIds);
    }
    removeKHfromBG(data) {
        return this.banggiaService.removeKHfromBG(data.banggiaId, data.khachhangIds);
    }
    findOne(id) {
        return this.banggiaService.findOne(id);
    }
    update(id, updateBanggiaDto) {
        return this.banggiaService.update(id, updateBanggiaDto);
    }
    remove(id) {
        return this.banggiaService.remove(id);
    }
    async removeBulk(body) {
        return this.banggiaService.removeBulk(body.ids);
    }
};
exports.BanggiaController = BanggiaController;
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Import banggia data' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Data imported successfully' }),
    (0, audit_decorator_1.Audit)({ entity: 'Import Banggia', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "import", null);
__decorate([
    (0, common_1.Post)('importspbg'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Import spbg data' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Data imported successfully' }),
    (0, audit_decorator_1.Audit)({ entity: 'Import SPBG', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "importspbg", null);
__decorate([
    (0, common_1.Post)('importbgkh'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Import bgkh data' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Data imported successfully' }),
    (0, audit_decorator_1.Audit)({ entity: 'Import BGKH', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "importbgkh", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new banggia' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Banggia created successfully' }),
    (0, audit_decorator_1.Audit)({ entity: 'Create Banggia', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Return all banggias' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of banggias' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('getbgsp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Return all banggias' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of banggias' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "getbgsp", null);
__decorate([
    (0, common_1.Get)('getbgkh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Return all banggias' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of banggias' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "getbgkh", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder banggia items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Banggia reordering complete' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "reorder", null);
__decorate([
    (0, common_1.Post)('addKHtoBG'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Add multiple khachhang to a banggia' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Khachhang added to banggia successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "addMultipleKhachhangToBanggia", null);
__decorate([
    (0, common_1.Post)('removeKHfromBG'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remove khachhang from a banggia' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Khachhang removed from banggia successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "removeKHfromBG", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find a banggia by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Found banggia' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a banggia' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Banggia updated successfully' }),
    (0, audit_decorator_1.Audit)({ entity: 'Update Banggia', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a banggia with all related records' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Banggia removed successfully' }),
    (0, audit_decorator_1.Audit)({ entity: 'Remove Banggia', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BanggiaController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk delete banggia with all related records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Banggia bulk deleted successfully' }),
    (0, audit_decorator_1.Audit)({ entity: 'Bulk Delete Banggia', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BanggiaController.prototype, "removeBulk", null);
exports.BanggiaController = BanggiaController = __decorate([
    (0, swagger_1.ApiTags)('banggia'),
    (0, common_1.Controller)('banggia'),
    __metadata("design:paramtypes", [banggia_service_1.BanggiaService])
], BanggiaController);
//# sourceMappingURL=banggia.controller.js.map