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
let ChotkhoService = class ChotkhoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    convertDateFilters(filters) {
        const result = {};
        if (filters.fromDate) {
            result.fromDate = new Date(filters.fromDate);
        }
        if (filters.toDate) {
            result.toDate = new Date(filters.toDate);
        }
        return result;
    }
    getStartOfDay(date) {
        const d = new Date(date);
        d.setUTCHours(0, 0, 0, 0);
        return d;
    }
    getEndOfDay(date) {
        const d = new Date(date);
        d.setUTCHours(23, 59, 59, 999);
        return d;
    }
    async getLastUpdatedChotkho() {
        try {
            const item = await this.prisma.chotkho.findFirst({
                orderBy: { updatedAt: 'desc' },
            });
            return { updatedAt: item ? item.updatedAt.getTime() : 0 };
        }
        catch (error) {
            console.log('Error getting last updated chotkho:', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
            const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
            return `CK-${timestamp}-${randomPart}`;
        }
        catch (error) {
            console.log('Error generating codeId:', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const dataArray = Array.isArray(data) ? data : [data];
            return await this.prisma.$transaction(async (prisma) => {
                const result = {
                    status: 'success',
                    created: 0,
                    updated: 0,
                    failed: 0,
                    errors: [],
                    data: [],
                    summary: {
                        totalProcessed: dataArray.length,
                        phieukhoCreated: 0,
                        tonkhoUpdated: 0,
                    }
                };
                try {
                    const sanphamIds = dataArray
                        .filter(item => item.sanphamId)
                        .map(item => item.sanphamId);
                    const tonkhoMap = new Map();
                    if (sanphamIds.length > 0) {
                        const tonkhos = await prisma.tonKho.findMany({
                            where: { sanphamId: { in: sanphamIds } },
                            select: { sanphamId: true, slton: true }
                        });
                        tonkhos.forEach(tk => tonkhoMap.set(tk.sanphamId, tk.slton));
                    }
                    const maxOrder = await prisma.chotkho.aggregate({
                        _max: { order: true },
                    });
                    let currentOrder = (maxOrder._max?.order || 0);
                    const codeIds = await Promise.all(dataArray.map(() => this.generateCodeId()));
                    const existingRecordsMap = new Map();
                    for (const item of dataArray) {
                        if (item.sanphamId && item.ngay) {
                            const startOfDay = new Date(this.getStartOfDay(item.ngay));
                            const endOfDay = new Date(this.getEndOfDay(item.ngay));
                            const existing = await prisma.chotkho.findFirst({
                                where: {
                                    sanphamId: item.sanphamId,
                                    ngay: {
                                        gte: startOfDay,
                                        lte: endOfDay
                                    }
                                }
                            });
                            if (existing) {
                                existingRecordsMap.set(`${item.sanphamId}-${new Date(item.ngay).toISOString().split('T')[0]}`, existing);
                            }
                        }
                    }
                    const chotkhoCreateData = [];
                    const chotkhoUpdateData = [];
                    const phieukhoCreateData = [];
                    const tonkhoUpdates = [];
                    for (let i = 0; i < dataArray.length; i++) {
                        try {
                            const item = dataArray[i];
                            const { sanphamId, tonkhoId, phieukhoId, ngay, slthucte, slhethong, chenhlech, ghichu, title } = item;
                            const dateKey = `${sanphamId}-${new Date(ngay).toISOString().split('T')[0]}`;
                            const existingRecord = existingRecordsMap.get(dateKey);
                            let finalSlhethong = slhethong !== undefined ? Number(slhethong) : 0;
                            if (finalSlhethong === 0 && sanphamId) {
                                finalSlhethong = Number(tonkhoMap.get(sanphamId) || 0);
                            }
                            const finalSlthucte = Number(slthucte || 0);
                            const finalChenhlech = chenhlech !== undefined ? Number(chenhlech) : (finalSlthucte - finalSlhethong);
                            if (existingRecord) {
                                chotkhoUpdateData.push({
                                    id: existingRecord.id,
                                    data: {
                                        slthucte: finalSlthucte,
                                        slhethong: finalSlhethong,
                                        chenhlech: finalChenhlech,
                                        ghichu: ghichu || existingRecord.ghichu,
                                        title: title || existingRecord.title,
                                        updatedAt: new Date(),
                                    }
                                });
                            }
                            else {
                                currentOrder++;
                                const codeId = codeIds[i];
                                const chotkhoData = {
                                    sanphamId,
                                    tonkhoId,
                                    phieukhoId,
                                    ngay: ngay ? new Date(this.getStartOfDay(ngay)) : new Date(this.getStartOfDay(new Date())),
                                    slthucte: finalSlthucte,
                                    slhethong: finalSlhethong,
                                    chenhlech: finalChenhlech,
                                    ghichu,
                                    title,
                                    order: currentOrder,
                                    codeId: codeId,
                                    userId: item.userId,
                                    khoId: item.khoId,
                                    isActive: item.isActive !== undefined ? item.isActive : true,
                                };
                                chotkhoCreateData.push(chotkhoData);
                            }
                            if (finalChenhlech !== 0 && sanphamId) {
                                const codeId = existingRecord ? existingRecord.codeId : codeIds[i];
                                phieukhoCreateData.push({
                                    chotkhoIndex: i,
                                    isUpdate: !!existingRecord,
                                    chotkhoId: existingRecord?.id,
                                    data: {
                                        title: `Điều chỉnh tồn kho - ${codeId}`,
                                        maphieu: `DC-${codeId}`,
                                        ngay: ngay ? new Date(this.getStartOfDay(ngay)) : new Date(this.getStartOfDay(new Date())),
                                        type: finalChenhlech > 0 ? 'nhap' : 'xuat',
                                        isChotkho: true,
                                        khoId: item.khoId || '4cc01811-61f5-4bdc-83de-a493764e9258',
                                        ghichu: `Điều chỉnh theo chốt kho ${codeId}. Chênh lệch: ${finalChenhlech}`,
                                        isActive: true,
                                    },
                                    sanphamData: {
                                        sanphamId: sanphamId,
                                        soluong: Math.abs(finalChenhlech),
                                        ghichu: `Điều chỉnh chốt kho ${codeId}`,
                                    }
                                });
                                tonkhoUpdates.push({
                                    sanphamId,
                                    newSlton: finalSlthucte
                                });
                            }
                        }
                        catch (itemError) {
                            result.failed++;
                            result.errors.push({
                                index: i,
                                item: dataArray[i],
                                error: itemError.message || 'Unknown error processing item',
                            });
                        }
                    }
                    if (chotkhoCreateData.length > 0) {
                        try {
                            await prisma.chotkho.createMany({
                                data: chotkhoCreateData,
                            });
                            result.created = chotkhoCreateData.length;
                        }
                        catch (createError) {
                            result.errors.push({
                                operation: 'bulk create',
                                error: createError.message || 'Failed to bulk create chotkho records',
                            });
                            result.failed += chotkhoCreateData.length;
                        }
                    }
                    if (chotkhoUpdateData.length > 0) {
                        try {
                            const updatePromises = chotkhoUpdateData.map((update) => prisma.chotkho.update({
                                where: { id: update.id },
                                data: update.data,
                            }));
                            await Promise.all(updatePromises);
                            result.updated = chotkhoUpdateData.length;
                        }
                        catch (updateError) {
                            result.errors.push({
                                operation: 'bulk update',
                                error: updateError.message || 'Failed to bulk update chotkho records',
                            });
                            result.failed += chotkhoUpdateData.length;
                        }
                    }
                    const allCodeIds = [...codeIds, ...Array.from(existingRecordsMap.values()).map(r => r.codeId)];
                    const allRecords = await prisma.chotkho.findMany({
                        where: {
                            codeId: { in: allCodeIds }
                        },
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                    profile: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                            kho: true,
                            sanpham: true,
                            tonkho: true,
                        },
                        orderBy: { order: 'asc' }
                    });
                    result.data = allRecords;
                    if (phieukhoCreateData.length > 0) {
                        try {
                            const phieukhoPromises = phieukhoCreateData.map(async (phieuData) => {
                                const phieukho = await prisma.phieuKho.create({
                                    data: {
                                        ...phieuData.data,
                                        sanpham: {
                                            create: [phieuData.sanphamData],
                                        },
                                    },
                                });
                                return {
                                    phieukho,
                                    chotkhoIndex: phieuData.chotkhoIndex,
                                    isUpdate: phieuData.isUpdate,
                                    chotkhoId: phieuData.chotkhoId
                                };
                            });
                            const phieukhoResults = await Promise.all(phieukhoPromises);
                            result.summary.phieukhoCreated = phieukhoResults.length;
                            const chotkhoUpdatePromises = phieukhoResults.map(({ phieukho, chotkhoIndex, isUpdate, chotkhoId }) => {
                                if (isUpdate && chotkhoId) {
                                    return prisma.chotkho.update({
                                        where: { id: chotkhoId },
                                        data: { phieukhoId: phieukho.id },
                                    });
                                }
                                else {
                                    const chotkhoRecord = allRecords.find(r => r.codeId === codeIds[chotkhoIndex]);
                                    if (chotkhoRecord) {
                                        return prisma.chotkho.update({
                                            where: { id: chotkhoRecord.id },
                                            data: { phieukhoId: phieukho.id },
                                        });
                                    }
                                }
                            }).filter(Boolean);
                            await Promise.all(chotkhoUpdatePromises);
                            await Promise.all(tonkhoUpdates.map((update) => prisma.tonKho.update({
                                where: { sanphamId: update.sanphamId },
                                data: { slton: update.newSlton },
                            })));
                            result.summary.tonkhoUpdated = tonkhoUpdates.length;
                        }
                        catch (phieukhoError) {
                            result.errors.push({
                                operation: 'phieukho/tonkho update',
                                error: phieukhoError.message || 'Failed to create phieukho or update tonkho',
                            });
                        }
                    }
                    if (result.failed > 0) {
                        result.status = 'partial';
                    }
                    if (result.created === 0 && result.updated === 0) {
                        result.status = 'failed';
                    }
                    return result;
                }
                catch (transactionError) {
                    result.status = 'failed';
                    result.errors.push({
                        operation: 'transaction',
                        error: transactionError.message || 'Transaction failed',
                    });
                    return result;
                }
            }, {
                maxWait: 20000,
                timeout: 30000,
            });
        }
        catch (error) {
            console.log('Error creating chotkho:', error);
            return {
                status: 'failed',
                created: 0,
                updated: 0,
                failed: 0,
                errors: [{
                        operation: 'main',
                        error: error.message || 'Unknown error',
                    }],
                data: [],
                summary: {
                    totalProcessed: 0,
                    phieukhoCreated: 0,
                    tonkhoUpdated: 0,
                }
            };
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ngay, ...restWhere } = param;
            const where = { ...restWhere };
            if (ngay) {
                const dateStart = new Date(this.getStartOfDay(ngay));
                const dateEnd = new Date(this.getEndOfDay(ngay));
                where.ngay = {
                    gte: dateStart,
                    lte: dateEnd
                };
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                        sanpham: true,
                        tonkho: true,
                    },
                    orderBy: { order: 'asc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            const transformedData = data.map(item => ({
                sanphamId: item.sanphamId,
                masp: item.sanpham?.masp || '',
                tonkhoId: item.tonkhoId,
                phieukhoId: item.phieukhoId,
                ngay: item.ngay,
                slthucte: Number(item.slthucte),
                slhethong: Number(item.slhethong),
                chenhlech: Number(item.chenhlech),
                ghichu: item.ghichu || '',
                title: item.title || '',
                dvt: item.sanpham?.dvt || '',
                sanpham: item.sanpham ? {
                    id: item.sanpham.id,
                    masp: item.sanpham.masp,
                    title: item.sanpham.title,
                    dvt: item.sanpham.dvt
                } : undefined
            }));
            return {
                data: transformedData,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.log('Error finding chotkho by param:', error);
            throw error;
        }
    }
    async tonkhobylist(param) {
        try {
            const result = await this.prisma.tonKho.findMany({
                where: {
                    sanpham: {
                        masp: { in: param },
                    },
                },
                include: {
                    sanpham: true,
                },
            });
            return result;
        }
        catch (error) {
            console.log('Error finding chotkho by maspList:', error);
            throw error;
        }
    }
    async findAll(query) {
        try {
            const { page = 1, pageSize = 20, search = '', trangThai = '', tuNgay = '', denNgay = '', ...filters } = query;
            const pageNum = parseInt(page.toString(), 10);
            const limitNum = parseInt(pageSize.toString(), 10);
            const skip = (pageNum - 1) * limitNum;
            const where = { ...filters };
            if (search) {
                where.OR = [
                    { maChotKho: { contains: search, mode: 'insensitive' } },
                    { tenChotKho: { contains: search, mode: 'insensitive' } },
                    { ghichu: { contains: search, mode: 'insensitive' } },
                    { codeId: { contains: search, mode: 'insensitive' } },
                ];
            }
            if (trangThai) {
                where.trangThai = trangThai;
            }
            if (tuNgay || denNgay) {
                where.AND = where.AND || [];
                if (tuNgay) {
                    where.AND.push({
                        tuNgay: {
                            gte: new Date(this.getStartOfDay(tuNgay)),
                        },
                    });
                }
                if (denNgay) {
                    where.AND.push({
                        denNgay: {
                            lte: new Date(this.getEndOfDay(denNgay)),
                        },
                    });
                }
            }
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limitNum,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page: pageNum,
                limit: limitNum,
                pageCount: Math.ceil(total / limitNum),
            };
        }
        catch (error) {
            console.log('Error finding all chotkho:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.chotkho.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!item)
                throw new common_1.NotFoundException('Chotkho not found');
            return item;
        }
        catch (error) {
            console.log('Error finding chotkho:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const result = await this.prisma.$transaction(async (prisma) => {
                const currentChotkho = await prisma.chotkho.findUnique({
                    where: { id },
                    include: {
                        tonkho: true,
                        sanpham: true,
                    }
                });
                if (!currentChotkho) {
                    throw new common_1.NotFoundException(`Chotkho with ID ${id} not found`);
                }
                let updatedData = { ...data };
                if (data.slthucte !== undefined || data.slhethong !== undefined) {
                    const newSlthucte = Number(data.slthucte ?? currentChotkho.slthucte);
                    const newSlhethong = Number(data.slhethong ?? currentChotkho.slhethong);
                    updatedData.chenhlech = Number((newSlthucte - newSlhethong).toFixed(3));
                }
                if (data.isCompleted || data.isDeliveryCompleted || data.isReceiptCompleted) {
                    updatedData.slchogiao = 0;
                    updatedData.slchonhap = 0;
                }
                if (currentChotkho.tonkhoId && updatedData.chenhlech !== undefined) {
                    const oldChenhlech = Number(currentChotkho.chenhlech);
                    const newChenhlech = Number(updatedData.chenhlech);
                    const chenhlechDiff = newChenhlech - oldChenhlech;
                    if (Math.abs(chenhlechDiff) > 0.001) {
                        const currentTonkho = await prisma.tonKho.findUnique({
                            where: { id: currentChotkho.tonkhoId }
                        });
                        if (currentTonkho) {
                            const newSlton = Number(currentTonkho.slton) + chenhlechDiff;
                            await prisma.tonKho.update({
                                where: { id: currentChotkho.tonkhoId },
                                data: {
                                    slton: Math.max(0, Number(newSlton.toFixed(3)))
                                }
                            });
                        }
                    }
                }
                const updated = await prisma.chotkho.update({
                    where: { id },
                    data: {
                        ...updatedData,
                        updatedAt: new Date(),
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                        sanpham: true,
                        tonkho: true,
                    },
                });
                return updated;
            });
            return result;
        }
        catch (error) {
            console.log('Error updating chotkho:', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const result = await this.prisma.$transaction(async (prisma) => {
                const chotkho = await prisma.chotkho.findUnique({
                    where: { id },
                    include: {
                        phieukho: true,
                        tonkho: true,
                    }
                });
                if (!chotkho) {
                    throw new common_1.NotFoundException(`Chotkho with ID ${id} not found`);
                }
                if (chotkho.phieukhoId) {
                    await prisma.phieuKho.delete({
                        where: { id: chotkho.phieukhoId }
                    });
                }
                if (chotkho.tonkhoId && Number(chotkho.chenhlech) !== 0) {
                    const currentTonkho = await prisma.tonKho.findUnique({
                        where: { id: chotkho.tonkhoId }
                    });
                    if (currentTonkho) {
                        const restoredSlton = Number(currentTonkho.slton) - Number(chotkho.chenhlech);
                        await prisma.tonKho.update({
                            where: { id: chotkho.tonkhoId },
                            data: {
                                slton: Math.max(0, restoredSlton)
                            }
                        });
                    }
                }
                const deleted = await prisma.chotkho.delete({ where: { id } });
                return {
                    deleted,
                    restoredInventory: chotkho.tonkhoId ? true : false,
                    deletedPhieukho: chotkho.phieukhoId ? true : false
                };
            });
            return result;
        }
        catch (error) {
            console.log('Error removing chotkho:', error);
            throw error;
        }
    }
    async bulkDelete(ids) {
        try {
            const result = await this.prisma.$transaction(async (prisma) => {
                const deletedRecords = [];
                const errors = [];
                for (const id of ids) {
                    try {
                        const chotkho = await prisma.chotkho.findUnique({
                            where: { id },
                            include: {
                                phieukho: true,
                                tonkho: true,
                            }
                        });
                        if (!chotkho) {
                            errors.push({ id, error: 'Record not found' });
                            continue;
                        }
                        if (chotkho.phieukhoId) {
                            await prisma.phieuKho.delete({
                                where: { id: chotkho.phieukhoId }
                            });
                        }
                        if (chotkho.tonkhoId && Number(chotkho.chenhlech) !== 0) {
                            const currentTonkho = await prisma.tonKho.findUnique({
                                where: { id: chotkho.tonkhoId }
                            });
                            if (currentTonkho) {
                                const restoredSlton = Number(currentTonkho.slton) - Number(chotkho.chenhlech);
                                await prisma.tonKho.update({
                                    where: { id: chotkho.tonkhoId },
                                    data: {
                                        slton: Math.max(0, restoredSlton)
                                    }
                                });
                            }
                        }
                        const deleted = await prisma.chotkho.delete({ where: { id } });
                        deletedRecords.push(deleted);
                    }
                    catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }
                return {
                    deleted: deletedRecords.length,
                    failed: errors.length,
                    errors,
                    status: errors.length === 0 ? 'success' : (deletedRecords.length > 0 ? 'partial' : 'failed')
                };
            });
            return result;
        }
        catch (error) {
            console.log('Error bulk deleting chotkho:', error);
            throw error;
        }
    }
    async findByDateRange(startDate, endDate, page, limit) {
        try {
            const start = new Date(this.getStartOfDay(startDate));
            const end = endDate
                ? new Date(this.getEndOfDay(endDate))
                : new Date(this.getEndOfDay(startDate));
            const where = {
                ngay: {
                    gte: start,
                    lte: end,
                },
            };
            if (page && limit) {
                const skip = (page - 1) * limit;
                const [allRecords, total] = await Promise.all([
                    this.prisma.chotkho.findMany({
                        where,
                        skip,
                        take: limit,
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                    profile: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                            kho: true,
                            sanpham: true,
                            tonkho: true,
                            phieukho: true,
                        },
                        orderBy: { createdAt: 'desc' },
                    }),
                    this.prisma.chotkho.count({ where }),
                ]);
                const uniqueRecordsMap = new Map();
                allRecords.forEach(record => {
                    const dateKey = new Date(record.ngay).toISOString().split('T')[0];
                    if (!uniqueRecordsMap.has(dateKey) ||
                        record.updatedAt > uniqueRecordsMap.get(dateKey).updatedAt) {
                        uniqueRecordsMap.set(dateKey, record);
                    }
                });
                const data = Array.from(uniqueRecordsMap.values()).map(record => ({
                    id: record.id,
                    title: record.title || record.sanpham?.title || '',
                    ngay: record.ngay,
                }));
                return {
                    data,
                    total: data.length,
                    page,
                    limit,
                    pageCount: Math.ceil(data.length / limit),
                    dateRange: {
                        start,
                        end,
                    },
                };
            }
            const allRecords = await this.prisma.chotkho.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    kho: true,
                    sanpham: true,
                    tonkho: true,
                    phieukho: true,
                },
                orderBy: { createdAt: 'desc' },
            });
            const uniqueRecordsMap = new Map();
            allRecords.forEach(record => {
                const dateKey = new Date(record.ngay).toISOString().split('T')[0];
                const key = `${dateKey}-${record.sanphamId}`;
                if (!uniqueRecordsMap.has(key) ||
                    record.updatedAt > uniqueRecordsMap.get(key).updatedAt) {
                    uniqueRecordsMap.set(key, record);
                }
            });
            const data = Array.from(uniqueRecordsMap.values());
            return {
                data,
                total: data.length,
                dateRange: {
                    start,
                    end,
                },
            };
        }
        catch (error) {
            console.log('Error finding chotkho by date range:', error);
            throw error;
        }
    }
    async generateReport(query) {
        try {
            const { startDate, endDate, format = 'json', khoId = '', sanphamId = '', } = query;
            const where = {};
            if (startDate || endDate) {
                where.ngay = {};
                if (startDate) {
                    where.ngay.gte = new Date(this.getStartOfDay(startDate));
                }
                if (endDate) {
                    where.ngay.lte = new Date(this.getEndOfDay(endDate));
                }
            }
            if (khoId) {
                where.khoId = khoId;
            }
            if (sanphamId) {
                where.sanphamId = sanphamId;
            }
            const chotkhoRecords = await this.prisma.chotkho.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    kho: true,
                    sanpham: true,
                    tonkho: true,
                    phieukho: true,
                },
                orderBy: { createdAt: 'desc' },
            });
            const summary = {
                totalRecords: chotkhoRecords.length,
                totalChenhLech: chotkhoRecords.reduce((sum, ck) => sum + Number(ck.chenhlech || 0), 0),
                totalSlThucTe: chotkhoRecords.reduce((sum, ck) => sum + Number(ck.slthucte || 0), 0),
                totalSlHeThong: chotkhoRecords.reduce((sum, ck) => sum + Number(ck.slhethong || 0), 0),
                dateRange: {
                    start: startDate,
                    end: endDate,
                },
                filters: {
                    khoId,
                    sanphamId,
                },
            };
            const khoStats = chotkhoRecords.reduce((acc, ck) => {
                const khoName = ck.kho?.name || 'Unknown';
                if (!acc[khoName]) {
                    acc[khoName] = {
                        count: 0,
                        totalChenhLech: 0,
                        totalSlThucTe: 0,
                        totalSlHeThong: 0,
                    };
                }
                acc[khoName].count += 1;
                acc[khoName].totalChenhLech += Number(ck.chenhlech || 0);
                acc[khoName].totalSlThucTe += Number(ck.slthucte || 0);
                acc[khoName].totalSlHeThong += Number(ck.slhethong || 0);
                return acc;
            }, {});
            const reportData = {
                summary,
                khoStats,
                records: chotkhoRecords,
                generatedAt: new Date(),
                generatedBy: 'system',
            };
            if (format === 'excel') {
                return {
                    ...reportData,
                    format: 'excel',
                    downloadUrl: '/api/chotkho/report/download',
                };
            }
            return reportData;
        }
        catch (error) {
            console.log('Error generating report:', error);
            throw error;
        }
    }
    async reorderChotkhos(chotkhoIds) {
        try {
            for (let i = 0; i < chotkhoIds.length; i++) {
                await this.prisma.chotkho.update({
                    where: { id: chotkhoIds[i] },
                    data: { order: i + 1 },
                });
            }
            return {
                status: 'success',
                message: 'Chotkho records reordered successfully',
            };
        }
        catch (error) {
            console.log('Error reordering chotkho:', error);
            throw error;
        }
    }
    async getStatistics() {
        try {
            const [total, activeCount, inactiveCount] = await Promise.all([
                this.prisma.chotkho.count(),
                this.prisma.chotkho.count({ where: { isActive: true } }),
                this.prisma.chotkho.count({ where: { isActive: false } }),
            ]);
            const avgChenhLech = await this.prisma.chotkho.aggregate({
                _avg: { chenhlech: true },
            });
            return {
                total,
                active: activeCount,
                inactive: inactiveCount,
                averageChenhLech: avgChenhLech._avg.chenhlech || 0,
            };
        }
        catch (error) {
            console.log('Error getting statistics:', error);
            throw error;
        }
    }
    async bulkUpdateActive(ids, isActive) {
        try {
            const updated = await this.prisma.chotkho.updateMany({
                where: { id: { in: ids } },
                data: {
                    isActive,
                    updatedAt: new Date(),
                },
            });
            return {
                status: 'success',
                message: `Updated ${updated.count} chotkho records`,
                count: updated.count,
            };
        }
        catch (error) {
            console.log('Error bulk updating chotkho active status:', error);
            throw error;
        }
    }
    async bulkCreateChotkho(dataList) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const results = [];
                for (const data of dataList) {
                    let slhethong = 0;
                    if (data.sanphamId) {
                        const tonkho = await prisma.tonKho.findUnique({
                            where: { sanphamId: data.sanphamId },
                        });
                        slhethong = Number(tonkho?.slton || 0);
                    }
                    const slthucte = Number(data.slthucte || 0);
                    const chenhlech = slthucte - slhethong;
                    const maxOrder = await prisma.chotkho.aggregate({
                        _max: { order: true },
                    });
                    const newOrder = (maxOrder._max?.order || 0) + 1;
                    const codeId = await this.generateCodeId();
                    const created = await prisma.chotkho.create({
                        data: {
                            ...data,
                            order: newOrder,
                            codeId: codeId,
                            slhethong: slhethong,
                            slthucte: slthucte,
                            chenhlech: chenhlech,
                        },
                        include: {
                            kho: true,
                            sanpham: true,
                            tonkho: true,
                        },
                    });
                    if (chenhlech !== 0 && data.sanphamId) {
                        const phieuKhoData = {
                            title: `Điều chỉnh tồn kho - ${created.codeId}`,
                            maphieu: `DC-${created.codeId}`,
                            ngay: new Date(data.ngay || new Date()),
                            type: chenhlech > 0 ? 'nhap' : 'xuat',
                            isChotkho: true,
                            khoId: data.khoId || '4cc01811-61f5-4bdc-83de-a493764e9258',
                            ghichu: `Điều chỉnh theo chốt kho ${created.codeId}. Chênh lệch: ${chenhlech}`,
                            isActive: true,
                            sanpham: {
                                create: [
                                    {
                                        sanphamId: data.sanphamId,
                                        soluong: Math.abs(chenhlech),
                                        ghichu: `Điều chỉnh chốt kho ${created.codeId}`,
                                    },
                                ],
                            },
                        };
                        const phieukho = await prisma.phieuKho.create({
                            data: phieuKhoData,
                            include: { sanpham: true },
                        });
                        await prisma.chotkho.update({
                            where: { id: created.id },
                            data: { phieukhoId: phieukho.id },
                        });
                        await prisma.tonKho.update({
                            where: { sanphamId: data.sanphamId },
                            data: {
                                slton: slthucte,
                            },
                        });
                    }
                    results.push(created);
                }
                return {
                    status: 'success',
                    message: `Created ${results.length} chotkho records`,
                    data: results,
                };
            });
        }
        catch (error) {
            console.log('Error bulk creating chotkho:', error);
            throw error;
        }
    }
    async findBySanpham(sanphamId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const where = { sanphamId };
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                        kho: true,
                        sanpham: true,
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
                sanphamId,
            };
        }
        catch (error) {
            console.log('Error finding chotkho by sanpham:', error);
            throw error;
        }
    }
    async findByKho(khoId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const where = { khoId };
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                        kho: true,
                        sanpham: true,
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
                khoId,
            };
        }
        catch (error) {
            console.log('Error finding chotkho by kho:', error);
            throw error;
        }
    }
};
exports.ChotkhoService = ChotkhoService;
exports.ChotkhoService = ChotkhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChotkhoService);
//# sourceMappingURL=chotkho.service.js.map