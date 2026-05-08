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
exports.UserguideService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("./socket.gateway");
const errorlogs_service_1 = require("../errorlogs/errorlogs.service");
let UserguideService = class UserguideService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedUserguide() {
        try {
            const lastUpdated = await this.prisma.userguidStep.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedUserguide', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.userguidStep.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const match = latest.codeId.match(/I1(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `I1${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.userguidStep.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.userguidStep.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendUserguideUpdate();
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createUserguide', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { page = 1, limit = 20, ...where } = param;
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.userguidStep.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: { UserguidBlocks: true },
                }),
                this.prisma.userguidStep.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByUserguide', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.userguidStep.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: { UserguidBlocks: true },
                }),
                this.prisma.userguidStep.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllUserguide', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.userguidStep.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Userguide not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOneUserguide', error);
            throw error;
        }
    }
    async update(id, data) {
        console.log('update data', data);
        try {
            const { UserguidBlocks, ...rest } = data;
            const updatedUserguide = await this.prisma.userguidStep.update({
                where: { id },
                data: {
                    ...rest,
                },
            });
            if (UserguidBlocks && Array.isArray(UserguidBlocks)) {
                const existingBlocks = await this.prisma.userguidBlock.findMany({
                    where: { stepId: id },
                    select: { id: true }
                });
                const incomingBlockIds = UserguidBlocks.filter(block => block.id).map(block => block.id);
                const blocksToDelete = existingBlocks.filter(existing => !incomingBlockIds.includes(existing.id));
                if (blocksToDelete.length > 0) {
                    await this.prisma.userguidBlock.deleteMany({
                        where: {
                            id: { in: blocksToDelete.map(block => block.id) }
                        }
                    });
                }
                await Promise.all(UserguidBlocks.map(async (block) => {
                    if (block.id) {
                        await this.prisma.userguidBlock.update({
                            where: { id: block.id },
                            data: block,
                        });
                    }
                    else {
                        await this.prisma.userguidBlock.create({
                            data: { ...block, stepId: id },
                        });
                    }
                }));
            }
            this._SocketGateway.sendUserguideUpdate();
            return updatedUserguide;
        }
        catch (error) {
            console.log('Error updating userguide:', error);
            this._ErrorlogService.logError('updateUserguide', error);
            throw new common_1.InternalServerErrorException('Lỗi khi cập nhật userguide', { cause: error });
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.userguidStep.delete({ where: { id } });
            this._SocketGateway.sendUserguideUpdate();
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeUserguide', error);
            throw error;
        }
    }
    async reorderUserguides(userguideIds) {
        try {
            for (let i = 0; i < userguideIds.length; i++) {
                await this.prisma.userguidStep.update({
                    where: { id: userguideIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUserguideUpdate();
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderUserguides', error);
            throw error;
        }
    }
};
exports.UserguideService = UserguideService;
exports.UserguideService = UserguideService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlogs_service_1.ErrorlogsService])
], UserguideService);
//# sourceMappingURL=userguide.service.js.map