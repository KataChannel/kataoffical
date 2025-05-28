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
exports.AffiliatelinkController = void 0;
const common_1 = require("@nestjs/common");
const affiliatelink_service_1 = require("./affiliatelink.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AffiliatelinkController = class AffiliatelinkController {
    constructor(affiliatelinkService) {
        this.affiliatelinkService = affiliatelinkService;
    }
    async create(data) {
        try {
            return await this.affiliatelinkService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findby(param) {
        try {
            return await this.affiliatelinkService.findBy(param);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(page = '1', limit = '10') {
        try {
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);
            if (isNaN(pageNum) || pageNum < 1) {
                throw new common_1.HttpException('Page must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
            }
            if (isNaN(limitNum) || limitNum < 1) {
                throw new common_1.HttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.affiliatelinkService.findAll(pageNum, limitNum);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch affiliatelinks', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLastUpdatedAffiliatelink() {
        try {
            return await this.affiliatelinkService.getLastUpdatedaffiliateLink();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this.affiliatelinkService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find one failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            return await this.affiliatelinkService.update(id, data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.affiliatelinkService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorder(body) {
        try {
            return await this.affiliatelinkService.reorderaffiliateLinks(body.affiliatelinkIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Reorder failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AffiliatelinkController = AffiliatelinkController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new affiliatelink' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find affiliatelinks by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all affiliatelinks with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of affiliatelinks with pagination info' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated affiliatelink' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "getLastUpdatedAffiliatelink", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find affiliatelink by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a affiliatelink' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a affiliatelink' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder affiliatelinks' }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                affiliatelinkIds: { type: 'array', items: { type: 'string' } },
            },
        },
    }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "reorder", null);
exports.AffiliatelinkController = AffiliatelinkController = __decorate([
    (0, swagger_1.ApiTags)('affiliatelink'),
    (0, common_1.Controller)('affiliatelink'),
    __metadata("design:paramtypes", [affiliatelink_service_1.affiliateLinkService])
], AffiliatelinkController);
//# sourceMappingURL=affiliatelink.controller.js.map