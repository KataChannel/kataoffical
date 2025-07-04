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
exports.LichhenController = void 0;
const common_1 = require("@nestjs/common");
const lichhen_service_1 = require("./lichhen.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let LichhenController = class LichhenController {
    constructor(lichhenService) {
        this.lichhenService = lichhenService;
    }
    async create(data) {
        try {
            return await this.lichhenService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findby(param) {
        try {
            return await this.lichhenService.findBy(param);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query) {
        try {
            return await this.lichhenService.findAll(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch lichhens', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLastUpdatedLichhen() {
        try {
            return await this.lichhenService.getLastUpdatedLichhen();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async syncslichhen(param) {
        try {
            return await this.lichhenService.syncslichhen(param);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this.lichhenService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find one failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            return await this.lichhenService.update(id, data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Update failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.lichhenService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorder(body) {
        try {
            return await this.lichhenService.reorderLichhens(body.lichhenIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Reorder failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LichhenController = LichhenController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lichhen' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find lichhens by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all lichhens with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of lichhens with pagination info' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated lichhen' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "getLastUpdatedLichhen", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find courses by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('syncslichhen'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "syncslichhen", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find lichhen by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lichhen' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lichhen' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder lichhens' }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                lichhenIds: { type: 'array', items: { type: 'string' } },
            },
        },
    }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LichhenController.prototype, "reorder", null);
exports.LichhenController = LichhenController = __decorate([
    (0, swagger_1.ApiTags)('lichhen'),
    (0, common_1.Controller)('lichhen'),
    __metadata("design:paramtypes", [lichhen_service_1.LichhenService])
], LichhenController);
//# sourceMappingURL=lichhen.controller.js.map