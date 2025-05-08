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
exports.SettingController = void 0;
const common_1 = require("@nestjs/common");
const setting_service_1 = require("./setting.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let SettingController = class SettingController {
    constructor(settingService) {
        this.settingService = settingService;
    }
    async create(data) {
        try {
            const result = await this.settingService.create(data);
            return { statusCode: common_1.HttpStatus.CREATED, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Create setting failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findby(param) {
        try {
            const result = await this.settingService.findBy(param);
            return { statusCode: common_1.HttpStatus.OK, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find settings failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            const result = await this.settingService.findAll();
            return { statusCode: common_1.HttpStatus.OK, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get all settings failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLastUpdatedSetting() {
        try {
            const result = await this.settingService.getLastUpdatedSetting();
            return { statusCode: common_1.HttpStatus.OK, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Get last updated setting failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const result = await this.settingService.findOne(id);
            if (!result) {
                throw new common_1.HttpException('Setting not found', common_1.HttpStatus.NOT_FOUND);
            }
            return { statusCode: common_1.HttpStatus.OK, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Find setting by ID failed', error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, data) {
        try {
            const result = await this.settingService.update(id, data);
            return { statusCode: common_1.HttpStatus.OK, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Update setting failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            const result = await this.settingService.remove(id);
            return { statusCode: common_1.HttpStatus.OK, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Delete setting failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async reorder(body) {
        try {
            const result = await this.settingService.reorderSettings(body.settingIds);
            return { statusCode: common_1.HttpStatus.OK, data: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Reorder settings failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.SettingController = SettingController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new setting' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find settings by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all settings' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated setting' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getLastUpdatedSetting", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find setting by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a setting' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a setting' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder settings' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { settingIds: { type: 'array', items: { type: 'string' } } } } }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "reorder", null);
exports.SettingController = SettingController = __decorate([
    (0, swagger_1.ApiTags)('setting'),
    (0, common_1.Controller)('setting'),
    __metadata("design:paramtypes", [setting_service_1.SettingService])
], SettingController);
//# sourceMappingURL=setting.controller.js.map