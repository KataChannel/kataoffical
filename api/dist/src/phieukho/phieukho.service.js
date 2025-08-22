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
let PhieukhoService = class PhieukhoService {
    constructor(prisma, _ImportdataService) {
        this.prisma = prisma;
        this._ImportdataService = _ImportdataService;
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
            if (!type || !['nhap', 'xuat'].includes(type)) {
                throw new Error(`Invalid type: ${type}`);
            }
            const lastOrder = await this.prisma.phieuKho.findFirst({
                where: { type },
                orderBy: { createdAt: 'desc' },
            });
            let nextCode = type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';
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
            return type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';
        }
    }
    incrementOrderCode(orderCode, type) {
        const prefix = type === 'nhap' ? 'PKN' : 'PKX';
        if (!orderCode || orderCode.length < 8) {
            console.warn(`Invalid orderCode format: ${orderCode}, using default`);
            return type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';
        }
        const letters = orderCode.slice(3, 5);
        const numberPart = orderCode.slice(5);
        const numbers = parseInt(numberPart, 10);
        if (isNaN(numbers) || numbers < 0) {
            console.warn(`Invalid number part in orderCode: ${orderCode}, numberPart: ${numberPart}, parsed: ${numbers}`);
            return type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';
        }
        let newLetters = letters;
        let newNumbers = numbers + 1;
        if (newNumbers > 99999) {
            newNumbers = 1;
            newLetters = this.incrementLetters(letters);
        }
        return `${prefix}${newLetters}${newNumbers.toString().padStart(5, '0')}`;
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
            where: {},
            include: {
                sanpham: { include: { sanpham: true } },
                kho: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return phieuKhos.map((phieuKho) => ({
            ...phieuKho,
            sanpham: phieuKho.sanpham.map((item) => ({
                ...item,
                sanpham: item.sanpham,
            })),
        }));
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
        if (!data.type || !['nhap', 'xuat'].includes(data.type)) {
            throw new common_1.BadRequestException('Invalid phieukho type. Must be "nhap" or "xuat"');
        }
        if (!data.sanpham || !Array.isArray(data.sanpham) || data.sanpham.length === 0) {
            throw new common_1.BadRequestException('Sanpham array is required and cannot be empty');
        }
        for (const sp of data.sanpham) {
            if (!sp.sanphamId || !sp.soluong) {
                throw new common_1.BadRequestException('Each sanpham must have sanphamId and soluong');
            }
        }
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
                    if (soluong > 0) {
                        if (data.type === 'nhap') {
                            await prisma.tonKho.upsert({
                                where: { sanphamId: sp.sanphamId },
                                update: { slton: { increment: soluong } },
                                create: {
                                    sanphamId: sp.sanphamId,
                                    slton: soluong,
                                    slchogiao: 0,
                                    slchonhap: 0
                                }
                            });
                        }
                        else if (data.type === 'xuat') {
                            await prisma.tonKho.upsert({
                                where: { sanphamId: sp.sanphamId },
                                update: { slton: { decrement: soluong } },
                                create: {
                                    sanphamId: sp.sanphamId,
                                    slton: -soluong,
                                    slchogiao: 0,
                                    slchonhap: 0
                                }
                            });
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
    async update(id, data) {
        return this.prisma.$transaction(async (prisma) => {
            const oldPhieuKho = await prisma.phieuKho.findUnique({
                where: { id },
                include: { sanpham: true },
            });
            if (!oldPhieuKho)
                throw new common_1.NotFoundException('Phiếu kho không tồn tại');
            for (const oldSP of oldPhieuKho.sanpham) {
                await prisma.sanpham.update({
                    where: { id: oldSP.sanphamId },
                    data: {
                        soluongkho: oldPhieuKho.type === 'nhap'
                            ? { decrement: Number(oldSP.soluong) || 0 }
                            : { increment: Number(oldSP.soluong) || 0 },
                    },
                });
            }
            const updatedPhieuKho = await prisma.phieuKho.update({
                where: { id },
                data: {
                    maphieu: data.maphieu,
                    ngay: new Date(data.ngay),
                    type: data.type,
                    khoId: data.khoId,
                    ghichu: data.ghichu,
                    isActive: data.isActive ?? true,
                    sanpham: {
                        deleteMany: {},
                        create: data.sanpham.map((sp) => ({
                            sanphamId: sp.sanphamId,
                            soluong: sp.soluong,
                            sldat: sp.sldat,
                            ghichu: sp.ghichu,
                        })),
                    },
                },
                include: { sanpham: true },
            });
            for (const newSP of data.sanpham) {
                await prisma.sanpham.update({
                    where: { id: newSP.sanphamId },
                    data: {
                        soluongkho: data.type === 'nhap'
                            ? { increment: newSP.soluong }
                            : { decrement: newSP.soluong },
                    },
                });
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
            for (const item of phieuKho.sanpham) {
                await prisma.tonKho.update({
                    where: { sanphamId: item.sanphamId },
                    data: {
                        slton: phieuKho.type === 'nhap'
                            ? { decrement: item.soluong ?? 0 }
                            : { increment: item.soluong ?? 0 },
                    },
                });
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
                const tonkhoUpdate = data.type === 'nhap'
                    ? { slton: { increment: data.soluong } }
                    : { slton: { decrement: data.soluong } };
                await this.updateTonKhoSafely(data.sanphamId, tonkhoUpdate);
                if (data.chothkhoId) {
                    await prisma.chotkhoDetail.create({
                        data: {
                            chotkhoId: data.chothkhoId,
                            sanphamId: data.sanphamId,
                            slthucte: 0,
                            slhethong: 0,
                            chenhlech: data.type === 'nhap' ? data.soluong : -data.soluong,
                            ghichu: `Phiếu điều chỉnh: ${maphieu}`,
                            phieukhoId: phieukho.id
                        }
                    });
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
        importdata_service_1.ImportdataService])
], PhieukhoService);
//# sourceMappingURL=phieukho.service.js.map