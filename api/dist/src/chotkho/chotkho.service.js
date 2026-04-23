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
        const xuat = await prisma.donhangsanpham.findMany({
            where: {
                idSP: sanphamId,
                donhang: {
                    khoId: khoId,
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
                    khoId: khoId,
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
                    const analysis = await this.calculateStockFromLogs(detail.sanphamId, khoId, chotkhoMaster.ngaychot, prisma);
                    const sltonhethong_chuan = analysis.currentCalc;
                    const sanpham = sanphamMap.get(detail.sanphamId);
                    const giaGoc = Number(sanpham?.giagoc || 0);
                    const chenhlech = sltonhethong_chuan - Number(detail.sltonthucte) - Number(detail.slhuy);
                    const giaTriChenhLech = chenhlech * giaGoc;
                    const giaTriHuy = Number(detail.slhuy) * giaGoc;
                    await prisma.chotkhodetail.create({
                        data: {
                            chotkhoId: chotkhoMaster.id,
                            sanphamId: detail.sanphamId,
                            sltonhethong: new library_1.Decimal(sltonhethong_chuan),
                            sltonthucte: new library_1.Decimal(detail.sltonthucte),
                            slhuy: new library_1.Decimal(detail.slhuy),
                            chenhlech: new library_1.Decimal(chenhlech),
                            giaGocSnapshot: new library_1.Decimal(giaGoc),
                            giaTriChenhLech: new library_1.Decimal(giaTriChenhLech),
                            giaTriHuy: new library_1.Decimal(giaTriHuy),
                            isEstimated: !!detail.isEstimated,
                            ghichu: detail.ghichu || (analysis.currentCalc !== Number(detail.sltonhethong) ? `⚠️ Đã chuẩn hóa từ log (Báo cáo cũ: ${detail.sltonhethong})` : ''),
                            userId,
                            ngaychot: chotkhoMaster.ngaychot
                        }
                    });
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
                    const allWarehouseStock = await prisma.sanphamKho.findMany({
                        where: { sanphamId: detail.sanphamId }
                    });
                    const totalStock = allWarehouseStock.reduce((acc, curr) => acc + Number(curr.soluong), 0);
                    const [pendingInAgg, pendingOutAgg, oldestIn, oldestOut] = await Promise.all([
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
                        }),
                        prisma.dathang.findFirst({
                            where: {
                                status: { in: ['dadat', 'dagiao'] },
                                sanpham: { some: { idSP: detail.sanphamId } }
                            },
                            orderBy: { createdAt: 'asc' },
                            select: { createdAt: true }
                        }),
                        prisma.donhang.findFirst({
                            where: {
                                status: { in: ['dadat', 'dagiao'] },
                                sanpham: { some: { idSP: detail.sanphamId } }
                            },
                            orderBy: { createdAt: 'asc' },
                            select: { createdAt: true }
                        })
                    ]);
                    const currentPendingIn = Number(pendingInAgg._sum?.sldat || 0) - Number(pendingInAgg._sum?.slnhan || 0);
                    const currentPendingOut = Number(pendingOutAgg._sum?.sldat || 0) - Number(pendingOutAgg._sum?.slnhan || 0);
                    const updatedTk = await prisma.tonKho.upsert({
                        where: { sanphamId: detail.sanphamId },
                        create: {
                            sanphamId: detail.sanphamId,
                            slton: new library_1.Decimal(totalStock),
                            sltontt: new library_1.Decimal(totalStock),
                            slchogiao: new library_1.Decimal(Math.max(0, currentPendingOut)),
                            slchonhap: new library_1.Decimal(Math.max(0, currentPendingIn)),
                        },
                        update: {
                            slton: new library_1.Decimal(totalStock),
                            sltontt: new library_1.Decimal(totalStock),
                            slchogiao: new library_1.Decimal(Math.max(0, currentPendingOut)),
                            slchonhap: new library_1.Decimal(Math.max(0, currentPendingIn)),
                            updatedAt: new Date()
                        }
                    });
                    if (Number(updatedTk.slchonhap) > 0 || Number(updatedTk.slchogiao) > 0) {
                        const oldestDate = oldestIn?.createdAt || oldestOut?.createdAt;
                        const hoursDiff = oldestDate ? (Date.now() - new Date(oldestDate).getTime()) / (1000 * 60 * 60) : 0;
                        pendingWarnings.push({
                            masp: sanpham?.masp,
                            title: sanpham?.title,
                            slchonhap: Number(updatedTk.slchonhap),
                            slchogiao: Number(updatedTk.slchogiao),
                            oldestPendingDate: oldestDate,
                            isLate: hoursDiff > 24,
                            message: `⚠️ Sản phẩm có ${updatedTk.slchonhap}kg hàng đang về và ${updatedTk.slchogiao}kg đơn đang chờ giao.`
                        });
                    }
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
                timeout: 30000,
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
                return {
                    sanphamId: item.sanphamId,
                    sanpham: item.sanpham,
                    sltonhethong_db: Number(item.soluong),
                    sltonhethong: analysis.currentCalc,
                    sltonthucte: 0,
                    slhuy: 0,
                    chenhlech: analysis.currentCalc,
                    isSynced: analysis.currentCalc === Number(item.soluong),
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
        return this.prisma.kho.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });
    }
    async getScrapReport(filters) {
        const where = {
            slhuy: { gt: 0 }
        };
        if (filters.khoId) {
            where.chotkho = { khoId: filters.khoId };
        }
        if (filters.fromDate || filters.toDate) {
            where.chotkho = {
                ...where.chotkho,
                ngaychot: {
                    ...(filters.fromDate && { gte: new Date(filters.fromDate) }),
                    ...(filters.toDate && { lte: new Date(filters.toDate) })
                }
            };
        }
        const details = await this.prisma.chotkhodetail.findMany({
            where,
            include: {
                sanpham: true,
                chotkho: {
                    include: { kho: true, user: true }
                }
            },
            orderBy: { chotkho: { ngaychot: 'desc' } }
        });
        return details.map(d => ({
            id: d.id,
            ngay: d.chotkho?.ngaychot,
            kho: d.chotkho?.kho?.name,
            sanpham: d.sanpham?.title,
            masp: d.sanpham?.masp,
            slhuy: Number(d.slhuy),
            giaGoc: Number(d.giaGocSnapshot || d.sanpham?.giagoc || 0),
            giaTriHuy: Number(d.giaTriHuy || 0),
            nguoiChot: d.chotkho?.user?.name,
            ghichu: d.ghichu
        }));
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
    async getDailyInventorySummary(khoId, date = new Date()) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const lastChotkho = await this.prisma.chotkho.findFirst({
            where: { khoId, ngaychot: { lt: startOfDay } },
            orderBy: { ngaychot: 'desc' },
            include: { details: true }
        });
        const startStockMap = new Map();
        if (lastChotkho) {
            lastChotkho.details.forEach(d => {
                startStockMap.set(d.sanphamId, Number(d.sltonthucte));
            });
        }
        const [nhap, xuat] = await Promise.all([
            this.prisma.dathangsanpham.findMany({
                where: { dathang: { khoId, status: 'danhan', updatedAt: { gte: startOfDay, lte: endOfDay } } },
                select: { idSP: true, slnhan: true, slgiao: true }
            }),
            this.prisma.donhangsanpham.findMany({
                where: { donhang: { khoId, status: { in: ['dagiao', 'danhan'] }, updatedAt: { gte: startOfDay, lte: endOfDay } } },
                select: { idSP: true, slnhan: true, slgiao: true }
            })
        ]);
        const summary = new Map();
        startStockMap.forEach((val, id) => {
            summary.set(id, { tonDau: val, nhap: 0, xuat: 0, tonHienTai: val });
        });
        nhap.forEach(n => {
            const id = n.idSP;
            const qty = Number(n.slnhan || n.slgiao || 0);
            const curr = summary.get(id) || { tonDau: 0, nhap: 0, xuat: 0, tonHienTai: 0 };
            curr.nhap += qty;
            curr.tonHienTai += qty;
            summary.set(id, curr);
        });
        xuat.forEach(x => {
            const id = x.idSP;
            const qty = Number(x.slnhan || x.slgiao || 0);
            const curr = summary.get(id) || { tonDau: 0, nhap: 0, xuat: 0, tonHienTai: 0 };
            curr.xuat += qty;
            curr.tonHienTai -= qty;
            summary.set(id, curr);
        });
        const sanphamIds = Array.from(summary.keys());
        const sanphams = await this.prisma.sanpham.findMany({
            where: { id: { in: sanphamIds } },
            select: { id: true, title: true, masp: true, dvt: true }
        });
        return sanphams.map(s => ({
            ...s,
            ...summary.get(s.id)
        }));
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
        const existing = await this.prisma.chotkho.findUnique({ where: { id } });
        if (existing?.isLocked && updateData.isLocked !== false) {
            throw new Error('⚠️ Không thể cập nhật: Phiên chốt kho này đã được KHÓA SỔ.');
        }
        return this.prisma.chotkho.update({
            where: { id },
            data: updateData
        });
    }
    async lock(id, userId) {
        try {
            const result = await this.prisma.chotkho.update({
                where: { id },
                data: {
                    isLocked: true,
                    lockedAt: new Date(),
                    lockedBy: userId
                }
            });
            return {
                success: true,
                message: 'Khóa sổ thành công',
                data: result
            };
        }
        catch (error) {
            console.error('Error locking chotkho:', error);
            return {
                success: false,
                message: 'Lỗi khi khóa sổ: ' + error.message
            };
        }
    }
    async unlock(id) {
        try {
            const result = await this.prisma.chotkho.update({
                where: { id },
                data: {
                    isLocked: false,
                    lockedAt: null,
                    lockedBy: null
                }
            });
            return {
                success: true,
                message: 'Mở khóa thành công',
                data: result
            };
        }
        catch (error) {
            console.error('Error unlocking chotkho:', error);
            return {
                success: false,
                message: 'Lỗi khi mở khóa: ' + error.message
            };
        }
    }
    async remove(id) {
        const existing = await this.prisma.chotkho.findUnique({ where: { id } });
        if (existing?.isLocked) {
            throw new Error('⚠️ Không thể xóa: Phiên chốt kho này đã được KHÓA SỔ.');
        }
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
            const existing = await this.prisma.chotkho.findUnique({ where: { id } });
            if (existing?.isLocked) {
                throw new Error('⚠️ Không thể cập nhật chi tiết: Phiên chốt kho này đã được KHÓA SỔ.');
            }
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
                    const sanphamIds = data.details.map(d => d.sanphamId);
                    const sanphams = await prisma.sanpham.findMany({ where: { id: { in: sanphamIds } } });
                    const sanphamMap = new Map(sanphams.map(s => [s.id, s]));
                    for (const detail of data.details) {
                        if (!updatedMaster.khoId)
                            throw new Error('Không thể tính toán log: phiên chốt kho thiếu khoId');
                        const analysis = await this.calculateStockFromLogs(detail.sanphamId, updatedMaster.khoId, updatedMaster.ngaychot, prisma);
                        const sltonhethong_chuan = analysis.currentCalc;
                        const sanpham = sanphamMap.get(detail.sanphamId);
                        const giaGoc = Number(sanpham?.giagoc || 0);
                        const chenhlech = sltonhethong_chuan - Number(detail.sltonthucte) - Number(detail.slhuy);
                        const giaTriChenhLech = chenhlech * giaGoc;
                        const giaTriHuy = Number(detail.slhuy) * giaGoc;
                        await prisma.chotkhodetail.create({
                            data: {
                                chotkhoId: id,
                                sanphamId: detail.sanphamId,
                                sltonhethong: new library_1.Decimal(sltonhethong_chuan),
                                sltonthucte: new library_1.Decimal(detail.sltonthucte),
                                slhuy: new library_1.Decimal(detail.slhuy),
                                chenhlech: new library_1.Decimal(chenhlech),
                                giaGocSnapshot: new library_1.Decimal(giaGoc),
                                giaTriChenhLech: new library_1.Decimal(giaTriChenhLech),
                                giaTriHuy: new library_1.Decimal(giaTriHuy),
                                isEstimated: !!detail.isEstimated,
                                ghichu: detail.ghichu || (analysis.currentCalc !== Number(detail.sltonhethong) ? `⚠️ Đã chuẩn hóa từ log (Báo cáo cũ: ${detail.sltonhethong})` : ''),
                                ngaychot: updatedMaster.ngaychot
                            }
                        });
                        await prisma.sanphamKho.upsert({
                            where: {
                                sanphamId_khoId: {
                                    sanphamId: detail.sanphamId,
                                    khoId: updatedMaster.khoId
                                }
                            },
                            create: {
                                sanphamId: detail.sanphamId,
                                khoId: updatedMaster.khoId,
                                soluong: new library_1.Decimal(detail.sltonthucte),
                            },
                            update: {
                                soluong: new library_1.Decimal(detail.sltonthucte),
                                updatedAt: new Date()
                            }
                        });
                        const allWarehouseStock = await prisma.sanphamKho.findMany({
                            where: { sanphamId: detail.sanphamId }
                        });
                        const totalStock = allWarehouseStock.reduce((acc, curr) => acc + Number(curr.soluong), 0);
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
                                slton: new library_1.Decimal(totalStock),
                                sltontt: new library_1.Decimal(totalStock),
                                slchogiao: new library_1.Decimal(Math.max(0, currentPendingOut)),
                                slchonhap: new library_1.Decimal(Math.max(0, currentPendingIn)),
                            },
                            update: {
                                slton: new library_1.Decimal(totalStock),
                                sltontt: new library_1.Decimal(totalStock),
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