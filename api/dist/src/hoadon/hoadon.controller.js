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
exports.HoadonController = void 0;
const common_1 = require("@nestjs/common");
const hoadon_service_1 = require("./hoadon.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let HoadonController = class HoadonController {
    constructor(hoadonService) {
        this.hoadonService = hoadonService;
    }
    create(data) {
        return this.hoadonService.create(data);
    }
    findby(param) {
        return this.hoadonService.findBy(param);
    }
    findAll() {
        return this.hoadonService.findAll();
    }
    async getLastUpdatedHoadon() {
        return this.hoadonService.getLastUpdatedHoadon();
    }
    findOne(id) {
        return this.hoadonService.findOne(id);
    }
    update(id, data) {
        return this.hoadonService.update(id, data);
    }
    remove(id) {
        return this.hoadonService.remove(id);
    }
    reorder(body) {
        return this.hoadonService.reorderHoadons(body.hoadonIds);
    }
};
exports.HoadonController = HoadonController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new hoadon' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HoadonController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find hoadons by parameters' }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HoadonController.prototype, "findby", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all hoadons' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoadonController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last updated hoadon' }),
    (0, common_1.Get)('lastupdated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HoadonController.prototype, "getLastUpdatedHoadon", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find hoadon by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HoadonController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a hoadon' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiBody)({ type: Object }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HoadonController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a hoadon' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HoadonController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder hoadons' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { hoadonIds: { type: 'array', items: { type: 'string' } } } } }),
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HoadonController.prototype, "reorder", null);
exports.HoadonController = HoadonController = __decorate([
    (0, swagger_1.ApiTags)('hoadon'),
    (0, common_1.Controller)('hoadon'),
    __metadata("design:paramtypes", [hoadon_service_1.HoadonService])
], HoadonController);
//# sourceMappingURL=hoadon.controller.js.map