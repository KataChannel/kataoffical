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
            const latest = await this.prisma.landingPage.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest) {
                const match = latest.codeId.match(/LDP(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `LDP${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generatecodeId', error);
            throw error;
        }
    }
    async create(data) {
        console.log('data', data);
        try {
            let newOrder;
            const maxOrder = await this.prisma.landingPage.aggregate({
                _max: { order: true },
            });
            newOrder = (maxOrder._max?.order || 0) + 1;
            this._SocketGateway.sendlandingPageUpdate();
            const codeId = await this.generatecodeId();
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
    async findby(param) {
        try {
            const landingPage = await this.prisma.landingPage.findUnique({ where: param });
            if (!landingPage)
                throw new common_1.NotFoundException('landingPage not found');
            return landingPage;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
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