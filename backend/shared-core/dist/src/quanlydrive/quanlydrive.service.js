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
                type: item.mimeType === 'application/vnd.google-apps.folder'
                    ? 'folder'
                    : 'file',
                mimeType: item.mimeType,
                size: Number(item.size) || 0,
            }));
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
    async UpdateAllFolderDrive(driveId) {
        const foldes = await this.queryFolders(driveId);
        console.log(foldes);
    }
    async listUsersFolder(driveId) {
        const response = await this.drive.permissions.list({
            fileId: driveId,
            supportsAllDrives: true,
            fields: 'permissions(id,emailAddress,type,kind,role)',
        });
        const users = response.data.permissions;
        const driveExists = await this.prisma.driveItem.findUnique({
            where: { googleId: driveId },
        });
        console.log('driveExists', driveExists);
        if (driveExists) {
            const userItem = users.map((user) => ({
                userIdDrive: user.id,
                driveId: driveExists.id,
                googleId: driveExists.googleId,
                emailAddress: user.emailAddress,
                type: user.type,
                kind: user.kind,
                role: user.role,
            }));
            console.log('userItem', userItem);
            await this.prisma.$transaction(userItem.map((item) => this.prisma.permissionDrive.upsert({
                where: { uniqueUserDriveItemPermission: { userIdDrive: item.userIdDrive, driveId: driveExists.id, googleId: driveExists.googleId } },
                update: item,
                create: item,
            })));
        }
        else {
            console.log(`Drive with ID ${driveId} does not exist in the database`);
        }
        const result = await this.prisma.permissionDrive.findMany({
            where: { driveId: driveId },
            include: { driveItem: true },
        });
        return result;
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
        try {
            const result = await this.drive.permissions.delete({
                fileId: driveId,
                permissionId,
                supportsAllDrives: true,
            });
            return {
                statusCode: result.status,
                message: `User ${permissionId} removed`,
            };
        }
        catch (error) {
            this._ErrorlogService.logError('removeUser', error.message);
            console.log(error.status);
            return { statusCode: error.status, message: error.message };
        }
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
    async search(searchParams) {
        try {
            const { name, type, mimeType, parentId, size, createdTime, modifiedTime, page = 1, pageSize = 20 } = searchParams;
            const whereClause = {};
            if (name) {
                whereClause.name = {
                    contains: name,
                    mode: 'insensitive',
                };
            }
            if (type) {
                whereClause.type = type;
            }
            if (mimeType) {
                whereClause.mimeType = mimeType;
            }
            if (parentId) {
                whereClause.parentId = parentId;
            }
            if (size) {
                if (typeof size === 'number') {
                    whereClause.size = size;
                }
                else {
                    if (!(size.min === 0 && size.max === 0)) {
                        whereClause.size = {};
                        if (size.min !== undefined)
                            whereClause.size.gte = size.min * 1048576;
                        if (size.max !== undefined)
                            whereClause.size.lte = size.max * 1048576;
                    }
                }
            }
            if (createdTime) {
                if (createdTime instanceof Date) {
                    whereClause.createdTime = createdTime;
                }
                else {
                    whereClause.createdTime = {};
                    if (createdTime.from)
                        whereClause.createdTime.gte = createdTime.from;
                    if (createdTime.to)
                        whereClause.createdTime.lte = createdTime.to;
                }
            }
            if (modifiedTime) {
                if (modifiedTime instanceof Date) {
                    whereClause.modifiedTime = modifiedTime;
                }
                else {
                    whereClause.modifiedTime = {};
                    if (modifiedTime.from)
                        whereClause.modifiedTime.gte = modifiedTime.from;
                    if (modifiedTime.to)
                        whereClause.modifiedTime.lte = modifiedTime.to;
                }
            }
            const [results, totalCount] = await Promise.all([
                this.prisma.driveItem.findMany({
                    where: whereClause,
                    include: { permissions: true },
                    orderBy: { name: 'asc' },
                    ...(pageSize > 0 && {
                        skip: (page - 1) * pageSize,
                        take: pageSize
                    })
                }),
                this.prisma.driveItem.count({ where: whereClause })
            ]);
            const allItems = await this.prisma.driveItem.findMany({
                select: { googleId: true, name: true, parentId: true }
            });
            const itemMap = new Map(allItems.map(item => [item.googleId, item]));
            const resultsWithPath = results.map(item => ({
                ...item,
                size: item.size ? Number(item.size) : 0,
            }));
            return {
                data: resultsWithPath,
                pagination: {
                    total: totalCount,
                    page,
                    pageSize,
                    totalPages: Math.ceil(totalCount / pageSize),
                },
            };
        }
        catch (error) {
            this._ErrorlogService.logError('search', error);
            throw error;
        }
    }
    buildPath(googleId, itemMap) {
        const pathParts = [];
        let currentItem = itemMap.get(googleId);
        if (!currentItem)
            return "";
        let parentId = currentItem.parentId;
        let iterations = 0;
        const MAX_ITERATIONS = 100;
        while (parentId && iterations < MAX_ITERATIONS) {
            const parent = itemMap.get(parentId);
            if (!parent)
                break;
            pathParts.unshift(parent.name);
            parentId = parent.parentId;
            iterations++;
        }
        return pathParts.join('/*/');
    }
    async findAll(driveId = '0AKQL50NKsue5Uk9PVA') {
        try {
            const files = await this.prisma.driveItem.findMany({ include: { permissions: true } });
            const tree = this.buildTree(files, driveId);
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
            .filter((item) => item.parentId === parentId)
            .map((item) => ({
            ...item,
            children: this.buildTree(items, item.googleId),
        }));
    }
    async count() {
        try {
            const count = await this.prisma.driveItem.count();
            return count;
        }
        catch (error) {
            this._ErrorlogService.logError('count', error);
            throw error;
        }
    }
    async findby(param) {
        try {
            const driveItem = await this.prisma.driveItem.findUnique({
                where: param,
            });
            return driveItem;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const driveItem = await this.prisma.driveItem.findUnique({
                where: { id },
            });
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
        console.log('id', id);
        try {
            return this.prisma.permissionDrive.delete({ where: { id } });
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