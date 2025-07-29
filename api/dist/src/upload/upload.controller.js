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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async healthCheck() {
        return await this.uploadService.getHealthStatus();
    }
    async uploadSingle(file, folder, originalName) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        try {
            const result = await this.uploadService.uploadFile(file, folder || 'uploads', originalName);
            return {
                success: true,
                message: 'File uploaded successfully',
                data: result,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async uploadMultiple(files, folder) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files uploaded');
        }
        try {
            const results = await Promise.all(files.map(file => this.uploadService.uploadFile(file, folder || 'uploads')));
            return {
                success: true,
                message: `${results.length} files uploaded successfully`,
                data: results,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async downloadFile(filePath, res) {
        try {
            const stream = await this.uploadService.getFile(filePath);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${filePath}"`);
            stream.pipe(res);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteFile(filePath) {
        try {
            await this.uploadService.deleteFile(filePath);
            return {
                success: true,
                message: 'File deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    getPublicUrl(filePath) {
        const url = this.uploadService.getPublicUrl(filePath);
        return {
            success: true,
            url: url,
        };
    }
    async deleteFileByQuery(filePath) {
        if (!filePath) {
            throw new common_1.BadRequestException('File path is required');
        }
        try {
            await this.uploadService.deleteFile(filePath);
            return {
                success: true,
                message: 'File deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    getPublicUrlByQuery(filePath) {
        if (!filePath) {
            throw new common_1.BadRequestException('File path is required');
        }
        const url = this.uploadService.getPublicUrl(filePath);
        return {
            success: true,
            url: url,
        };
    }
    async testAuthentication() {
        try {
            const health = await this.uploadService.getHealthStatus();
            return {
                success: health.status === 'healthy',
                message: health.message,
                details: health.details
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Authentication test failed: ${error.message}`,
                error: error.code
            };
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Post)('single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('folder')),
    __param(2, (0, common_1.Query)('originalName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadSingle", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Query)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadMultiple", null);
__decorate([
    (0, common_1.Get)('download/*filePath'),
    __param(0, (0, common_1.Param)('filePath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Delete)('file/*filePath'),
    __param(0, (0, common_1.Param)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Get)('url/*filePath'),
    __param(0, (0, common_1.Param)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "getPublicUrl", null);
__decorate([
    (0, common_1.Delete)('file'),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFileByQuery", null);
__decorate([
    (0, common_1.Get)('url'),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "getPublicUrlByQuery", null);
__decorate([
    (0, common_1.Get)('test-auth'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "testAuthentication", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map