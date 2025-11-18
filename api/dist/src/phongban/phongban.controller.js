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
exports.PhongbanController = void 0;
const common_1 = require("@nestjs/common");
const phongban_service_1 = require("./phongban.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PhongbanController = class PhongbanController {
    constructor(phongbanService) {
        this.phongbanService = phongbanService;
    }
    create(createPhongbanDto) {
        return this.phongbanService.create(createPhongbanDto);
    }
    findAll(level, loai, parentId, includeChildren) {
        return this.phongbanService.findAll({
            level: level ? parseInt(level) : undefined,
            loai,
            parentId,
            includeChildren: includeChildren === 'true'
        });
    }
    getTree() {
        return this.phongbanService.getTree();
    }
    getStatistics() {
        return this.phongbanService.getStatistics();
    }
    findByMa(ma) {
        return this.phongbanService.findByMa(ma);
    }
    findOne(id) {
        return this.phongbanService.findOne(id);
    }
    update(id, updatePhongbanDto) {
        return this.phongbanService.update(id, updatePhongbanDto);
    }
    remove(id) {
        return this.phongbanService.remove(id);
    }
};
exports.PhongbanController = PhongbanController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePhongbanDto]),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('level')),
    __param(1, (0, common_1.Query)('loai')),
    __param(2, (0, common_1.Query)('parentId')),
    __param(3, (0, common_1.Query)('includeChildren')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "getTree", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('ma/:ma'),
    __param(0, (0, common_1.Param)('ma')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "findByMa", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePhongbanDto]),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhongbanController.prototype, "remove", null);
exports.PhongbanController = PhongbanController = __decorate([
    (0, common_1.Controller)('phongban'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [phongban_service_1.PhongbanService])
], PhongbanController);
//# sourceMappingURL=phongban.controller.js.map