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
exports.HoadonchitietController = void 0;
const common_1 = require("@nestjs/common");
const hoadonchitiet_service_1 = require("./hoadonchitiet.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let HoadonchitietController = class HoadonchitietController {
    constructor(hoadonchitietService) {
        this.hoadonchitietService = hoadonchitietService;
    }
    create(data) {
        return this.hoadonchitietService.create(data);
    }
    findby(param) {
        return this.hoadonchitietService.findBy(param);
    }
    findAll() {
        return this.hoadonchitietService.findAll();
    }
    async getLastUpdatedHoadonchitiet() {
        return this.hoadonchitietService.getLastUpdatedhoadonChitiet();
    }
    findOne(id) {
        return this.hoadonchitietService.findOne(id);
    }
    update(id, data) {
        return this.hoadonchitietService.update(id, data);
    }
    remove(id) {
        return this.hoadonchitietService.remove(id);
    }
    reorder(body) {
        return this.hoadonchitietService.reorderhoadonChitiets(body.hoadonchitietIds);
    }
};
exports.HoadonchitietController = HoadonchitietController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new hoadonchitiet' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HoadonchitietController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find hoadonchitiets by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HoadonchitietController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all hoadonchitiets' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoadonchitietController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated hoadonchitiet' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HoadonchitietController.prototype, "getLastUpdatedHoadonchitiet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find hoadonchitiet by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HoadonchitietController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a hoadonchitiet' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HoadonchitietController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a hoadonchitiet' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HoadonchitietController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder hoadonchitiets' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { hoadonchitietIds: { type: 'array', items: { type: 'string' } } } } }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HoadonchitietController.prototype, "reorder", null);
exports.HoadonchitietController = HoadonchitietController = __decorate([
    (0, swagger_1.ApiTags)('hoadonchitiet'),
    (0, common_1.Controller)('hoadonchitiet'),
    __metadata("design:paramtypes", [hoadonchitiet_service_1.hoadonChitietService])
], HoadonchitietController);
//# sourceMappingURL=hoadonchitiet.controller.js.map