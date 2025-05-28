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
exports.TrackingeventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
let TrackingeventService = class TrackingeventService {
    constructor(prisma, errorLogService) {
        this.prisma = prisma;
        this.errorLogService = errorLogService;
    }
    async create(data, ipAddress, userAgent) {
        try {
            if (!data)
                throw new common_1.NotFoundException('Data not found');
            const payload = {
                ...data,
                ...(ipAddress && { ipAddress }),
                ...(userAgent && { userAgent }),
            };
            return await this.prisma.trackingEvent.create({ data: payload });
        }
        catch (error) {
            this.errorLogService.logError('createTrackingevent', error);
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
            if (param?.isCount) {
                const { isCount, ...whereParams } = param;
                const count = await this.prisma.trackingEvent.count({ where: whereParams });
                return { count };
            }
            const trackingevents = await this.prisma.trackingEvent.findMany({ where: param });
            return trackingevents;
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
            const updatedTrackingevent = await this.prisma.trackingEvent.update({
                where: { id },
                data,
            });
            return updatedTrackingevent;
        }
        catch (error) {
            this.errorLogService.logError('updateTrackingevent', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deletedTrackingevent = await this.prisma.trackingEvent.delete({
                where: { id }
            });
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
        errorlog_service_1.ErrorlogService])
], TrackingeventService);
//# sourceMappingURL=trackingevent.service.js.map