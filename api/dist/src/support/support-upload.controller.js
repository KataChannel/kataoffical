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
exports.SupportUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const minio_service_1 = require("../minio/minio.service");
let SupportUploadController = class SupportUploadController {
    constructor(minioService) {
        this.minioService = minioService;
    }
    async uploadFiles(files) {
        const maxSize = 50 * 1024 * 1024;
        const allowedTypes = /^(image|video)\//;
        for (const file of files) {
            if (!allowedTypes.test(file.mimetype)) {
                throw new Error(`File type ${file.mimetype} not allowed. Only images and videos are supported.`);
            }
            if (file.size > maxSize) {
                throw new Error(`File ${file.originalname} exceeds maximum size of 50MB`);
            }
        }
        const uploadResults = await Promise.all(files.map(async (file) => {
            const fileUrl = await this.minioService.uploadFile(file, {
                category: 'support',
                group: 'tickets',
                title: file.originalname,
            });
            return {
                fileName: file.originalname,
                fileType: file.mimetype,
                fileSize: file.size,
                fileUrl: fileUrl,
            };
        }));
        return uploadResults;
    }
};
exports.SupportUploadController = SupportUploadController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SupportUploadController.prototype, "uploadFiles", null);
exports.SupportUploadController = SupportUploadController = __decorate([
    (0, common_1.Controller)('support'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [minio_service_1.MinioService])
], SupportUploadController);
//# sourceMappingURL=support-upload.controller.js.map