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
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../shared/auth/jwt-auth.guard");
const audit_decorator_1 = require("../shared/decorators/audit.decorator");
const client_1 = require("@prisma/client");
const createdby_decorator_1 = require("../shared/decorators/createdby.decorator");
let SanphamController = class SanphamController {
    constructor(sanphamService) {
        this.sanphamService = sanphamService;
    }
    async import(data, user) {
        try {
            const result = await this.sanphamService.import(data, user);
            let entityId = 'N/A';
            if (result && result.id) {
                entityId = result.id;
            }
            else if (result && Array.isArray(result.results) && result.results.length > 0 && result.results[0].codeId) {
                entityId = result.results[0].codeId;
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Import failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(data, user) {
        try {
            const result = await this.sanphamService.create(data, user);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findby(param) {
        try {
            return await this.sanphamService.findBy(param);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query) {
        try {
            return await this.sanphamService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch sanphams', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLastUpdatedSanpham() {
        try {
            return await this.sanphamService.getLastUpdatedSanpham();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this.sanphamService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find one failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            const existingEntity = await this.sanphamService.findOne(id);
            if (!existingEntity) {
                throw new common_1.HttpException('Sanpham not found', common_1.HttpStatus.NOT_FOUND);
            }
            const result = await this.sanphamService.update(id, data);
            return result;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException(error.message || 'Update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const result = await this.sanphamService.remove(id);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorder(body) {
        try {
            return await this.sanphamService.reorderSanphams(body.sanphamIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Reorder failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SanphamController = SanphamController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Import Sanpham' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Sanpham', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, createdby_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "import", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Sanpham' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Sanpham', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, createdby_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find sanphams by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all sanphams with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of sanphams with pagination info' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated sanpham' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "getLastUpdatedSanpham", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find sanpham by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Sanpham by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Sanpham ID' }),
    (0, swagger_1.ApiBody)({ description: 'Update data for Sanpham' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Sanpham', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Sanpham by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, audit_decorator_1.Audit)({ entity: 'Sanpham', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder sanphams' }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                sanphamIds: { type: 'array', items: { type: 'string' } },
            },
        },
    }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SanphamController.prototype, "reorder", null);
exports.SanphamController = SanphamController = __decorate([
    (0, swagger_1.ApiTags)('sanpham'),
    (0, common_1.Controller)('sanpham'),
    __metadata("design:paramtypes", [sanpham_service_1.SanphamService])
], SanphamController);
//# sourceMappingURL=sanpham.controller.js.map