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
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const minio_service_1 = require("../minio/minio.service");
const socket_gateway_1 = require("../socket.gateway");
let ResourceService = class ResourceService {
    constructor(prisma, _SocketGateway, _ErrorlogService, _MinioService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
        this._MinioService = _MinioService;
    }
    async getLastUpdatedResource() {
        try {
            const lastUpdated = await this.prisma.resource.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedResource', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.resource.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const match = latest.codeId.match(/RS(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `RS${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.resource.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.resource.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendUpdate('resource');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createResource', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (where.title) {
                where.title = { contains: where.title, mode: 'insensitive' };
            }
            if (isOne) {
                const result = await this.prisma.resource.findFirst({
                    where: where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            else {
                const skip = (page - 1) * limit;
                const [data, total] = await Promise.all([
                    this.prisma.resource.findMany({
                        where,
                        skip,
                        take: limit,
                        orderBy: { order: 'asc' },
                    }),
                    this.prisma.resource.count({ where }),
                ]);
                return {
                    data,
                    total,
                    page,
                    pageCount: Math.ceil(total / limit)
                };
            }
        }
        catch (error) {
            this._ErrorlogService.logError('findByResource', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.resource.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.resource.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllResource', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.resource.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Resource not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOneResource', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.resource.update({ where: { id }, data: rest });
                updated = await this.prisma.resource.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.resource.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('resource');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateResource', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const resource = await this.prisma.resource.findUnique({ where: { id } });
            if (!resource)
                throw new common_1.NotFoundException('Resource not found');
            const fileDeleted = await this._MinioService.deleteFile(resource.id);
            if (!fileDeleted) {
                throw new Error('File deletion from Minio failed');
            }
            this._SocketGateway.sendUpdate('resource');
            return fileDeleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeResource', error);
            throw error;
        }
    }
    async reorderResources(resourceIds) {
        try {
            for (let i = 0; i < resourceIds.length; i++) {
                await this.prisma.resource.update({
                    where: { id: resourceIds[i] },
                    data: { order: i + 1 }
                });
            }
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderResources', error);
            throw error;
        }
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService,
        minio_service_1.MinioService])
], ResourceService);
//# sourceMappingURL=resource.service.js.map