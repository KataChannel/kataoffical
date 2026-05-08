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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("./socket.gateway");
const errorlogs_service_1 = require("../errorlogs/errorlogs.service");
let PermissionService = class PermissionService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedPermission() {
        try {
            const lastUpdated = await this.prisma.permission.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedPermission', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.permission.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const match = latest.codeId.match(/PEM(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `PEM${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateCodeIdForPermission', error);
            throw error;
        }
    }
    async updateCodeIds() {
        try {
            const permissions = await this.prisma.permission.findMany({
                orderBy: { order: 'asc' },
            });
            for (let i = 0; i < permissions.length; i++) {
                const newCodeId = `PEM${(i + 1).toString().padStart(5, '0')}`;
                if (permissions[i].codeId !== newCodeId) {
                    await this.prisma.permission.update({
                        where: { id: permissions[i].id },
                        data: { codeId: newCodeId },
                    });
                }
            }
            this._SocketGateway.sendPermissionUpdate();
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('updateCodeIds', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.permission.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.permission.create({
                data: {
                    ...data,
                    codeId: codeId
                },
            });
            return created;
        }
        catch (error) {
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.permission.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.permission.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.permission.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByPermission', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.permission.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.permission.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllPermission', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.permission.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Permission not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOnePermission', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.permission.update({ where: { id }, data: rest });
                updated = await this.prisma.permission.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.permission.update({ where: { id }, data });
            }
            this._SocketGateway.sendPermissionUpdate();
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updatePermission', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.permission.delete({ where: { id } });
            this._SocketGateway.sendPermissionUpdate();
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removePermission', error);
            throw error;
        }
    }
    async reorderPermissions(permissionIds) {
        try {
            for (let i = 0; i < permissionIds.length; i++) {
                await this.prisma.permission.update({
                    where: { id: permissionIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendPermissionUpdate();
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderPermissions', error);
            throw error;
        }
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlogs_service_1.ErrorlogsService])
], PermissionService);
//# sourceMappingURL=permission.service.js.map