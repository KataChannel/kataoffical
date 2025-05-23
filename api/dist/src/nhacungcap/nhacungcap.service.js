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
exports.NhacungcapService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const prisma_service_1 = require("../../prisma/prisma.service");
const importdata_service_1 = require("../importdata/importdata.service");
let NhacungcapService = class NhacungcapService {
    constructor(prisma, _ImportdataService) {
        this.prisma = prisma;
        this._ImportdataService = _ImportdataService;
    }
    async generateMancc() {
        try {
            const latest = await this.prisma.nhacungcap.findFirst({
                orderBy: { mancc: 'desc' },
            });
            let nextNumber = 1;
            if (latest) {
                const match = latest.mancc.match(/TG-NCC(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `TG-NCC${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi tạo mã nhà cung cấp');
        }
    }
    async create(data) {
        try {
            if (data.mancc && data.mancc.trim() !== '') {
                const existing = await this.prisma.nhacungcap.findUnique({
                    where: { mancc: data.mancc },
                });
                if (existing) {
                    throw new common_1.BadRequestException('Mã nhà cung cấp đã tồn tại');
                }
            }
            const mancc = data.mancc && data.mancc.trim() !== ''
                ? data.mancc
                : await this.generateMancc();
            const { Sanpham, ...rest } = data;
            const result = await this.prisma.nhacungcap.create({
                data: {
                    mancc,
                    ...rest,
                    Sanpham: {
                        connect: Sanpham?.map((sp) => ({ id: sp.id })) || [],
                    },
                },
            });
            return result;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            await this._ImportdataService.create({
                caseDetail: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                    additionalInfo: 'Error during import process',
                },
                order: 1,
                createdBy: 'system',
                title: `Import Nhà Cung Cấp Lỗi Tạo Nhà Cung Cấp ${moment().format('HH:mm:ss DD/MM/YYYY')} `,
                type: 'nhacungcap',
            });
            throw new common_1.InternalServerErrorException('Lỗi khi tạo nhà cung cấp');
        }
    }
    async import(data) {
        try {
            for (const supplier of data) {
                if (!supplier.mancc) {
                    await this.create(supplier);
                }
                else {
                    const existingSupplier = await this.prisma.nhacungcap.findFirst({
                        where: { mancc: supplier.mancc },
                        select: { id: true },
                    });
                    if (existingSupplier) {
                        await this.update(existingSupplier.id, supplier);
                    }
                    else {
                        await this.create(supplier);
                    }
                }
            }
            return { message: 'Import completed' };
        }
        catch (error) {
            await this._ImportdataService.create({
                caseDetail: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                    additionalInfo: 'Error during import process',
                },
                order: 1,
                createdBy: 'system',
                title: `Import Nhà Cung Cấp ${moment().format('HH:mm:ss DD/MM/YYYY')} `,
                type: 'nhacungcap',
            });
            throw new common_1.InternalServerErrorException('Lỗi khi nhập khẩu nhà cung cấp');
        }
    }
    async findAll() {
        try {
            return await this.prisma.nhacungcap.findMany({
                include: {
                    Sanpham: true,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi lấy danh sách nhà cung cấp');
        }
    }
    async findOne(id) {
        try {
            const nhacungcap = await this.prisma.nhacungcap.findUnique({
                where: { id },
                include: {
                    Sanpham: true,
                },
            });
            if (!nhacungcap)
                throw new common_1.NotFoundException('Nhacungcap not found');
            return nhacungcap;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Lỗi khi lấy nhà cung cấp');
        }
    }
    async update(id, data) {
        try {
            const { Sanpham, ...rest } = data;
            const updatedNhacc = await this.prisma.nhacungcap.update({
                where: { id },
                data: {
                    ...rest,
                    Sanpham: {
                        set: Sanpham?.map((sp) => ({ id: sp.id })) || [],
                    },
                },
            });
            return updatedNhacc;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi cập nhật nhà cung cấp');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.nhacungcap.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi xóa nhà cung cấp');
        }
    }
    async findByProductIds(productIds) {
        try {
            if (!productIds || productIds.length === 0) {
                return [];
            }
            const suppliers = await this.prisma.nhacungcap.findMany({
                where: {
                    Sanpham: {
                        some: {
                            id: { in: productIds }
                        }
                    }
                },
                include: {
                    Sanpham: true,
                },
            });
            return suppliers;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi tìm nhà cung cấp theo sản phẩm');
        }
    }
};
exports.NhacungcapService = NhacungcapService;
exports.NhacungcapService = NhacungcapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        importdata_service_1.ImportdataService])
], NhacungcapService);
//# sourceMappingURL=nhacungcap.service.js.map