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
exports.fileManagerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const minio_service_1 = require("../minio/minio.service");
const socket_gateway_1 = require("../socket.gateway");
let fileManagerService = class fileManagerService {
    constructor(prisma, _SocketGateway, _ErrorlogService, _MinioService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
        this._MinioService = _MinioService;
    }
    async getLastUpdatedfileManager() {
        try {
            const lastUpdated = await this.prisma.fileManager.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedfileManager', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.fileManager.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'FILE';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'FILE';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generatefileManagerCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.fileManager.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.fileManager.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendUpdate('fileManager');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createfileManager', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.fileManager.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                console.log('Find by parameters:', param, 'Result:', result);
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.fileManager.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.fileManager.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByfileManager', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.fileManager.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.fileManager.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllfileManager', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.fileManager.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('fileManager not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOnefileManager', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.fileManager.update({ where: { id }, data: rest });
                updated = await this.prisma.fileManager.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.fileManager.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('fileManager');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updatefileManager', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const filemanager = await this.prisma.fileManager.findUnique({ where: { id } });
            console.log('File filemanager from Minio:', filemanager);
            if (!filemanager)
                throw new common_1.NotFoundException('Filemanager not found');
            const fileDeleted = await this._MinioService.deleteFile(filemanager.id);
            console.log('File deleted from Minio:', fileDeleted);
            if (!fileDeleted) {
                throw new Error('File deletion from Minio failed');
            }
            this._SocketGateway.sendUpdate('filemanager');
            return fileDeleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeFilemanager', error);
            throw error;
        }
    }
    async reorderfileManagers(fileManagerIds) {
        try {
            for (let i = 0; i < fileManagerIds.length; i++) {
                await this.prisma.fileManager.update({
                    where: { id: fileManagerIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('fileManager');
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderfileManagers', error);
            throw error;
        }
    }
};
exports.fileManagerService = fileManagerService;
exports.fileManagerService = fileManagerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService,
        minio_service_1.MinioService])
], fileManagerService);
//# sourceMappingURL=filemanager.service.js.map