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
exports.DonhangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DonhangService = class DonhangService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        let newOrder;
        const maxOrder = await this.prisma.sanpham.aggregate({
            _max: { order: true },
        });
        newOrder = (maxOrder._max?.order || 0) + 1;
        return this.prisma.sanpham.create({
            data: {
                ...data,
                order: newOrder,
            },
        });
    }
    async reorderDonHangs(donhangIds) {
        for (let i = 0; i < donhangIds.length; i++) {
            await this.prisma.donhang.update({
                where: { id: donhangIds[i] },
                data: { order: i + 1 },
            });
        }
    }
    async findAll() {
        return this.prisma.donhang.findMany();
    }
    async findOne(id) {
        const donhang = await this.prisma.donhang.findUnique({ where: { id } });
        if (!donhang)
            throw new common_1.NotFoundException('DonHang not found');
        return donhang;
    }
    async update(id, data) {
        return this.prisma.donhang.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.donhang.delete({ where: { id } });
    }
};
exports.DonhangService = DonhangService;
exports.DonhangService = DonhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DonhangService);
//# sourceMappingURL=donhang.service.js.map