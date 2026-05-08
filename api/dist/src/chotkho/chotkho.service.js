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
const notification_service_1 = require("../notification/notification.service");
let ChotkhoService = class ChotkhoService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async calculateStockFromLogs(sanphamId, khoId, endTime = new Date(), tx) {
        const prisma = tx || this.prisma;
        const lastChot = await this.prisma.chotkhodetail.findFirst({
            where: {
                sanphamId,
                chotkho: {
                    khoId,
                    isActive: true,
                    ngaychot: { lt: endTime }
                }
            },
            orderBy: { ngaychot: 'desc' },
            include: { chotkho: true }
        });
        const startTime = lastChot ? lastChot.ngaychot : new Date(0);
        const initialQty = lastChot ? Number(lastChot.sltonthucte) : 0;
        const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
        const isMainWarehouse = khoId === KHO_TONG_ID;
        const xuat = await prisma.donhangsanpham.findMany({
            where: {
                idSP: sanphamId,
                donhang: {
                    ...(isMainWarehouse ? {} : { khoId: khoId }),
                    status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                    updatedAt: { gt: startTime, lte: endTime }
                }
            },
            include: { donhang: true }
        });
        const nhap = await prisma.dathangsanpham.findMany({
            where: {
                idSP: sanphamId,
                dathang: {
                    ...(isMainWarehouse ? {} : { khoId: khoId }),
                    status: 'danhan',
                    updatedAt: { gt: startTime, lte: endTime }
                }
            },
            include: { dathang: true }
        });
        const events = [
            ...xuat.map(x => ({
                type: 'XUẤT',
                qty: Number(x.slnhan || x.slgiao || x.sldat),
                time: x.donhang.updatedAt,
                code: x.donhang.madonhang,
                note: 'Đơn hàng'
            })),
            ...nhap.map(n => ({
                type: 'NHẬP',
                qty: Number(n.slnhan || n.slgiao),
                time: n.dathang.updatedAt,
                code: n.dathang.madncc,
                note: 'Nhập kho'
            }))
        ].sort((a, b) => a.time.getTime() - b.time.getTime());
        let currentCalc = initialQty;
        const history = events.map(e => {
            if (e.type === 'XUẤT')
                currentCalc -= e.qty;
            else
                currentCalc += e.qty;
            return { ...e, balance: currentCalc };
        });
        return {
            initialQty,
            lastClosingDate: startTime,
            currentCalc,
            history
        };
    }
    async getTraceLog(chotkhoId, sanphamId) {
        const chotkho = await this.prisma.chotkho.findUnique({
            where: { id: chotkhoId }
        });
        if (!chotkho)
            throw new Error('Không tìm thấy phiên chốt kho');
        if (!chotkho.khoId)
            throw new Error('Phiên chốt kho không có thông tin khoId');
        return await this.calculateStockFromLogs(sanphamId, chotkho.khoId, chotkho.ngaychot);
    }
    async getPendingOrders(khoId) {
        return await this.prisma.dathang.findMany({
            where: {
                khoId: khoId,
                status: 'dadat'
            },
            include: {
                sanpham: {
                    include: {
                        sanpham: true
                    }
                },
                nhacungcap: true
            },
            orderBy: { createdAt: 'asc' }
        });
    }
    async create(inventoryData) {
        try {
            const transactionResult = await this.prisma.$transaction(async (prisma) => {
                const { ngaychot, title, ghichu, khoId, userId, details, confirmOrderIds } = inventoryData;
                if (confirmOrderIds && confirmOrderIds.length > 0) {
                    console.log(`📝 Processing auto-reception for ${confirmOrderIds.length} orders...`);
                    for (const orderId of confirmOrderIds) {
                        const order = await prisma.dathang.findUnique({
                            where: { id: orderId },
                            include: { sanpham: true }
                        });
                        if (order && order.status !== 'danhan') {
                            await prisma.dathang.update({
                                where: { id: orderId },
                                data: {
                                    status: 'danhan',
                                    updatedAt: new Date(),
                                    sanpham: {
                                        updateMany: order.sanpham.map(sp => ({
                                            where: { id: sp.id },
                                            data: { slnhan: sp.slgiao || sp.sldat }
                                        }))
                                    }
                                }
                            });
                            await prisma.phieuKho.create({
                                data: {
                                    maphieu: `PNK-AUTO-${order.madncc}-${Date.now()}`,
                                    ngay: new Date(),
                                    type: 'nhap',
                                    khoId: order.khoId || khoId,
                                    madncc: order.madncc,
                                    ghichu: `✅ Tự động xác nhận nhập kho khi chốt kho phiên ${title || ''}`,
                                    sanpham: {
                                        create: order.sanpham.map(sp => ({
                                            sanphamId: sp.idSP,
                                            soluong: sp.slgiao || sp.sldat
                                        }))
                                    }
                                }
                            });
                        }
                    }
                }
                const kho = await prisma.kho.findUnique({
                    where: { id: khoId }
                });
                if (!kho) {
                    throw new Error(`Kho với ID ${khoId} không tồn tại trong hệ thống`);
                }
                const sanphamIds = details.map(d => d.sanphamId);
                const [sanphams, currentTonKhos] = await Promise.all([
                    prisma.sanpham.findMany({ where: { id: { in: sanphamIds } } }),
                    prisma.tonKho.findMany({ where: { sanphamId: { in: sanphamIds } } })
                ]);
                const sanphamMap = new Map(sanphams.map(s => [s.id, s]));
                const tonKhoMap = new Map(currentTonKhos.map(tk => [tk.sanphamId, tk]));
                for (const detail of details) {
                    if (detail.sltonthucte < 0) {
                        throw new Error(`Số lượng tồn thực tế không được nhỏ hơn 0 (Sản phẩm ID: ${detail.sanphamId})`);
                    }
                    if (!sanphamMap.has(detail.sanphamId)) {
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
                const pendingWarnings = [];
                for (const detail of details) {
                    const sltonhethong_chuan = Number(detail.sltonhethong);
                    const sanpham = sanphamMap.get(detail.sanphamId);
                    const chenhlech = sltonhethong_chuan - Number(detail.sltonthucte) - Number(detail.slhuy);
                    await prisma.chotkhodetail.create({
                        data: {
                            chotkhoId: chotkhoMaster.id,
                            sanphamId: detail.sanphamId,
                            sltonhethong: new library_1.Decimal(sltonhethong_chuan),
                            sltonthucte: new library_1.Decimal(detail.sltonthucte),
                            slhuy: new library_1.Decimal(detail.slhuy),
                            chenhlech: new library_1.Decimal(chenhlech),
                            ghichu: detail.ghichu || '',
                            userId,
                            ngaychot: chotkhoMaster.ngaychot
                        }
                    });
                    const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
                    const currentSpKho = await prisma.sanphamKho.findUnique({
                        where: { sanphamId_khoId: { sanphamId: detail.sanphamId, khoId } }
                    });
                    const oldQty = Number(currentSpKho?.soluong || 0);
                    const delta = Number(detail.sltonthucte) - oldQty;
                    await prisma.sanphamKho.upsert({
                        where: {
                            sanphamId_khoId: {
                                sanphamId: detail.sanphamId,
                                khoId: khoId
                            }
                        },
                        create: {
                            sanphamId: detail.sanphamId,
                            khoId: khoId,
                            soluong: new library_1.Decimal(detail.sltonthucte),
                        },
                        update: {
                            soluong: new library_1.Decimal(detail.sltonthucte),
                            updatedAt: new Date()
                        }
                    });
                    if (khoId !== KHO_TONG_ID) {
                        await prisma.sanphamKho.upsert({
                            where: {
                                sanphamId_khoId: {
                                    sanphamId: detail.sanphamId,
                                    khoId: KHO_TONG_ID
                                }
                            },
                            create: {
                                sanphamId: detail.sanphamId,
                                khoId: KHO_TONG_ID,
                                soluong: new library_1.Decimal(delta),
                            },
                            update: {
                                soluong: { increment: delta },
                                updatedAt: new Date()
                            }
                        });
                    }
                    const khoTongRecord = await prisma.sanphamKho.findUnique({
                        where: {
                            sanphamId_khoId: {
                                sanphamId: detail.sanphamId,
                                khoId: KHO_TONG_ID
                            }
                        }
                    });
                    let finalTotal = Number(khoTongRecord?.soluong || 0);
                    if (finalTotal < 0) {
                        console.warn(`⚠️ [CHOTKHO-SYNC] Product ${detail.sanphamId} has negative KHO_TONG (${finalTotal}). Clamping to 0.`);
                        finalTotal = 0;
                        await prisma.sanphamKho.update({
                            where: {
                                sanphamId_khoId: {
                                    sanphamId: detail.sanphamId,
                                    khoId: KHO_TONG_ID
                                }
                            },
                            data: { soluong: new library_1.Decimal(0) }
                        });
                    }
                    await prisma.tonKho.upsert({
                        where: { sanphamId: detail.sanphamId },
                        create: {
                            sanphamId: detail.sanphamId,
                            slton: new library_1.Decimal(finalTotal),
                            sltontt: new library_1.Decimal(finalTotal),
                        },
                        update: {
                            slton: new library_1.Decimal(finalTotal),
                            sltontt: new library_1.Decimal(finalTotal),
                            updatedAt: new Date()
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
                    data: result,
                    warnings: pendingWarnings
                };
            }, {
                timeout: 90000,
                maxWait: 15000,
            });
            if (transactionResult.success && transactionResult.data && inventoryData.userId) {
                this.notificationService.sendNotificationToUser(inventoryData.userId, {
                    title: 'Cập nhật tồn kho',
                    body: `Quá trình tạo chốt kho ${transactionResult.data.title} đã hoàn thành.`,
                    url: `/admin/chotkho/${transactionResult.data.id}`
                }).catch(err => console.error('Error sending push notification:', err));
            }
            return transactionResult;
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
            const products = await Promise.all(sanphamKhoRecords.map(async (item) => {
                const analysis = await this.calculateStockFromLogs(item.sanphamId, khoId);
                const sltonhethong = Math.max(0, analysis.currentCalc);
                const isAbnormal = analysis.currentCalc < 0;
                return {
                    sanphamId: item.sanphamId,
                    sanpham: item.sanpham,
                    sltonhethong_db: Number(item.soluong),
                    sltonhethong: sltonhethong,
                    sltonhethong_raw: analysis.currentCalc,
                    isAbnormal: isAbnormal,
                    sltonthucte: 0,
                    slhuy: 0,
                    chenhlech: sltonhethong,
                    isSynced: sltonhethong === Number(item.soluong),
                    lastClosingDate: analysis.lastClosingDate
                };
            }));
            return products;
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
                masp: product.masp,
                title: product.title,
                dvt: product.dvt,
                dongia: Number(product.giaban) || 0,
                status: product.isActive,
                ghichu: product.ghichu,
                tonkho: product.TonKho ? {
                    slton: Number(product.TonKho.slton) || 0,
                    slhuy: 0,
                    sltinhthucte: Number(product.TonKho.sltontt) || 0,
                } : {
                    slton: 0,
                    slhuy: 0,
                    sltinhthucte: 0,
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
        try {
            const transactionResult = await this.prisma.$transaction(async (prisma) => {
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
                    for (const detail of data.details) {
                        if (detail.sltonthucte < 0) {
                            throw new Error(`Số lượng tồn thực tế không được nhỏ hơn 0 (Sản phẩm ID: ${detail.sanphamId})`);
                        }
                    }
                    await prisma.chotkhodetail.deleteMany({
                        where: { chotkhoId: id }
                    });
                    for (const detail of data.details) {
                        if (!updatedMaster.khoId)
                            throw new Error('Không thể tính toán log: phiên chốt kho thiếu khoId');
                        const analysis = await this.calculateStockFromLogs(detail.sanphamId, updatedMaster.khoId, updatedMaster.ngaychot, prisma);
                        const sltonhethong_chuan = analysis.currentCalc;
                        const chenhlech = sltonhethong_chuan - Number(detail.sltonthucte) - Number(detail.slhuy);
                        await prisma.chotkhodetail.create({
                            data: {
                                chotkhoId: id,
                                sanphamId: detail.sanphamId,
                                sltonhethong: new library_1.Decimal(sltonhethong_chuan),
                                sltonthucte: new library_1.Decimal(detail.sltonthucte),
                                slhuy: new library_1.Decimal(detail.slhuy),
                                chenhlech: new library_1.Decimal(chenhlech),
                                ghichu: detail.ghichu || (analysis.currentCalc !== Number(detail.sltonhethong) ? `⚠️ Đã chuẩn hóa từ log (Báo cáo cũ: ${detail.sltonhethong})` : ''),
                                ngaychot: updatedMaster.ngaychot
                            }
                        });
                        const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
                        const currentKhoId = updatedMaster.khoId;
                        const currentSpKho = await prisma.sanphamKho.findUnique({
                            where: { sanphamId_khoId: { sanphamId: detail.sanphamId, khoId: currentKhoId } }
                        });
                        const oldQty = Number(currentSpKho?.soluong || 0);
                        const delta = Number(detail.sltonthucte) - oldQty;
                        await prisma.sanphamKho.upsert({
                            where: {
                                sanphamId_khoId: {
                                    sanphamId: detail.sanphamId,
                                    khoId: currentKhoId
                                }
                            },
                            create: {
                                sanphamId: detail.sanphamId,
                                khoId: currentKhoId,
                                soluong: new library_1.Decimal(detail.sltonthucte),
                            },
                            update: {
                                soluong: new library_1.Decimal(detail.sltonthucte),
                                updatedAt: new Date()
                            }
                        });
                        if (currentKhoId !== KHO_TONG_ID) {
                            await prisma.sanphamKho.upsert({
                                where: {
                                    sanphamId_khoId: {
                                        sanphamId: detail.sanphamId,
                                        khoId: KHO_TONG_ID
                                    }
                                },
                                create: {
                                    sanphamId: detail.sanphamId,
                                    khoId: KHO_TONG_ID,
                                    soluong: new library_1.Decimal(delta),
                                },
                                update: {
                                    soluong: { increment: delta },
                                    updatedAt: new Date()
                                }
                            });
                        }
                        const khoTongRecord = await prisma.sanphamKho.findUnique({
                            where: {
                                sanphamId_khoId: {
                                    sanphamId: detail.sanphamId,
                                    khoId: KHO_TONG_ID
                                }
                            }
                        });
                        const finalTotal = Number(khoTongRecord?.soluong || 0);
                        const [pendingInAgg, pendingOutAgg] = await Promise.all([
                            prisma.dathangsanpham.aggregate({
                                where: {
                                    idSP: detail.sanphamId,
                                    dathang: { status: { in: ['dadat', 'dagiao'] } }
                                },
                                _sum: { slnhan: true, sldat: true }
                            }),
                            prisma.donhangsanpham.aggregate({
                                where: {
                                    idSP: detail.sanphamId,
                                    donhang: { status: { in: ['dadat', 'dagiao'] } }
                                },
                                _sum: { slnhan: true, sldat: true }
                            })
                        ]);
                        const currentPendingIn = Number(pendingInAgg._sum?.sldat || 0) - Number(pendingInAgg._sum?.slnhan || 0);
                        const currentPendingOut = Number(pendingOutAgg._sum?.sldat || 0) - Number(pendingOutAgg._sum?.slnhan || 0);
                        await prisma.tonKho.upsert({
                            where: { sanphamId: detail.sanphamId },
                            create: {
                                sanphamId: detail.sanphamId,
                                slton: new library_1.Decimal(finalTotal),
                                sltontt: new library_1.Decimal(finalTotal),
                                slchogiao: new library_1.Decimal(Math.max(0, currentPendingOut)),
                                slchonhap: new library_1.Decimal(Math.max(0, currentPendingIn)),
                            },
                            update: {
                                slton: new library_1.Decimal(finalTotal),
                                sltontt: new library_1.Decimal(finalTotal),
                                slchogiao: new library_1.Decimal(Math.max(0, currentPendingOut)),
                                slchonhap: new library_1.Decimal(Math.max(0, currentPendingIn)),
                                updatedAt: new Date()
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
            }, {
                timeout: 30000,
            });
            if (transactionResult && transactionResult.userId) {
                this.notificationService.sendNotificationToUser(transactionResult.userId, {
                    title: 'Cập nhật tồn kho (Sửa đổi)',
                    body: `Quá trình cập nhật chốt kho đã hoàn thành.`,
                    url: `/admin/chotkho/${transactionResult.id}`
                }).catch(err => console.error('Error sending push notification:', err));
            }
            return transactionResult;
        }
        catch (error) {
            console.error('Error in update chotkho:', error);
            throw error;
        }
    }
};
exports.ChotkhoService = ChotkhoService;
exports.ChotkhoService = ChotkhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], ChotkhoService);
//# sourceMappingURL=chotkho.service.js.map