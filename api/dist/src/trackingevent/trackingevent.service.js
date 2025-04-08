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
exports.TrackingEventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let TrackingEventService = class TrackingEventService {
    constructor(prisma, socketGateway, errorLogService) {
        this.prisma = prisma;
        this.socketGateway = socketGateway;
        this.errorLogService = errorLogService;
    }
    async logEvent(data) {
        try {
            return await this.prisma.trackingEvent.create({
                data: {
                    affiliateLink: { connect: { id: data.affiliateLinkId } },
                    type: data.type,
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    triggeredByUser: data.triggeredByUserId ? { connect: { id: data.triggeredByUserId } } : undefined,
                },
            });
        }
        catch (error) {
            console.error("Error logging tracking event:", error);
            return null;
        }
    }
    async getEventsByLink(linkId, type) {
        return this.prisma.trackingEvent.findMany({
            where: { affiliateLinkId: linkId, type: type },
            orderBy: { timestamp: 'desc' }
        });
    }
    async emitUpdateEvent() {
        this.socketGateway.sendTrackingEventUpdate();
    }
    async create(data) {
        try {
            const newTrackingEvent = await this.prisma.trackingEvent.create({ data });
            await this.emitUpdateEvent();
            return newTrackingEvent;
        }
        catch (error) {
            this.errorLogService.logError('createTrackingEvent', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.trackingEvent.findMany();
        }
        catch (error) {
            this.errorLogService.logError('findAll', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const trackingevent = await this.prisma.trackingEvent.findUnique({ where: param });
            if (!trackingevent)
                throw new common_1.NotFoundException('TrackingEvent not found');
            return trackingevent;
        }
        catch (error) {
            this.errorLogService.logError('findBy', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const trackingevent = await this.prisma.trackingEvent.findUnique({ where: { id } });
            if (!trackingevent)
                throw new common_1.NotFoundException('TrackingEvent not found');
            return trackingevent;
        }
        catch (error) {
            this.errorLogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const updatedTrackingEvent = await this.prisma.trackingEvent.update({
                where: { id },
                data,
            });
            await this.emitUpdateEvent();
            return updatedTrackingEvent;
        }
        catch (error) {
            this.errorLogService.logError('updateTrackingEvent', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deletedTrackingEvent = await this.prisma.trackingEvent.delete({
                where: { id }
            });
            await this.emitUpdateEvent();
            return deletedTrackingEvent;
        }
        catch (error) {
            this.errorLogService.logError('removeTrackingEvent', error);
            throw error;
        }
    }
};
exports.TrackingEventService = TrackingEventService;
exports.TrackingEventService = TrackingEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], TrackingEventService);
//# sourceMappingURL=trackingevent.service.js.map