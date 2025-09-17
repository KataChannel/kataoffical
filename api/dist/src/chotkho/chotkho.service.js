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
exports.ChotkhoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let ChotkhoService = class ChotkhoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(inventoryData) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const { ngaychot, title, ghichu, khoId, userId, details } = inventoryData;
                const kho = await prisma.kho.findUnique({
                    where: { id: khoId }
                });
                if (!kho) {
                    throw new Error(`Kho với ID ${khoId} không tồn tại trong hệ thống`);
                }
                for (const detail of details) {
                    const sanpham = await prisma.sanpham.findUnique({
                        where: { id: detail.sanphamId }
                    });
                    if (!sanpham) {
                        throw new Error(`Sản phẩm với ID ${detail.sanphamId} không tồn tại trong hệ thống`);
                    }
                }
                const chotkhoMaster = await prisma.chotkho.create({
                    data: {
                        ngaychot: ngaychot || new Date(),
                        title: title || `Chốt kho ${new Date().toLocaleDateString('vi-VN')}`,
                        ghichu: ghichu || '',
                        khoId,
                        userId,
                        codeId: `CHOTKHO_${Date.now()}`,
                        isActive: true
                    }
                });
                console.log(`📦 Created master chotkho record: ${chotkhoMaster.id}`);
                let detailCount = 0;
                for (const detail of details) {
                    const chenhlech = Number(detail.sltonhethong) - Number(detail.sltonthucte) - Number(detail.slhuy);
                    await prisma.chotkhodetail.create({
                        data: {
                            chotkhoId: chotkhoMaster.id,
                            sanphamId: detail.sanphamId,
                            sltonhethong: new library_1.Decimal(detail.sltonhethong),
                            sltonthucte: new library_1.Decimal(detail.sltonthucte),
                            slhuy: new library_1.Decimal(detail.slhuy),
                            chenhlech: new library_1.Decimal(chenhlech),
                            ghichu: detail.ghichu || '',
                            userId,
                            ngaychot: chotkhoMaster.ngaychot
                        }
                    });
                    detailCount++;
                }
                const result = await prisma.chotkho.findUnique({
                    where: { id: chotkhoMaster.id },
                    include: {
                        kho: {
                            select: { id: true, name: true, makho: true }
                        },
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: { select: { name: true } }
                            }
                        },
                        details: {
                            include: {
                                sanpham: {
                                    select: { id: true, title: true, masp: true }
                                }
                            }
                        }
                    }
                });
                return {
                    success: true,
                    message: `Tạo chốt kho thành công với ${detailCount} sản phẩm`,
                    data: result
                };
            });
        }
        catch (error) {
            console.error('Error in create chotkho:', error);
            throw error;
        }
    }
    async getAllProductsByKho(khoId) {
        try {
            const sanphamKhoRecords = await this.prisma.sanphamKho.findMany({
                where: {
                    khoId,
                    soluong: { gt: 0 }
                },
                include: {
                    sanpham: {
                        select: {
                            id: true,
                            title: true,
                            masp: true
                        }
                    }
                },
                orderBy: {
                    sanpham: {
                        title: 'asc'
                    }
                }
            });
            return sanphamKhoRecords.map(item => ({
                sanphamId: item.sanphamId,
                sanpham: item.sanpham,
                sltonhethong: Number(item.soluong),
                sltonthucte: 0,
                slhuy: 0,
                chenhlech: Number(item.soluong)
            }));
        }
        catch (error) {
            console.error('Error getting products by kho:', error);
            throw error;
        }
    }
    async getAllKho() {
        try {
            return await this.prisma.kho.findMany({
                where: {
                    isActive: true
                },
                select: {
                    id: true,
                    name: true,
                    makho: true,
                    diachi: true
                },
                orderBy: {
                    name: 'asc'
                }
            });
        }
        catch (error) {
            console.error('Error getting all kho:', error);
            throw error;
        }
    }
    async getAllProducts() {
        try {
            const products = await this.prisma.sanpham.findMany({
                where: {
                    isActive: true
                },
                include: {
                    TonKho: {
                        select: {
                            slton: true,
                            sltontt: true,
                            slchogiao: true,
                            slchonhap: true
                        }
                    }
                },
                orderBy: {
                    title: 'asc'
                }
            });
            return products.map(product => ({
                id: product.id,
                masanpham: product.masp,
                tensanpham: product.title,
                donvitinh: product.dvt,
                dongia: Number(product.giaban) || 0,
                status: product.isActive,
                ghichu: product.ghichu,
                tonkho: product.TonKho ? {
                    slton: Number(product.TonKho.slton) || 0,
                    slhuy: 0,
                    sltinhthucte: Number(product.TonKho.sltontt) || 0,
                    ngaycapnhat: new Date()
                } : {
                    slton: 0,
                    slhuy: 0,
                    sltinhthucte: 0,
                    ngaycapnhat: null
                }
            }));
        }
        catch (error) {
            console.error('Error getting all products:', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.prisma.chotkho.findMany({
                skip,
                take: limit,
                include: {
                    kho: {
                        select: {
                            id: true,
                            name: true,
                            makho: true
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: { name: true }
                            }
                        }
                    },
                    details: {
                        include: {
                            sanpham: {
                                select: {
                                    id: true,
                                    title: true,
                                    masp: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    ngaychot: 'desc'
                }
            }),
            this.prisma.chotkho.count()
        ]);
        return {
            data: items,
            pagination: {
                current: page,
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async findOne(id) {
        return this.prisma.chotkho.findUnique({
            where: { id },
            include: {
                kho: {
                    select: {
                        id: true,
                        name: true,
                        makho: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        profile: {
                            select: { name: true }
                        }
                    }
                },
                details: {
                    include: {
                        sanpham: {
                            select: {
                                id: true,
                                title: true,
                                masp: true
                            }
                        }
                    }
                }
            }
        });
    }
    async update(id, updateData) {
        return this.prisma.chotkho.update({
            where: { id },
            data: updateData
        });
    }
    async remove(id) {
        return this.prisma.chotkho.delete({
            where: { id }
        });
    }
    async search(searchParams) {
        const { khoId, sanphamId, fromDate, toDate, page = 1, limit = 10 } = searchParams;
        const skip = (page - 1) * limit;
        const where = {};
        if (khoId)
            where.khoId = khoId;
        if (fromDate || toDate) {
            where.ngaychot = {};
            if (fromDate)
                where.ngaychot.gte = new Date(fromDate);
            if (toDate)
                where.ngaychot.lte = new Date(toDate);
        }
        if (sanphamId) {
            where.details = {
                some: { sanphamId }
            };
        }
        const [items, total] = await Promise.all([
            this.prisma.chotkho.findMany({
                where,
                skip,
                take: limit,
                include: {
                    kho: {
                        select: {
                            id: true,
                            name: true,
                            makho: true
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: { name: true }
                            }
                        }
                    },
                    details: {
                        include: {
                            sanpham: {
                                select: {
                                    id: true,
                                    title: true,
                                    masp: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    ngaychot: 'desc'
                }
            }),
            this.prisma.chotkho.count({ where })
        ]);
        return {
            data: items,
            pagination: {
                current: page,
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async updateChotkhoWithDetails(id, data) {
        return this.prisma.$transaction(async (prisma) => {
            const updatedMaster = await prisma.chotkho.update({
                where: { id },
                data: {
                    ngaychot: data.ngaychot,
                    title: data.title,
                    ghichu: data.ghichu,
                    isActive: data.isActive
                }
            });
            if (data.details && data.details.length > 0) {
                await prisma.chotkhodetail.deleteMany({
                    where: { chotkhoId: id }
                });
                for (const detail of data.details) {
                    const chenhlech = Number(detail.sltonhethong) - Number(detail.sltonthucte) - Number(detail.slhuy);
                    await prisma.chotkhodetail.create({
                        data: {
                            chotkhoId: id,
                            sanphamId: detail.sanphamId,
                            sltonhethong: detail.sltonhethong,
                            sltonthucte: detail.sltonthucte,
                            slhuy: detail.slhuy,
                            chenhlech,
                            ghichu: detail.ghichu || '',
                            ngaychot: updatedMaster.ngaychot
                        }
                    });
                }
            }
            return await prisma.chotkho.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: { select: { name: true } }
                        }
                    },
                    details: {
                        include: {
                            sanpham: {
                                select: { id: true, title: true, masp: true }
                            }
                        }
                    }
                }
            });
        });
    }
};
exports.ChotkhoService = ChotkhoService;
exports.ChotkhoService = ChotkhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChotkhoService);
//# sourceMappingURL=chotkho.service.js.map