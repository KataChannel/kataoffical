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
exports.ThanhtoanhoahongController = void 0;
const common_1 = require("@nestjs/common");
const thanhtoanhoahong_service_1 = require("./thanhtoanhoahong.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ThanhtoanhoahongController = class ThanhtoanhoahongController {
    constructor(thanhtoanhoahongService) {
        this.thanhtoanhoahongService = thanhtoanhoahongService;
    }
    async create(data) {
        try {
            return await this.thanhtoanhoahongService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findby(param) {
        try {
            return await this.thanhtoanhoahongService.findBy(param);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query) {
        try {
            return await this.thanhtoanhoahongService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch thanhtoanhoahongs', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTotalThanhtoanhoahongByUserId(userId) {
        try {
            return await this.thanhtoanhoahongService.getTotalThanhtoanhoahongByUserId(userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch total thanhtoanhoahong', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLastUpdatedThanhtoanhoahong() {
        try {
            return await this.thanhtoanhoahongService.getLastUpdatedThanhtoanhoahong();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this.thanhtoanhoahongService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find one failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            return await this.thanhtoanhoahongService.update(id, data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.thanhtoanhoahongService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorder(body) {
        try {
            return await this.thanhtoanhoahongService.reorderThanhtoanhoahongs(body.thanhtoanhoahongIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Reorder failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ThanhtoanhoahongController = ThanhtoanhoahongController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new thanhtoanhoahong' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find thanhtoanhoahongs by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all thanhtoanhoahongs with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of thanhtoanhoahongs with pagination info' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get total thanhtoanhoahong by userId' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', type: String, required: true }),
    (0, common_1.Get)('total'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "getTotalThanhtoanhoahongByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated thanhtoanhoahong' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "getLastUpdatedThanhtoanhoahong", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find thanhtoanhoahong by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a thanhtoanhoahong' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a thanhtoanhoahong' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder thanhtoanhoahongs' }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                thanhtoanhoahongIds: { type: 'array', items: { type: 'string' } },
            },
        },
    }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThanhtoanhoahongController.prototype, "reorder", null);
exports.ThanhtoanhoahongController = ThanhtoanhoahongController = __decorate([
    (0, swagger_1.ApiTags)('thanhtoanhoahong'),
    (0, common_1.Controller)('thanhtoanhoahong'),
    __metadata("design:paramtypes", [thanhtoanhoahong_service_1.ThanhtoanhoahongService])
], ThanhtoanhoahongController);
//# sourceMappingURL=thanhtoanhoahong.controller.js.map