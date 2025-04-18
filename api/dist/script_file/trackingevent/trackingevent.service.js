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
exports.TrackingeventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("src/errorlog/errorlog.service");
const socket_gateway_1 = require("../../src/socket.gateway");
let TrackingeventService = class TrackingeventService {
    constructor(prisma, socketGateway, errorLogService) {
        this.prisma = prisma;
        this.socketGateway = socketGateway;
        this.errorLogService = errorLogService;
    }
    async emitUpdateEvent() {
        const lastUpdate = await this.getLastUpdatedTrackingevent();
        this.socketGateway.sendTrackingeventUpdate();
    }
    async getLastUpdatedTrackingevent() {
        try {
            const lastUpdated = await this.prisma.trackingevent.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this.errorLogService.logError('getLastUpdatedTrackingevent', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.trackingevent.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest?.codeId) {
                const match = latest.codeId.match(/TRACKINGEVENT(\d+)/);
                if (match)
                    nextNumber = parseInt(match[1]) + 1;
            }
            return `TRACKINGEVENT${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this.errorLogService.logError('generateCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.trackingevent.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const newTrackingevent = await this.prisma.trackingevent.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId,
                },
            });
            await this.emitUpdateEvent();
            return newTrackingevent;
        }
        catch (error) {
            this.errorLogService.logError('createTrackingevent', error);
            throw error;
        }
    }
    async reorderTrackingevents(trackingeventIds) {
        try {
            await this.prisma.$transaction(trackingeventIds.map((id, index) => this.prisma.trackingevent.update({
                where: { id },
                data: { order: index + 1 },
            })));
            await this.emitUpdateEvent();
        }
        catch (error) {
            this.errorLogService.logError('reorderTrackingevents', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.trackingevent.findMany({
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
            const trackingevent = await this.prisma.trackingevent.findUnique({ where: param });
            if (!trackingevent)
                throw new common_1.NotFoundException('Trackingevent not found');
            return trackingevent;
        }
        catch (error) {
            this.errorLogService.logError('findBy', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const trackingevent = await this.prisma.trackingevent.findUnique({ where: { id } });
            if (!trackingevent)
                throw new common_1.NotFoundException('Trackingevent not found');
            return trackingevent;
        }
        catch (error) {
            this.errorLogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const updatedTrackingevent = await this.prisma.trackingevent.update({
                where: { id },
                data,
            });
            await this.emitUpdateEvent();
            return updatedTrackingevent;
        }
        catch (error) {
            this.errorLogService.logError('updateTrackingevent', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deletedTrackingevent = await this.prisma.trackingevent.delete({
                where: { id }
            });
            await this.emitUpdateEvent();
            return deletedTrackingevent;
        }
        catch (error) {
            this.errorLogService.logError('removeTrackingevent', error);
            throw error;
        }
    }
};
exports.TrackingeventService = TrackingeventService;
exports.TrackingeventService = TrackingeventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway, typeof (_a = typeof errorlog_service_1.ErrorlogService !== "undefined" && errorlog_service_1.ErrorlogService) === "function" ? _a : Object])
], TrackingeventService);
//# sourceMappingURL=trackingevent.service.js.map