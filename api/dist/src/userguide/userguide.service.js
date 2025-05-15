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
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let UserguideService = class UserguideService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    handleError(method, error) {
        this._ErrorlogService.logError(method, error);
        throw error;
    }
    async getLastUpdatedUserguide() {
        try {
            const lastUpdated = await this.prisma.userguidStep.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this.handleError('getLastUpdatedUserguide', error);
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
            this.handleError('generateCodeId', error);
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.userguidStep.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const masp = await this.generateCodeId();
            const created = await this.prisma.userguidStep.create({
                data: {
                    ...data,
                    order: newOrder,
                    masp: masp,
                },
            });
            this._SocketGateway.sendUpdate('userguides');
            return created;
        }
        catch (error) {
            this.handleError('createUserguide', error);
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
                }),
                this.prisma.userguidStep.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.handleError('findByUserguide', error);
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
                }),
                this.prisma.userguidStep.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.handleError('findAllUserguide', error);
        }
    }
    async findOne(id) {
        try {
            const userguide = await this.prisma.userguidStep.findUnique({ where: { id } });
            if (!userguide)
                throw new common_1.NotFoundException('Userguide not found');
            return userguide;
        }
        catch (error) {
            this.handleError('findOneUserguide', error);
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.userguidStep.update({ where: { id }, data: rest });
                updated = await this.prisma.userguidStep.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.userguidStep.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('userguides');
            return updated;
        }
        catch (error) {
            this.handleError('updateUserguide', error);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.userguidStep.delete({ where: { id } });
            this._SocketGateway.sendUpdate('userguides');
            return deleted;
        }
        catch (error) {
            this.handleError('removeUserguide', error);
        }
    }
    async reorderUserguides(userguideIds) {
        try {
            for (let i = 0; i < userguideIds.length; i++) {
                await this.prisma.userguidStep.update({
                    where: { id: userguideIds[i] },
                    data: { order: i + 1 },
                });
            }
            this._SocketGateway.sendUpdate('userguides');
            return { status: 'success' };
        }
        catch (error) {
            this.handleError('reorderUserguides', error);
        }
    }
};
exports.UserguideService = UserguideService;
exports.UserguideService = UserguideService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], UserguideService);
//# sourceMappingURL=userguide.service.js.map