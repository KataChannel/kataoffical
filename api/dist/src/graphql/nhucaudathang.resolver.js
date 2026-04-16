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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NhuCauDatHangResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_type_json_1 = require("graphql-type-json");
const prisma_service_1 = require("../../prisma/prisma.service");
let NhuCauDatHangResolver = class NhuCauDatHangResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    toNum(val) {
        if (val === null || val === undefined)
            return 0;
        if (typeof val === 'bigint')
            return Number(val);
        if (typeof val === 'object' && typeof val.toNumber === 'function') {
            return val.toNumber();
        }
        const n = Number(val);
        return isNaN(n) ? 0 : parseFloat(n.toFixed(3));
    }
    async getNhuCauDatHang(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const [sanphams, tonkhos, khos, chotkhos, sanphamKhos] = await Promise.all([
            this.prisma.sanpham.findMany({
                select: {
                    id: true,
                    title: true,
                    masp: true,
                    dvt: true,
                    haohut: true,
                    Nhacungcap: {
                        select: { mancc: true, name: true },
                        take: 1,
                    },
                    planningNote: {
                        select: { content: true }
                    }
                },
            }),
            this.prisma.tonKho.findMany({
                select: {
                    sanphamId: true,
                    slton: true,
                    sltontt: true,
                    slchogiao: true,
                    slchonhap: true,
                    updatedAt: true,
                },
            }),
            this.prisma.kho.findMany({
                select: { id: true, name: true, makho: true },
            }),
            this.prisma.chotkhodetail.findMany({
                orderBy: { ngaychot: 'desc' },
                distinct: ['sanphamId'],
                select: {
                    sanphamId: true,
                    sltonhethong: true,
                    sltonthucte: true,
                }
            }),
            this.prisma.sanphamKho.findMany({
                select: {
                    sanphamId: true,
                    khoId: true,
                    soluong: true,
                },
            }),
        ]);
        const summaryDathangs = await this.prisma.dathang.findMany({
            where: {
                ngaynhan: { lte: end },
                status: { in: ['dadat'] },
                isActive: true,
            },
            select: { id: true, status: true },
        });
        const summaryDathangIds = summaryDathangs.map((d) => d.id);
        const qualifyingDathangIds = [...summaryDathangIds];
        const qualifyingDonhangs = await this.prisma.donhang.findMany({
            where: {
                ngaygiao: { lte: end },
                status: { in: ['dadat', 'dagiao'] },
            },
            select: { id: true, status: true },
        });
        const pendingDonhangIds = qualifyingDonhangs
            .filter((d) => d.status === 'dadat')
            .map((d) => d.id);
        const deliveredDonhangIds = qualifyingDonhangs
            .filter((d) => ['dagiao', 'danhan', 'hoanthanh'].includes(d.status))
            .map((d) => d.id);
        const [dathangSumRaw, donhangPendingRaw, donhangDeliveredRaw, donhangCancelledRaw] = await Promise.all([
            summaryDathangIds.length > 0
                ? this.prisma.$queryRaw `
              SELECT "idSP", CAST(COALESCE(SUM("sldat"::numeric), 0) AS float8) as total
              FROM "Dathangsanpham"
              WHERE "dathangId" = ANY(${summaryDathangIds})
              GROUP BY "idSP"
            `
                : Promise.resolve([]),
            pendingDonhangIds.length > 0
                ? this.prisma.$queryRaw `
              SELECT "idSP", CAST(COALESCE(SUM("sldat"::numeric), 0) AS float8) as total
              FROM "Donhangsanpham"
              WHERE "donhangId" = ANY(${pendingDonhangIds})
              GROUP BY "idSP"
            `
                : Promise.resolve([]),
            deliveredDonhangIds.length > 0
                ? this.prisma.$queryRaw `
              SELECT "idSP", CAST(COALESCE(SUM("sldat"::numeric), 0) AS float8) as total
              FROM "Donhangsanpham"
              WHERE "donhangId" = ANY(${deliveredDonhangIds})
              GROUP BY "idSP"
            `
                : Promise.resolve([]),
            qualifyingDonhangs.length > 0
                ? this.prisma.$queryRaw `
              SELECT 
                dps."idSP",
                CAST(SUM(CASE WHEN d.status = 'huy' THEN dps.sldat ELSE dps.slhuy END) AS float8) as total
              FROM "Donhangsanpham" dps
              JOIN "Donhang" d ON d.id = dps."donhangId"
              WHERE d.id = ANY(${qualifyingDonhangs.map((d) => d.id)})
              GROUP BY dps."idSP"
            `
                : Promise.resolve([]),
        ]);
        const recentDathangs = qualifyingDathangIds.length > 0
            ? await this.prisma.dathang.findMany({
                where: { id: { in: qualifyingDathangIds } },
                orderBy: { ngaynhan: 'desc' },
                select: {
                    id: true,
                    madncc: true,
                    ngaynhan: true,
                    status: true,
                    updatedAt: true,
                    nhacungcap: { select: { name: true, mancc: true } },
                    kho: { select: { name: true, makho: true } },
                    sanpham: {
                        select: {
                            sldat: true,
                            slgiao: true,
                            slnhan: true,
                            idSP: true,
                        },
                    },
                },
            })
            : [];
        const tonkhoMap = new Map();
        tonkhos.forEach((tk) => tonkhoMap.set(tk.sanphamId, tk));
        const spKhoMap = new Map();
        sanphamKhos.forEach((sk) => {
            const entry = spKhoMap.get(sk.sanphamId) || new Map();
            entry.set(sk.khoId, this.toNum(sk.soluong));
            spKhoMap.set(sk.sanphamId, entry);
        });
        const dathangSumMap = new Map();
        dathangSumRaw.forEach((d) => dathangSumMap.set(d.idSP, this.toNum(d.total)));
        const khachDatMap = new Map();
        donhangPendingRaw.forEach((d) => khachDatMap.set(d.idSP, this.toNum(d.total)));
        const khachGiaoMap = new Map();
        donhangDeliveredRaw.forEach((d) => khachGiaoMap.set(d.idSP, this.toNum(d.total)));
        const khachHuyMap = new Map();
        donhangCancelledRaw.forEach((d) => khachHuyMap.set(d.idSP, this.toNum(d.total)));
        const chotkhoMap = new Map();
        chotkhos.forEach((ck) => chotkhoMap.set(ck.sanphamId, this.toNum(ck.sltonhethong)));
        const dathangsByProduct = new Map();
        recentDathangs.forEach((dh) => {
            dh.sanpham.forEach((sp) => {
                const arr = dathangsByProduct.get(sp.idSP) || [];
                arr.push({
                    id: dh.id,
                    madncc: dh.madncc,
                    ngaynhan: dh.ngaynhan,
                    status: dh.status,
                    updatedAt: dh.updatedAt,
                    makho: dh.kho?.makho,
                    namekho: dh.kho?.name,
                    mancc: dh.nhacungcap?.mancc,
                    name: dh.nhacungcap?.name,
                    sldat: this.toNum(sp.sldat),
                    slgiao: this.toNum(sp.slgiao),
                    slnhan: this.toNum(sp.slnhan),
                });
                dathangsByProduct.set(sp.idSP, arr);
            });
        });
        const kho1Id = khos.find((k) => k.makho === 'TG-LA')?.id;
        const kho2Id = khos.find((k) => k.makho === 'TG-BS')?.id;
        const kho3Id = khos.find((k) => k.makho === 'TG-ĐL')?.id;
        const kho4Id = khos.find((k) => k.makho === 'TG-HCM')?.id;
        const kho5Id = khos.find((k) => k.makho === 'TG-SG1')?.id;
        const kho6Id = khos.find((k) => k.makho === 'TG-SG2')?.id;
        const result = sanphams
            .filter((sp) => sp.masp)
            .map((sp) => {
            const tonkho = tonkhoMap.get(sp.id);
            const slDatNCC = dathangSumMap.get(sp.id) || 0;
            const slKhachDat = khachDatMap.get(sp.id) || 0;
            const slKhachGiao = khachGiaoMap.get(sp.id) || 0;
            const slKhachHuy = khachHuyMap.get(sp.id) || 0;
            const slSnapshot = chotkhoMap.get(sp.id) || 0;
            const dathangs = dathangsByProduct.get(sp.id) || [];
            const skMap = spKhoMap.get(sp.id);
            return {
                id: sp.id,
                masp: sp.masp,
                title: sp.title,
                dvt: sp.dvt,
                haohut: this.toNum(sp.haohut),
                mancc: sp.Nhacungcap?.[0]?.mancc || '',
                name: sp.Nhacungcap?.[0]?.name || '',
                slton: this.toNum(tonkho?.slton),
                sltontt: this.toNum(tonkho?.sltontt),
                slchogiao: this.toNum(tonkho?.slchogiao),
                slchonhap: this.toNum(tonkho?.slchonhap),
                updatedAt: tonkho?.updatedAt || null,
                SLDat: slDatNCC,
                xSLDat: slDatNCC,
                khachdat: slKhachDat,
                khachgiao: slKhachGiao,
                khachhuy: slKhachHuy,
                slsnapshot: slSnapshot,
                kho1: (kho1Id && skMap?.get(kho1Id)) || 0,
                kho2: (kho2Id && skMap?.get(kho2Id)) || 0,
                kho3: (kho3Id && skMap?.get(kho3Id)) || 0,
                kho4: (kho4Id && skMap?.get(kho4Id)) || 0,
                kho5: (kho5Id && skMap?.get(kho5Id)) || 0,
                kho6: (kho6Id && skMap?.get(kho6Id)) || 0,
                Dathangs: dathangs,
                Donhangs: [],
                ghichu: sp.planningNote?.content || '',
            };
        })
            .sort((a, b) => b.Dathangs.length - a.Dathangs.length);
        return {
            data: result,
            totalCount: result.length,
        };
    }
    async saveNhucauNote(sanphamId, content) {
        try {
            const result = await this.prisma.nhucauPlanningNote.upsert({
                where: { sanphamId },
                update: { content },
                create: { sanphamId, content },
            });
            return { success: true, data: result };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.NhuCauDatHangResolver = NhuCauDatHangResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'getNhuCauDatHang',
        description: 'Optimized aggregated query for Nhu Cau Dat Hang - replaces 4 heavy queries with server-side aggregation',
    }),
    __param(0, (0, graphql_1.Args)('startDate', {
        type: () => String,
        description: 'Start date for order filtering (ISO string)',
    })),
    __param(1, (0, graphql_1.Args)('endDate', {
        type: () => String,
        description: 'End date for order filtering (ISO string)',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NhuCauDatHangResolver.prototype, "getNhuCauDatHang", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'saveNhucauNote',
        description: 'Saves or updates a persistent procurement note for a product',
    }),
    __param(0, (0, graphql_1.Args)('sanphamId')),
    __param(1, (0, graphql_1.Args)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NhuCauDatHangResolver.prototype, "saveNhucauNote", null);
exports.NhuCauDatHangResolver = NhuCauDatHangResolver = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NhuCauDatHangResolver);
//# sourceMappingURL=nhucaudathang.resolver.js.map