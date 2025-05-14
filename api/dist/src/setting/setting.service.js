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
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("./socket.gateway");
let SettingService = class SettingService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedSetting() {
        try {
            const lastUpdated = await this.prisma.setting.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedSetting', error);
            throw new common_1.InternalServerErrorException({
                message: 'Không thể lấy thông tin cập nhật cuối cùng',
                error: error?.message || error,
            });
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.setting.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest) {
                const match = latest.codeId?.match(/I1(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `ST${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generate codeId', error);
            throw new common_1.InternalServerErrorException({
                message: 'Không thể sinh mã codeId',
                error: error?.message || error,
            });
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
            this._SocketGateway.sendSettingUpdate();
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createSetting', error);
            throw new common_1.BadRequestException({
                message: 'Tạo mới setting thất bại',
                error: error?.message || error,
            });
        }
    }
    async findBy(param) {
        try {
            const { page = 1, limit = 20, ...where } = param;
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.setting.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.setting.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findBy', error);
            throw new common_1.InternalServerErrorException({
                message: 'Không thể lấy danh sách setting',
                error: error?.message || error,
            });
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.setting.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.setting.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw new common_1.InternalServerErrorException({
                message: 'Không thể lấy tất cả setting',
                error: error?.message || error,
            });
        }
    }
    async findOne(id) {
        try {
            const setting = await this.prisma.setting.findUnique({ where: { id } });
            if (!setting)
                throw new common_1.NotFoundException('Setting not found');
            return setting;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException({
                message: 'Không thể lấy setting',
                error: error?.message || error,
            });
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
            this._SocketGateway.sendSettingUpdate();
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateSetting', error);
            throw new common_1.BadRequestException({
                message: 'Cập nhật setting thất bại',
                error: error?.message || error,
            });
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.setting.delete({ where: { id } });
            this._SocketGateway.sendSettingUpdate();
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeSetting', error);
            throw new common_1.BadRequestException({
                message: 'Xóa setting thất bại',
                error: error?.message || error,
            });
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
            this._SocketGateway.sendSettingUpdate();
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderSettings', error);
            throw new common_1.BadRequestException({
                message: 'Sắp xếp lại setting thất bại',
                error: error?.message || error,
            });
        }
    }
};
exports.SettingService = SettingService;
exports.SettingService = SettingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], SettingService);
//# sourceMappingURL=setting.service.js.map