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
                const { khoId, products } = inventoryData;
                const ngaychot = new Date();
                const tonkhoRecords = await prisma.tonKho.findMany({
                    where: {
                        slton: { gt: 0 },
                        sanpham: {
                            SanphamKho: {
                                some: { khoId }
                            }
                        }
                    },
                    include: {
                        sanpham: {
                            select: {
                                id: true,
                                title: true,
                                masp: true
                            }
                        }
                    }
                });
                console.log(`📦 Found ${tonkhoRecords.length} products with inventory > 0`);
                if (tonkhoRecords.length === 0) {
                    return {
                        success: false,
                        message: 'Không có sản phẩm nào có tồn kho > 0 trong kho này'
                    };
                }
                const createdRecords = [];
                let totalDifference = 0;
                for (const tonkho of tonkhoRecords) {
                    const userInput = products.find(p => p.sanphamId === tonkho.sanphamId);
                    const sltonhethong = Number(tonkho.slton);
                    const sltonthucte = userInput?.sltonthucte || 0;
                    const slhuy = userInput?.slhuy || 0;
                    const chenhlech = sltonhethong - sltonthucte - slhuy;
                    const chotkhoRecord = await prisma.chotkho.create({
                        data: {
                            khoId,
                            sanphamId: tonkho.sanphamId,
                            ngaychot,
                            sltonhethong: new library_1.Decimal(sltonhethong),
                            sltonthucte: new library_1.Decimal(sltonthucte),
                            slhuy: new library_1.Decimal(slhuy),
                            chenhlech: new library_1.Decimal(chenhlech),
                            ghichu: userInput?.ghichu || ''
                        },
                        include: {
                            sanpham: {
                                select: {
                                    title: true,
                                    masp: true
                                }
                            }
                        }
                    });
                    createdRecords.push(chotkhoRecord);
                    totalDifference += chenhlech;
                }
                return {
                    success: true,
                    message: `Chốt kho thành công cho ${createdRecords.length} sản phẩm`,
                    data: {
                        totalProducts: createdRecords.length,
                        totalDifference,
                        records: createdRecords
                    }
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
            const tonkhoRecords = await this.prisma.tonKho.findMany({
                where: {
                    slton: { gt: 0 },
                    sanpham: {
                        SanphamKho: {
                            some: { khoId }
                        }
                    }
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
            return tonkhoRecords.map(tonkho => ({
                sanphamId: tonkho.sanphamId,
                sanpham: tonkho.sanpham,
                sltonhethong: Number(tonkho.slton),
                sltonthucte: 0,
                slhuy: 0,
                chenhlech: Number(tonkho.slton)
            }));
        }
        catch (error) {
            console.error('Error getting products by kho:', error);
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
                    sanpham: {
                        select: {
                            id: true,
                            title: true,
                            masp: true
                        }
                    },
                    kho: {
                        select: {
                            id: true,
                            name: true
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
                sanpham: {
                    select: {
                        id: true,
                        title: true,
                        masp: true
                    }
                },
                kho: {
                    select: {
                        id: true,
                        name: true
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
        if (sanphamId)
            where.sanphamId = sanphamId;
        if (fromDate || toDate) {
            where.ngaychot = {};
            if (fromDate)
                where.ngaychot.gte = new Date(fromDate);
            if (toDate)
                where.ngaychot.lte = new Date(toDate);
        }
        const [items, total] = await Promise.all([
            this.prisma.chotkho.findMany({
                where,
                skip,
                take: limit,
                include: {
                    sanpham: {
                        select: {
                            id: true,
                            title: true,
                            masp: true
                        }
                    },
                    kho: {
                        select: {
                            id: true,
                            name: true
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
};
exports.ChotkhoService = ChotkhoService;
exports.ChotkhoService = ChotkhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChotkhoService);
//# sourceMappingURL=chotkho.service.js.map