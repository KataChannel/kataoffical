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
    async findby(param) {
        try {
            return await this.chotkhoService.findBy(param);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByDateRange(startDate, endDate, page = '1', limit = '20') {
        try {
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);
            return await this.chotkhoService.findByDateRange(startDate, endDate, pageNum, limitNum);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch chotkho by date range', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async tonkhobylist(param) {
        try {
            return await this.chotkhoService.tonkhobylist(param);
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
            throw new common_1.HttpException(error.message || 'Failed to fetch chotkhos', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    async findOne(id) {
        try {
            return await this.chotkhoService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find one failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            return await this.chotkhoService.update(id, data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.chotkhoService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async bulkDelete(data) {
        try {
            return await this.chotkhoService.bulkDelete(data.ids);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Bulk delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByKho(khoId, page = '1', limit = '20') {
        try {
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);
            return await this.chotkhoService.findByKho(khoId, pageNum, limitNum);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch chotkho by kho', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findBySanpham(sanphamId, page = '1', limit = '20') {
        try {
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);
            return await this.chotkhoService.findBySanpham(sanphamId, pageNum, limitNum);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch chotkho by sanpham', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generateReport(query) {
        try {
            return await this.chotkhoService.generateReport(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to generate report', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorder(body) {
        try {
            return await this.chotkhoService.reorderChotkhos(body.chotkhoIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Reorder failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generateReportPost(query) {
        try {
            return await this.chotkhoService.generateReport(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Generate report failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async bulkUpdateStatus(data) {
        try {
            return await this.chotkhoService.bulkUpdateActive(data.ids, data.status === 'active');
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Bulk update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async bulkCreate(dataList) {
        try {
            return await this.chotkhoService.bulkCreateChotkho(dataList);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Bulk create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getStatistics() {
        try {
            return await this.chotkhoService.getStatistics();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get statistics failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    (0, swagger_1.ApiOperation)({ summary: 'Find chotkhos by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chotkho records by date range' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: true, type: String, description: 'Start date in YYYY-MM-DD format' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: true, type: String, description: 'End date in YYYY-MM-DD format' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of chotkho records for the specified date range' }),
    (0, common_1.Get)('bydate'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findByDateRange", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find chotkhos by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('tonkhobylist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "tonkhobylist", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chotkhos with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of chotkhos with pagination info' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated chotkho' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "getLastUpdatedChotkho", null);
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
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a chotkho' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('update/:id'),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a chotkho' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete/:id'),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.DELETE }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk delete chotkho records' }),
    (0, swagger_1.ApiBody)({
        type: Object,
        description: 'Array of chotkho IDs to delete',
        schema: {
            properties: {
                ids: { type: 'array', items: { type: 'string' } }
            }
        }
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('bulk-delete'),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "bulkDelete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chotkho records by kho ID' }),
    (0, swagger_1.ApiParam)({ name: 'khoId', type: String, description: 'ID of the kho (warehouse)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of chotkho records for the specified kho' }),
    (0, common_1.Get)('bykho/:khoId'),
    __param(0, (0, common_1.Param)('khoId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findByKho", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chotkho records by sanpham ID' }),
    (0, swagger_1.ApiParam)({ name: 'sanphamId', type: String, description: 'ID of the sanpham (product)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of chotkho records for the specified sanpham' }),
    (0, common_1.Get)('bysanpham/:sanphamId'),
    __param(0, (0, common_1.Param)('sanphamId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "findBySanpham", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Generate chotkho report' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'Start date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'End date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'khoId', required: false, type: String, description: 'Filter by kho ID' }),
    (0, swagger_1.ApiQuery)({ name: 'sanphamId', required: false, type: String, description: 'Filter by sanpham ID' }),
    (0, swagger_1.ApiQuery)({ name: 'format', required: false, enum: ['json', 'excel'], description: 'Report format' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chotkho report data' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('report'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "generateReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder chotkhos' }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                chotkhoIds: { type: 'array', items: { type: 'string' } },
            },
        },
    }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "reorder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Generate report for chotkho' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('report'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "generateReportPost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update status for chotkhos' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('bulk-update-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "bulkUpdateStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk create chotkho records' }),
    (0, swagger_1.ApiBody)({
        type: [Object],
        description: 'Array of chotkho data objects'
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bulk-create'),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "bulkCreate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chotkho statistics' }),
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChotkhoController.prototype, "getStatistics", null);
exports.ChotkhoController = ChotkhoController = __decorate([
    (0, swagger_1.ApiTags)('chotkho'),
    (0, common_1.Controller)('chotkho'),
    __metadata("design:paramtypes", [chotkho_service_1.ChotkhoService])
], ChotkhoController);
//# sourceMappingURL=chotkho.controller.js.map