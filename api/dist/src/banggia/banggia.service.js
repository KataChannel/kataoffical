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
const socket_gateway_1 = require("../socket.gateway");
let BanggiaService = class BanggiaService {
    constructor(prisma, _SocketGateway) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
    }
    async importSPBG(listBanggia) {
        try {
            const productIds = Array.from(listBanggia.flatMap(bg => bg?.sanpham?.map((sp) => sp.masp) || []));
            const products = await this.prisma.sanpham.findMany({
                where: { masp: { in: productIds } },
            });
            const productMap = new Map(products.map(p => [p.masp, p]));
            for (const bg of listBanggia) {
                for (const sp of bg.sanpham) {
                    if (!productMap.has(sp.masp)) {
                        throw new common_1.NotFoundException(`Sanpham with ID "${sp.masp}" not found`);
                    }
                    sp.id = productMap.get(sp.masp).id;
                }
            }
            const mabanggiaList = listBanggia.map(bg => bg.mabanggia);
            const existingBanggias = await this.prisma.banggia.findMany({
                where: { mabanggia: { in: mabanggiaList } },
            });
            const banggiaMap = new Map(existingBanggias.map(bg => [bg.mabanggia, bg]));
            await Promise.all(listBanggia.map(async (bg) => {
                const now = new Date();
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
            }));
            return {};
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error importing san pham bang gia');
        }
    }
    async importBanggia(data) {
        try {
            const existing = await this.prisma.banggia.findFirst({
                where: { mabanggia: data.mabanggia },
            });
            if (existing) {
                const result = await this.update(existing.id, data);
                return result;
            }
            else {
                const result = await this.createBanggia(data);
                return result;
            }
        }
        catch (error) {
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
            for (const mabanggia in grouped) {
                const items = grouped[mabanggia];
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
            }
            return results;
        }
        catch (error) {
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
            const result = await this.prisma.banggia.create({
                data: {
                    title: data.title,
                    mabanggia: data.mabanggia,
                    type: data.type || 'bansi',
                    status: data.status || 'baogia',
                    batdau: data.batdau ? new Date(data.batdau) : null,
                    ketthuc: data.ketthuc ? new Date(data.ketthuc) : null,
                    isActive: data.isActive ?? false,
                    sanpham: {
                        create: data.sanpham?.map((sp) => ({
                            sanphamId: sp.id,
                            giaban: Number(sp.giaban) || 0,
                        })),
                    },
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
                    giaban: item.giaban,
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
            const existingBanggia = await this.prisma.banggia.findUnique({ where: { id } });
            if (!existingBanggia) {
                throw new common_1.NotFoundException(`Banggia with ID "${id}" not found`);
            }
            this._SocketGateway.sendBanggiaUpdate();
            const result = await this.prisma.banggia.update({
                where: { id },
                data: {
                    title: data.title,
                    isActive: data.isActive,
                    type: data.type || 'bansi',
                    status: data.status || 'baogia',
                    batdau: data.batdau ? new Date(data.batdau) : null,
                    ketthuc: data.ketthuc ? new Date(data.ketthuc) : null,
                    sanpham: data.sanpham && Array.isArray(data.sanpham)
                        ? {
                            deleteMany: {},
                            create: data.sanpham
                                .filter((sp) => sp.sanphamId || sp.id)
                                .map((sp) => ({
                                sanphamId: sp.sanphamId || sp.id,
                                giaban: Number(sp.giaban) || 0,
                            })),
                        }
                        : undefined,
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
            const result = await this.prisma.banggia.delete({ where: { id } });
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Error removing banggia');
        }
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
};
exports.BanggiaService = BanggiaService;
exports.BanggiaService = BanggiaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], BanggiaService);
//# sourceMappingURL=banggia.service.js.map