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
exports.PhieukhoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const importdata_service_1 = require("../importdata/importdata.service");
const tonkho_manager_service_1 = require("../common/tonkho-manager.service");
let PhieukhoService = class PhieukhoService {
    constructor(prisma, _ImportdataService, tonkhoManager) {
        this.prisma = prisma;
        this._ImportdataService = _ImportdataService;
        this.tonkhoManager = tonkhoManager;
    }
    formatDateForFilename() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }
    async generateNextOrderCode(type) {
        try {
            if (!type || !['nhap', 'xuat', 'chuyenkho'].includes(type)) {
                throw new Error(`Invalid type: ${type}`);
            }
            const lastOrder = await this.prisma.phieuKho.findFirst({
                where: { type },
                orderBy: { createdAt: 'desc' },
            });
            let nextCode = 'PKNAA00001';
            if (type === 'xuat')
                nextCode = 'PKXAA00001';
            if (type === 'chuyenkho')
                nextCode = 'PK-CK-AA0001';
            if (lastOrder && lastOrder.maphieu) {
                console.log(`Last order found: ${lastOrder.maphieu} for type: ${type}`);
                nextCode = this.incrementOrderCode(lastOrder.maphieu, type);
                console.log(`Generated next code: ${nextCode}`);
            }
            else {
                console.log(`No previous orders found for type: ${type}, using default: ${nextCode}`);
            }
            return nextCode;
        }
        catch (error) {
            console.error('Error in generateNextOrderCode:', error);
            return type === 'nhap' ? 'PKNAA00001' : (type === 'xuat' ? 'PKXAA00001' : 'PK-CK-AA0001');
        }
    }
    incrementOrderCode(orderCode, type) {
        let prefix = 'PKN';
        let numberPartLength = 5;
        let letterStartIndex = 3;
        if (type === 'xuat') {
            prefix = 'PKX';
            numberPartLength = 5;
            letterStartIndex = 3;
        }
        else if (type === 'chuyenkho') {
            prefix = 'PK-CK-';
            numberPartLength = 4;
            letterStartIndex = 6;
        }
        if (!orderCode || !orderCode.startsWith(prefix)) {
            console.warn(`Invalid orderCode prefix: ${orderCode}, expected ${prefix}. Using default.`);
            return type === 'nhap' ? 'PKNAA00001' : (type === 'xuat' ? 'PKXAA00001' : 'PK-CK-AA0001');
        }
        const letters = orderCode.slice(letterStartIndex, letterStartIndex + 2);
        const numberPart = orderCode.slice(letterStartIndex + 2);
        const numbers = parseInt(numberPart, 10);
        if (isNaN(numbers) || numbers < 0) {
            console.warn(`Invalid number part in orderCode: ${orderCode}, numberPart: ${numberPart}, parsed: ${numbers}`);
            return type === 'nhap' ? 'PKNAA00001' : (type === 'xuat' ? 'PKXAA00001' : 'PK-CK-AA0001');
        }
        let newLetters = letters;
        let newNumbers = numbers + 1;
        const maxNumber = Math.pow(10, numberPartLength) - 1;
        if (newNumbers > maxNumber) {
            newNumbers = 1;
            newLetters = this.incrementLetters(letters);
        }
        return `${prefix}${newLetters}${newNumbers.toString().padStart(numberPartLength, '0')}`;
    }
    incrementLetters(letters) {
        if (!letters || letters.length !== 2) {
            console.warn(`Invalid letters format: ${letters}, using default AA`);
            return 'AA';
        }
        let firstChar = letters.charCodeAt(0);
        let secondChar = letters.charCodeAt(1);
        if (firstChar < 65 || firstChar > 90 || secondChar < 65 || secondChar > 90) {
            console.warn(`Invalid letter characters: ${letters}, using default AA`);
            return 'AA';
        }
        if (secondChar === 90) {
            if (firstChar === 90)
                return 'ZZ';
            firstChar++;
            secondChar = 65;
        }
        else {
            secondChar++;
        }
        return String.fromCharCode(firstChar) + String.fromCharCode(secondChar);
    }
    async xuatnhapton(query) {
        const { khoId, Batdau, Ketthuc } = query;
        const phieuKhos = await this.prisma.phieuKho.findMany({
            where: {
                ...(khoId && { khoId }),
                ngay: {
                    gte: new Date(Batdau),
                    lte: new Date(Ketthuc),
                },
            },
            include: {
                sanpham: { include: { sanpham: true } },
                kho: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        const tranData = phieuKhos.map((phieuKho) => ({
            khoname: phieuKho.kho?.name ?? '',
            maphieu: phieuKho.maphieu,
            ngay: phieuKho.ngay,
            type: phieuKho.type,
            sanpham: phieuKho.sanpham.map((item) => ({
                id: item.id,
                soluong: item.soluong,
                title: item.sanpham.title,
            })),
        }));
        console.log(tranData);
        return tranData;
    }
    async findAll() {
        const phieuKhos = await this.prisma.phieuKho.findMany({
            take: 100,
            where: { isActive: true },
            include: {
                sanpham: { select: { id: true, soluong: true, ghichu: true, sanpham: { select: { id: true, masp: true, title: true } } } },
                kho: { select: { id: true, name: true } },
                tuKho: { select: { id: true, name: true } },
                denKho: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return phieuKhos;
    }
    async findByRange(start, end) {
        const phieuKhos = await this.prisma.phieuKho.findMany({
            where: {
                isActive: true,
                ngay: {
                    gte: new Date(start),
                    lte: new Date(end),
                },
            },
            include: {
                sanpham: { select: { id: true, soluong: true, ghichu: true, sanpham: { select: { id: true, masp: true, title: true } } } },
                kho: { select: { id: true, name: true } },
                tuKho: { select: { id: true, name: true } },
                denKho: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return phieuKhos;
    }
    async findOne(id) {
        const phieuKho = await this.prisma.phieuKho.findUnique({
            where: { id },
            include: {
                sanpham: true,
                kho: true,
            },
        });
        if (!phieuKho)
            throw new common_1.NotFoundException('phieuKho not found');
        return phieuKho;
    }
    async create(data) {
        if (!data.type || !['nhap', 'xuat', 'chuyenkho'].includes(data.type)) {
            throw new common_1.BadRequestException('Invalid phieukho type. Must be "nhap", "xuat" or "chuyenkho"');
        }
        if (!data.sanpham || !Array.isArray(data.sanpham) || data.sanpham.length === 0) {
            throw new common_1.BadRequestException('Sanpham array is required and cannot be empty');
        }
        const mergedSanphamMap = new Map();
        for (const sp of data.sanpham) {
            if (!sp.sanphamId)
                continue;
            if (mergedSanphamMap.has(sp.sanphamId)) {
                const existing = mergedSanphamMap.get(sp.sanphamId);
                existing.soluong = (Number(existing.soluong) || 0) + (Number(sp.soluong) || 0);
                if (sp.ghichu)
                    existing.ghichu = existing.ghichu ? `${existing.ghichu}; ${sp.ghichu}` : sp.ghichu;
            }
            else {
                mergedSanphamMap.set(sp.sanphamId, { ...sp });
            }
        }
        data.sanpham = Array.from(mergedSanphamMap.values());
        let maphieukho = '';
        let attempts = 0;
        const maxAttempts = 5;
        while (attempts < maxAttempts) {
            try {
                maphieukho = await this.generateNextOrderCode(data.type);
                break;
            }
            catch (error) {
                attempts++;
                console.log(`Error generating maphieu, attempt ${attempts}:`, error.message);
                if (attempts >= maxAttempts) {
                    throw new common_1.BadRequestException('Failed to generate unique maphieu after multiple attempts');
                }
                await new Promise(resolve => setTimeout(resolve, 100 * attempts));
            }
        }
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const existingPhieukho = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieukho }
                });
                if (existingPhieukho) {
                    throw new common_1.BadRequestException(`Maphieu ${maphieukho} already exists`);
                }
                const newPhieuKho = await prisma.phieuKho.create({
                    data: {
                        title: data.title,
                        maphieu: maphieukho,
                        ngay: new Date(data.ngay),
                        type: data.type,
                        isChotkho: data.isChotkho || false,
                        khoId: data.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258",
                        tuKhoId: data.tuKhoId,
                        denKhoId: data.denKhoId,
                        madonhang: data.madonhang,
                        madncc: data.madncc,
                        ghichu: data.ghichu,
                        isActive: data.isActive ?? true,
                        sanpham: {
                            create: data.sanpham.map((sp) => ({
                                sanphamId: sp.sanphamId,
                                soluong: Number(sp.soluong) || 0,
                                ghichu: sp.ghichu || '',
                            })),
                        },
                    },
                    include: { sanpham: true },
                });
                for (const sp of data.sanpham) {
                    const soluong = Number(sp.soluong) || 0;
                    if (soluong > 0 || (data.useAbsoluteTarget && sp.targetSlton !== undefined)) {
                        const currentTonKho = await prisma.tonKho.findUnique({
                            where: { sanphamId: sp.sanphamId }
                        });
                        const currentSltontt = currentTonKho ? (Number(currentTonKho.sltontt) || 0) : 0;
                        if (data.isChotkho) {
                            let targetStock;
                            if (data.useAbsoluteTarget && sp.targetSlton !== undefined) {
                                targetStock = Number(sp.targetSlton);
                                console.log(`📌 [CHOTKHO-ABS] ${sp.sanphamId}: sltontt ${currentSltontt} → ${targetStock} (absolute target)`);
                            }
                            else {
                                targetStock = data.type === 'nhap' ? currentSltontt + soluong : currentSltontt - soluong;
                                console.log(`📌 [CHOTKHO-DELTA] ${sp.sanphamId}: sltontt ${currentSltontt} → ${targetStock} (delta: ${soluong})`);
                            }
                            if (targetStock < 0) {
                                console.warn(`⚠️ [CHOTKHO] ${sp.sanphamId}: targetStock=${targetStock} < 0, setting to 0`);
                                targetStock = 0;
                            }
                            await prisma.tonKho.upsert({
                                where: { sanphamId: sp.sanphamId },
                                update: {
                                    slton: targetStock,
                                    sltontt: targetStock
                                },
                                create: {
                                    sanphamId: sp.sanphamId,
                                    slton: targetStock,
                                    sltontt: targetStock,
                                    slchogiao: 0,
                                    slchonhap: 0
                                }
                            });
                        }
                        else if (data.type === 'chuyenkho') {
                            if (!data.tuKhoId || !data.denKhoId) {
                                throw new common_1.BadRequestException('tuKhoId and denKhoId are required for transfers');
                            }
                            if (data.tuKhoId === data.denKhoId) {
                                throw new common_1.BadRequestException('Source and Destination warehouses must be different');
                            }
                            await prisma.sanphamKho.upsert({
                                where: {
                                    sanphamId_khoId: {
                                        sanphamId: sp.sanphamId,
                                        khoId: data.tuKhoId
                                    }
                                },
                                update: { soluong: { decrement: soluong } },
                                create: { khoId: data.tuKhoId, sanphamId: sp.sanphamId, soluong: -soluong }
                            });
                            await prisma.sanphamKho.upsert({
                                where: {
                                    sanphamId_khoId: {
                                        sanphamId: sp.sanphamId,
                                        khoId: data.denKhoId
                                    }
                                },
                                update: { soluong: { increment: soluong } },
                                create: { khoId: data.denKhoId, sanphamId: sp.sanphamId, soluong: soluong }
                            });
                        }
                        else {
                            await this.tonkhoManager.updateTonkhoAtomic([{
                                    sanphamId: sp.sanphamId,
                                    khoId: data.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258",
                                    operation: data.type === 'nhap' ? 'increment' : 'decrement',
                                    slton: soluong,
                                    reason: `Phiếu kho ${data.type}: ${maphieukho}`
                                }], prisma);
                        }
                    }
                }
                console.log(`✅ Created phieukho: ${maphieukho} with ${data.sanpham.length} items`);
                return newPhieuKho;
            });
        }
        catch (error) {
            console.error('Error creating phieukho:', error);
            try {
                await this._ImportdataService.create({
                    caseDetail: {
                        errorMessage: error.message,
                        errorStack: error.stack,
                        additionalInfo: `Error creating phieukho with maphieu: ${maphieukho}`,
                        inputData: JSON.stringify(data)
                    },
                    order: 1,
                    createdBy: 'system',
                    title: `Phieukho Creation Error ${new Date().toLocaleString('vi-VN')}`,
                    type: 'phieukho_error',
                });
            }
            catch (logError) {
                console.error('Error logging to ImportdataService:', logError);
            }
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException(`Duplicate entry: ${error.meta?.target || 'unknown field'}`);
            }
            else if (error.code === 'P2003') {
                throw new common_1.BadRequestException('Foreign key constraint violation. Check sanphamId validity.');
            }
            else if (error.code === '25P02') {
                throw new common_1.BadRequestException('Transaction was aborted. Please try again.');
            }
            else {
                throw new common_1.BadRequestException(`Failed to create phieukho: ${error.message}`);
            }
        }
    }
    async shouldSkipInventory(phieukho, prisma) {
        const latestChot = await prisma.chotkho.findFirst({
            where: { khoId: phieukho.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258", isActive: true },
            orderBy: { ngaychot: 'desc' },
            select: { ngaychot: true }
        });
        if (!latestChot)
            return false;
        const effectiveDate = phieukho.ngay || phieukho.createdAt;
        return new Date(effectiveDate) <= new Date(latestChot.ngaychot);
    }
    async update(id, data) {
        return this.prisma.$transaction(async (prisma) => {
            const oldPhieuKho = await prisma.phieuKho.findUnique({
                where: { id },
                include: { sanpham: true },
            });
            if (!oldPhieuKho)
                throw new common_1.NotFoundException('Phiếu kho không tồn tại');
            const skipInventory = await this.shouldSkipInventory(oldPhieuKho, prisma);
            const revertOps = oldPhieuKho.sanpham.map(sp => ({
                sanphamId: sp.sanphamId,
                khoId: oldPhieuKho.khoId || undefined,
                operation: (oldPhieuKho.type === 'nhap' ? 'decrement' : 'increment'),
                slton: Number(sp.soluong) || 0,
                reason: `Hoàn tồn để cập nhật phiếu kho: ${oldPhieuKho.maphieu}`
            }));
            if (revertOps.length > 0 && !skipInventory) {
                await this.tonkhoManager.updateTonkhoAtomic(revertOps, prisma);
            }
            const updatedPhieuKho = await prisma.phieuKho.update({
                where: { id },
                data: {
                    maphieu: data.maphieu,
                    ngay: new Date(data.ngay),
                    type: data.type,
                    khoId: data.khoId,
                    ghichu: data.ghichu,
                    madonhang: data.madonhang,
                    madncc: data.madncc,
                    isActive: data.isActive ?? true,
                    sanpham: {
                        deleteMany: {},
                        create: data.sanpham.map((sp) => ({
                            sanphamId: sp.sanphamId,
                            soluong: Number(sp.soluong) || 0,
                            sldat: Number(sp.sldat) || 0,
                            ghichu: sp.ghichu,
                        })),
                    },
                },
                include: { sanpham: true },
            });
            const applyOps = data.sanpham.map((sp) => ({
                sanphamId: sp.sanphamId,
                khoId: data.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258",
                operation: (data.type === 'nhap' ? 'increment' : 'decrement'),
                slton: Number(sp.soluong) || 0,
                reason: `Áp dụng tồn mới khi cập nhật phiếu kho: ${data.maphieu}`
            }));
            if (applyOps.length > 0 && !skipInventory) {
                await this.tonkhoManager.updateTonkhoAtomic(applyOps, prisma);
            }
            return updatedPhieuKho;
        });
    }
    async remove(id) {
        return this.prisma.$transaction(async (prisma) => {
            const phieuKho = await prisma.phieuKho.findUnique({
                where: { id },
                include: { sanpham: true },
            });
            if (!phieuKho) {
                throw new common_1.NotFoundException('Phiếu kho không tồn tại');
            }
            const skipInventory = await this.shouldSkipInventory(phieuKho, prisma);
            const tonkhoOps = phieuKho.sanpham.map(item => ({
                sanphamId: item.sanphamId,
                khoId: phieuKho.khoId || undefined,
                operation: (phieuKho.type === 'nhap' ? 'decrement' : 'increment'),
                slton: Number(item.soluong) || 0,
                reason: `Hoàn tồn do xóa phiếu kho ${phieuKho.maphieu}`
            }));
            if (tonkhoOps.length > 0 && !skipInventory) {
                await this.tonkhoManager.updateTonkhoAtomic(tonkhoOps, prisma);
            }
            await prisma.phieuKhoSanpham.deleteMany({ where: { phieuKhoId: id } });
            return prisma.phieuKho.delete({ where: { id } });
        });
    }
    async createAdjustmentPhieuKho(data) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const maphieu = await this.generateNextOrderCode(data.type);
                const phieukho = await prisma.phieuKho.create({
                    data: {
                        maphieu,
                        type: data.type,
                        ngay: new Date(),
                        ghichu: data.ghichu,
                        khoId: data.khoId,
                        isActive: true
                    }
                });
                await prisma.phieuKhoSanpham.create({
                    data: {
                        phieuKhoId: phieukho.id,
                        sanphamId: data.sanphamId,
                        soluong: data.soluong,
                        ghichu: data.ghichu
                    }
                });
                await this.tonkhoManager.updateTonkhoAtomic([{
                        sanphamId: data.sanphamId,
                        khoId: data.khoId,
                        operation: data.type === 'nhap' ? 'increment' : 'decrement',
                        slton: data.soluong,
                        reason: `Áp dụng tồn điều chỉnh: ${maphieu}`
                    }], prisma);
                if (data.chothkhoId) {
                    console.log(`📝 Inventory adjustment logged: Product ${data.sanphamId}, Type: ${data.type}, Amount: ${data.soluong}, PhieuKho: ${maphieu}`);
                }
                return {
                    success: true,
                    phieukho,
                    message: `Đã tạo phiếu ${data.type} điều chỉnh: ${maphieu}`
                };
            });
        }
        catch (error) {
            console.error('Error creating adjustment phieukho:', error);
            return {
                success: false,
                message: error.message || 'Lỗi tạo phiếu điều chỉnh'
            };
        }
    }
    async updateTonKhoSafely(sanphamId, updateData) {
        try {
            const existingTonKho = await this.prisma.tonKho.findUnique({
                where: { sanphamId }
            });
            if (existingTonKho) {
                await this.prisma.tonKho.update({
                    where: { sanphamId },
                    data: updateData
                });
            }
            else {
                const initialValue = this.calculateInitialTonKhoValue(updateData);
                await this.prisma.tonKho.create({
                    data: {
                        sanphamId,
                        slton: initialValue.slton,
                        sltontt: initialValue.slton,
                        slchogiao: 0,
                        slchonhap: 0
                    }
                });
            }
        }
        catch (error) {
            console.error(`Error updating TonKho for product ${sanphamId}:`, error);
            throw error;
        }
    }
    calculateInitialTonKhoValue(updateData) {
        let slton = 0;
        if (updateData.slton) {
            if (typeof updateData.slton === 'object' && updateData.slton.increment) {
                slton = updateData.slton.increment;
            }
            else if (typeof updateData.slton === 'object' && updateData.slton.decrement) {
                slton = -updateData.slton.decrement;
            }
            else {
                slton = updateData.slton;
            }
        }
        return { slton };
    }
};
exports.PhieukhoService = PhieukhoService;
exports.PhieukhoService = PhieukhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        importdata_service_1.ImportdataService,
        tonkho_manager_service_1.TonkhoManagerService])
], PhieukhoService);
//# sourceMappingURL=phieukho.service.js.map