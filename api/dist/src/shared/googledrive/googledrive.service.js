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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
let GoogleDriveService = class GoogleDriveService {
    constructor() {
        this.driveId = process.env.SHARED_DRIVE_ID;
        this.uploaddriveId = process.env.SHARED_UPLOAD_DRIVE_ID;
        const serviceAccount = 'dist/credentials.json';
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        this.drive = googleapis_1.google.drive({ version: 'v3', auth });
    }
    async uploadFile(file) {
        const response = await this.drive.files.create({
            requestBody: {
                name: file.originalname,
                parents: [this.uploaddriveId],
            },
            media: {
                mimeType: file.mimetype,
                body: stream_1.Readable.from(file.buffer),
            },
        });
        await this.drive.permissions.create({
            fileId: response.data.id,
            requestBody: { role: 'reader', type: 'anyone' },
        });
        const fileUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
        return fileUrl;
    }
    async queryFolders(driveId) {
        console.log(driveId);
        const response = await this.drive.files.list({
            q: `'${driveId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });
        return response.data.files;
    }
    async listFolders() {
        const response = await this.drive.files.list({
            q: `'${this.driveId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });
        return response.data.files;
    }
    async listUsersFolder(driveId) {
        const response = await this.drive.permissions.list({
            fileId: driveId,
            supportsAllDrives: true,
        });
        return response.data.permissions;
    }
    async listUsers() {
        const response = await this.drive.permissions.list({
            fileId: this.driveId,
            supportsAllDrives: true,
        });
        return response.data.permissions;
    }
    async addUser(email, role) {
        const response = await this.drive.permissions.create({
            fileId: this.driveId,
            requestBody: {
                type: 'user',
                role,
                emailAddress: email,
            },
            supportsAllDrives: true,
        });
        return response.data;
    }
    async removeUser(permissionId) {
        await this.drive.permissions.delete({
            fileId: this.driveId,
            permissionId,
            supportsAllDrives: true,
        });
        return { message: `User ${permissionId} removed` };
    }
};
exports.GoogleDriveService = GoogleDriveService;
exports.GoogleDriveService = GoogleDriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleDriveService);
//# sourceMappingURL=googledrive.service.js.map