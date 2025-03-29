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
exports.QuanlydriveService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
const stream_1 = require("stream");
let QuanlydriveService = class QuanlydriveService {
    constructor(_SocketGateway, prisma, _ErrorlogService) {
        this._SocketGateway = _SocketGateway;
        this.prisma = prisma;
        this._ErrorlogService = _ErrorlogService;
        this.uploaddriveId = process.env.SHARED_UPLOAD_DRIVE_ID;
        const serviceAccount = 'credentials.json';
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
        try {
            const response = await this.drive.files.list({
                q: `'${driveId}' in parents and trashed = false`,
                fields: 'files(id, name, mimeType, createdTime, modifiedTime, size)',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            });
            const files = response.data.files || [];
            const folderItems = files.map((item) => ({
                googleId: item.id,
                name: item.name,
                parentId: driveId,
                type: item.mimeType === 'application/vnd.google-apps.folder' ? 'folder' : 'file',
                mimeType: item.mimeType,
                size: Number(item.size) || 0,
            }));
            console.log(folderItems);
            await this.prisma.$transaction(folderItems.map((item) => this.prisma.driveItem.upsert({
                where: { googleId: item.googleId },
                update: item,
                create: item,
            })));
            return folderItems;
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to query folders');
        }
    }
    async listUsersFolder(driveId) {
        const response = await this.drive.permissions.list({
            fileId: driveId,
            supportsAllDrives: true,
        });
        return response.data.permissions;
    }
    async addUser(email, driveId, role) {
        const response = await this.drive.permissions.create({
            fileId: driveId,
            requestBody: {
                type: 'user',
                role,
                emailAddress: email,
            },
            supportsAllDrives: true,
        });
        return response.data;
    }
    async removeUser(permissionId, driveId) {
        await this.drive.permissions.delete({
            fileId: driveId,
            permissionId,
            supportsAllDrives: true,
        });
        return { message: `User ${permissionId} removed` };
    }
    async getLastUpdateddriveItem() {
        try {
            const lastUpdated = await this.prisma.driveItem.aggregate({
                _max: {
                    updatedAt: true,
                },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdateddriveItem', error);
            throw error;
        }
    }
    async create(data) {
        try {
            return this.prisma.driveItem.create({ data });
        }
        catch (error) {
            this._ErrorlogService.logError('createdriveItem', error);
            throw error;
        }
    }
    async findAll() {
        try {
            const files = await this.prisma.driveItem.findMany();
            const tree = this.buildTree(files, '0AKQL50NKsue5Uk9PVA');
            console.log(tree);
            return tree;
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw error;
        }
    }
    buildTree(items, parentId = null) {
        return items
            .filter(item => item.parentId === parentId)
            .map(item => ({ ...item, children: this.buildTree(items, item.googleId) }));
    }
    async findby(param) {
        try {
            const driveItem = await this.prisma.driveItem.findUnique({ where: param });
            return driveItem;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const driveItem = await this.prisma.driveItem.findUnique({ where: { id } });
            if (!driveItem)
                throw new common_1.NotFoundException('driveItem not found');
            return driveItem;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            return this.prisma.driveItem.update({ where: { id }, data });
        }
        catch (error) {
            this._ErrorlogService.logError('updatedriveItem', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            return this.prisma.driveItem.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removedriveItem', error);
            throw error;
        }
    }
};
exports.QuanlydriveService = QuanlydriveService;
exports.QuanlydriveService = QuanlydriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socket_gateway_1.SocketGateway,
        prisma_service_1.PrismaService,
        errorlog_service_1.ErrorlogService])
], QuanlydriveService);
//# sourceMappingURL=quanlydrive.service.js.map