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
exports.affiliateLinkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let affiliateLinkService = class affiliateLinkService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedaffiliateLink() {
        try {
            const lastUpdated = await this.prisma.affiliateLink.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedaffiliateLink', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.affiliateLink.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'AL';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'AL';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateaffiliateLinkCodeId', error);
            throw error;
        }
    }
    async create(data, user) {
        try {
            const maxOrder = await this.prisma.affiliateLink.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            console.log('Generated Code ID:', codeId);
            if (data.landingPageId) {
                const landingPage = await this.prisma.landingPage.findUnique({
                    where: { id: data.landingPageId },
                });
                if (!landingPage) {
                    throw new common_1.NotFoundException('landingPageId does not exist');
                }
            }
            const created = await this.prisma.affiliateLink.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId,
                    createdById: user.id,
                },
            });
            this._SocketGateway.sendAffiliatelinkUpdate();
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createaffiliateLink', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.affiliateLink.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                    include: { landingPage: true, trackingEvents: true },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.affiliateLink.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.affiliateLink.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByaffiliateLink', error);
            throw error;
        }
    }
    async findAll(query) {
        try {
            const { page = 1, pageSize = 20, ...filters } = query;
            const pageInt = parseInt(page, 10) || 1;
            const pageSizeInt = parseInt(pageSize, 10) || 20;
            const skip = (pageInt - 1) * pageSizeInt;
            console.log(filters);
            const [data, total] = await Promise.all([
                this.prisma.affiliateLink.findMany({
                    skip,
                    take: pageSizeInt,
                    orderBy: { order: 'asc' },
                    include: { landingPage: true, trackingEvents: true },
                    where: { ...filters },
                }),
                this.prisma.affiliateLink.count({ where: { ...filters } }),
            ]);
            return {
                data,
                total,
                page: pageInt,
                pageCount: Math.ceil(total / pageSizeInt),
                pageSize: pageSizeInt
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllaffiliateLink', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.affiliateLink.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('affiliateLink not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOneaffiliateLink', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.affiliateLink.update({ where: { id }, data: rest });
                updated = await this.prisma.affiliateLink.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.affiliateLink.update({ where: { id }, data });
            }
            this._SocketGateway.sendAffiliatelinkUpdate();
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateaffiliateLink', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.affiliateLink.delete({ where: { id } });
            this._SocketGateway.sendAffiliatelinkUpdate();
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeaffiliateLink', error);
            throw error;
        }
    }
    async reorderaffiliateLinks(affiliateLinkIds) {
        try {
            for (let i = 0; i < affiliateLinkIds.length; i++) {
                await this.prisma.affiliateLink.update({
                    where: { id: affiliateLinkIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendAffiliatelinkUpdate();
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderaffiliatelink', error);
            throw error;
        }
    }
};
exports.affiliateLinkService = affiliateLinkService;
exports.affiliateLinkService = affiliateLinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], affiliateLinkService);
//# sourceMappingURL=affiliatelink.service.js.map