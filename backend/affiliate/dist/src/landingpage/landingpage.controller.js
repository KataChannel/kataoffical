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
exports.LandingpageController = void 0;
const common_1 = require("@nestjs/common");
const landingpage_service_1 = require("./landingpage.service");
let LandingpageController = class LandingpageController {
    constructor(landingpageService) {
        this.landingpageService = landingpageService;
    }
    create(data) {
        console.log('createLandingpageDto', data);
        return this.landingpageService.create(data);
    }
    findby(param) {
        return this.landingpageService.findby(param);
    }
    findAll() {
        return this.landingpageService.findAll();
    }
    findOne(id) {
        return this.landingpageService.findOne(id);
    }
    update(id, data) {
        return this.landingpageService.update(id, data);
    }
    remove(id) {
        return this.landingpageService.remove(id);
    }
    reorder(body) {
        return this.landingpageService.reorderlandingPages(body.landingpageIds);
    }
};
exports.LandingpageController = LandingpageController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandingpageController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandingpageController.prototype, "findby", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandingpageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandingpageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LandingpageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandingpageController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandingpageController.prototype, "reorder", null);
exports.LandingpageController = LandingpageController = __decorate([
    (0, common_1.Controller)('landingpage'),
    __metadata("design:paramtypes", [landingpage_service_1.landingPageService])
], LandingpageController);
//# sourceMappingURL=landingpage.controller.js.map