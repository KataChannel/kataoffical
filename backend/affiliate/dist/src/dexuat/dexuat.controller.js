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
exports.DexuatController = void 0;
const common_1 = require("@nestjs/common");
const dexuat_service_1 = require("./dexuat.service");
let DexuatController = class DexuatController {
    constructor(dexuatService) {
        this.dexuatService = dexuatService;
    }
    create(createDexuatDto) {
        return this.dexuatService.create(createDexuatDto);
    }
    findby(param) {
        return this.dexuatService.findby(param);
    }
    findAll() {
        return this.dexuatService.findAll();
    }
    async getLastUpdatedDexuat() {
        return this.dexuatService.getLastUpdatedDexuat();
    }
    findOne(id) {
        return this.dexuatService.findOne(id);
    }
    update(id, data) {
        return this.dexuatService.update(id, data);
    }
    remove(id) {
        return this.dexuatService.remove(id);
    }
    reorder(body) {
        return this.dexuatService.reorderDexuats(body.dexuatIds);
    }
};
exports.DexuatController = DexuatController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DexuatController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DexuatController.prototype, "findby", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DexuatController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('last-updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DexuatController.prototype, "getLastUpdatedDexuat", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DexuatController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DexuatController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DexuatController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DexuatController.prototype, "reorder", null);
exports.DexuatController = DexuatController = __decorate([
    (0, common_1.Controller)('dexuat'),
    __metadata("design:paramtypes", [dexuat_service_1.DexuatService])
], DexuatController);
//# sourceMappingURL=dexuat.controller.js.map