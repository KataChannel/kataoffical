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
exports.QuanlydriveController = void 0;
const common_1 = require("@nestjs/common");
const quanlydrive_service_1 = require("./quanlydrive.service");
const platform_express_1 = require("@nestjs/platform-express");
let QuanlydriveController = class QuanlydriveController {
    constructor(quanlydriveService) {
        this.quanlydriveService = quanlydriveService;
    }
    async uploadFile(file) {
        console.log(file);
        const fileUrl = await this.quanlydriveService.uploadFile(file);
        console.log(fileUrl);
    }
    async queryFolders(query) {
        return this.quanlydriveService.queryFolders(query);
    }
    async listUsersFolder(query) {
        return this.quanlydriveService.listUsersFolder(query);
    }
    async addUser(body) {
        return this.quanlydriveService.addUser(body.email, body.driveId, body.role);
    }
    async removeUser(permissionId, driveId) {
        return this.quanlydriveService.removeUser(permissionId, driveId);
    }
    create(createquanlyqrcodeDto) {
        return this.quanlydriveService.create(createquanlyqrcodeDto);
    }
    findby(param) {
        return this.quanlydriveService.findby(param);
    }
    findAll() {
        return this.quanlydriveService.findAll();
    }
    findOne(id) {
        return this.quanlydriveService.findOne(id);
    }
    update(id, data) {
        return this.quanlydriveService.update(id, data);
    }
    remove(id) {
        return this.quanlydriveService.remove(id);
    }
};
exports.QuanlydriveController = QuanlydriveController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuanlydriveController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('queryfolder'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuanlydriveController.prototype, "queryFolders", null);
__decorate([
    (0, common_1.Get)('listUsersFolder'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuanlydriveController.prototype, "listUsersFolder", null);
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuanlydriveController.prototype, "addUser", null);
__decorate([
    (0, common_1.Delete)('users/:permissionId/:driveId'),
    __param(0, (0, common_1.Param)('permissionId')),
    __param(1, (0, common_1.Param)('driveId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuanlydriveController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuanlydriveController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('findby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuanlydriveController.prototype, "findby", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuanlydriveController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuanlydriveController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuanlydriveController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuanlydriveController.prototype, "remove", null);
exports.QuanlydriveController = QuanlydriveController = __decorate([
    (0, common_1.Controller)('quanlydrive'),
    __metadata("design:paramtypes", [quanlydrive_service_1.QuanlydriveService])
], QuanlydriveController);
//# sourceMappingURL=quanlydrive.controller.js.map