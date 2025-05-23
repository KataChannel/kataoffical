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
exports.ImportdataService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("./socket.gateway");
const errorlogs_service_1 = require("../errorlogs/errorlogs.service");
let ImportdataService = class ImportdataService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedImportdata() {
        try {
            const lastUpdated = await this.prisma.importHistory.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedImportdata', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.importHistory.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'IH';
                const match = latest.codeId.match(new RegExp(prefix + '(\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'IH';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateImportdataCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.importHistory.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.importHistory.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendImportdataUpdate();
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createImportdata', error);
            throw error;
        }
    }
    async findBy(param) {
        console.log('findByImportdata', param);
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.importHistory.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.importHistory.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.importHistory.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByImportdata', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.importHistory.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.importHistory.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllImportdata', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.importHistory.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Importdata not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOneImportdata', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.importHistory.update({ where: { id }, data: rest });
                updated = await this.prisma.importHistory.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.importHistory.update({ where: { id }, data });
            }
            this._SocketGateway.sendImportdataUpdate();
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateImportdata', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.importHistory.delete({ where: { id } });
            this._SocketGateway.sendImportdataUpdate();
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeImportdata', error);
            throw error;
        }
    }
    async reorderImportdatas(importdataIds) {
        try {
            for (let i = 0; i < importdataIds.length; i++) {
                await this.prisma.importHistory.update({
                    where: { id: importdataIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendImportdataUpdate();
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderImportdatas', error);
            throw error;
        }
    }
};
exports.ImportdataService = ImportdataService;
exports.ImportdataService = ImportdataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlogs_service_1.ErrorlogsService])
], ImportdataService);
//# sourceMappingURL=importdata.service.js.map