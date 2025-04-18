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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliatelinkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("src/errorlog/errorlog.service");
const socket_gateway_1 = require("../../src/socket.gateway");
let AffiliatelinkService = class AffiliatelinkService {
    constructor(prisma, socketGateway, errorLogService) {
        this.prisma = prisma;
        this.socketGateway = socketGateway;
        this.errorLogService = errorLogService;
    }
    async emitUpdateEvent() {
        const lastUpdate = await this.getLastUpdatedAffiliatelink();
        this.socketGateway.sendAffiliatelinkUpdate();
    }
    async getLastUpdatedAffiliatelink() {
        try {
            const lastUpdated = await this.prisma.affiliatelink.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this.errorLogService.logError('getLastUpdatedAffiliatelink', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.affiliatelink.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest?.codeId) {
                const match = latest.codeId.match(/AFFILIATELINK(\d+)/);
                if (match)
                    nextNumber = parseInt(match[1]) + 1;
            }
            return `AFFILIATELINK${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this.errorLogService.logError('generateCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.affiliatelink.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const newAffiliatelink = await this.prisma.affiliatelink.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId,
                },
            });
            await this.emitUpdateEvent();
            return newAffiliatelink;
        }
        catch (error) {
            this.errorLogService.logError('createAffiliatelink', error);
            throw error;
        }
    }
    async reorderAffiliatelinks(affiliatelinkIds) {
        try {
            await this.prisma.$transaction(affiliatelinkIds.map((id, index) => this.prisma.affiliatelink.update({
                where: { id },
                data: { order: index + 1 },
            })));
            await this.emitUpdateEvent();
        }
        catch (error) {
            this.errorLogService.logError('reorderAffiliatelinks', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.affiliatelink.findMany({
                orderBy: { order: 'asc' },
            });
        }
        catch (error) {
            this.errorLogService.logError('findAll', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const affiliatelink = await this.prisma.affiliatelink.findUnique({ where: param });
            if (!affiliatelink)
                throw new common_1.NotFoundException('Affiliatelink not found');
            return affiliatelink;
        }
        catch (error) {
            this.errorLogService.logError('findBy', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const affiliatelink = await this.prisma.affiliatelink.findUnique({ where: { id } });
            if (!affiliatelink)
                throw new common_1.NotFoundException('Affiliatelink not found');
            return affiliatelink;
        }
        catch (error) {
            this.errorLogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const updatedAffiliatelink = await this.prisma.affiliatelink.update({
                where: { id },
                data,
            });
            await this.emitUpdateEvent();
            return updatedAffiliatelink;
        }
        catch (error) {
            this.errorLogService.logError('updateAffiliatelink', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deletedAffiliatelink = await this.prisma.affiliatelink.delete({
                where: { id }
            });
            await this.emitUpdateEvent();
            return deletedAffiliatelink;
        }
        catch (error) {
            this.errorLogService.logError('removeAffiliatelink', error);
            throw error;
        }
    }
};
exports.AffiliatelinkService = AffiliatelinkService;
exports.AffiliatelinkService = AffiliatelinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway, typeof (_a = typeof errorlog_service_1.ErrorlogService !== "undefined" && errorlog_service_1.ErrorlogService) === "function" ? _a : Object])
], AffiliatelinkService);
//# sourceMappingURL=affiliatelink.service.js.map