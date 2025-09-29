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
exports.DexuatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let DexuatService = class DexuatService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedDexuat() {
        try {
            const lastUpdated = await this.prisma.dexuat.aggregate({
                _max: {
                    updatedAt: true,
                },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedDexuat', error);
            throw error;
        }
    }
    async generatecodeId() {
        try {
            const latest = await this.prisma.dexuat.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest) {
                const match = latest.codeId.match(/DX(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `DX${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generatecodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            let newOrder;
            const maxOrder = await this.prisma.dexuat.aggregate({
                _max: { order: true },
            });
            newOrder = (maxOrder._max?.order || 0) + 1;
            this._SocketGateway.sendDexuatUpdate();
            const codeId = await this.generatecodeId();
            const { chitiet, ...dexuatData } = data;
            return this.prisma.dexuat.create({
                data: {
                    ...dexuatData,
                    order: newOrder,
                    codeId: codeId,
                    chitiet: chitiet && Array.isArray(chitiet) ? {
                        create: chitiet.map(({ id, dexuatId, ...rest }) => rest)
                    } : undefined
                },
                include: {
                    chitiet: true
                }
            });
        }
        catch (error) {
            this._ErrorlogService.logError('createDexuat', error);
            throw error;
        }
    }
    async reorderDexuats(dexuatIds) {
        try {
            for (let i = 0; i < dexuatIds.length; i++) {
                await this.prisma.dexuat.update({
                    where: { id: dexuatIds[i] },
                    data: { order: i + 1 },
                });
            }
        }
        catch (error) {
            this._ErrorlogService.logError('reorderDexuats', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.dexuat.findMany();
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw error;
        }
    }
    async findby(param) {
        try {
            const dexuat = await this.prisma.dexuat.findUnique({
                where: param,
                include: { chitiet: true }
            });
            if (!dexuat)
                throw new common_1.NotFoundException('Dexuat not found');
            return dexuat;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const dexuat = await this.prisma.dexuat.findUnique({ where: { id } });
            if (!dexuat)
                throw new common_1.NotFoundException('Dexuat not found');
            return dexuat;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const { chitiet, ...dexuatData } = data;
            const updatedDexuat = await this.prisma.dexuat.update({
                where: { id },
                data: {
                    ...dexuatData,
                    updatedAt: new Date(),
                },
            });
            if (chitiet?.length) {
                const existingIds = (await this.prisma.chitietDexuat.findMany({
                    where: { dexuatId: id },
                    select: { id: true },
                })).map(item => item.id);
                const payloadIds = chitiet.map(item => item.id).filter(Boolean);
                await this.prisma.chitietDexuat.deleteMany({
                    where: {
                        dexuatId: id,
                        id: { notIn: payloadIds }
                    },
                });
                await Promise.all(chitiet.map(item => {
                    const { id: itemId, ...itemData } = item;
                    return this.prisma.chitietDexuat.upsert({
                        where: { id: itemId || 'new-id' },
                        update: itemData,
                        create: { ...itemData, dexuatId: id },
                    });
                }));
            }
            this._SocketGateway.sendDexuatUpdate();
            return this.prisma.dexuat.findUnique({
                where: { id },
                include: { chitiet: true }
            });
        }
        catch (error) {
            this._ErrorlogService.logError('update', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this._SocketGateway.sendDexuatUpdate();
            return this.prisma.dexuat.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removeDexuat', error);
            throw error;
        }
    }
};
exports.DexuatService = DexuatService;
exports.DexuatService = DexuatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], DexuatService);
//# sourceMappingURL=dexuat.service.js.map