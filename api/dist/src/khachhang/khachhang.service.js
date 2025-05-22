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
const prisma_service_1 = require("../../prisma/prisma.service");
let KhachhangService = class KhachhangService {
    constructor(prisma) {
        this.prisma = prisma;
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
        let banggiaData = {};
        if (data.banggia && Array.isArray(data.banggia) && data.banggia.length > 0) {
            banggiaData = { banggia: { connect: data.banggia.map((id) => ({ id })) } };
        }
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
            const { banggia, ...rest } = customer;
            let banggiaData = {};
            console.log('customer', customer);
            if (banggia !== undefined) {
                if (banggia.length > 0) {
                    const banggiaRecords = await Promise.all(banggia.map(async (bg) => {
                        const bgRecord = await this.prisma.banggia.findFirst({
                            where: { mabanggia: bg },
                            select: { id: true }
                        });
                        if (!bgRecord) {
                            throw new common_1.NotFoundException(`Banggia với mabanggia ${bg} không tồn tại`);
                        }
                        return { id: bgRecord.id };
                    }));
                    banggiaData = { banggia: { connect: banggiaRecords } };
                }
                else {
                    banggiaData = { banggia: { set: [] } };
                }
            }
            const dataToUse = { ...rest, ...banggiaData };
            if (!customer.makh) {
                await this.create(dataToUse);
            }
            else {
                const existingCustomer = await this.prisma.khachhang.findUnique({
                    where: { makh: customer.makh },
                    select: { id: true },
                });
                if (existingCustomer) {
                    await this.prisma.khachhang.update({
                        where: { id: existingCustomer.id },
                        data: dataToUse,
                    });
                }
                else {
                    await this.create(dataToUse);
                }
            }
        }
        return { message: 'Import completed' };
    }
    async findAll() {
        return this.prisma.khachhang.findMany({
            include: { banggia: true }
        });
    }
    async findby(param) {
        try {
            const khachhang = await this.prisma.khachhang.findUnique({
                where: param,
            });
            return khachhang;
        }
        catch (error) {
            console.error('Error finding item:', error);
            throw error;
        }
    }
    async findOne(id) {
        const khachhang = await this.prisma.khachhang.findUnique({ where: { id },
            include: {
                banggia: true
            } });
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
        const khachhang = await this.prisma.khachhang.findUnique({ where,
            include: {
                banggia: true
            }
        });
        if (!khachhang)
            throw new common_1.NotFoundException('Khachhang not found');
        return khachhang;
    }
    async update(id, data) {
        const existingCustomer = await this.prisma.khachhang.findUnique({
            where: { id },
            select: { banggia: { select: { id: true } } },
        });
        if (!existingCustomer) {
            throw new Error("Khách hàng không tồn tại");
        }
        const disconnectBanggia = existingCustomer.banggia.map(({ id }) => ({ id }));
        const newBanggiaIds = data.banggia?.map(({ id }) => ({ id })) || [];
        return this.prisma.khachhang.update({
            where: { id },
            data: {
                ...data,
                banggia: {
                    disconnect: disconnectBanggia,
                    connect: newBanggiaIds,
                },
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KhachhangService);
//# sourceMappingURL=khachhang.service.js.map