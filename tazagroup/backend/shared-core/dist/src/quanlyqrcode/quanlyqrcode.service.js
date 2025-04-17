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
exports.QuanlyqrcodeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
let QuanlyqrcodeService = class QuanlyqrcodeService {
    constructor(prisma, _ErrorlogService) {
        this.prisma = prisma;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedquanlyqrcode() {
        try {
            const lastUpdated = await this.prisma.quanlyqrcode.aggregate({
                _max: {
                    updatedAt: true,
                },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedquanlyqrcode', error);
            throw error;
        }
    }
    async create(data) {
        try {
            return this.prisma.quanlyqrcode.create({ data });
        }
        catch (error) {
            this._ErrorlogService.logError('createquanlyqrcode', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.quanlyqrcode.findMany();
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw error;
        }
    }
    async findby(param) {
        console.log('findby', param);
        try {
            const quanlyqrcode = await this.prisma.quanlyqrcode.findUnique({ where: param });
            return quanlyqrcode;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const quanlyqrcode = await this.prisma.quanlyqrcode.findUnique({ where: { id } });
            if (!quanlyqrcode)
                throw new common_1.NotFoundException('quanlyqrcode not found');
            return quanlyqrcode;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            return this.prisma.quanlyqrcode.update({ where: { id }, data });
        }
        catch (error) {
            this._ErrorlogService.logError('updatequanlyqrcode', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            return this.prisma.quanlyqrcode.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removequanlyqrcode', error);
            throw error;
        }
    }
};
exports.QuanlyqrcodeService = QuanlyqrcodeService;
exports.QuanlyqrcodeService = QuanlyqrcodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        errorlog_service_1.ErrorlogService])
], QuanlyqrcodeService);
//# sourceMappingURL=quanlyqrcode.service.js.map