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
exports.NhomkhachhangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NhomkhachhangService = class NhomkhachhangService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    transformNullToUndefined(data) {
        if (data === null)
            return undefined;
        if (Array.isArray(data)) {
            return data.map(item => this.transformNullToUndefined(item));
        }
        if (typeof data === 'object' && data !== null) {
            const transformed = {};
            for (const [key, value] of Object.entries(data)) {
                transformed[key] = this.transformNullToUndefined(value);
            }
            return transformed;
        }
        return data;
    }
    async createNhomkhachhang(input) {
        try {
            const existingNhom = await this.prisma.nhomkhachhang.findUnique({
                where: { name: input.name }
            });
            if (existingNhom) {
                throw new common_1.ConflictException(`Nhóm khách hàng với tên "${input.name}" đã tồn tại`);
            }
            const nhomkhachhang = await this.prisma.nhomkhachhang.create({
                data: input,
                include: {
                    khachhang: {
                        select: {
                            id: true,
                            name: true,
                            tenkh: true,
                            diachi: true,
                            sdt: true,
                            email: true,
                            isActive: true
                        }
                    }
                }
            });
            return this.transformNullToUndefined(nhomkhachhang);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Lỗi khi tạo nhóm khách hàng: ${error.message}`);
        }
    }
    async findAllNhomkhachhang(filter, pagination, sort) {
        const { page = 1, limit = 10 } = pagination || {};
        const skip = (page - 1) * limit;
        const { field = 'createdAt', direction = 'desc' } = sort || {};
        const where = {};
        if (filter) {
            if (filter.search) {
                where.OR = [
                    { name: { contains: filter.search, mode: 'insensitive' } },
                    { description: { contains: filter.search, mode: 'insensitive' } }
                ];
            }
            else {
                if (filter.name) {
                    where.name = { contains: filter.name, mode: 'insensitive' };
                }
                if (filter.description) {
                    where.description = { contains: filter.description, mode: 'insensitive' };
                }
            }
        }
        try {
            const [data, total] = await Promise.all([
                this.prisma.nhomkhachhang.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { [field]: direction },
                    include: {
                        khachhang: {
                            select: {
                                id: true,
                                name: true,
                                tenkh: true,
                                diachi: true,
                                sdt: true,
                                email: true,
                                isActive: true
                            }
                        }
                    }
                }),
                this.prisma.nhomkhachhang.count({ where })
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                data: this.transformNullToUndefined(data),
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Lỗi khi lấy danh sách nhóm khách hàng: ${error.message}`);
        }
    }
    async findOneNhomkhachhang(id) {
        try {
            const nhomkhachhang = await this.prisma.nhomkhachhang.findUnique({
                where: { id },
                include: {
                    khachhang: {
                        select: {
                            id: true,
                            name: true,
                            tenkh: true,
                            diachi: true,
                            sdt: true,
                            email: true,
                            isActive: true
                        }
                    }
                }
            });
            if (!nhomkhachhang) {
                throw new common_1.NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${id}`);
            }
            return this.transformNullToUndefined(nhomkhachhang);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Lỗi khi lấy nhóm khách hàng: ${error.message}`);
        }
    }
    async updateNhomkhachhang(id, input) {
        try {
            const existingNhom = await this.prisma.nhomkhachhang.findUnique({
                where: { id }
            });
            if (!existingNhom) {
                throw new common_1.NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${id}`);
            }
            if (input.name && input.name !== existingNhom.name) {
                const nameConflict = await this.prisma.nhomkhachhang.findUnique({
                    where: { name: input.name }
                });
                if (nameConflict) {
                    throw new common_1.ConflictException(`Nhóm khách hàng với tên "${input.name}" đã tồn tại`);
                }
            }
            const updatedNhom = await this.prisma.nhomkhachhang.update({
                where: { id },
                data: input,
                include: {
                    khachhang: {
                        select: {
                            id: true,
                            name: true,
                            tenkh: true,
                            diachi: true,
                            sdt: true,
                            email: true,
                            isActive: true
                        }
                    }
                }
            });
            return this.transformNullToUndefined(updatedNhom);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Lỗi khi cập nhật nhóm khách hàng: ${error.message}`);
        }
    }
    async removeNhomkhachhang(id) {
        try {
            const existingNhom = await this.prisma.nhomkhachhang.findUnique({
                where: { id },
                include: { khachhang: true }
            });
            if (!existingNhom) {
                throw new common_1.NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${id}`);
            }
            if (existingNhom.khachhang && existingNhom.khachhang.length > 0) {
                throw new common_1.BadRequestException(`Không thể xóa nhóm khách hàng vì còn ${existingNhom.khachhang.length} khách hàng trong nhóm. Vui lòng di chuyển khách hàng trước khi xóa.`);
            }
            await this.prisma.nhomkhachhang.delete({
                where: { id }
            });
            return true;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Lỗi khi xóa nhóm khách hàng: ${error.message}`);
        }
    }
    async addKhachhangToNhom(nhomId, khachhangIds) {
        try {
            const nhom = await this.prisma.nhomkhachhang.findUnique({
                where: { id: nhomId }
            });
            if (!nhom) {
                throw new common_1.NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${nhomId}`);
            }
            const khachhangCount = await this.prisma.khachhang.count({
                where: { id: { in: khachhangIds } }
            });
            if (khachhangCount !== khachhangIds.length) {
                throw new common_1.BadRequestException('Một hoặc nhiều khách hàng không tồn tại');
            }
            const updatedNhom = await this.prisma.nhomkhachhang.update({
                where: { id: nhomId },
                data: {
                    khachhang: {
                        connect: khachhangIds.map(id => ({ id }))
                    }
                },
                include: {
                    khachhang: {
                        select: {
                            id: true,
                            name: true,
                            tenkh: true,
                            diachi: true,
                            sdt: true,
                            email: true,
                            isActive: true
                        }
                    }
                }
            });
            return this.transformNullToUndefined(updatedNhom);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Lỗi khi thêm khách hàng vào nhóm: ${error.message}`);
        }
    }
    async removeKhachhangFromNhom(nhomId, khachhangIds) {
        try {
            const nhom = await this.prisma.nhomkhachhang.findUnique({
                where: { id: nhomId }
            });
            if (!nhom) {
                throw new common_1.NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${nhomId}`);
            }
            const updatedNhom = await this.prisma.nhomkhachhang.update({
                where: { id: nhomId },
                data: {
                    khachhang: {
                        disconnect: khachhangIds.map(id => ({ id }))
                    }
                },
                include: {
                    khachhang: {
                        select: {
                            id: true,
                            name: true,
                            tenkh: true,
                            diachi: true,
                            sdt: true,
                            email: true,
                            isActive: true
                        }
                    }
                }
            });
            return this.transformNullToUndefined(updatedNhom);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Lỗi khi xóa khách hàng khỏi nhóm: ${error.message}`);
        }
    }
    async create(data) {
        return this.prisma.nhomkhachhang.create({ data });
    }
    async findAll() {
        return this.prisma.nhomkhachhang.findMany({ include: { khachhang: true } });
    }
    async findOne(id) {
        const nhomkhachhang = await this.prisma.nhomkhachhang.findUnique({
            where: { id },
            include: { khachhang: true }
        });
        if (!nhomkhachhang)
            throw new common_1.NotFoundException('Nhomkhachhang not found');
        return nhomkhachhang;
    }
    async update(id, data) {
        return this.prisma.nhomkhachhang.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.nhomkhachhang.delete({ where: { id } });
    }
    async addKHtoNhom(nhomId, khachhangIds) {
        return this.prisma.nhomkhachhang.update({
            where: { id: nhomId },
            data: {
                khachhang: {
                    connect: khachhangIds.map(id => ({ id }))
                }
            }
        });
    }
    async removeKHfromNhom(nhomId, khachhangIds) {
        return this.prisma.nhomkhachhang.update({
            where: { id: nhomId },
            data: {
                khachhang: {
                    disconnect: khachhangIds.map(id => ({ id }))
                }
            }
        });
    }
};
exports.NhomkhachhangService = NhomkhachhangService;
exports.NhomkhachhangService = NhomkhachhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NhomkhachhangService);
//# sourceMappingURL=nhomkhachhang.service.js.map