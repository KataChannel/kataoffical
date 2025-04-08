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
exports.taskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let taskService = class taskService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async create(data) {
        try {
            this._SocketGateway.sendtaskUpdate();
            return this.prisma.task.create({ data });
        }
        catch (error) {
            this._ErrorlogService.logError('createtask', error);
            throw error;
        }
    }
    async findAll() {
        try {
            const tasks = await this.prisma.task.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    assignee: true,
                    comments: true,
                    user: true,
                    relatedUser: true,
                },
            });
            const result = tasks.map((task) => {
                const { user, assignee, relatedUser, ...rest } = task;
                return {
                    ...rest,
                    NguoitaoEmail: user?.email,
                    NguoitaoSDT: user?.SDT,
                    NguoinhanEmail: assignee?.email,
                    NguoinhanSDT: assignee?.SDT,
                    NguoilienquanEmail: relatedUser?.email,
                    NguoilienquanSDT: relatedUser?.SDT,
                };
            });
            return result;
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw error;
        }
    }
    async search(params) {
        try {
            const { filters, relations, orderBy, skip, take } = params;
            const where = filters ? { ...filters } : {};
            const include = relations ? { ...relations } : {};
            const orderByClause = orderBy ? { [orderBy.field]: orderBy.direction } : undefined;
            const tasks = await this.prisma.task.findMany({
                where,
                include,
                orderBy: orderByClause,
                skip: skip || 0,
                take: take || 10,
            });
            return tasks;
        }
        catch (error) {
            this._ErrorlogService.logError('searchtask', error);
            throw error;
        }
    }
    async findby(param) {
        try {
            const task = await this.prisma.task.findUnique({ where: param });
            if (!task)
                throw new common_1.NotFoundException('task not found');
            return task;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const task = await this.prisma.task.findUnique({ where: { id } });
            if (!task)
                throw new common_1.NotFoundException('task not found');
            return task;
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
                await this.prisma.task.update({ where: { id }, data: rest });
            }
            this._SocketGateway.sendtaskUpdate();
            return this.prisma.task.update({ where: { id }, data });
        }
        catch (error) {
            this._ErrorlogService.logError('updatetask', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this._SocketGateway.sendtaskUpdate();
            return this.prisma.task.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removetask', error);
            throw error;
        }
    }
};
exports.taskService = taskService;
exports.taskService = taskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], taskService);
//# sourceMappingURL=task.service.js.map