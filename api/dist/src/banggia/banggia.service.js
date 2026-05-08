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
exports.BanggiaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const importdata_service_1 = require("../importdata/importdata.service");
const socket_gateway_1 = require("../socket.gateway");
const banggia_price_history_service_1 = require("./banggia-price-history.service");
let BanggiaService = class BanggiaService {
    constructor(prisma, _SocketGateway, _ImportdataService, priceHistoryService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ImportdataService = _ImportdataService;
        this.priceHistoryService = priceHistoryService;
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
    async importSPBG(listBanggia) {
        try {
            console.log(`Starting import of ${listBanggia.length} price lists`);
            if (!listBanggia || !Array.isArray(listBanggia)) {
                throw new common_1.InternalServerErrorException('Invalid data format: listBanggia must be an array');
            }
            if (listBanggia.length > 200) {
                throw new common_1.InternalServerErrorException(`Data too large: ${listBanggia.length} items. Maximum recommended: 200 items per request. Please split your data into smaller batches.`);
            }
            const invalidBanggias = listBanggia.filter((bg, index) => {
                if (!bg || typeof bg !== 'object') {
                    console.warn(`Invalid banggia at index ${index}:`, bg);
                    return true;
                }
                if (!bg.mabanggia || bg.mabanggia.trim() === '') {
                    console.warn(`Empty mabanggia at index ${index}:`, bg);
                    return true;
                }
                return false;
            });
            if (invalidBanggias.length > 0) {
                throw new common_1.InternalServerErrorException(`Found ${invalidBanggias.length} invalid banggia records. Please check your data format.`);
            }
            console.log(listBanggia[0]);
            const banggiagoc = listBanggia.find(bg => bg.mabanggia === 'giaban');
            if (banggiagoc && banggiagoc.sanpham && Array.isArray(banggiagoc.sanpham)) {
                const validSanpham = banggiagoc.sanpham.filter((sp) => {
                    if (!sp.masp || sp.masp.trim() === '') {
                        console.warn(`Skipping product with empty masp in banggiagoc:`, sp);
                        return false;
                    }
                    return true;
                });
                console.log(`Updating giaban for ${validSanpham.length} valid products`);
                const sanphamBatchSize = 50;
                for (let i = 0; i < validSanpham.length; i += sanphamBatchSize) {
                    const batch = validSanpham.slice(i, i + sanphamBatchSize);
                    await Promise.all(batch.map(async (sp) => {
                        try {
                            await this.prisma.sanpham.updateMany({
                                where: { masp: sp.masp },
                                data: { giaban: Number(sp.giaban) || 0 }
                            });
                        }
                        catch (updateError) {
                            console.log(`Failed to update sanpham ${sp.masp}:`, updateError);
                        }
                    }));
                    if (i + sanphamBatchSize < validSanpham.length) {
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
            }
            const allProductIds = Array.from(new Set(listBanggia
                .flatMap(bg => bg?.sanpham?.map((sp) => sp.masp) || [])
                .filter(masp => masp && masp.trim() !== '')));
            console.log(`Found ${allProductIds.length} unique product IDs to validate`);
            const productChunkSize = 100;
            const productMap = new Map();
            for (let i = 0; i < allProductIds.length; i += productChunkSize) {
                const chunk = allProductIds.slice(i, i + productChunkSize);
                const chunkProducts = await this.prisma.sanpham.findMany({
                    where: { masp: { in: chunk } },
                });
                chunkProducts.forEach(p => productMap.set(p.masp, p));
                if (i + productChunkSize < allProductIds.length) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            }
            for (const bg of listBanggia) {
                if (!bg.sanpham || !Array.isArray(bg.sanpham))
                    continue;
                bg.sanpham = bg.sanpham.filter((sp) => {
                    if (!sp.masp || sp.masp.trim() === '') {
                        console.warn(`Skipping product with empty masp in banggia ${bg.mabanggia}:`, sp);
                        return false;
                    }
                    return true;
                });
                for (const sp of bg.sanpham) {
                    if (!productMap.has(sp.masp)) {
                        await this._ImportdataService.create({
                            caseDetail: {
                                errorMessage: `Sanpham with ID "${sp.masp}" not found in banggia "${bg.mabanggia}"`,
                                errorStack: '',
                                additionalInfo: 'Error during import process - product validation',
                            },
                            order: 1,
                            createdBy: 'system',
                            title: `Import Sản Phẩm Bảng giá ${new Date().toLocaleString('vi-VN')} `,
                            type: 'banggia',
                        });
                        throw new common_1.NotFoundException(`Sanpham with ID "${sp.masp}" not found in banggia "${bg.mabanggia}"`);
                    }
                    sp.id = productMap.get(sp.masp).id;
                }
            }
            const mabanggiaList = listBanggia.map(bg => bg.mabanggia);
            console.log(`Loading existing banggias for: ${mabanggiaList.length} items`);
            const existingBanggias = await this.prisma.banggia.findMany({
                where: { mabanggia: { in: mabanggiaList } },
            });
            const banggiaMap = new Map(existingBanggias.map(bg => [bg.mabanggia, bg]));
            const batchSize = 3;
            console.log(`Processing ${listBanggia.length} banggias in batches of ${batchSize}`);
            for (let i = 0; i < listBanggia.length; i += batchSize) {
                const batch = listBanggia.slice(i, i + batchSize);
                console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(listBanggia.length / batchSize)} (items ${i + 1}-${Math.min(i + batchSize, listBanggia.length)})`);
                for (const bg of batch) {
                    const now = new Date();
                    try {
                        if (banggiaMap.has(bg.mabanggia)) {
                            if (!bg.batdau && !bg.ketthuc) {
                                bg.batdau = new Date(now.getFullYear(), now.getMonth(), 1);
                                bg.ketthuc = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                            }
                            const existing = banggiaMap.get(bg.mabanggia);
                            await this.update(existing.id, bg);
                        }
                        else {
                            bg.batdau = bg.batdau || new Date(now.getFullYear(), now.getMonth(), 1);
                            bg.ketthuc = bg.ketthuc || new Date(now.getFullYear(), now.getMonth() + 1, 0);
                            await this.createBanggia(bg);
                        }
                    }
                    catch (itemError) {
                        console.log(`Error processing banggia ${bg.mabanggia}:`, itemError);
                        await this._ImportdataService.create({
                            caseDetail: {
                                errorMessage: `Failed to process banggia ${bg.mabanggia}: ${itemError.message}`,
                                errorStack: itemError.stack,
                                additionalInfo: `Error processing individual banggia during batch import`,
                            },
                            order: 1,
                            createdBy: 'system',
                            title: `Import Sản Phẩm Bảng giá - Individual Error ${new Date().toLocaleString('vi-VN')}`,
                            type: 'banggia',
                        });
                    }
                }
                if (i + batchSize < listBanggia.length) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            console.log(`Successfully completed import of ${listBanggia.length} price lists`);
            return {};
        }
        catch (error) {
            console.log('Error importing san pham bang gia:', error);
            if (error.code === 'ECONNRESET' ||
                error.message?.includes('413') ||
                error.message?.includes('Content Too Large') ||
                error.message?.includes('request entity too large') ||
                error.name === 'PayloadTooLargeError') {
                await this._ImportdataService.create({
                    caseDetail: {
                        errorMessage: `Content too large - Data contains ${listBanggia?.length || 0} price lists. Try splitting into smaller batches (max 50-100 items per request).`,
                        errorStack: error.stack,
                        additionalInfo: 'Error 413: Content Too Large during import process. Consider reducing batch size or splitting data.',
                    },
                    order: 1,
                    createdBy: 'system',
                    title: `Import Sản Phẩm Bảng giá (413 Error) ${new Date().toLocaleString('vi-VN')} `,
                    type: 'banggia',
                });
                throw new common_1.InternalServerErrorException(`Content too large. Your data contains ${listBanggia?.length || 0} price lists. Please split into smaller batches (recommended: 50-100 items per request) and try again.`);
            }
            await this._ImportdataService.create({
                caseDetail: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                    additionalInfo: `Error during import process. Data size: ${listBanggia?.length || 0} items`,
                },
                order: 1,
                createdBy: 'system',
                title: `Import Sản Phẩm Bảng giá ${new Date().toLocaleString('vi-VN')} `,
                type: 'banggia',
            });
            throw new common_1.InternalServerErrorException(error.message || 'Error importing san pham bang gia');
        }
    }
    async importBanggia(data) {
        try {
            const results = await Promise.all(data.map(async (item) => {
                const existing = await this.prisma.banggia.findFirst({
                    where: { mabanggia: item.mabanggia },
                });
                if (existing) {
                    return await this.update(existing.id, item);
                }
                else {
                    return await this.createBanggia(item);
                }
            }));
            console.log('Import results:', results);
            return results;
        }
        catch (error) {
            await this._ImportdataService.create({
                caseDetail: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                    additionalInfo: 'Error during import process',
                },
                order: 1,
                createdBy: 'system',
                title: `Import Bảng giá ${new Date().toLocaleString('vi-VN')} `,
                type: 'banggia',
            });
            throw new common_1.InternalServerErrorException(error.message || 'Error importing bang gia');
        }
    }
    async importBGKH(data) {
        try {
            const grouped = data.reduce((acc, curr) => {
                if (!acc[curr.mabanggia]) {
                    acc[curr.mabanggia] = [];
                }
                acc[curr.mabanggia].push(curr);
                return acc;
            }, {});
            const results = [];
            const batchSize = 10;
            const groupedEntries = Object.entries(grouped);
            for (let i = 0; i < groupedEntries.length; i += batchSize) {
                const batch = groupedEntries.slice(i, i + batchSize);
                await Promise.all(batch.map(async ([mabanggia, items]) => {
                    const existingBanggia = await this.prisma.banggia.findFirst({
                        where: { mabanggia },
                        include: { khachhang: true },
                    });
                    if (existingBanggia) {
                        for (const item of items) {
                            const existingKH = existingBanggia.khachhang.find((kh) => kh.makh === item.makh);
                            if (existingKH) {
                                await this.prisma.khachhang.update({
                                    where: { id: existingKH.id },
                                    data: { name: item.name, makh: item.makh },
                                });
                            }
                            else {
                                await this.prisma.banggia.update({
                                    where: { id: existingBanggia.id },
                                    data: {
                                        khachhang: {
                                            create: { name: item.name, makh: item.makh },
                                        },
                                    },
                                    include: { khachhang: true },
                                });
                            }
                        }
                        const updated = await this.prisma.banggia.findUnique({
                            where: { id: existingBanggia.id },
                            include: { khachhang: true },
                        });
                        results.push(updated);
                    }
                    else {
                        const created = await this.prisma.banggia.create({
                            data: {
                                mabanggia,
                                khachhang: {
                                    create: items.map((item) => ({
                                        name: item.name,
                                        makh: item.makh,
                                    })),
                                },
                            },
                            include: { khachhang: true },
                        });
                        results.push(created);
                    }
                }));
            }
            return results;
        }
        catch (error) {
            console.log('Error importing bang gia khach hang:', error);
            if (error.code === 'ECONNRESET' || error.message?.includes('413') || error.message?.includes('Content Too Large')) {
                await this._ImportdataService.create({
                    caseDetail: {
                        errorMessage: 'Content too large - try reducing batch size or splitting the import',
                        errorStack: error.stack,
                        additionalInfo: 'Error 413: Content Too Large during import process',
                    },
                    order: 1,
                    createdBy: 'system',
                    title: `Import Bảng giá khách hàng (413 Error) ${new Date().toLocaleString('vi-VN')} `,
                    type: 'banggia',
                });
                throw new common_1.InternalServerErrorException('Content too large. Please reduce the amount of data and try again.');
            }
            await this._ImportdataService.create({
                caseDetail: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                    additionalInfo: 'Error during import process',
                },
                order: 1,
                createdBy: 'system',
                title: `Import Bảng giá khách hàng ${new Date().toLocaleString('vi-VN')} `,
                type: 'banggia',
            });
            throw new common_1.InternalServerErrorException(error.message || 'Error importing bang gia');
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.banggia.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const result = await this.prisma.banggia.create({
                data: { ...data, order: newOrder },
            });
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error creating banggia');
        }
    }
    async createBanggia(data) {
        try {
            this._SocketGateway.sendBanggiaUpdate();
            const validSanpham = data.sanpham?.filter((sp) => {
                return sp && sp.id && (sp.giaban !== undefined && sp.giaban !== null);
            }) || [];
            const result = await this.prisma.banggia.create({
                data: {
                    title: data.title,
                    mabanggia: data.mabanggia,
                    type: data.type || 'bansi',
                    status: data.status || 'baogia',
                    batdau: data.batdau ? new Date(data.batdau) : null,
                    ketthuc: data.ketthuc ? new Date(data.ketthuc) : null,
                    isActive: data.isActive ?? false,
                    sanpham: validSanpham.length > 0 ? {
                        create: validSanpham.map((sp) => ({
                            sanphamId: sp.id,
                            giaban: Number(sp.giaban) || 0,
                        })),
                    } : undefined,
                },
                include: { sanpham: true },
            });
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error creating banggia');
        }
    }
    async reorderBanggias(banggiaIds) {
        try {
            for (let i = 0; i < banggiaIds.length; i++) {
                await this.prisma.banggia.update({
                    where: { id: banggiaIds[i] },
                    data: { order: i + 1 },
                });
            }
            return null;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error reordering banggias');
        }
    }
    async getbgsp() {
        try {
            const banggias = await this.prisma.banggia.findMany({
                include: {
                    sanpham: {
                        include: { sanpham: true },
                    },
                },
                orderBy: { order: 'asc' },
            });
            const result = banggias.flatMap(bg => bg.sanpham.map(sp => ({
                mabanggia: bg.mabanggia,
                masp: sp.sanpham.id,
                title: sp.sanpham.title,
                giaban: Number(sp.sanpham.giaban),
            })));
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error retrieving banggias');
        }
    }
    async getbgkh() {
        try {
            const banggias = await this.prisma.banggia.findMany({
                include: {
                    khachhang: true,
                },
                orderBy: { order: 'asc' },
            });
            const result = banggias.flatMap(bg => bg.khachhang.map(kh => ({
                mabanggia: bg.mabanggia,
                makh: kh.makh,
            })));
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error retrieving banggias');
        }
    }
    async findAll() {
        try {
            const banggias = await this.prisma.banggia.findMany({
                include: {
                    sanpham: true,
                    khachhang: true,
                },
                orderBy: { order: 'asc' },
            });
            const result = banggias.map(bg => ({
                ...bg,
                sanpham: bg.sanpham.length,
                khachhang: bg.khachhang.length,
                ListKH: bg.khachhang.map(kh => ({
                    makh: kh.makh,
                    name: kh.name,
                })),
            }));
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error retrieving banggias');
        }
    }
    async findOne(id) {
        try {
            const banggia = await this.prisma.banggia.findUnique({
                where: { id },
                include: {
                    sanpham: { include: { sanpham: true } },
                    khachhang: true,
                },
            });
            if (!banggia) {
                throw new common_1.NotFoundException(`Banggia with ID "${id}" not found`);
            }
            const result = {
                ...banggia,
                sanpham: banggia.sanpham.map(item => ({
                    ...item.sanpham,
                    giaban: Number(item.giaban),
                    banggiasanphamId: item.id,
                    sanphamId: item.sanphamId,
                })),
            };
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error retrieving banggia');
        }
    }
    async update(id, data) {
        try {
            const existingBanggia = await this.prisma.banggia.findUnique({
                where: { id },
                include: { sanpham: true }
            });
            if (!existingBanggia) {
                throw new common_1.NotFoundException(`Banggia with ID "${id}" not found`);
            }
            this._SocketGateway.sendBanggiaUpdate();
            if (data.sanpham && Array.isArray(data.sanpham)) {
                const validSanpham = data.sanpham.filter((sp) => sp.sanphamId || sp.id);
                for (const sp of validSanpham) {
                    const sanphamId = sp.sanphamId || sp.id;
                    const newPrice = Number(sp.giaban) || 0;
                    const existingPrice = existingBanggia.sanpham.find(item => item.sanphamId === sanphamId);
                    if (existingPrice && Number(existingPrice.giaban) !== newPrice) {
                        await this.priceHistoryService.updatePrice({
                            banggiaId: id,
                            sanphamId,
                            newPrice,
                            userId: data.userId || 'system',
                            reason: `Price updated via banggia update`
                        });
                    }
                    else if (!existingPrice) {
                        await this.priceHistoryService.updatePrice({
                            banggiaId: id,
                            sanphamId,
                            newPrice,
                            userId: data.userId || 'system',
                            reason: `Product added to banggia`
                        });
                    }
                }
            }
            if (data.sanpham && Array.isArray(data.sanpham)) {
                const validSanpham = data.sanpham.filter((sp) => sp.sanphamId || sp.id);
                const existingProductIds = existingBanggia.sanpham.map(sp => sp.sanphamId);
                const newProductIds = validSanpham.map((sp) => sp.sanphamId || sp.id);
                const toDelete = existingProductIds.filter(spId => !newProductIds.includes(spId));
                if (toDelete.length > 0) {
                    await this.prisma.banggiasanpham.deleteMany({
                        where: {
                            banggiaId: id,
                            sanphamId: { in: toDelete }
                        }
                    });
                }
                for (const sp of validSanpham) {
                    const sanphamId = sp.sanphamId || sp.id;
                    const giaban = Number(sp.giaban) || 0;
                    await this.prisma.banggiasanpham.upsert({
                        where: {
                            unique_banggia_sanpham: {
                                banggiaId: id,
                                sanphamId: sanphamId
                            }
                        },
                        update: {
                            giaban: giaban,
                            isActive: sp.isActive ?? true,
                            order: sp.order
                        },
                        create: {
                            banggiaId: id,
                            sanphamId: sanphamId,
                            giaban: giaban,
                            isActive: sp.isActive ?? true,
                            order: sp.order
                        }
                    });
                }
            }
            const result = await this.prisma.banggia.update({
                where: { id },
                data: {
                    title: data.title,
                    isActive: data.isActive,
                    type: data.type || 'bansi',
                    status: data.status || 'baogia',
                    batdau: data.batdau ? new Date(data.batdau) : null,
                    ketthuc: data.ketthuc ? new Date(data.ketthuc) : null,
                },
                include: { sanpham: true },
            });
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error updating banggia');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                await tx.banggia.update({
                    where: { id },
                    data: { khachhang: { set: [] } }
                });
                await tx.banggiasanpham.deleteMany({
                    where: { banggiaId: id }
                });
                const deletedBanggia = await tx.banggia.delete({ where: { id } });
                this._SocketGateway.sendBanggiaUpdate();
                return deletedBanggia;
            });
        }
        catch (error) {
            console.error('Error removing banggia:', error);
            throw new common_1.InternalServerErrorException(error.message || 'Error removing banggia');
        }
    }
    async removeBulk(ids) {
        let successCount = 0;
        let failCount = 0;
        const errors = [];
        for (const id of ids) {
            try {
                await this.remove(id);
                successCount++;
            }
            catch (error) {
                console.error(`Error deleting banggia ${id}:`, error);
                failCount++;
                errors.push({ id, error: error.message });
            }
        }
        if (successCount > 0) {
            this._SocketGateway.sendBanggiaUpdate();
        }
        return {
            success: successCount,
            fail: failCount,
            errors,
            message: `Deleted ${successCount} banggia successfully${failCount > 0 ? `, ${failCount} failed` : ''}`
        };
    }
    async addKHtoBG(banggiaId, khachhangIds) {
        try {
            const result = await this.prisma.banggia.update({
                where: { id: banggiaId },
                data: {
                    khachhang: {
                        connect: khachhangIds.map(id => ({ id })),
                    },
                },
            });
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error adding KH to BG');
        }
    }
    async removeKHfromBG(banggiaId, khachhangIds) {
        try {
            const result = await this.prisma.banggia.update({
                where: { id: banggiaId },
                data: {
                    khachhang: {
                        disconnect: khachhangIds.map(id => ({ id })),
                    },
                },
            });
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error removing KH from BG');
        }
    }
    async getPriceHistory(banggiaId, sanphamId) {
        try {
            return await this.priceHistoryService.getPriceHistory(banggiaId, sanphamId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error getting price history');
        }
    }
    async getCurrentPrice(banggiaId, sanphamId) {
        try {
            return await this.priceHistoryService.getCurrentPrice(banggiaId, sanphamId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error getting current price');
        }
    }
    async bulkUpdatePrices(updates, userId) {
        try {
            return await this.priceHistoryService.bulkUpdatePrices(updates, userId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error bulk updating prices');
        }
    }
};
exports.BanggiaService = BanggiaService;
exports.BanggiaService = BanggiaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        importdata_service_1.ImportdataService,
        banggia_price_history_service_1.BanggiaPriceHistoryService])
], BanggiaService);
//# sourceMappingURL=banggia.service.js.map