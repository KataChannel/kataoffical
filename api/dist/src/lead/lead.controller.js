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
exports.leadController = void 0;
const common_1 = require("@nestjs/common");
const lead_service_1 = require("./lead.service");
let leadController = class leadController {
    constructor(leadService) {
        this.leadService = leadService;
    }
    create(createleadDto) {
        return this.leadService.create(createleadDto);
    }
    findby(param) {
        return this.leadService.findby(param);
    }
    findAll() {
        return this.leadService.findAll();
    }
    async getLastUpdatedlead() {
        return this.leadService.getLastUpdatedlead();
    }
    findOne(id) {
        return this.leadService.findOne(id);
    }
    update(id, data) {
        return this.leadService.update(id, data);
    }
    remove(id) {
        return this.leadService.remove(id);
    }
    reorder(body) {
        return this.leadService.reorderleads(body.leadIds);
    }
};
exports.leadController = leadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], leadController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], leadController.prototype, "findby", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], leadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('last-updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], leadController.prototype, "getLastUpdatedlead", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], leadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], leadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], leadController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], leadController.prototype, "reorder", null);
exports.leadController = leadController = __decorate([
    (0, common_1.Controller)('lead'),
    __metadata("design:paramtypes", [lead_service_1.leadService])
], leadController);
//# sourceMappingURL=lead.controller.js.map