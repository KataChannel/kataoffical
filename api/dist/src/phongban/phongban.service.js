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
exports.PhongbanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PhongbanService = class PhongbanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPhongbanDto) {
        try {
            const existing = await this.prisma.phongban.findUnique({
                where: { ma: createPhongbanDto.ma }
            });
            if (existing) {
                throw new common_1.ConflictException(`Phòng ban với mã ${createPhongbanDto.ma} đã tồn tại`);
            }
            let level = 1;
            if (createPhongbanDto.parentId) {
                const parent = await this.prisma.phongban.findUnique({
                    where: { id: createPhongbanDto.parentId }
                });
                if (!parent) {
                    throw new common_1.NotFoundException(`Phòng ban cha với ID ${createPhongbanDto.parentId} không tồn tại`);
                }
                level = parent.level + 1;
            }
            return await this.prisma.phongban.create({
                data: {
                    ...createPhongbanDto,
                    level
                },
                include: {
                    parent: true,
                    truongPhong: true,
                    _count: {
                        select: {
                            children: true,
                            nhanviens: true
                        }
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Lỗi khi tạo phòng ban: ${error.message}`);
        }
    }
    async findAll(options) {
        const where = {};
        if (options?.level) {
            where.level = options.level;
        }
        if (options?.loai) {
            where.loai = options.loai;
        }
        if (options?.parentId !== undefined) {
            where.parentId = options.parentId === 'null' ? null : options.parentId;
        }
        return await this.prisma.phongban.findMany({
            where,
            include: {
                parent: true,
                truongPhong: true,
                children: options?.includeChildren,
                _count: {
                    select: {
                        children: true,
                        nhanviens: true
                    }
                }
            },
            orderBy: [
                { level: 'asc' },
                { ma: 'asc' }
            ]
        });
    }
    async findOne(id) {
        const phongban = await this.prisma.phongban.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                truongPhong: true,
                nhanviens: {
                    orderBy: { maNV: 'asc' }
                },
                _count: {
                    select: {
                        children: true,
                        nhanviens: true
                    }
                }
            }
        });
        if (!phongban) {
            throw new common_1.NotFoundException(`Phòng ban với ID ${id} không tồn tại`);
        }
        return phongban;
    }
    async findByMa(ma) {
        const phongban = await this.prisma.phongban.findUnique({
            where: { ma },
            include: {
                parent: true,
                children: true,
                truongPhong: true,
                nhanviens: true,
                _count: {
                    select: {
                        children: true,
                        nhanviens: true
                    }
                }
            }
        });
        if (!phongban) {
            throw new common_1.NotFoundException(`Phòng ban với mã ${ma} không tồn tại`);
        }
        return phongban;
    }
    async getTree() {
        return await this.prisma.phongban.findMany({
            where: { parentId: null },
            include: {
                children: {
                    include: {
                        children: {
                            include: {
                                children: true,
                                _count: {
                                    select: { nhanviens: true }
                                }
                            }
                        },
                        _count: {
                            select: { nhanviens: true }
                        }
                    }
                },
                _count: {
                    select: { nhanviens: true }
                }
            },
            orderBy: { ma: 'asc' }
        });
    }
    async update(id, updatePhongbanDto) {
        try {
            await this.findOne(id);
            let level;
            if (updatePhongbanDto.parentId !== undefined) {
                if (updatePhongbanDto.parentId === null) {
                    level = 1;
                }
                else {
                    const parent = await this.prisma.phongban.findUnique({
                        where: { id: updatePhongbanDto.parentId }
                    });
                    if (!parent) {
                        throw new common_1.NotFoundException(`Phòng ban cha với ID ${updatePhongbanDto.parentId} không tồn tại`);
                    }
                    level = parent.level + 1;
                }
            }
            return await this.prisma.phongban.update({
                where: { id },
                data: {
                    ...updatePhongbanDto,
                    ...(level !== undefined && { level })
                },
                include: {
                    parent: true,
                    children: true,
                    truongPhong: true,
                    _count: {
                        select: {
                            children: true,
                            nhanviens: true
                        }
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Lỗi khi cập nhật phòng ban: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const phongban = await this.prisma.phongban.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            children: true,
                            nhanviens: true
                        }
                    }
                }
            });
            if (!phongban) {
                throw new common_1.NotFoundException(`Phòng ban với ID ${id} không tồn tại`);
            }
            if (phongban._count.children > 0) {
                throw new common_1.ConflictException('Không thể xóa phòng ban có bộ phận con. Vui lòng xóa các bộ phận con trước.');
            }
            if (phongban._count.nhanviens > 0) {
                throw new common_1.ConflictException(`Không thể xóa phòng ban có ${phongban._count.nhanviens} nhân viên. Vui lòng chuyển nhân viên trước.`);
            }
            await this.prisma.phongban.delete({
                where: { id }
            });
            return { message: `Đã xóa phòng ban ${phongban.ten} (${phongban.ma})` };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Lỗi khi xóa phòng ban: ${error.message}`);
        }
    }
    async getStatistics() {
        const [total, byLevel, byLoai, topByNhanvien] = await Promise.all([
            this.prisma.phongban.count(),
            this.prisma.phongban.groupBy({
                by: ['level'],
                _count: true,
                orderBy: { level: 'asc' }
            }),
            this.prisma.phongban.groupBy({
                by: ['loai'],
                _count: true
            }),
            this.prisma.phongban.findMany({
                take: 10,
                include: {
                    _count: {
                        select: { nhanviens: true }
                    }
                },
                orderBy: {
                    nhanviens: {
                        _count: 'desc'
                    }
                }
            })
        ]);
        return {
            total,
            byLevel,
            byLoai,
            topByNhanvien: topByNhanvien.map(pb => ({
                id: pb.id,
                ma: pb.ma,
                ten: pb.ten,
                nhanvienCount: pb._count.nhanviens
            }))
        };
    }
};
exports.PhongbanService = PhongbanService;
exports.PhongbanService = PhongbanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhongbanService);
//# sourceMappingURL=phongban.service.js.map