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
let ChotkhoController = class ChotkhoController {
    constructor(chotkhoService) {
        this.chotkhoService = chotkhoService;
    }
    async create(data) {
        try {
            return await this.chotkhoService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    async findAll(query) {
        try {
            return await this.chotkhoService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTonkhoWithPendingQuantities(khoId) {
        try {
            return await this.chotkhoService.getTonkhoWithPendingQuantities(khoId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get tonkho failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createChotkhoDetails(chotkhoId, data) {
        try {
            return await this.chotkhoService.createChotkhoDetails(chotkhoId, data.excelData);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create details failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTonkhoAfterClose(chotkhoId) {
        try {
            return await this.chotkhoService.updateTonkhoAfterClose(chotkhoId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Close inventory failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async completeChotkhoWorkflow(chotkhoId) {
        try {
            const result = await this.chotkhoService.updateTonkhoAfterClose(chotkhoId);
            if (result.success) {
                return {
                    success: true,
                    message: 'Chốt kho hoàn tất với phiếu kho điều chỉnh',
                    data: result
                };
            }
            else {
                throw new common_1.HttpException(result.message || 'Chốt kho thất bại', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Complete chotkho failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLastUpdatedChotkho() {
        try {
            return await this.chotkhoService.getLastUpdatedChotkho();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ChotkhoController = ChotkhoController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new chotkho' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find chotkho by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chotkho records' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'khoId', required: false, type: String }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get TonKho with pending order information' }),
    (0, swagger_1.ApiQuery)({ name: 'khoId', required: false, type: String }),
    (0, common_1.Get)('tonkho-pending'),
    __param(0, (0, common_1.Query)('khoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "getTonkhoWithPendingQuantities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create chotkho details from Excel data' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "createChotkhoDetails", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update TonKho after closing inventory' }),
    (0, common_1.Patch)(':id/close'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "updateTonkhoAfterClose", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Complete chotkho workflow - close with phieukho creation' }),
    (0, common_1.Post)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "completeChotkhoWorkflow", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated chotkho timestamp' }),
    (0, common_1.Get)('last-updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "getLastUpdatedChotkho", null);
exports.ChotkhoController = ChotkhoController = __decorate([
    (0, swagger_1.ApiTags)('chotkho'),
    (0, common_1.Controller)('chotkho'),
    __metadata("design:paramtypes", [chotkho_service_1.ChotkhoService])
], ChotkhoController);
//# sourceMappingURL=chotkho.controller.js.map