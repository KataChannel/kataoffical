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
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("../socket.gateway");
let SettingService = class SettingService {
    constructor(prisma, _SocketGateway) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
    }
    parseValue(value, type) {
        if (value === null)
            return null;
        switch (type) {
            case 'number':
                const num = Number(value);
                return isNaN(num) ? null : num;
            case 'boolean':
                return value === 'true' || value === '1';
            case 'json':
                try {
                    return JSON.parse(value);
                }
                catch (error) {
                    return null;
                }
            case 'string':
            default:
                return value;
        }
    }
    async getLastUpdatedSetting() {
        try {
            const lastUpdated = await this.prisma.setting.aggregate({
                _max: { updatedAt: true },
            });
            return {
                updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.setting.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'ST';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'ST';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.setting.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.setting.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId,
                },
            });
            this._SocketGateway.sendUpdate('setting');
            return {
                ...created,
                value: this.parseValue(created.value, created.type),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, pageSize = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.setting.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                if (!result)
                    return null;
                return {
                    ...result,
                    value: this.parseValue(result.value, result.type),
                };
            }
            const skip = (page - 1) * pageSize;
            const [data, total] = await Promise.all([
                this.prisma.setting.findMany({
                    where,
                    skip,
                    take: pageSize,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.setting.count({ where }),
            ]);
            return {
                data: data.map((setting) => ({
                    ...setting,
                    value: this.parseValue(setting.value, setting.type),
                })),
                total,
                page,
                pageCount: Math.ceil(total / pageSize),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(page = 1, pageSize = 20) {
        try {
            const skip = (page - 1) * pageSize;
            const [data, total] = await Promise.all([
                this.prisma.setting.findMany({
                    skip,
                    take: pageSize,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.setting.count(),
            ]);
            return {
                data: data.map((setting) => ({
                    ...setting,
                    value: this.parseValue(setting.value, setting.type),
                })),
                total,
                page,
                pageCount: Math.ceil(total / pageSize),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.setting.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Setting not found');
            return {
                ...item,
                value: this.parseValue(item.value, item.type),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.setting.update({ where: { id }, data: rest });
                updated = await this.prisma.setting.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.setting.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('setting');
            return {
                ...updated,
                value: this.parseValue(updated.value, updated.type),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.setting.delete({ where: { id } });
            this._SocketGateway.sendUpdate('setting');
            return {
                ...deleted,
                value: this.parseValue(deleted.value, deleted.type),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async reorderSettings(settingIds) {
        try {
            for (let i = 0; i < settingIds.length; i++) {
                await this.prisma.setting.update({
                    where: { id: settingIds[i] },
                    data: { order: i + 1 },
                });
            }
            this._SocketGateway.sendUpdate('setting');
            return { status: 'success' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.SettingService = SettingService;
exports.SettingService = SettingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], SettingService);
//# sourceMappingURL=setting.service.js.map