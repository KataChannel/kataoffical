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
exports.TonkhoManagerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TonkhoManagerService = class TonkhoManagerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateTonkhoAtomic(operations, tx) {
        const execute = async (prisma) => {
            for (const op of operations) {
                const currentTonkho = await prisma.tonKho.findUnique({
                    where: { sanphamId: op.sanphamId }
                });
                if (!currentTonkho) {
                    await prisma.tonKho.create({
                        data: {
                            sanphamId: op.sanphamId,
                            slton: op.slton || 0,
                            sltontt: op.sltontt || 0,
                            slchogiao: op.slchogiao || 0,
                            slchonhap: op.slchonhap || 0,
                        }
                    });
                }
                else {
                    const updateData = {};
                    if (op.slton !== undefined) {
                        switch (op.operation) {
                            case 'increment':
                                updateData.slton = { increment: op.slton };
                                break;
                            case 'decrement':
                                updateData.slton = { decrement: op.slton };
                                break;
                            case 'set':
                                updateData.slton = op.slton;
                                break;
                        }
                    }
                    if (op.sltontt !== undefined) {
                        switch (op.operation) {
                            case 'increment':
                                updateData.sltontt = { increment: op.sltontt };
                                break;
                            case 'decrement':
                                updateData.sltontt = { decrement: op.sltontt };
                                break;
                            case 'set':
                                updateData.sltontt = op.sltontt;
                                break;
                        }
                    }
                    if (op.slchogiao !== undefined) {
                        switch (op.operation) {
                            case 'increment':
                                updateData.slchogiao = { increment: op.slchogiao };
                                break;
                            case 'decrement':
                                updateData.slchogiao = { decrement: op.slchogiao };
                                break;
                            case 'set':
                                updateData.slchogiao = op.slchogiao;
                                break;
                        }
                    }
                    if (op.slchonhap !== undefined) {
                        switch (op.operation) {
                            case 'increment':
                                updateData.slchonhap = { increment: op.slchonhap };
                                break;
                            case 'decrement':
                                updateData.slchonhap = { decrement: op.slchonhap };
                                break;
                            case 'set':
                                updateData.slchonhap = op.slchonhap;
                                break;
                        }
                    }
                    await prisma.tonKho.update({
                        where: { sanphamId: op.sanphamId },
                        data: updateData
                    });
                }
                const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
                const effectiveKhoId = op.khoId || KHO_TONG_ID;
                if (op.slton !== undefined || op.sltontt !== undefined) {
                    const movement = op.slton !== undefined ? op.slton : (op.sltontt || 0);
                    const updatedSpKho = await prisma.sanphamKho.upsert({
                        where: {
                            sanphamId_khoId: {
                                sanphamId: op.sanphamId,
                                khoId: effectiveKhoId
                            }
                        },
                        update: {
                            soluong: op.operation === 'increment' ? { increment: Number(movement) } :
                                op.operation === 'decrement' ? { decrement: Number(movement) } :
                                    Number(movement)
                        },
                        create: {
                            sanphamId: op.sanphamId,
                            khoId: effectiveKhoId,
                            soluong: op.operation === 'decrement' ? -Number(movement) : Number(movement)
                        }
                    });
                    if (effectiveKhoId !== KHO_TONG_ID && op.operation !== 'set') {
                        const updatedKhoTong = await prisma.sanphamKho.upsert({
                            where: {
                                sanphamId_khoId: {
                                    sanphamId: op.sanphamId,
                                    khoId: KHO_TONG_ID
                                }
                            },
                            update: {
                                soluong: op.operation === 'increment' ? { increment: Number(movement) } :
                                    { decrement: Number(movement) }
                            },
                            create: {
                                sanphamId: op.sanphamId,
                                khoId: KHO_TONG_ID,
                                soluong: op.operation === 'decrement' ? -Number(movement) : Number(movement)
                            }
                        });
                    }
                    const khoTongRecord = await prisma.sanphamKho.findUnique({
                        where: {
                            sanphamId_khoId: {
                                sanphamId: op.sanphamId,
                                khoId: KHO_TONG_ID
                            }
                        }
                    });
                    let totalPhysicalStock = Number(khoTongRecord?.soluong || 0);
                    await prisma.tonKho.update({
                        where: { sanphamId: op.sanphamId },
                        data: {
                            slton: totalPhysicalStock,
                            sltontt: totalPhysicalStock
                        }
                    });
                }
            }
        };
        if (tx)
            return execute(tx);
        return this.prisma.safeTransaction(execute);
    }
    async validateTonkhoConsistency() {
        const errors = [];
        const warnings = [];
        try {
            const tonkhoData = await this.prisma.tonKho.findMany({
                include: {
                    sanpham: {
                        include: {
                            Donhangsanpham: {
                                where: {
                                    donhang: {
                                        status: { in: ['dadat', 'dagiao'] }
                                    }
                                }
                            },
                            Dathangsanpham: {
                                where: {
                                    dathang: {
                                        status: { in: ['dadat', 'dagiao'] }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            for (const tonkho of tonkhoData) {
                const pendingOut = tonkho.sanpham.Donhangsanpham
                    .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);
                const pendingIn = tonkho.sanpham.Dathangsanpham
                    .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);
                const chogiaoExpected = Math.round(pendingOut * 1000) / 1000;
                const chogiaoActual = Math.round(Number(tonkho.slchogiao) * 1000) / 1000;
                if (Math.abs(chogiaoExpected - chogiaoActual) > 0.001) {
                    errors.push(`TonKho ${tonkho.sanpham.masp}: slchogiao inconsistent. ` +
                        `Expected: ${chogiaoExpected}, Actual: ${chogiaoActual}`);
                }
                const chonhapExpected = Math.round(pendingIn * 1000) / 1000;
                const chonhapActual = Math.round(Number(tonkho.slchonhap) * 1000) / 1000;
                if (Math.abs(chonhapExpected - chonhapActual) > 0.001) {
                    errors.push(`TonKho ${tonkho.sanpham.masp}: slchonhap inconsistent. ` +
                        `Expected: ${chonhapExpected}, Actual: ${chonhapActual}`);
                }
                if (Number(tonkho.slton) < 0) {
                    warnings.push(`TonKho ${tonkho.sanpham.masp}: Negative inventory ${tonkho.slton}`);
                }
                const availableInventory = Number(tonkho.slton) - Number(tonkho.slchogiao);
                if (availableInventory < 0) {
                    warnings.push(`TonKho ${tonkho.sanpham.masp}: ` +
                        `Oversold. Available: ${availableInventory}, Pending out: ${tonkho.slchogiao}`);
                }
            }
            return {
                isValid: errors.length === 0,
                errors,
                warnings
            };
        }
        catch (error) {
            return {
                isValid: false,
                errors: [`Validation failed: ${error.message}`],
                warnings: []
            };
        }
    }
    async getTonkhoSummary(khoId) {
        const whereClause = {};
        if (khoId) {
            whereClause.sanpham = {
                SanphamKho: {
                    some: { khoId }
                }
            };
        }
        return this.prisma.tonKho.findMany({
            where: whereClause,
            include: {
                sanpham: {
                    select: {
                        id: true,
                        masp: true,
                        title: true,
                        dvt: true,
                        Donhangsanpham: {
                            where: {
                                donhang: { status: { in: ['dadat', 'dagiao'] } }
                            },
                            include: {
                                donhang: {
                                    select: {
                                        madonhang: true,
                                        status: true,
                                        ngaygiao: true
                                    }
                                }
                            }
                        },
                        Dathangsanpham: {
                            where: {
                                dathang: { status: { in: ['dadat', 'dagiao'] } }
                            },
                            include: {
                                dathang: {
                                    select: {
                                        madncc: true,
                                        status: true,
                                        ngaynhan: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    async recalculateTonkho(sanphamIds) {
        const errors = [];
        let fixed = 0;
        try {
            const whereClause = sanphamIds ? { id: { in: sanphamIds } } : {};
            const sanphams = await this.prisma.sanpham.findMany({
                where: whereClause,
                include: {
                    TonKho: true,
                    Donhangsanpham: {
                        where: {
                            donhang: { status: { in: ['dadat', 'dagiao'] } }
                        }
                    },
                    Dathangsanpham: {
                        where: {
                            dathang: { status: { in: ['dadat', 'dagiao'] } }
                        }
                    }
                }
            });
            for (const sanpham of sanphams) {
                const pendingOut = sanpham.Donhangsanpham
                    .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);
                const pendingIn = sanpham.Dathangsanpham
                    .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);
                const correctedSlchogiao = Math.round(pendingOut * 1000) / 1000;
                const correctedSlchonhap = Math.round(pendingIn * 1000) / 1000;
                if (sanpham.TonKho) {
                    await this.prisma.tonKho.update({
                        where: { sanphamId: sanpham.id },
                        data: {
                            slchogiao: correctedSlchogiao,
                            slchonhap: correctedSlchonhap
                        }
                    });
                    fixed++;
                }
                else {
                    await this.prisma.tonKho.create({
                        data: {
                            sanphamId: sanpham.id,
                            slton: 0,
                            slchogiao: correctedSlchogiao,
                            slchonhap: correctedSlchonhap
                        }
                    });
                    fixed++;
                }
            }
            return { fixed, errors };
        }
        catch (error) {
            errors.push(`Recalculation failed: ${error.message}`);
            return { fixed, errors };
        }
    }
    async syncStockToReality(sanphamId, tx) {
        const prisma = tx || this.prisma;
        const tk = await prisma.tonKho.findUnique({
            where: { sanphamId },
            include: {
                sanpham: {
                    include: {
                        Donhangsanpham: {
                            where: {
                                donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] } }
                            }
                        },
                        Dathangsanpham: {
                            where: {
                                dathang: { status: 'danhan' }
                            }
                        }
                    }
                }
            }
        });
        if (!tk)
            return;
        const [receivedAgg, deliveredAgg] = await Promise.all([
            prisma.dathangsanpham.aggregate({
                where: {
                    idSP: sanphamId,
                    dathang: {
                        updatedAt: { gt: tk.updatedAt },
                        status: 'danhan'
                    }
                },
                _sum: { slnhan: true }
            }),
            prisma.donhangsanpham.aggregate({
                where: {
                    idSP: sanphamId,
                    donhang: {
                        updatedAt: { gt: tk.updatedAt },
                        status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
                    }
                },
                _sum: { slnhan: true, sldat: true }
            })
        ]);
        const received = Number(receivedAgg._sum?.slnhan || 0);
        const delivered = Number(deliveredAgg._sum?.slnhan || deliveredAgg._sum?.sldat || 0);
        const reliableTotal = Math.max(0, Number(tk.sltontt || 0) + received - delivered);
        await prisma.tonKho.update({
            where: { sanphamId },
            data: {
                slton: reliableTotal,
                sltontt: reliableTotal,
                updatedAt: new Date()
            }
        });
    }
};
exports.TonkhoManagerService = TonkhoManagerService;
exports.TonkhoManagerService = TonkhoManagerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TonkhoManagerService);
//# sourceMappingURL=tonkho-manager.service.js.map