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
exports.leadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let leadService = class leadService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedlead() {
        try {
            const lastUpdated = await this.prisma.lead.aggregate({
                _max: {
                    updatedAt: true,
                },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedlead', error);
            throw error;
        }
    }
    async generateCode() {
        try {
            const latest = await this.prisma.lead.findFirst({
                orderBy: { code: 'desc' },
            });
            let nextNumber = 1;
            if (latest) {
                const match = latest.code ? latest.code.match(/I1(d+)/) : null;
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `TMN-L${nextNumber.toString().padStart(7, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateCode', error);
            throw error;
        }
    }
    async create(data) {
        try {
            let newOrder;
            const maxOrder = await this.prisma.lead.aggregate({
                _max: { order: true },
            });
            newOrder = (maxOrder._max?.order || 0) + 1;
            this._SocketGateway.sendleadUpdate();
            const code = data.code ? data.code : await this.generateCode();
            return this.prisma.lead.create({
                data: {
                    ...data,
                    order: newOrder,
                    code: code,
                },
            });
        }
        catch (error) {
            this._ErrorlogService.logError('createlead', error);
            throw error;
        }
    }
    async reorderleads(leadIds) {
        try {
            for (let i = 0; i < leadIds.length; i++) {
                await this.prisma.lead.update({
                    where: { id: leadIds[i] },
                    data: { order: i + 1 },
                });
            }
        }
        catch (error) {
            this._ErrorlogService.logError('reorderleads', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.lead.findMany();
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw error;
        }
    }
    async findby(param) {
        try {
            const lead = await this.prisma.lead.findUnique({ where: param });
            if (!lead)
                throw new common_1.NotFoundException('lead not found');
            return lead;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const lead = await this.prisma.lead.findUnique({ where: { id } });
            if (!lead)
                throw new common_1.NotFoundException('lead not found');
            return lead;
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
                await this.prisma.lead.update({ where: { id }, data: rest });
                await this.prisma.lead.update({ where: { id }, data: { order } });
            }
            this._SocketGateway.sendleadUpdate();
            return this.prisma.lead.update({ where: { id }, data });
        }
        catch (error) {
            this._ErrorlogService.logError('updatelead', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this._SocketGateway.sendleadUpdate();
            return this.prisma.lead.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removelead', error);
            throw error;
        }
    }
};
exports.leadService = leadService;
exports.leadService = leadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], leadService);
//# sourceMappingURL=lead.service.js.map