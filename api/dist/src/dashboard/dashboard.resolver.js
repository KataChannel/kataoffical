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
exports.DashboardResolver = exports.TopProductItem = exports.SanphamInfo = exports.DailyMonthlyReportItem = exports.AggregateResult = exports.AggregateSum = exports.AggregateCount = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const graphql_2 = require("@nestjs/graphql");
let AggregateCount = class AggregateCount {
};
exports.AggregateCount = AggregateCount;
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], AggregateCount.prototype, "_all", void 0);
exports.AggregateCount = AggregateCount = __decorate([
    (0, graphql_2.ObjectType)()
], AggregateCount);
let AggregateSum = class AggregateSum {
};
exports.AggregateSum = AggregateSum;
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Float, { nullable: true }),
    __metadata("design:type", Number)
], AggregateSum.prototype, "tongtien", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Float, { nullable: true }),
    __metadata("design:type", Number)
], AggregateSum.prototype, "tongvat", void 0);
exports.AggregateSum = AggregateSum = __decorate([
    (0, graphql_2.ObjectType)()
], AggregateSum);
let AggregateResult = class AggregateResult {
};
exports.AggregateResult = AggregateResult;
__decorate([
    (0, graphql_2.Field)(() => AggregateCount),
    __metadata("design:type", AggregateCount)
], AggregateResult.prototype, "_count", void 0);
__decorate([
    (0, graphql_2.Field)(() => AggregateSum, { nullable: true }),
    __metadata("design:type", AggregateSum)
], AggregateResult.prototype, "_sum", void 0);
exports.AggregateResult = AggregateResult = __decorate([
    (0, graphql_2.ObjectType)()
], AggregateResult);
let DailyMonthlyReportItem = class DailyMonthlyReportItem {
};
exports.DailyMonthlyReportItem = DailyMonthlyReportItem;
__decorate([
    (0, graphql_2.Field)(() => String),
    __metadata("design:type", String)
], DailyMonthlyReportItem.prototype, "period", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], DailyMonthlyReportItem.prototype, "totalDonhang", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], DailyMonthlyReportItem.prototype, "totalDathang", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Float),
    __metadata("design:type", Number)
], DailyMonthlyReportItem.prototype, "totalRevenue", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Float),
    __metadata("design:type", Number)
], DailyMonthlyReportItem.prototype, "totalProfit", void 0);
exports.DailyMonthlyReportItem = DailyMonthlyReportItem = __decorate([
    (0, graphql_2.ObjectType)()
], DailyMonthlyReportItem);
let SanphamInfo = class SanphamInfo {
};
exports.SanphamInfo = SanphamInfo;
__decorate([
    (0, graphql_2.Field)(() => String),
    __metadata("design:type", String)
], SanphamInfo.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SanphamInfo.prototype, "title", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SanphamInfo.prototype, "masp", void 0);
exports.SanphamInfo = SanphamInfo = __decorate([
    (0, graphql_2.ObjectType)()
], SanphamInfo);
let TopProductItem = class TopProductItem {
};
exports.TopProductItem = TopProductItem;
__decorate([
    (0, graphql_2.Field)(() => SanphamInfo),
    __metadata("design:type", SanphamInfo)
], TopProductItem.prototype, "sanpham", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Float),
    __metadata("design:type", Number)
], TopProductItem.prototype, "totalQuantity", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Float),
    __metadata("design:type", Number)
], TopProductItem.prototype, "totalValue", void 0);
exports.TopProductItem = TopProductItem = __decorate([
    (0, graphql_2.ObjectType)()
], TopProductItem);
let DashboardResolver = class DashboardResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async aggregateDonhang(batdau, ketthuc) {
        let processedWhere = {};
        if (batdau || ketthuc) {
            processedWhere.createdAt = {};
            if (batdau) {
                processedWhere.createdAt.gte = new Date(batdau);
            }
            if (ketthuc) {
                processedWhere.createdAt.lte = new Date(ketthuc);
            }
        }
        const count = await this.prisma.donhang.count({ where: processedWhere });
        const sum = await this.prisma.donhang.aggregate({
            where: processedWhere,
            _sum: {
                tongtien: true,
                tongvat: true,
            },
        });
        return {
            _count: { _all: count },
            _sum: {
                tongtien: sum._sum.tongtien ? Number(sum._sum.tongtien) : undefined,
                tongvat: sum._sum.tongvat ? Number(sum._sum.tongvat) : undefined,
            },
        };
    }
    async aggregateDathang(batdau, ketthuc) {
        let processedWhere = {};
        if (batdau || ketthuc) {
            processedWhere.createdAt = {};
            if (batdau) {
                processedWhere.createdAt.gte = new Date(batdau);
            }
            if (ketthuc) {
                processedWhere.createdAt.lte = new Date(ketthuc);
            }
        }
        const count = await this.prisma.dathang.count({ where: processedWhere });
        const sumQuery = await this.prisma.dathangsanpham.aggregate({
            where: {
                dathang: processedWhere,
            },
            _sum: {
                ttdat: true,
            },
        });
        return {
            _count: { _all: count },
            _sum: {
                tongtien: sumQuery._sum?.ttdat ? Number(sumQuery._sum.ttdat) : 0
            },
        };
    }
    async aggregateSanpham() {
        const count = await this.prisma.sanpham.count();
        return {
            _count: { _all: count },
        };
    }
    async aggregateKhachhang() {
        const count = await this.prisma.khachhang.count();
        return {
            _count: { _all: count },
        };
    }
    async aggregateNhacungcap() {
        const count = await this.prisma.nhacungcap.count();
        return {
            _count: { _all: count },
        };
    }
    async dailyMonthlyReport(batdau, ketthuc, groupBy) {
        const startDate = new Date(batdau);
        const endDate = new Date(ketthuc);
        let selectFormat = '';
        let orderBy = '';
        switch (groupBy) {
            case 'day':
                selectFormat = `DATE(createdAt) as period`;
                orderBy = 'period';
                break;
            case 'month':
                selectFormat = `DATE_FORMAT(createdAt, '%Y-%m') as period`;
                orderBy = 'period';
                break;
            case 'year':
                selectFormat = `YEAR(createdAt) as period`;
                orderBy = 'period';
                break;
            default:
                selectFormat = `DATE(createdAt) as period`;
                orderBy = 'period';
        }
        const rawQuery = `
      SELECT 
        ${selectFormat},
        COUNT(*) as totalDonhang,
        COALESCE(SUM(tongtien), 0) as totalRevenue,
        COALESCE(SUM(tongtien), 0) as totalProfit
      FROM "Donhang" 
      WHERE "createdAt" >= $1 AND "createdAt" <= $2
      GROUP BY ${selectFormat}
      ORDER BY ${orderBy}
    `;
        const result = await this.prisma.$queryRawUnsafe(rawQuery, startDate, endDate);
        return result.map((item) => ({
            period: item.period,
            totalDonhang: Number(item.totalDonhang),
            totalDathang: Number(item.totalDathang || 0),
            totalRevenue: Number(item.totalRevenue),
            totalProfit: Number(item.totalProfit),
        }));
    }
    async topProductsByQuantity(batdau, ketthuc, limit) {
        const startDate = new Date(batdau);
        const endDate = new Date(ketthuc);
        const rawQuery = `
      SELECT 
        sp.id,
        sp.title,
        sp.masp,
        SUM(dsp.sldat) as totalQuantity,
        SUM(dsp.ttdat) as totalValue
      FROM "Donhangsanpham" dsp
      INNER JOIN "Sanpham" sp ON dsp."idSP" = sp.id
      INNER JOIN "Donhang" dh ON dsp."donhangId" = dh.id
      WHERE dh."createdAt" >= $1 AND dh."createdAt" <= $2
      GROUP BY sp.id, sp.title, sp.masp
      ORDER BY totalQuantity DESC
      LIMIT $3
    `;
        const result = await this.prisma.$queryRawUnsafe(rawQuery, startDate, endDate, limit);
        return result.map((item) => ({
            sanpham: {
                id: item.id,
                title: item.title,
                masp: item.masp,
            },
            totalQuantity: Number(item.totalquantity) || 0,
            totalValue: Number(item.totalvalue) || 0,
        }));
    }
    async topProductsByValue(batdau, ketthuc, limit) {
        const startDate = new Date(batdau);
        const endDate = new Date(ketthuc);
        const rawQuery = `
      SELECT 
        sp.id,
        sp.title,
        sp.masp,
        SUM(dsp.sldat) as totalQuantity,
        SUM(dsp.ttdat) as totalValue
      FROM "Donhangsanpham" dsp
      INNER JOIN "Sanpham" sp ON dsp."idSP" = sp.id
      INNER JOIN "Donhang" dh ON dsp."donhangId" = dh.id
      WHERE dh."createdAt" >= $1 AND dh."createdAt" <= $2
      GROUP BY sp.id, sp.title, sp.masp
      ORDER BY totalValue DESC
      LIMIT $3
    `;
        const result = await this.prisma.$queryRawUnsafe(rawQuery, startDate, endDate, limit);
        return result.map((item) => ({
            sanpham: {
                id: item.id,
                title: item.title,
                masp: item.masp,
            },
            totalQuantity: Number(item.totalquantity) || 0,
            totalValue: Number(item.totalvalue) || 0,
        }));
    }
};
exports.DashboardResolver = DashboardResolver;
__decorate([
    (0, graphql_1.Query)(() => AggregateResult),
    __param(0, (0, graphql_1.Args)('batdau', { nullable: true })),
    __param(1, (0, graphql_1.Args)('ketthuc', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "aggregateDonhang", null);
__decorate([
    (0, graphql_1.Query)(() => AggregateResult),
    __param(0, (0, graphql_1.Args)('batdau', { nullable: true })),
    __param(1, (0, graphql_1.Args)('ketthuc', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "aggregateDathang", null);
__decorate([
    (0, graphql_1.Query)(() => AggregateResult),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "aggregateSanpham", null);
__decorate([
    (0, graphql_1.Query)(() => AggregateResult),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "aggregateKhachhang", null);
__decorate([
    (0, graphql_1.Query)(() => AggregateResult),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "aggregateNhacungcap", null);
__decorate([
    (0, graphql_1.Query)(() => [DailyMonthlyReportItem]),
    __param(0, (0, graphql_1.Args)('batdau')),
    __param(1, (0, graphql_1.Args)('ketthuc')),
    __param(2, (0, graphql_1.Args)('groupBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "dailyMonthlyReport", null);
__decorate([
    (0, graphql_1.Query)(() => [TopProductItem]),
    __param(0, (0, graphql_1.Args)('batdau')),
    __param(1, (0, graphql_1.Args)('ketthuc')),
    __param(2, (0, graphql_1.Args)('limit', { type: () => graphql_2.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "topProductsByQuantity", null);
__decorate([
    (0, graphql_1.Query)(() => [TopProductItem]),
    __param(0, (0, graphql_1.Args)('batdau')),
    __param(1, (0, graphql_1.Args)('ketthuc')),
    __param(2, (0, graphql_1.Args)('limit', { type: () => graphql_2.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "topProductsByValue", null);
exports.DashboardResolver = DashboardResolver = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)('Dashboard'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardResolver);
//# sourceMappingURL=dashboard.resolver.js.map