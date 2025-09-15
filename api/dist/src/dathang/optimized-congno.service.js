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
exports.OptimizedCongnoccService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OptimizedCongnoccService = class OptimizedCongnoccService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async congnoccSelectiveFields(params) {
        console.time('🔥 SELECTIVE_FIELDS Method');
        const { Batdau, Ketthuc, query } = params;
        const dateRange = {
            gte: Batdau ? new Date(Batdau) : undefined,
            lte: Ketthuc ? new Date(Ketthuc) : undefined,
        };
        const where = {
            ngaynhan: dateRange,
            status: Array.isArray(params.Status) ? { in: params.Status } : params.Status,
        };
        if (query) {
            where.OR = [
                { madncc: { contains: query, mode: 'insensitive' } },
                { nhacungcap: { name: { contains: query, mode: 'insensitive' } } },
            ];
        }
        const result = await this.prisma.dathang.findMany({
            where,
            select: {
                id: true,
                madncc: true,
                ngaynhan: true,
                nhacungcap: {
                    select: { name: true, mancc: true }
                },
                sanpham: {
                    select: {
                        slnhan: true,
                        sanpham: {
                            select: { giaban: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        const processedResult = result.map((v) => {
            let tong = 0;
            let soluong = 0;
            for (const item of v.sanpham) {
                const slnhan = Number(item.slnhan) || 0;
                const giaban = Number(item.sanpham?.giaban) || 0;
                tong += slnhan * giaban;
                soluong += slnhan;
            }
            return {
                id: v.id,
                madathang: v.madncc,
                ngaynhan: v.ngaynhan,
                tong: tong.toFixed(3),
                soluong: soluong.toFixed(3),
                tonnhap: tong.toFixed(3),
                tennhacungcap: v.nhacungcap?.name,
                manhacungcap: v.nhacungcap?.mancc,
            };
        });
        console.timeEnd('🔥 SELECTIVE_FIELDS Method');
        return processedResult;
    }
    async congnoccRawSQL(params) {
        console.time('⚡ RAW_SQL Method');
        const { Batdau, Ketthuc, query } = params;
        let whereConditions = [];
        let queryParams = [];
        let paramIndex = 1;
        if (Batdau) {
            whereConditions.push(`d.ngaynhan >= $${paramIndex}`);
            queryParams.push(new Date(Batdau));
            paramIndex++;
        }
        if (Ketthuc) {
            whereConditions.push(`d.ngaynhan <= $${paramIndex}`);
            queryParams.push(new Date(Ketthuc));
            paramIndex++;
        }
        if (params.Status) {
            if (Array.isArray(params.Status)) {
                const placeholders = params.Status.map(() => `$${paramIndex++}`).join(',');
                whereConditions.push(`d.status IN (${placeholders})`);
                queryParams.push(...params.Status);
            }
            else {
                whereConditions.push(`d.status = $${paramIndex}`);
                queryParams.push(params.Status);
                paramIndex++;
            }
        }
        if (query) {
            whereConditions.push(`(d.madncc ILIKE $${paramIndex} OR n.name ILIKE $${paramIndex})`);
            queryParams.push(`%${query}%`);
            paramIndex++;
        }
        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
        const sqlQuery = `
      SELECT 
        d.id,
        d.madncc as madathang,
        d.ngaynhan,
        COALESCE(SUM(ds.slnhan * s.giaban), 0) as tong,
        COALESCE(SUM(ds.slnhan), 0) as soluong,
        n.name as tennhacungcap,
        n.mancc as manhacungcap
      FROM "Dathang" d
      LEFT JOIN "Nhacungcap" n ON d.nhacungcapid = n.id  
      LEFT JOIN "Dathangsanpham" ds ON d.id = ds.dathangid
      LEFT JOIN "Sanpham" s ON ds.idsp = s.id
      ${whereClause}
      GROUP BY d.id, d.madncc, d.ngaynhan, d.createdat, n.name, n.mancc
      ORDER BY d.createdat DESC
    `;
        const result = await this.prisma.$queryRawUnsafe(sqlQuery, ...queryParams);
        const processedResult = result.map((row) => ({
            id: row.id,
            madathang: row.madathang,
            ngaynhan: row.ngaynhan,
            tong: Number(row.tong).toFixed(3),
            soluong: Number(row.soluong).toFixed(3),
            tonnhap: Number(row.tong).toFixed(3),
            tennhacungcap: row.tennhacungcap,
            manhacungcap: row.manhacungcap,
        }));
        console.timeEnd('⚡ RAW_SQL Method');
        return processedResult;
    }
    async congnoccCached(params) {
        console.time('💨 CACHED Method');
        const cacheKey = `congnoncc:${JSON.stringify(params)}`;
        try {
            const result = await this.congnoccSelectiveFields(params);
            console.timeEnd('💨 CACHED Method');
            return result;
        }
        catch (error) {
            console.error('Cache error:', error);
            return this.congnoccSelectiveFields(params);
        }
    }
};
exports.OptimizedCongnoccService = OptimizedCongnoccService;
exports.OptimizedCongnoccService = OptimizedCongnoccService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OptimizedCongnoccService);
//# sourceMappingURL=optimized-congno.service.js.map