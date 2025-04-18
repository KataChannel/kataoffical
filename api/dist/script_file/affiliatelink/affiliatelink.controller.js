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
const affiliatelink_dto_1 = require("./dto/affiliatelink.dto");
let AffiliatelinkController = class AffiliatelinkController {
    constructor(affiliatelinkService) {
        this.affiliatelinkService = affiliatelinkService;
    }
    create(createAffiliatelinkDto) {
        return this.affiliatelinkService.create(createAffiliatelinkDto);
    }
    findBy(param) {
        return this.affiliatelinkService.findBy(param);
    }
    findAll() {
        return this.affiliatelinkService.findAll();
    }
    findOne(id) {
        return this.affiliatelinkService.findOne(id);
    }
    update(id, updateAffiliatelinkDto) {
        return this.affiliatelinkService.update(id, updateAffiliatelinkDto);
    }
    remove(id) {
        return this.affiliatelinkService.remove(id);
    }
    reorder(reorderAffiliatelinkDto) {
        return this.affiliatelinkService.reorderAffiliatelinks(reorderAffiliatelinkDto.affiliatelinkIds);
    }
};
exports.AffiliatelinkController = AffiliatelinkController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affiliatelink_dto_1.CreateAffiliatelinkDto]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('findby'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affiliatelink_dto_1.FindByDto]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "findBy", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, affiliatelink_dto_1.UpdateAffiliatelinkDto]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affiliatelink_dto_1.ReorderAffiliatelinkDto]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "reorder", null);
exports.AffiliatelinkController = AffiliatelinkController = __decorate([
    (0, common_1.Controller)('affiliatelink'),
    __metadata("design:paramtypes", [affiliatelink_service_1.AffiliatelinkService])
], AffiliatelinkController);
//# sourceMappingURL=affiliatelink.controller.js.map