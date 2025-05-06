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
exports.NhacungcapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NhacungcapService = class NhacungcapService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateMancc() {
        const latest = await this.prisma.nhacungcap.findFirst({
            orderBy: { mancc: 'desc' },
        });
        let nextNumber = 1;
        if (latest) {
            const match = latest.mancc.match(/TG-NCC(\d+)/);
            if (match) {
                nextNumber = parseInt(match[1]) + 1;
            }
        }
        return `TG-NCC${nextNumber.toString().padStart(5, '0')}`;
    }
    async create(data) {
        const mancc = await this.generateMancc();
        return this.prisma.nhacungcap.create({
            data: {
                mancc,
                ...data,
            },
        });
    }
    async findAll() {
        return this.prisma.nhacungcap.findMany();
    }
    async findOne(id) {
        const nhacungcap = await this.prisma.nhacungcap.findUnique({
            where: { id },
            include: {
                Sanpham: true,
            },
        });
        if (!nhacungcap)
            throw new common_1.NotFoundException('Nhacungcap not found');
        return nhacungcap;
    }
    async update(id, data) {
        const { Sanpham, ...rest } = data;
        const updatedNhacc = await this.prisma.nhacungcap.update({
            where: { id },
            data: {
                ...rest,
                Sanpham: {
                    set: Sanpham.map((sp) => ({ id: sp.id })),
                },
            },
        });
        return updatedNhacc;
    }
    async remove(id) {
        return this.prisma.nhacungcap.delete({ where: { id } });
    }
    async findByProductIds(productIds) {
        if (!productIds || productIds.length === 0) {
            return [];
        }
        const suppliers = await this.prisma.nhacungcap.findMany({
            where: {
                Sanpham: {
                    some: {
                        id: { in: productIds }
                    }
                }
            },
            include: {
                Sanpham: true,
            },
        });
        console.log(suppliers);
        return suppliers;
    }
};
exports.NhacungcapService = NhacungcapService;
exports.NhacungcapService = NhacungcapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NhacungcapService);
//# sourceMappingURL=nhacungcap.service.js.map