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
exports.KhachhangController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const khachhang_service_1 = require("./khachhang.service");
let KhachhangController = class KhachhangController {
    constructor(khachhangService) {
        this.khachhangService = khachhangService;
    }
    async create(data) {
        try {
            return await this.khachhangService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findby(param) {
        try {
            return await this.khachhangService.findBy(param);
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
            return await this.khachhangService.findAll(pageNum, limitNum);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch khachhangs', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this.khachhangService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find one failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            return await this.khachhangService.update(id, data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.khachhangService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.KhachhangController = KhachhangController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new khachhang' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find khachhangs by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all khachhangs with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of khachhangs with pagination info' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find khachhang by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a khachhang' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a khachhang' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KhachhangController.prototype, "remove", null);
exports.KhachhangController = KhachhangController = __decorate([
    (0, swagger_1.ApiTags)('khachhang'),
    (0, common_1.Controller)('khachhang'),
    __metadata("design:paramtypes", [khachhang_service_1.khachHangService])
], KhachhangController);
//# sourceMappingURL=khachhang.controller.js.map