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
exports.DathangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DathangService = class DathangService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.dathang.create({
            data: {
                title: data.title,
                type: data.type,
                madncc: data.madncc,
                ngaynhan: new Date(data.ngaynhan),
                ghichu: data.ghichu,
                nhacungcapId: data.nhacungcapId,
                order: data.order,
                isActive: data.isActive,
                sanpham: {
                    create: data.sanpham.map(sp => ({
                        idSP: sp.idSP,
                        sldat: sp.sldat,
                        slgiao: sp.slgiao,
                        slnhan: sp.slnhan,
                        ttdat: sp.ttdat,
                        ttgiao: sp.ttgiao,
                        ttnhan: sp.ttnhan,
                        ghichu: sp.ghichu,
                        order: sp.order,
                        isActive: sp.isActive,
                    })),
                },
            },
            include: { sanpham: true },
        });
    }
    async reorderDathangs(dathangIds) {
        for (let i = 0; i < dathangIds.length; i++) {
            await this.prisma.dathang.update({
                where: { id: dathangIds[i] },
                data: { order: i + 1 },
            });
        }
    }
    async findAll() {
        return this.prisma.dathang.findMany({ include: {
                sanpham: true,
                nhacungcap: true
            } });
    }
    async findOne(id) {
        const dathang = await this.prisma.dathang.findUnique({
            where: { id },
            include: {
                sanpham: true,
                nhacungcap: true
            },
        });
        if (!dathang)
            throw new common_1.NotFoundException('Dathang not found');
        return dathang;
    }
    async update(id, data) {
        const existingOrder = await this.prisma.dathang.findUnique({ where: { id } });
        if (!existingOrder)
            throw new common_1.NotFoundException('Đơn hàng không tồn tại');
        return this.prisma.dathang.update({
            where: { id },
            data: {
                title: data.title,
                type: data.type,
                madncc: data.madncc,
                ngaynhan: new Date(data.ngaynhan),
                ghichu: data.ghichu,
                order: data.order,
                isActive: data.isActive,
                sanpham: {
                    deleteMany: {},
                    create: data.sanpham.map((sp) => ({
                        idSP: sp.idSP,
                        sldat: sp.sldat,
                        slgiao: sp.slgiao,
                        slnhan: sp.slnhan,
                        ttdat: sp.ttdat,
                        ttgiao: sp.ttgiao,
                        ttnhan: sp.ttnhan,
                        ghichu: sp.ghichu,
                        order: sp.order,
                        isActive: sp.isActive,
                    })),
                },
            },
            include: { sanpham: true },
        });
    }
    async remove(id) {
        return this.prisma.dathang.delete({ where: { id } });
    }
};
exports.DathangService = DathangService;
exports.DathangService = DathangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DathangService);
//# sourceMappingURL=dathang.service.js.map