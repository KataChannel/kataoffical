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
    async create(createNhanvienDto) {
        try {
            const existing = await this.prisma.nhanvien.findUnique({
                where: { maNV: createNhanvienDto.maNV }
            });
            if (existing) {
                throw new common_1.ConflictException(`Nhân viên với mã ${createNhanvienDto.maNV} đã tồn tại`);
            }
            if (createNhanvienDto.email) {
                const existingEmail = await this.prisma.nhanvien.findUnique({
                    where: { email: createNhanvienDto.email }
                });
                if (existingEmail) {
                    throw new common_1.ConflictException(`Email ${createNhanvienDto.email} đã được sử dụng`);
                }
            }
            if (createNhanvienDto.phongbanId) {
                const phongban = await this.prisma.phongban.findUnique({
                    where: { id: createNhanvienDto.phongbanId }
                });
                if (!phongban) {
                    throw new common_1.NotFoundException(`Phòng ban với ID ${createNhanvienDto.phongbanId} không tồn tại`);
                }
            }
            if (createNhanvienDto.userId) {
                const user = await this.prisma.user.findUnique({
                    where: { id: createNhanvienDto.userId }
                });
                if (!user) {
                    throw new common_1.NotFoundException(`User với ID ${createNhanvienDto.userId} không tồn tại`);
                }
                const existingUserNhanvien = await this.prisma.nhanvien.findUnique({
                    where: { userId: createNhanvienDto.userId }
                });
                if (existingUserNhanvien) {
                    throw new common_1.ConflictException(`User này đã được gán cho nhân viên ${existingUserNhanvien.maNV}`);
                }
            }
            const data = { ...createNhanvienDto };
            if (data.ngaySinh) {
                data.ngaySinh = new Date(data.ngaySinh);
            }
            if (data.ngayVaoLam) {
                data.ngayVaoLam = new Date(data.ngayVaoLam);
            }
            return await this.prisma.nhanvien.create({
                data,
                include: {
                    phongban: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            isActive: true
                        }
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Lỗi khi tạo nhân viên: ${error.message}`);
        }
    }
    async findAll(options) {
        const where = {};
        if (options?.phongbanId) {
            where.phongbanId = options.phongbanId;
        }
        if (options?.trangThai) {
            where.trangThai = options.trangThai;
        }
        if (options?.chucVu) {
            where.chucVu = { contains: options.chucVu, mode: 'insensitive' };
        }
        if (options?.search) {
            where.OR = [
                { maNV: { contains: options.search, mode: 'insensitive' } },
                { hoTen: { contains: options.search, mode: 'insensitive' } },
                { email: { contains: options.search, mode: 'insensitive' } },
                { soDienThoai: { contains: options.search, mode: 'insensitive' } }
            ];
        }
        const page = options?.page || 1;
        const limit = options?.limit || 50;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.nhanvien.findMany({
                where,
                include: {
                    phongban: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            isActive: true
                        }
                    }
                },
                orderBy: { maNV: 'asc' },
                skip,
                take: limit
            }),
            this.prisma.nhanvien.count({ where })
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const nhanvien = await this.prisma.nhanvien.findUnique({
            where: { id },
            include: {
                phongban: {
                    include: {
                        parent: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        isActive: true,
                        createdAt: true
                    }
                }
            }
        });
        if (!nhanvien) {
            throw new common_1.NotFoundException(`Nhân viên với ID ${id} không tồn tại`);
        }
        return nhanvien;
    }
    async findByMaNV(maNV) {
        const nhanvien = await this.prisma.nhanvien.findUnique({
            where: { maNV },
            include: {
                phongban: true,
                user: true
            }
        });
        if (!nhanvien) {
            throw new common_1.NotFoundException(`Nhân viên với mã ${maNV} không tồn tại`);
        }
        return nhanvien;
    }
    async update(id, updateNhanvienDto) {
        try {
            await this.findOne(id);
            if (updateNhanvienDto.phongbanId !== undefined) {
                if (updateNhanvienDto.phongbanId === null) {
                }
                else {
                    const phongban = await this.prisma.phongban.findUnique({
                        where: { id: updateNhanvienDto.phongbanId }
                    });
                    if (!phongban) {
                        throw new common_1.NotFoundException(`Phòng ban với ID ${updateNhanvienDto.phongbanId} không tồn tại`);
                    }
                }
            }
            if (updateNhanvienDto.userId !== undefined) {
                if (updateNhanvienDto.userId === null) {
                }
                else {
                    const user = await this.prisma.user.findUnique({
                        where: { id: updateNhanvienDto.userId }
                    });
                    if (!user) {
                        throw new common_1.NotFoundException(`User với ID ${updateNhanvienDto.userId} không tồn tại`);
                    }
                    const existingUserNhanvien = await this.prisma.nhanvien.findFirst({
                        where: {
                            userId: updateNhanvienDto.userId,
                            id: { not: id }
                        }
                    });
                    if (existingUserNhanvien) {
                        throw new common_1.ConflictException(`User này đã được gán cho nhân viên ${existingUserNhanvien.maNV}`);
                    }
                }
            }
            const data = { ...updateNhanvienDto };
            if (data.ngaySinh) {
                data.ngaySinh = new Date(data.ngaySinh);
            }
            if (data.ngayVaoLam) {
                data.ngayVaoLam = new Date(data.ngayVaoLam);
            }
            return await this.prisma.nhanvien.update({
                where: { id },
                data,
                include: {
                    phongban: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            isActive: true
                        }
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Lỗi khi cập nhật nhân viên: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const nhanvien = await this.findOne(id);
            const phongbanQuanLy = await this.prisma.phongban.findFirst({
                where: { truongPhongId: id }
            });
            if (phongbanQuanLy) {
                throw new common_1.ConflictException(`Không thể xóa nhân viên đang làm trưởng phòng của ${phongbanQuanLy.ten}. Vui lòng chuyển quyền trưởng phòng trước.`);
            }
            await this.prisma.nhanvien.delete({
                where: { id }
            });
            return { message: `Đã xóa nhân viên ${nhanvien.hoTen} (${nhanvien.maNV})` };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Lỗi khi xóa nhân viên: ${error.message}`);
        }
    }
    async getStatistics() {
        const [total, byPhongban, byTrangThai, byChucVu, withUser, withoutPhongban] = await Promise.all([
            this.prisma.nhanvien.count(),
            this.prisma.nhanvien.groupBy({
                by: ['phongbanId'],
                _count: true,
                orderBy: { _count: { phongbanId: 'desc' } }
            }),
            this.prisma.nhanvien.groupBy({
                by: ['trangThai'],
                _count: true
            }),
            this.prisma.nhanvien.groupBy({
                by: ['chucVu'],
                _count: true,
                orderBy: { _count: { chucVu: 'desc' } }
            }),
            this.prisma.nhanvien.count({
                where: { userId: { not: null } }
            }),
            this.prisma.nhanvien.count({
                where: { phongbanId: null }
            })
        ]);
        const phongbanIds = byPhongban
            .filter(item => item.phongbanId !== null)
            .map(item => item.phongbanId);
        const phongbanDetails = await this.prisma.phongban.findMany({
            where: { id: { in: phongbanIds } },
            select: { id: true, ma: true, ten: true }
        });
        const byPhongbanWithDetails = byPhongban.map(item => {
            const phongban = phongbanDetails.find(pb => pb.id === item.phongbanId);
            return {
                phongbanId: item.phongbanId,
                phongbanMa: phongban?.ma || 'N/A',
                phongbanTen: phongban?.ten || 'Chưa phân công',
                count: item._count
            };
        });
        return {
            total,
            byPhongban: byPhongbanWithDetails,
            byTrangThai,
            byChucVu: byChucVu.filter(item => item.chucVu !== null),
            withUser,
            withoutPhongban
        };
    }
    async linkToUser(nhanvienId, userId) {
        const nhanvien = await this.findOne(nhanvienId);
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new common_1.NotFoundException(`User với ID ${userId} không tồn tại`);
        }
        const existingUserNhanvien = await this.prisma.nhanvien.findUnique({
            where: { userId }
        });
        if (existingUserNhanvien && existingUserNhanvien.id !== nhanvienId) {
            throw new common_1.ConflictException(`User này đã được gán cho nhân viên ${existingUserNhanvien.maNV}`);
        }
        return await this.prisma.nhanvien.update({
            where: { id: nhanvienId },
            data: {
                userId,
                email: user.email || nhanvien.email
            },
            include: {
                phongban: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        isActive: true
                    }
                }
            }
        });
    }
    async unlinkFromUser(nhanvienId) {
        await this.findOne(nhanvienId);
        return await this.prisma.nhanvien.update({
            where: { id: nhanvienId },
            data: { userId: null },
            include: {
                phongban: true,
                user: true
            }
        });
    }
};
exports.NhanvienService = NhanvienService;
exports.NhanvienService = NhanvienService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NhanvienService);
//# sourceMappingURL=nhanvien.service.js.map