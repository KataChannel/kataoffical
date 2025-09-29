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
exports.landingPageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let landingPageService = class landingPageService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedlandingPage() {
        try {
            const lastUpdated = await this.prisma.landingPage.aggregate({
                _max: {
                    updatedAt: true,
                },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedlandingPage', error);
            throw error;
        }
    }
    async generatecodeId() {
        try {
            const landingPages = await this.prisma.landingPage.findMany({
                select: { codeId: true },
                where: {
                    codeId: {
                        startsWith: 'LDP',
                    },
                },
            });
            let maxNumber = 0;
            for (const lp of landingPages) {
                const match = lp.codeId?.match(/^LDP(\d{5})$/);
                if (match) {
                    const num = parseInt(match[1], 10);
                    if (num > maxNumber)
                        maxNumber = num;
                }
            }
            const nextNumber = maxNumber + 1;
            return `LDP${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generatecodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            let newOrder;
            const maxOrder = await this.prisma.landingPage.aggregate({
                _max: { order: true },
            });
            newOrder = (maxOrder._max?.order || 0) + 1;
            this._SocketGateway.sendlandingPageUpdate();
            const codeId = await this.generatecodeId();
            data.contentJson = JSON.parse(data.contentJson || '{}');
            return this.prisma.landingPage.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId,
                },
            });
        }
        catch (error) {
            this._ErrorlogService.logError('createlandingPage', error);
            throw error;
        }
    }
    async reorderlandingPages(landingPageIds) {
        try {
            for (let i = 0; i < landingPageIds.length; i++) {
                await this.prisma.landingPage.update({
                    where: { id: landingPageIds[i] },
                    data: { order: i + 1 },
                });
            }
        }
        catch (error) {
            this._ErrorlogService.logError('reorderlandingPages', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.landingPage.findMany();
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (where.title) {
                where.title = {
                    contains: where.title,
                    mode: 'insensitive',
                };
            }
            if (isOne) {
                const result = await this.prisma.landingPage.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.landingPage.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.landingPage.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findBylandingPage', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const landingPage = await this.prisma.landingPage.findUnique({ where: { id } });
            if (!landingPage)
                throw new common_1.NotFoundException('landingPage not found');
            return landingPage;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            data.contentJson = JSON.parse(data.contentJson);
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.landingPage.update({ where: { id }, data: rest });
                await this.prisma.landingPage.update({ where: { id }, data: { order } });
            }
            this._SocketGateway.sendlandingPageUpdate();
            return this.prisma.landingPage.update({ where: { id }, data });
        }
        catch (error) {
            this._ErrorlogService.logError('updatelandingPage', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this._SocketGateway.sendlandingPageUpdate();
            return this.prisma.landingPage.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removelandingPage', error);
            throw error;
        }
    }
};
exports.landingPageService = landingPageService;
exports.landingPageService = landingPageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], landingPageService);
//# sourceMappingURL=landingpage.service.js.map