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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("../socket.gateway");
const errorlogs_service_1 = require("../errorlogs/errorlogs.service");
const moment = require("moment-timezone");
let DashboardService = class DashboardService {
    constructor(prisma, socketGateway, errorLogService) {
        this.prisma = prisma;
        this.socketGateway = socketGateway;
        this.errorLogService = errorLogService;
    }
    getSummary(query) {
        throw new Error('Method not implemented.');
    }
    getTopSellingProducts(limit, query) {
        throw new Error('Method not implemented.');
    }
    getLowStockProducts() {
        throw new Error('Method not implemented.');
    }
    getRecentOrders(limit) {
        throw new Error('Method not implemented.');
    }
    getSalesTrend(query) {
        throw new Error('Method not implemented.');
    }
    getDoanhthu(data) {
        throw new Error('Method not implemented.');
    }
    async getDonhang(data) {
        const { Batdau, Ketthuc } = data;
        const startDate = Batdau
            ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
            : moment().tz('Asia/Ho_Chi_Minh').startOf('day').toDate();
        const endDate = Ketthuc
            ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
            : moment().tz('Asia/Ho_Chi_Minh').endOf('day').toDate();
        const duration = moment(endDate).diff(moment(startDate));
        const previousStartDate = moment(startDate)
            .subtract(duration, 'milliseconds')
            .toDate();
        const previousEndDate = moment(endDate)
            .subtract(duration, 'milliseconds')
            .toDate();
        const dateFilter = {
            ngaygiao: {
                gte: startDate,
                lte: endDate,
            },
        };
        const [donhangCount, previousDonhangCount] = await Promise.all([
            this.prisma.donhang.count({ where: dateFilter }),
            this.prisma.donhang.count({
                where: {
                    ngaygiao: {
                        gte: previousStartDate,
                        lte: previousEndDate,
                    },
                },
            }),
        ]);
        const dathangDateFilter = {
            ngaynhan: {
                gte: startDate,
                lte: endDate,
            },
        };
        const [dathangCount, previousDathangCount] = await Promise.all([
            this.prisma.dathang.count({ where: dathangDateFilter }),
            this.prisma.dathang.count({
                where: {
                    ngaynhan: {
                        gte: previousStartDate,
                        lte: previousEndDate,
                    },
                },
            }),
        ]);
        const [sanphamDonhang, sanphamDathang] = await Promise.all([
            this.prisma.donhangsanpham.groupBy({
                by: ['idSP'],
                where: {
                    donhang: dateFilter,
                },
                _count: true,
            }),
            this.prisma.dathangsanpham.groupBy({
                by: ['idSP'],
                where: {
                    dathang: dathangDateFilter,
                },
                _count: true,
            }),
        ]);
        const [productQuantitiesDonhang, productQuantitiesDathang] = await Promise.all([
            this.prisma.donhangsanpham.groupBy({
                by: ['idSP'],
                where: {
                    donhang: dateFilter,
                },
                _sum: {
                    sldat: true,
                },
            }),
            this.prisma.dathangsanpham.groupBy({
                by: ['idSP'],
                where: {
                    dathang: dathangDateFilter,
                },
                _sum: {
                    sldat: true,
                },
            }),
        ]);
        const productIds = [
            ...new Set([
                ...productQuantitiesDonhang.map((p) => p.idSP),
                ...productQuantitiesDathang.map((p) => p.idSP),
            ]),
        ];
        const products = await this.prisma.sanpham.findMany({
            where: {
                id: { in: productIds },
            },
            select: {
                id: true,
                title: true,
            },
        });
        const productMap = new Map(products.map((p) => [p.id, p]));
        const topDathang = await this.prisma.dathangsanpham.groupBy({
            by: ['idSP'],
            where: {
                dathang: dathangDateFilter,
            },
            _sum: {
                sldat: true,
            },
            orderBy: {
                _sum: {
                    sldat: 'desc',
                },
            },
            take: 10,
        });
        const topProducts = topDathang.map((item) => ({
            sanpham: productMap.get(item.idSP),
            soluong: item._sum.sldat || 0,
        }));
        const donhangRevenue = await this.prisma.donhangsanpham.aggregate({
            where: {
                donhang: dateFilter,
            },
            _sum: {
                ttdat: true,
            },
        });
        const dathangTotal = await this.prisma.dathangsanpham.aggregate({
            where: {
                dathang: dathangDateFilter,
            },
            _sum: {
                ttdat: true,
            },
        });
        const donhangPercentageChange = previousDonhangCount > 0
            ? (((donhangCount - previousDonhangCount) / previousDonhangCount) *
                100).toFixed(2)
            : 0;
        const dathangPercentageChange = previousDathangCount > 0
            ? (((dathangCount - previousDathangCount) / previousDathangCount) *
                100).toFixed(2)
            : 0;
        return {
            donhang: {
                total: donhangCount,
                previousTotal: previousDonhangCount,
                percentageChange: Number(donhangPercentageChange),
                sanphamCount: sanphamDonhang.length,
            },
            dathang: {
                total: dathangCount,
                previousTotal: previousDathangCount,
                percentageChange: Number(dathangPercentageChange),
                sanphamCount: sanphamDathang.length,
            },
            productQuantities: {
                donhang: productQuantitiesDonhang.map((item) => ({
                    sanpham: productMap.get(item.idSP),
                    soluong: item._sum.sldat || 0,
                })),
                dathang: productQuantitiesDathang.map((item) => ({
                    sanpham: productMap.get(item.idSP),
                    soluong: item._sum.sldat || 0,
                })),
            },
            topProducts,
            revenue: {
                donhang: donhangRevenue._sum.ttdat || 0,
                dathang: dathangTotal._sum.ttdat || 0,
            },
            period: {
                start: startDate,
                end: endDate,
            },
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlogs_service_1.ErrorlogsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map