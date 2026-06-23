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
const crypto_1 = require("crypto");
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
                    OR: [
                        { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
                        { ngayHoanThanhThucte: null, ngaygiao: { gt: startTime, lte: endTime } }
                    ]
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
                    OR: [
                        { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
                        { ngayHoanThanhThucte: null, ngaynhan: { gt: startTime, lte: endTime } }
                    ]
                }
            },
            include: { dathang: true }
        });
        const events = [
            ...xuat.map(x => ({
                type: 'XUẤT',
                qty: Number(x.slnhan || x.slgiao || x.sldat),
                time: x.donhang.ngayHoanThanhThucte || x.donhang.ngaygiao,
                code: x.donhang.madonhang,
                note: 'Đơn hàng'
            })),
            ...nhap.map(n => ({
                type: 'NHẬP',
                qty: Number(n.slnhan || n.slgiao),
                time: n.dathang.ngayHoanThanhThucte || n.dathang.ngaynhan,
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
                const { ngaychot, title, ghichu, khoId, userId, details: inputDetails, confirmOrderIds } = inventoryData;
                const details = inputDetails;
                if (confirmOrderIds && confirmOrderIds.length > 0) {
                    console.log(`📝 Processing auto-reception for ${confirmOrderIds.length} orders...`);
                    for (const orderId of confirmOrderIds) {
                        const order = await prisma.dathang.findUnique({
                            where: { id: orderId },
                            include: { sanpham: true }
                        });
                        if (order && order.status !== 'danhan') {
                            const targetNgayChot = ngaychot ? new Date(ngaychot) : new Date();
                            const completionDate = new Date(targetNgayChot.getTime() - 1000);
                            const isEdited = order.updatedAt && order.createdAt &&
                                (Math.abs(order.updatedAt.getTime() - order.createdAt.getTime()) > 10000);
                            await prisma.dathang.update({
                                where: { id: orderId },
                                data: {
                                    status: 'danhan',
                                    ngayHoanThanhThucte: completionDate,
                                    updatedAt: completionDate,
                                    sanpham: {
                                        updateMany: order.sanpham.map(sp => ({
                                            where: { id: sp.id },
                                            data: { slnhan: isEdited ? sp.slnhan : (sp.slgiao || sp.sldat) }
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
                                            soluong: isEdited ? sp.slnhan : (sp.slgiao || sp.sldat)
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
                const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
                const [allSanphamKho, allTonKho] = await Promise.all([
                    prisma.sanphamKho.findMany({
                        where: {
                            sanphamId: { in: sanphamIds },
                            khoId: { in: [khoId, KHO_TONG_ID] }
                        }
                    }),
                    prisma.tonKho.findMany({
                        where: { sanphamId: { in: sanphamIds } }
                    })
                ]);
                const sanphamKhoMap = new Map();
                allSanphamKho.forEach((sk) => {
                    sanphamKhoMap.set(`${sk.sanphamId}_${sk.khoId}`, sk);
                });
                const tonKhoMapFinal = new Map(allTonKho.map((tk) => [tk.sanphamId, tk]));
                const targetNgayChot = ngaychot || new Date();
                const lastChot = await prisma.chotkho.findFirst({
                    where: {
                        khoId,
                        isActive: true,
                        ngaychot: { lt: targetNgayChot }
                    },
                    orderBy: { ngaychot: 'desc' },
                    include: {
                        details: true
                    }
                });
                const startTime = lastChot ? lastChot.ngaychot : new Date(0);
                const initialQtyMap = new Map();
                if (lastChot && lastChot.details) {
                    for (const d of lastChot.details) {
                        if (d.sanphamId) {
                            initialQtyMap.set(d.sanphamId, Number(d.sltonthucte) || 0);
                        }
                    }
                }
                const isMainWarehouse = khoId === KHO_TONG_ID;
                const exports = await prisma.donhangsanpham.findMany({
                    where: {
                        idSP: { in: sanphamIds },
                        donhang: {
                            ...(isMainWarehouse ? {} : { khoId }),
                            status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                            OR: [
                                { ngayHoanThanhThucte: { gt: startTime, lte: targetNgayChot } },
                                { ngayHoanThanhThucte: null, ngaygiao: { gt: startTime, lte: targetNgayChot } }
                            ]
                        }
                    }
                });
                const imports = await prisma.dathangsanpham.findMany({
                    where: {
                        idSP: { in: sanphamIds },
                        dathang: {
                            ...(isMainWarehouse ? {} : { khoId }),
                            status: 'danhan',
                            OR: [
                                { ngayHoanThanhThucte: { gt: startTime, lte: targetNgayChot } },
                                { ngayHoanThanhThucte: null, ngaynhan: { gt: startTime, lte: targetNgayChot } }
                            ]
                        }
                    }
                });
                const exportMap = new Map();
                exports.forEach((x) => {
                    const qty = Number(x.slnhan || x.slgiao || x.sldat || 0);
                    exportMap.set(x.idSP, (exportMap.get(x.idSP) || 0) + qty);
                });
                const importMap = new Map();
                imports.forEach((n) => {
                    const qty = Number(n.slnhan || n.slgiao || n.sldat || 0);
                    importMap.set(n.idSP, (importMap.get(n.idSP) || 0) + qty);
                });
                const getCalculatedSystemStock = (spId) => {
                    const init = initialQtyMap.get(spId) || 0;
                    const imp = importMap.get(spId) || 0;
                    const exp = exportMap.get(spId) || 0;
                    return init + imp - exp;
                };
                const chotkhoMaster = await prisma.chotkho.create({
                    data: {
                        ngaychot: targetNgayChot,
                        title: title || `Chốt kho ${targetNgayChot.toLocaleDateString('vi-VN')}`,
                        ghichu: ghichu || '',
                        khoId,
                        userId,
                        codeId: `CHOTKHO_${Date.now()}`,
                        isActive: true
                    }
                });
                console.log(`📦 Created master chotkho record: ${chotkhoMaster.id}`);
                const processedDetails = new Map();
                const TARGET_THOM_XANH_MASP = 'I100220';
                const isExcelChotkho = title && title.includes('[EXCEL]');
                for (const detail of details) {
                    const sp = sanphamMap.get(detail.sanphamId);
                    if (!sp)
                        continue;
                    const titleLower = sp.title.toLowerCase();
                    const masp = sp.masp.trim();
                    const detailGhichu = detail.ghichu || '';
                    let sltonhethong = getCalculatedSystemStock(sp.id);
                    let sltonthucte = Number(detail.sltonthucte);
                    let slhuy = Number(detail.slhuy);
                    let note = detailGhichu || '';
                    const isBap = titleLower.includes('bắp') && !titleLower.includes('cải') && !titleLower.includes('chuối') && !titleLower.includes('đậu') && !titleLower.includes('thịt');
                    const isAutoCarry = titleLower.includes('dưa hấu') || isBap || titleLower.includes('cải chua') || titleLower.includes('hành tây');
                    const isThom = titleLower.includes('thơm') && !titleLower.includes('rau thơm');
                    if (isExcelChotkho) {
                        const inExcel = detailGhichu.includes('Excel') && !detailGhichu.includes('không có trong Excel');
                        sltonthucte = inExcel ? Number(detail.sltonthucte) : 0;
                        slhuy = inExcel ? Number(detail.slhuy) : 0;
                        if (inExcel) {
                            note = `Cập nhật từ Excel (Áp dụng rule: có trong Excel)`;
                            if (sltonhethong < 0) {
                                sltonhethong = 0;
                                note = `Cập nhật từ Excel (Tồn hệ thống âm tự động reset về 0)`;
                            }
                        }
                        else if (sltonhethong < 0) {
                            sltonhethong = 0;
                            sltonthucte = 0;
                            slhuy = 0;
                            note = 'Tự động reset kho âm về 0 (Rules.md)';
                        }
                        else {
                            if (isAutoCarry) {
                                sltonthucte = sltonhethong;
                                note = 'Tự động đưa qua (không có trong Excel - Auto-carried)';
                            }
                            else if (isThom) {
                                const isThomXanh = masp === TARGET_THOM_XANH_MASP;
                                const isThomGot = titleLower.includes('gọt');
                                if (isThomXanh || isThomGot) {
                                    sltonthucte = sltonhethong;
                                    note = 'Tự động đưa qua (Thơm trái xanh/Thơm gọt - Auto-carried)';
                                }
                                else {
                                    sltonthucte = 0;
                                    slhuy = 0;
                                    note = 'Thơm khác reset về 0 (không có trong Excel - Rules.md)';
                                }
                            }
                            else {
                                sltonthucte = 0;
                                slhuy = 0;
                                note = 'Reset về 0 (không có trong Excel - Rules.md)';
                            }
                        }
                    }
                    else {
                        if (sltonhethong < 0) {
                            sltonhethong = 0;
                        }
                        if (note === '') {
                            note = 'Điều chỉnh thủ công';
                        }
                    }
                    processedDetails.set(sp.id, {
                        sanphamId: sp.id,
                        masp,
                        title: sp.title,
                        isThom,
                        titleLower,
                        sltonhethong,
                        sltonthucte,
                        slhuy,
                        ghichu: note
                    });
                }
                if (isExcelChotkho) {
                    const thomXanhProduct = sanphams.find(s => s.masp.trim() === TARGET_THOM_XANH_MASP);
                    let targetThomXanh = thomXanhProduct ? processedDetails.get(thomXanhProduct.id) : null;
                    if (targetThomXanh) {
                        let extraActual = 0;
                        let extraSystem = 0;
                        let extraHuy = 0;
                        for (const p of processedDetails.values()) {
                            if (p.isThom && p.masp !== TARGET_THOM_XANH_MASP) {
                                const isThomGot = p.titleLower.includes('gọt');
                                if (!isThomGot) {
                                    extraActual += p.sltonthucte;
                                    extraSystem += p.sltonhethong;
                                    extraHuy += p.slhuy;
                                    p.sltonhethong = 0;
                                    p.sltonthucte = 0;
                                    p.slhuy = 0;
                                    p.ghichu = `Quy đổi tồn kho về Thơm trái xanh [${TARGET_THOM_XANH_MASP}] (Rules.md)`;
                                }
                            }
                        }
                        if (extraActual > 0 || extraSystem > 0 || extraHuy > 0) {
                            targetThomXanh.sltonthucte += extraActual;
                            targetThomXanh.sltonhethong += extraSystem;
                            targetThomXanh.slhuy += extraHuy;
                            targetThomXanh.ghichu += ` (Nhận quy đổi từ các loại thơm khác: +${extraActual} thực tế, +${extraSystem} hệ thống, +${extraHuy} hủy)`;
                            console.log(`[Thơm Consolidation] Consolidated to Thơm trái xanh [${TARGET_THOM_XANH_MASP}]: extraActual=+${extraActual}, extraSystem=+${extraSystem}, extraHuy=+${extraHuy}`);
                        }
                    }
                }
                let detailCount = 0;
                const pendingWarnings = [];
                const detailRecordsToCreate = [];
                const sanphamKhoUpserts = [];
                const tonKhoUpserts = [];
                for (const p of processedDetails.values()) {
                    const chenhlech = p.sltonhethong - p.sltonthucte - p.slhuy;
                    detailRecordsToCreate.push({
                        id: (0, crypto_1.randomUUID)(),
                        chotkhoId: chotkhoMaster.id,
                        sanphamId: p.sanphamId,
                        sltonhethong: new library_1.Decimal(p.sltonhethong),
                        sltonthucte: new library_1.Decimal(p.sltonthucte),
                        slhuy: new library_1.Decimal(p.slhuy),
                        chenhlech: new library_1.Decimal(chenhlech),
                        ghichu: p.ghichu,
                        userId,
                        ngaychot: chotkhoMaster.ngaychot
                    });
                    sanphamKhoUpserts.push({
                        sanphamId: p.sanphamId,
                        khoId: khoId,
                        soluong: new library_1.Decimal(p.sltonthucte)
                    });
                    const currentSpKho = sanphamKhoMap.get(`${p.sanphamId}_${khoId}`);
                    const oldQty = Number(currentSpKho?.soluong || 0);
                    const delta = p.sltonthucte - oldQty;
                    const currentKhoTongRecord = sanphamKhoMap.get(`${p.sanphamId}_${KHO_TONG_ID}`);
                    let finalTotal = (khoId === KHO_TONG_ID)
                        ? p.sltonthucte
                        : (Number(currentKhoTongRecord?.soluong || 0) + delta);
                    if (finalTotal < 0) {
                        console.warn(`⚠️ [CHOTKHO-SYNC] Product ${p.sanphamId} has negative calculation (${finalTotal}). Clamping to 0.`);
                        finalTotal = 0;
                        if (khoId !== KHO_TONG_ID) {
                            sanphamKhoUpserts.push({
                                sanphamId: p.sanphamId,
                                khoId: KHO_TONG_ID,
                                soluong: new library_1.Decimal(0)
                            });
                        }
                    }
                    else {
                        if (khoId !== KHO_TONG_ID) {
                            sanphamKhoUpserts.push({
                                sanphamId: p.sanphamId,
                                khoId: KHO_TONG_ID,
                                soluong: new library_1.Decimal(Number(currentKhoTongRecord?.soluong || 0) + delta)
                            });
                        }
                    }
                    tonKhoUpserts.push({
                        sanphamId: p.sanphamId,
                        slton: new library_1.Decimal(finalTotal),
                        sltontt: new library_1.Decimal(finalTotal)
                    });
                    detailCount++;
                }
                if (detailRecordsToCreate.length > 0) {
                    await prisma.chotkhodetail.createMany({
                        data: detailRecordsToCreate
                    });
                }
                if (sanphamKhoUpserts.length > 0) {
                    const valuesSql = [];
                    const params = [];
                    let paramIdx = 1;
                    for (const item of sanphamKhoUpserts) {
                        valuesSql.push(`($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}::numeric, NOW(), NOW())`);
                        params.push((0, crypto_1.randomUUID)());
                        params.push(item.khoId);
                        params.push(item.sanphamId);
                        params.push(item.soluong.toString());
                    }
                    const sql = `
            INSERT INTO "SanphamKho" (id, "khoId", "sanphamId", soluong, "createdAt", "updatedAt")
            VALUES ${valuesSql.join(', ')}
            ON CONFLICT ("sanphamId", "khoId") DO UPDATE SET
              soluong = EXCLUDED.soluong,
              "updatedAt" = EXCLUDED."updatedAt"
          `;
                    await prisma.$executeRawUnsafe(sql, ...params);
                }
                if (tonKhoUpserts.length > 0) {
                    const valuesSql = [];
                    const params = [];
                    let paramIdx = 1;
                    for (const item of tonKhoUpserts) {
                        valuesSql.push(`($${paramIdx++}, $${paramIdx++}, $${paramIdx++}::numeric, $${paramIdx++}::numeric, NOW(), NOW())`);
                        params.push((0, crypto_1.randomUUID)());
                        params.push(item.sanphamId);
                        params.push(item.slton.toString());
                        params.push(item.sltontt.toString());
                    }
                    const sql = `
            INSERT INTO "TonKho" (id, "sanphamId", slton, sltontt, "createdAt", "updatedAt")
            VALUES ${valuesSql.join(', ')}
            ON CONFLICT ("sanphamId") DO UPDATE SET
              slton = EXCLUDED.slton,
              sltontt = EXCLUDED.sltontt,
              "updatedAt" = EXCLUDED."updatedAt"
          `;
                    await prisma.$executeRawUnsafe(sql, ...params);
                }
                await prisma.sanphamKho.updateMany({
                    where: { NOT: { khoId: KHO_TONG_ID } },
                    data: { soluong: new library_1.Decimal(0), updatedAt: new Date() }
                });
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
            if (transactionResult.success && transactionResult.data) {
                if (inventoryData.userId) {
                    this.notificationService.sendNotificationToUser(inventoryData.userId, {
                        title: 'Cập nhật tồn kho',
                        body: `Quá trình tạo chốt kho ${transactionResult.data.title} đã hoàn thành.`,
                        url: `/admin/chotkho/${transactionResult.data.id}`
                    }).catch(err => console.error('Error sending push notification:', err));
                }
                this.notificationService.sendChotkhoTelegramNotification(transactionResult.data).catch(err => {
                    console.error('Error sending Telegram notification for chotkho:', err);
                });
            }
            return transactionResult;
        }
        catch (error) {
            console.error('Error in create chotkho:', error);
            throw error;
        }
    }
    async getProductTimeline(sanphamId, khoId, fromDateStr, toDateStr) {
        const fromDate = new Date(fromDateStr);
        const toDate = new Date(toDateStr);
        const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
        const isKhoTong = khoId === KHO_TONG_ID;
        const lastChot = await this.prisma.chotkhodetail.findFirst({
            where: {
                sanphamId,
                ngaychot: { lt: fromDate },
                chotkho: {
                    khoId: isKhoTong ? KHO_TONG_ID : khoId,
                    isActive: true
                }
            },
            orderBy: { ngaychot: 'desc' },
            include: { chotkho: true }
        });
        const anchorTime = lastChot ? lastChot.ngaychot : new Date(0);
        let startQty = lastChot ? Number(lastChot.sltonthucte) : 0;
        const prePhieuKhos = await this.prisma.phieuKhoSanpham.findMany({
            where: {
                sanphamId,
                phieuKho: {
                    khoId: isKhoTong ? undefined : khoId,
                    createdAt: { gt: anchorTime, lt: fromDate },
                    isActive: true
                }
            },
            include: { phieuKho: true }
        });
        prePhieuKhos.forEach(item => {
            if (item.phieuKho.type === 'nhap') {
                startQty += Number(item.soluong);
            }
            else if (item.phieuKho.type === 'xuat') {
                startQty -= Number(item.soluong);
            }
        });
        if (isKhoTong) {
            const preChotKhos = await this.prisma.chotkhodetail.findMany({
                where: {
                    sanphamId,
                    ngaychot: { gt: anchorTime, lt: fromDate },
                    chotkho: {
                        khoId: { not: KHO_TONG_ID },
                        isActive: true
                    }
                }
            });
            preChotKhos.forEach(item => {
                const delta = Number(item.sltonthucte) - Number(item.sltonhethong);
                startQty += delta;
            });
        }
        const phieuKhos = await this.prisma.phieuKhoSanpham.findMany({
            where: {
                sanphamId,
                phieuKho: {
                    khoId: isKhoTong ? undefined : khoId,
                    createdAt: { gte: fromDate, lte: toDate },
                    isActive: true
                }
            },
            include: {
                phieuKho: {
                    include: {
                        dathang: true,
                        donhang: true
                    }
                }
            }
        });
        const chotKhos = await this.prisma.chotkhodetail.findMany({
            where: {
                sanphamId,
                ngaychot: { gte: fromDate, lte: toDate },
                chotkho: {
                    khoId: isKhoTong ? undefined : khoId,
                    isActive: true
                }
            },
            include: {
                chotkho: {
                    include: {
                        kho: true
                    }
                }
            }
        });
        const timeline = [];
        phieuKhos.forEach(item => {
            let slhuy = 0;
            if (item.ghichu && item.ghichu.includes('Hủy:')) {
                const match = item.ghichu.match(/Hủy:\s*([0-9.]+)/);
                if (match) {
                    slhuy = parseFloat(match[1]) || 0;
                }
            }
            let orderId = null;
            let orderType = null;
            if (item.phieuKho?.type === 'nhap') {
                orderId = item.phieuKho.dathang?.id || null;
                orderType = 'dathang';
            }
            else if (item.phieuKho?.type === 'xuat') {
                orderId = item.phieuKho.donhang?.id || null;
                orderType = 'donhang';
            }
            timeline.push({
                id: item.id,
                time: item.phieuKho.createdAt,
                type: item.phieuKho.type === 'nhap' ? 'NHẬP' : 'XUẤT',
                code: item.phieuKho.maphieu || '',
                qty: Number(item.soluong),
                slhuy: slhuy,
                ghichu: item.ghichu || item.phieuKho.ghichu || '',
                orderId,
                orderType
            });
        });
        chotKhos.forEach(item => {
            const khoName = item.chotkho?.kho?.name || '';
            timeline.push({
                id: item.id,
                time: item.ngaychot,
                type: 'CHỐT KHO',
                code: `${isKhoTong && item.chotkho?.khoId !== KHO_TONG_ID ? '[' + khoName + '] ' : ''}${item.chotkho?.title || 'Chốt kho'}`,
                qty: Number(item.sltonthucte),
                sltonhethong: Number(item.sltonhethong),
                chenhlech: Number(item.chenhlech),
                slhuy: Number(item.slhuy),
                ghichu: item.ghichu || '',
                khoId: item.chotkho?.khoId
            });
        });
        timeline.sort((a, b) => a.time.getTime() - b.time.getTime());
        let runningQty = startQty;
        const resultTimeline = [];
        resultTimeline.push({
            id: 'START',
            time: fromDate,
            type: 'TỒN ĐẦU KỲ',
            code: 'START',
            qty: 0,
            balance: runningQty,
            ghichu: `Tồn đầu kỳ tại mốc ${fromDate.toLocaleDateString('vi-VN')}`
        });
        timeline.forEach(event => {
            if (event.type === 'NHẬP') {
                runningQty += event.qty;
            }
            else if (event.type === 'XUẤT') {
                runningQty -= event.qty;
            }
            else if (event.type === 'CHỐT KHO') {
                if (isKhoTong) {
                    if (event.khoId === KHO_TONG_ID) {
                        runningQty = event.qty;
                    }
                    else {
                        const delta = event.qty - event.sltonhethong;
                        runningQty += delta;
                    }
                }
                else {
                    runningQty = event.qty;
                }
            }
            resultTimeline.push({
                ...event,
                balance: runningQty
            });
        });
        return {
            startQty,
            timeline: resultTimeline
        };
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
                    const sanphamIds = data.details.map(d => d.sanphamId);
                    const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
                    const currentKhoId = updatedMaster.khoId;
                    if (!currentKhoId)
                        throw new Error('Không thể tính toán log: phiên chốt kho thiếu khoId');
                    const [allSanphamKho, pendingInAggs, pendingOutAggs] = await Promise.all([
                        prisma.sanphamKho.findMany({
                            where: {
                                sanphamId: { in: sanphamIds },
                                khoId: { in: [currentKhoId, KHO_TONG_ID] }
                            }
                        }),
                        prisma.dathangsanpham.groupBy({
                            by: ['idSP'],
                            where: { idSP: { in: sanphamIds }, dathang: { status: { in: ['dadat', 'dagiao'] } } },
                            _sum: { slnhan: true, sldat: true }
                        }),
                        prisma.donhangsanpham.groupBy({
                            by: ['idSP'],
                            where: { idSP: { in: sanphamIds }, donhang: { status: { in: ['dadat', 'dagiao'] } } },
                            _sum: { slnhan: true, sldat: true }
                        })
                    ]);
                    const sanphamKhoMap = new Map();
                    allSanphamKho.forEach((sk) => sanphamKhoMap.set(`${sk.sanphamId}_${sk.khoId}`, sk));
                    const pendingInMap = new Map(pendingInAggs.map((agg) => [agg.idSP, agg]));
                    const pendingOutMap = new Map(pendingOutAggs.map((agg) => [agg.idSP, agg]));
                    const detailRecordsToCreate = [];
                    const sanphamKhoUpserts = [];
                    const tonKhoUpserts = [];
                    for (const detail of data.details) {
                        const sltonhethong_chuan = Number(detail.sltonhethong);
                        const chenhlech = sltonhethong_chuan - Number(detail.sltonthucte);
                        detailRecordsToCreate.push({
                            id: (0, crypto_1.randomUUID)(),
                            chotkhoId: id,
                            sanphamId: detail.sanphamId,
                            sltonhethong: new library_1.Decimal(sltonhethong_chuan),
                            sltonthucte: new library_1.Decimal(detail.sltonthucte),
                            slhuy: new library_1.Decimal(detail.slhuy),
                            chenhlech: new library_1.Decimal(chenhlech),
                            ghichu: detail.ghichu || '',
                            ngaychot: updatedMaster.ngaychot
                        });
                        sanphamKhoUpserts.push({
                            sanphamId: detail.sanphamId,
                            khoId: currentKhoId,
                            soluong: new library_1.Decimal(detail.sltonthucte)
                        });
                        const currentSpKho = sanphamKhoMap.get(`${detail.sanphamId}_${currentKhoId}`);
                        const oldQty = Number(currentSpKho?.soluong || 0);
                        const delta = Number(detail.sltonthucte) - oldQty;
                        const currentKhoTongRecord = sanphamKhoMap.get(`${detail.sanphamId}_${KHO_TONG_ID}`);
                        let finalTotal = (currentKhoId === KHO_TONG_ID)
                            ? Number(detail.sltonthucte)
                            : (Number(currentKhoTongRecord?.soluong || 0) + delta);
                        if (finalTotal < 0) {
                            console.warn(`⚠️ [CHOTKHO-SYNC] Product ${detail.sanphamId} has negative calculation (${finalTotal}). Clamping to 0.`);
                            finalTotal = 0;
                            if (currentKhoId !== KHO_TONG_ID) {
                                sanphamKhoUpserts.push({
                                    sanphamId: detail.sanphamId,
                                    khoId: KHO_TONG_ID,
                                    soluong: new library_1.Decimal(0)
                                });
                            }
                        }
                        else {
                            if (currentKhoId !== KHO_TONG_ID) {
                                sanphamKhoUpserts.push({
                                    sanphamId: detail.sanphamId,
                                    khoId: KHO_TONG_ID,
                                    soluong: new library_1.Decimal(Number(currentKhoTongRecord?.soluong || 0) + delta)
                                });
                            }
                        }
                        const pIn = pendingInMap.get(detail.sanphamId);
                        const pOut = pendingOutMap.get(detail.sanphamId);
                        const currentPendingIn = Number(pIn?._sum?.sldat || 0) - Number(pIn?._sum?.slnhan || 0);
                        const currentPendingOut = Number(pOut?._sum?.sldat || 0) - Number(pOut?._sum?.slnhan || 0);
                        tonKhoUpserts.push({
                            sanphamId: detail.sanphamId,
                            slton: new library_1.Decimal(finalTotal),
                            sltontt: new library_1.Decimal(finalTotal),
                            slchogiao: new library_1.Decimal(Math.max(0, currentPendingOut)),
                            slchonhap: new library_1.Decimal(Math.max(0, currentPendingIn))
                        });
                    }
                    if (detailRecordsToCreate.length > 0) {
                        await prisma.chotkhodetail.createMany({
                            data: detailRecordsToCreate
                        });
                    }
                    if (sanphamKhoUpserts.length > 0) {
                        const valuesSql = [];
                        const params = [];
                        let paramIdx = 1;
                        for (const item of sanphamKhoUpserts) {
                            valuesSql.push(`($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}::numeric, NOW(), NOW())`);
                            params.push((0, crypto_1.randomUUID)());
                            params.push(item.khoId);
                            params.push(item.sanphamId);
                            params.push(item.soluong.toString());
                        }
                        const sql = `
              INSERT INTO "SanphamKho" (id, "khoId", "sanphamId", soluong, "createdAt", "updatedAt")
              VALUES ${valuesSql.join(', ')}
              ON CONFLICT ("sanphamId", "khoId") DO UPDATE SET
                soluong = EXCLUDED.soluong,
                "updatedAt" = EXCLUDED."updatedAt"
            `;
                        await prisma.$executeRawUnsafe(sql, ...params);
                    }
                    if (tonKhoUpserts.length > 0) {
                        const valuesSql = [];
                        const params = [];
                        let paramIdx = 1;
                        for (const item of tonKhoUpserts) {
                            valuesSql.push(`($${paramIdx++}, $${paramIdx++}, $${paramIdx++}::numeric, $${paramIdx++}::numeric, $${paramIdx++}::numeric, $${paramIdx++}::numeric, NOW(), NOW())`);
                            params.push((0, crypto_1.randomUUID)());
                            params.push(item.sanphamId);
                            params.push(item.slton.toString());
                            params.push(item.sltontt.toString());
                            params.push(item.slchogiao.toString());
                            params.push(item.slchonhap.toString());
                        }
                        const sql = `
              INSERT INTO "TonKho" (id, "sanphamId", slton, sltontt, slchogiao, slchonhap, "createdAt", "updatedAt")
              VALUES ${valuesSql.join(', ')}
              ON CONFLICT ("sanphamId") DO UPDATE SET
                slton = EXCLUDED.slton,
                sltontt = EXCLUDED.sltontt,
                slchogiao = EXCLUDED.slchogiao,
                slchonhap = EXCLUDED.slchonhap,
                "updatedAt" = EXCLUDED."updatedAt"
            `;
                        await prisma.$executeRawUnsafe(sql, ...params);
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
                timeout: 60000,
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
    async getNegativeStockReport() {
        const latestChot = await this.prisma.chotkho.findFirst({
            where: {
                isActive: true,
                ngaychot: { lt: new Date() },
                OR: [
                    { title: { contains: 'Base Line', mode: 'insensitive' } },
                    { title: { contains: 'EXCEL', mode: 'insensitive' } },
                    { title: { contains: 'Chốt kho', mode: 'insensitive' } }
                ]
            },
            orderBy: { ngaychot: 'desc' }
        });
        if (!latestChot) {
            return {
                latestChotkho: null,
                products: []
            };
        }
        const startTime = latestChot.ngaychot;
        const products = await this.prisma.sanpham.findMany({
            select: {
                id: true,
                masp: true,
                title: true,
                dvt: true
            }
        });
        const chotDetails = await this.prisma.chotkhodetail.findMany({
            where: { chotkhoId: latestChot.id },
            select: {
                sanphamId: true,
                sltonthucte: true
            }
        });
        const initialQtyMap = new Map();
        chotDetails.forEach(d => {
            if (d.sanphamId) {
                initialQtyMap.set(d.sanphamId, Number(d.sltonthucte || 0));
            }
        });
        const imports = await this.prisma.dathangsanpham.findMany({
            where: {
                dathang: {
                    status: 'danhan',
                    updatedAt: { gt: startTime }
                }
            },
            select: {
                idSP: true,
                slnhan: true,
                slgiao: true
            }
        });
        const importMap = new Map();
        imports.forEach(imp => {
            const qty = Number(imp.slnhan || imp.slgiao || 0);
            importMap.set(imp.idSP, (importMap.get(imp.idSP) || 0) + qty);
        });
        const exports = await this.prisma.donhangsanpham.findMany({
            where: {
                donhang: {
                    status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                    updatedAt: { gt: startTime }
                }
            },
            select: {
                idSP: true,
                slnhan: true,
                slgiao: true,
                sldat: true
            }
        });
        const exportMap = new Map();
        exports.forEach(exp => {
            const qty = Number(exp.slnhan || exp.slgiao || exp.sldat || 0);
            exportMap.set(exp.idSP, (exportMap.get(exp.idSP) || 0) + qty);
        });
        const negativeProducts = [];
        products.forEach(p => {
            const initialQty = initialQtyMap.get(p.id) || 0;
            const receivedQty = importMap.get(p.id) || 0;
            const shippedQty = exportMap.get(p.id) || 0;
            const systemQty = initialQty + receivedQty - shippedQty;
            if (systemQty < -0.001) {
                negativeProducts.push({
                    id: p.id,
                    masp: p.masp,
                    title: p.title,
                    dvt: p.dvt,
                    initialQty,
                    receivedQty,
                    shippedQty,
                    systemQty
                });
            }
        });
        const negativeProductIds = negativeProducts.map(p => p.id);
        const pendingImports = await this.prisma.dathangsanpham.findMany({
            where: {
                idSP: { in: negativeProductIds },
                dathang: {
                    OR: [
                        { status: { in: ['dadat', 'dagiao'] } },
                        {
                            status: 'danhan',
                            updatedAt: { gt: startTime }
                        }
                    ]
                }
            },
            include: { dathang: true }
        });
        const pendingExports = await this.prisma.donhangsanpham.findMany({
            where: {
                idSP: { in: negativeProductIds },
                donhang: {
                    OR: [
                        { status: { in: ['dadat', 'dagiao'] } },
                        {
                            status: { in: ['danhan', 'hoanthanh'] },
                            updatedAt: { gt: startTime }
                        }
                    ]
                }
            },
            include: { donhang: true }
        });
        const pendingMap = new Map();
        pendingImports.forEach(item => {
            if (item.idSP && item.dathang) {
                const list = pendingMap.get(item.idSP) || [];
                list.push({
                    id: item.dathang.id,
                    code: item.dathang.madncc || `DN-${item.dathang.id.split('-')[0]}`,
                    date: item.dathang.createdAt,
                    type: 'dathang',
                    status: item.dathang.status,
                    soluong: Number(item.slgiao || item.sldat || 0)
                });
                pendingMap.set(item.idSP, list);
            }
        });
        pendingExports.forEach(item => {
            if (item.idSP && item.donhang) {
                const list = pendingMap.get(item.idSP) || [];
                list.push({
                    id: item.donhang.id,
                    code: item.donhang.madonhang || `DH-${item.donhang.id.split('-')[0]}`,
                    date: item.donhang.createdAt,
                    type: 'donhang',
                    status: item.donhang.status,
                    soluong: Number(item.slnhan || item.slgiao || item.sldat || 0)
                });
                pendingMap.set(item.idSP, list);
            }
        });
        negativeProducts.forEach(p => {
            p.pendingList = pendingMap.get(p.id) || [];
        });
        return {
            latestChotkho: {
                id: latestChot.id,
                title: latestChot.title,
                ngaychot: latestChot.ngaychot
            },
            products: negativeProducts
        };
    }
};
exports.ChotkhoService = ChotkhoService;
exports.ChotkhoService = ChotkhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], ChotkhoService);
//# sourceMappingURL=chotkho.service.js.map