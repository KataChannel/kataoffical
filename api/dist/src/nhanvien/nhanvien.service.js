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
exports.NhanvienService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NhanvienService = class NhanvienService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const existing = await this.prisma.nhanvien.findUnique({
                where: { manv: data.manv }
            });
            if (existing) {
                throw new common_1.HttpException('Mã nhân viên đã tồn tại', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.prisma.nhanvien.create({ data });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Tạo nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query) {
        try {
            const where = {};
            if (query?.isActive !== undefined) {
                where.isActive = query.isActive === 'true';
            }
            if (query?.search) {
                where.OR = [
                    { tennv: { contains: query.search, mode: 'insensitive' } },
                    { manv: { contains: query.search, mode: 'insensitive' } },
                    { sdtnv: { contains: query.search, mode: 'insensitive' } },
                    { emailnv: { contains: query.search, mode: 'insensitive' } },
                ];
            }
            return await this.prisma.nhanvien.findMany({
                where,
                orderBy: { tennv: 'asc' },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Lấy danh sách nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllForSelect() {
        try {
            return await this.prisma.nhanvien.findMany({
                where: { isActive: true },
                select: {
                    id: true,
                    manv: true,
                    tennv: true,
                },
                orderBy: { tennv: 'asc' },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Lấy danh sách nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const nhanvien = await this.prisma.nhanvien.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            donhangChiahang: true,
                            donhangShipper: true,
                        },
                    },
                },
            });
            if (!nhanvien) {
                throw new common_1.HttpException('Không tìm thấy nhân viên', common_1.HttpStatus.NOT_FOUND);
            }
            return nhanvien;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Lấy thông tin nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByManv(manv) {
        try {
            const nhanvien = await this.prisma.nhanvien.findUnique({
                where: { manv },
            });
            if (!nhanvien) {
                throw new common_1.HttpException('Không tìm thấy nhân viên', common_1.HttpStatus.NOT_FOUND);
            }
            return nhanvien;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Lấy thông tin nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchfield(searchParams) {
        try {
            const where = {};
            Object.keys(searchParams).forEach((key) => {
                if (searchParams[key] !== undefined && searchParams[key] !== null) {
                    where[key] = searchParams[key];
                }
            });
            const nhanvien = await this.prisma.nhanvien.findFirst({ where });
            if (!nhanvien) {
                throw new common_1.HttpException('Không tìm thấy nhân viên', common_1.HttpStatus.NOT_FOUND);
            }
            return nhanvien;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Tìm kiếm nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            await this.findOne(id);
            if (data.manv) {
                const existing = await this.prisma.nhanvien.findUnique({
                    where: { manv: data.manv },
                });
                if (existing && existing.id !== id) {
                    throw new common_1.HttpException('Mã nhân viên đã tồn tại', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            return await this.prisma.nhanvien.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Cập nhật nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const nhanvien = await this.findOne(id);
            const donhangCount = await this.prisma.donhang.count({
                where: {
                    OR: [
                        { nhanvienchiahangId: id },
                        { shipperId: id },
                    ],
                },
            });
            if (donhangCount > 0) {
                throw new common_1.HttpException('Không thể xóa nhân viên đang được sử dụng trong đơn hàng', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.prisma.nhanvien.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Xóa nhân viên thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async import(data) {
        const results = {
            success: 0,
            failed: 0,
            errors: [],
        };
        for (const item of data) {
            try {
                const existing = await this.prisma.nhanvien.findUnique({
                    where: { manv: item.manv },
                });
                if (existing) {
                    await this.prisma.nhanvien.update({
                        where: { manv: item.manv },
                        data: {
                            tennv: item.tennv,
                            sdtnv: item.sdtnv,
                            ngaysinhnv: item.ngaysinhnv ? new Date(item.ngaysinhnv) : undefined,
                            emailnv: item.emailnv,
                            diachinv: item.diachinv,
                            hinhccnv: item.hinhccnv,
                            isActive: item.isActive !== undefined ? item.isActive : true,
                        },
                    });
                }
                else {
                    await this.prisma.nhanvien.create({
                        data: {
                            manv: item.manv,
                            tennv: item.tennv,
                            sdtnv: item.sdtnv,
                            ngaysinhnv: item.ngaysinhnv ? new Date(item.ngaysinhnv) : undefined,
                            emailnv: item.emailnv,
                            diachinv: item.diachinv,
                            hinhccnv: item.hinhccnv,
                            isActive: item.isActive !== undefined ? item.isActive : true,
                        },
                    });
                }
                results.success++;
            }
            catch (error) {
                results.failed++;
                results.errors.push({
                    manv: item.manv,
                    error: error.message,
                });
            }
        }
        return results;
    }
    async getLastUpdated() {
        try {
            const lastNhanvien = await this.prisma.nhanvien.findFirst({
                orderBy: { updatedAt: 'desc' },
                select: { updatedAt: true },
            });
            return {
                lastUpdated: lastNhanvien?.updatedAt || new Date(),
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Lấy thông tin cập nhật thất bại', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.NhanvienService = NhanvienService;
exports.NhanvienService = NhanvienService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NhanvienService);
//# sourceMappingURL=nhanvien.service.js.map