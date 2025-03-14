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
exports.GoogleDriveController = void 0;
const common_1 = require("@nestjs/common");
const googledrive_service_1 = require("./googledrive.service");
const platform_express_1 = require("@nestjs/platform-express");
const chatbot_service_1 = require("../../chatbot/chatbot.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
let GoogleDriveController = class GoogleDriveController {
    constructor(googleDriveService, _ChatbotService, prisma) {
        this.googleDriveService = googleDriveService;
        this._ChatbotService = _ChatbotService;
        this.prisma = prisma;
    }
    async uploadFile(file) {
        const fileUrl = await this.googleDriveService.uploadFile(file);
        const jsonData = await this._ChatbotService.analyzeImage(fileUrl);
        const savedFile = await this.prisma.file.create({
            data: { fileName: file.originalname, fileUrl, jsonData },
        });
        return savedFile;
    }
    async queryFolders(query) {
        return this.googleDriveService.queryFolders(query);
    }
    async listUsersFolder(query) {
        return this.googleDriveService.listUsersFolder(query);
    }
    async listFolders() {
        return this.googleDriveService.listFolders();
    }
    async listUsers() {
        return this.googleDriveService.listUsers();
    }
    async addUser(body) {
        return this.googleDriveService.addUser(body.email, body.role);
    }
    async removeUser(permissionId) {
        return this.googleDriveService.removeUser(permissionId);
    }
};
exports.GoogleDriveController = GoogleDriveController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleDriveController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('queryfolder'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleDriveController.prototype, "queryFolders", null);
__decorate([
    (0, common_1.Get)('listUsersFolder'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleDriveController.prototype, "listUsersFolder", null);
__decorate([
    (0, common_1.Get)('folders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleDriveController.prototype, "listFolders", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleDriveController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleDriveController.prototype, "addUser", null);
__decorate([
    (0, common_1.Delete)('users/:permissionId'),
    __param(0, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoogleDriveController.prototype, "removeUser", null);
exports.GoogleDriveController = GoogleDriveController = __decorate([
    (0, common_1.Controller)('googledrive'),
    __metadata("design:paramtypes", [googledrive_service_1.GoogleDriveService,
        chatbot_service_1.ChatbotService,
        prisma_service_1.PrismaService])
], GoogleDriveController);
//# sourceMappingURL=googledrive.controller.js.map