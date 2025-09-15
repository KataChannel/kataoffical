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
exports.OptimizedCongnoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OptimizedCongnoService = class OptimizedCongnoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCongnoKhachHangOptimized(params) {
        const { Batdau, Ketthuc, Status, khachhangIds, query } = params;
        const whereConditions = {
            ...(Batdau && Ketthuc && {
                ngaygiao: {
                    gte: new Date(Batdau),
                    lte: new Date(Ketthuc),
                },
            }),
            ...(Status && Array.isArray(Status) && Status.length > 0 && {
                status: { in: Status },
            }),
            ...(khachhangIds && Array.isArray(khachhangIds) && khachhangIds.length > 0 && {
                khachhangId: { in: khachhangIds },
            }),
            ...(query && {
                OR: [
                    { madonhang: { contains: query, mode: 'insensitive' } },
                    { khachhang: { name: { contains: query, mode: 'insensitive' } } },
                ],
            }),
        };
        const donhangs = await this.prisma.donhang.findMany({
            where: whereConditions,
            select: {
                id: true,
                madonhang: true,
                ngaygiao: true,
                tongtien: true,
                tongvat: true,
                khachhang: {
                    select: {
                        name: true,
                        makh: true,
                    },
                },
                sanpham: {
                    select: {
                        slnhan: true,
                        giaban: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const result = donhangs.map((donhang) => {
            let tong = 0;
            let soluong = 0;
            for (const item of donhang.sanpham) {
                const slnhan = Number(item.slnhan) || 0;
                const giaban = Number(item.giaban) || 0;
                tong += slnhan * giaban;
                soluong += slnhan;
            }
            return {
                id: donhang.id,
                madonhang: donhang.madonhang,
                ngaygiao: donhang.ngaygiao,
                tong: tong.toFixed(3),
                soluong: soluong.toFixed(3),
                tongtien: donhang.tongtien,
                tongvat: donhang.tongvat,
                name: donhang.khachhang?.name,
                makh: donhang.khachhang?.makh,
            };
        });
        return result;
    }
    async getCongnoKhachHangWithAggregation(params) {
        const { Batdau, Ketthuc, Status, khachhangIds, query } = params;
        let whereClause = 'WHERE 1=1';
        const queryParams = [];
        if (Batdau && Ketthuc) {
            whereClause += ` AND d.ngaygiao >= $${queryParams.length + 1} AND d.ngaygiao <= $${queryParams.length + 2}`;
            queryParams.push(new Date(Batdau), new Date(Ketthuc));
        }
        if (Status && Array.isArray(Status) && Status.length > 0) {
            whereClause += ` AND d.status = ANY($${queryParams.length + 1})`;
            queryParams.push(Status);
        }
        if (khachhangIds && Array.isArray(khachhangIds) && khachhangIds.length > 0) {
            whereClause += ` AND d."khachhangId" = ANY($${queryParams.length + 1})`;
            queryParams.push(khachhangIds);
        }
        if (query) {
            whereClause += ` AND (d.madonhang ILIKE $${queryParams.length + 1} OR k.name ILIKE $${queryParams.length + 2})`;
            queryParams.push(`%${query}%`, `%${query}%`);
        }
        const sql = `
      SELECT 
        d.id,
        d.madonhang,
        d.ngaygiao,
        d.tongtien,
        d.tongvat,
        k.name,
        k.makh,
        COALESCE(SUM(ds.slnhan * ds.giaban), 0) as tong,
        COALESCE(SUM(ds.slnhan), 0) as soluong
      FROM "Donhang" d
      LEFT JOIN "Khachhang" k ON d."khachhangId" = k.id
      LEFT JOIN "Donhangsanpham" ds ON d.id = ds."donhangId"
      ${whereClause}
      GROUP BY d.id, d.madonhang, d.ngaygiao, d.tongtien, d.tongvat, k.name, k.makh, d."createdAt"
      ORDER BY d."createdAt" DESC
    `;
        const result = await this.prisma.$queryRawUnsafe(sql, ...queryParams);
        return result.map((row) => ({
            id: row.id,
            madonhang: row.madonhang,
            ngaygiao: row.ngaygiao,
            tong: Number(row.tong).toFixed(3),
            soluong: Number(row.soluong).toFixed(3),
            tongtien: row.tongtien,
            tongvat: row.tongvat,
            name: row.name,
            makh: row.makh,
        }));
    }
    async getCongnoKhachHangCached(params) {
        const cacheKey = `congno:${JSON.stringify(params)}`;
        const result = await this.getCongnoKhachHangWithAggregation(params);
        return result;
    }
};
exports.OptimizedCongnoService = OptimizedCongnoService;
exports.OptimizedCongnoService = OptimizedCongnoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OptimizedCongnoService);
//# sourceMappingURL=optimized-congno.service.js.map