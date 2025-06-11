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
exports.KhachhangService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const prisma_service_1 = require("../../prisma/prisma.service");
const importdata_service_1 = require("../importdata/importdata.service");
let KhachhangService = class KhachhangService {
    constructor(prisma, _ImportdataService) {
        this.prisma = prisma;
        this._ImportdataService = _ImportdataService;
    }
    async getLastUpdated() {
        try {
            const lastUpdated = await this.prisma.khachhang.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            throw error;
        }
    }
    async timkiemkhachhang(query) {
        return this.prisma.$queryRaw `
      SELECT * FROM "Khachhang" 
      WHERE search_vector @@ to_tsquery('simple', ${query})
    `;
    }
    async generateMakh(loaikh) {
        try {
            const prefix = loaikh === 'khachsi' ? 'TG-KS' : 'TG-KL';
            const latest = await this.prisma.khachhang.findFirst({
                where: { makh: { startsWith: prefix } },
                orderBy: { makh: 'desc' },
                select: { makh: true },
            });
            let nextNumber = 1;
            if (latest && latest.makh) {
                const lastNumber = parseInt(latest.makh.slice(prefix.length), 10);
                nextNumber = lastNumber + 1;
            }
            return `${prefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi tạo mã khách hàng');
        }
    }
    async create(data) {
        if (!data.makh) {
            data.makh = await this.generateMakh(data.loaikh);
        }
        let banggiaData = data.banggiaId
            ? { banggia: { connect: { id: data.banggiaId } } }
            : { banggia: { disconnect: true } };
        const newData = { ...data, ...banggiaData };
        const existingCustomer = await this.prisma.khachhang.findUnique({
            where: { makh: data.makh },
            include: { banggia: true },
        });
        if (existingCustomer) {
            return this.prisma.khachhang.update({
                where: { id: existingCustomer.id },
                data: newData,
                include: { banggia: true },
            });
        }
        return this.prisma.khachhang.create({
            data: newData,
        });
    }
    async import(data) {
        for (const customer of data) {
            try {
                const banggia = await this.prisma.banggia.findFirst({
                    where: { mabanggia: customer.mabanggia },
                    select: { id: true },
                });
                if (!banggia) {
                    console.warn(`Bảng giá với mã ${customer.mabanggia} không tồn tại, bỏ qua khách hàng này`);
                    continue;
                }
                customer.banggiaId = banggia.id;
                const existingCustomer = await this.prisma.khachhang.findUnique({
                    where: { makh: customer.makh },
                    select: { id: true },
                });
                let processedCustomer;
                if (existingCustomer) {
                    processedCustomer = await this.update(existingCustomer.id, customer);
                }
                else {
                    processedCustomer = await this.create(customer);
                }
            }
            catch (error) {
                console.error(`Error processing customer with makh ${customer.makh}:`, error);
                await this._ImportdataService.create({
                    caseDetail: {
                        errorMessage: error.message,
                        errorStack: error.stack,
                        additionalInfo: 'Error during customer import process',
                    },
                    order: 1,
                    createdBy: 'system',
                    title: `Import Khách Hàng ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
                    type: 'khachhang',
                });
            }
        }
        return { message: 'Import completed' };
    }
    async findAll(query) {
        console.log('findAllKhachHang query:', query);
        try {
            const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category } = query;
            const numericPage = Number(page || 1);
            const numericPageSize = Number(pageSize || 50);
            const skip = (numericPage - 1) * numericPageSize;
            const take = numericPageSize;
            const where = {};
            if (search) {
                where.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ];
            }
            if (category) {
                where.category = { equals: category, mode: 'insensitive' };
            }
            if (priceMin || priceMax) {
                where.price = {};
                if (priceMin) {
                    where.price.gte = priceMin;
                }
                if (priceMax) {
                    where.price.lte = priceMax;
                }
            }
            const orderBy = {};
            if (sortBy && sortOrder) {
                orderBy[sortBy] = sortOrder;
            }
            else {
                orderBy.createdAt = 'desc';
            }
            const [sanphams, total] = await this.prisma.$transaction([
                this.prisma.khachhang.findMany({
                    where,
                    include: { banggia: true },
                    skip,
                    take,
                    orderBy,
                }),
                this.prisma.khachhang.count({ where }),
            ]);
            return {
                data: sanphams,
                total: Number(total),
                page: numericPage,
                pageSize: numericPageSize,
                totalPages: Math.ceil(Number(total) / numericPageSize),
            };
        }
        catch (error) {
            console.log('Error in findAllSanpham:', error);
            throw error;
        }
    }
    async findby(param) {
        console.log('findby param:', param);
        const { page = 1, pageSize = 50, isOne, ...where } = param;
        const whereClause = {};
        if (where.id) {
            whereClause.id = where.id;
        }
        if (where.subtitle) {
            whereClause.subtitle = { contains: where.subtitle, mode: 'insensitive' };
        }
        if (where.name) {
            whereClause.name = { contains: where.name, mode: 'insensitive' };
        }
        if (where.startDate || where.endDate) {
            whereClause.createdAt = {};
            if (where.startDate)
                whereClause.createdAt.gte = where.startDate;
            if (where.endDate)
                whereClause.createdAt.lte = where.endDate;
        }
        if (isOne) {
            const oneResult = await this.prisma.khachhang.findFirst({
                where: whereClause,
                include: { banggia: true },
                orderBy: { createdAt: 'desc' },
            });
            return oneResult;
        }
        else {
            const skip = (page - 1) * pageSize;
            const [khachhangs, total] = await Promise.all([
                this.prisma.khachhang.findMany({
                    where: whereClause,
                    include: { banggia: true },
                    skip,
                    take: pageSize,
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.khachhang.count({ where: whereClause }),
            ]);
            return {
                data: khachhangs,
                page,
                pageSize,
                total,
                pageCount: Math.ceil(total / pageSize),
            };
        }
    }
    async findOne(id) {
        const khachhang = await this.prisma.khachhang.findUnique({
            where: { id },
            include: {
                banggia: true,
            },
        });
        if (!khachhang)
            throw new common_1.NotFoundException('Khachhang not found');
        return khachhang;
    }
    async searchfield(searchParams) {
        const where = {};
        for (const [key, value] of Object.entries(searchParams)) {
            if (!value)
                continue;
            if (key === 'id') {
                where[key] = value;
            }
            else if (typeof value === 'number' || typeof value === 'boolean') {
                where[key] = value;
            }
            else {
                where[key] = { contains: value, mode: 'insensitive' };
            }
        }
        const khachhang = await this.prisma.khachhang.findUnique({
            where,
            include: {
                banggia: true,
            },
        });
        if (!khachhang)
            throw new common_1.NotFoundException('Khachhang not found');
        return khachhang;
    }
    async update(id, data) {
        console.log(data);
        const existingCustomer = await this.prisma.khachhang.findUnique({
            where: { id },
            select: { banggia: { select: { id: true } } },
        });
        if (!existingCustomer) {
            throw new common_1.NotFoundException('Khách hàng không tồn tại');
        }
        if (data.banggiaId) {
            const banggia = await this.prisma.banggia.findUnique({
                where: { id: data.banggiaId },
            });
            if (!banggia) {
                throw new common_1.NotFoundException(`Không tìm thấy bảng giá với ID: ${data.banggiaId}`);
            }
        }
        return this.prisma.khachhang.update({
            where: { id },
            data: {
                banggia: data.banggiaId ? { connect: { id: data.banggiaId } } : { disconnect: true },
            },
            include: { banggia: true },
        });
    }
    async remove(id) {
        return this.prisma.khachhang.delete({ where: { id } });
    }
};
exports.KhachhangService = KhachhangService;
exports.KhachhangService = KhachhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        importdata_service_1.ImportdataService])
], KhachhangService);
//# sourceMappingURL=khachhang.service.js.map