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
const vttech_prisma_service_1 = require("../../prisma/vttech.prisma.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let KhachhangService = class KhachhangService {
    constructor(prisma, vttechPrisma, httpService) {
        this.prisma = prisma;
        this.vttechPrisma = vttechPrisma;
        this.httpService = httpService;
        this.ACADEMY_APIURL = process.env.ACADEMY_APIURL;
        this.Doanhthu = {
            "paidAmount": "Thanh Toán",
            "discountAmount": "Giảm Giá",
            "depositAmountUsing": "Tiền Đặt Cọc",
            "totalPaid": "Tổng Thanh Toán",
            "debtAmount": "Số Dư",
            "methodName": "Hình Thức",
            "content": "Nội Dung",
            "serviceId": 1253,
            "isProduct": 0,
            "quantity": "Số Lượng",
            "priceRoot": "Giá Gốc",
            "priceUnit": "Giá Đơn Vị",
            "price": "Giá",
            "amount": "Số Tiền",
            "timeToTreatment": "Thời Gian Điều Trị",
            "percentOfService": "Phần Trăm Dịch Vụ",
            "treatIndex": 0,
        };
    }
    async create(data) {
        const prefix = data.loaikh === 'khachsi' ? 'TG-KS' : 'TG-KL';
        const lastCustomer = await this.prisma.khachhang.findFirst({
            where: { makh: { startsWith: prefix } },
            orderBy: { makh: 'desc' },
            select: { makh: true },
        });
        let nextNumber = 1;
        if (lastCustomer) {
            const lastNumber = parseInt(lastCustomer.makh.slice(-5), 10);
            nextNumber = lastNumber + 1;
        }
        const newMakh = `${prefix}${String(nextNumber).padStart(5, '0')}`;
        return this.prisma.khachhang.create({
            data: {
                makh: newMakh,
                loaikh: data.loaikh,
                name: data.name,
                diachi: data.diachi,
                sdt: data.sdt,
                email: data.email,
            },
        });
    }
    async findAll() {
        return this.prisma.khachhang.findMany();
    }
    async findAllVttech({ page, limit }) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.vttechPrisma.customer.findMany({
                where: {},
                skip,
                take: limit
            }),
            this.vttechPrisma.customer.count(),
        ]);
        const pageCount = Math.ceil(total / limit);
        return {
            data,
            page: page || 1,
            pageCount: pageCount || 1,
            total,
            pageSize: limit,
        };
    }
    async Syncdichvus(param) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.ACADEMY_APIURL + '/dichvu/syncsdichvu', param));
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to call API: ${error.message}`);
        }
    }
    async Syncdoanhthus(param) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.ACADEMY_APIURL + '/doanhthu/syncsdoanhthu', param));
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to call API: ${error.message}`);
        }
    }
    async Syncdoanhsos(param) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.ACADEMY_APIURL + '/doanhso/syncsdoanhso', param));
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to call API: ${error.message}`);
        }
    }
    async Syncdieutris(param) {
        try {
        }
        catch (error) {
            throw new Error(`Failed to call API: ${error.message}`);
        }
    }
    async Synclichhens(param) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.ACADEMY_APIURL + '/lichhen/syncslichhen', param));
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to call API: ${error.message}`);
        }
    }
    async Synckhoahocs(param) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.ACADEMY_APIURL + '/khoahoc/syncskhoahoc', param));
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to call API: ${error.message}`);
        }
    }
    async findKhachhangDoanhthu(param) {
        try {
            if (param && param.length > 0) {
                const khachhangs = await this.vttechPrisma.customer.findMany({
                    select: { code: true, phone: true },
                    where: {
                        OR: param.map((phone) => ({ phone })),
                    },
                });
                let dichvusRaw = await this.vttechPrisma.dichvu.findMany({
                    where: {
                        phone: { in: khachhangs.map(kh => kh.phone).filter((phone) => phone !== null) },
                    },
                });
                let dichvus = dichvusRaw.map((v) => {
                    return {
                        codeId: v.id,
                        phone: v.phone,
                        phone2: v.phone2,
                        name: v.name,
                        code: v.code,
                        birthday: v.birthday,
                        gender: v.gender,
                        serviceCode: v.serviceCode,
                        tabCode: v.tabCode,
                        serviceName: v.serviceName,
                        timeIndex: v.timeIndex,
                        timeToTreatment: v.timeToTreatment,
                        priceUnit: v.priceUnit,
                        quantity: v.quantity,
                        discount: v.discount,
                        priceRoot: v.priceRoot,
                        priceDiscounted: v.priceDiscounted,
                        branchId: v.branchId,
                        createdDate: v.createdDate,
                        modifiedDate: v.modifiedDate,
                        state: v.state,
                    };
                });
                const dichvu = await this.Syncdichvus(dichvus);
                let doanhthus = await this.vttechPrisma.revenue.findMany({
                    where: {
                        custPhone: { in: param },
                    },
                });
                let doanhthu = await this.Syncdichvus(doanhthus);
                let dieutris = await this.vttechPrisma.treatment.findMany({
                    where: {
                        phone: { in: param },
                    },
                });
                let lichhensRaw = await this.vttechPrisma.appointment.findMany({
                    where: {
                        custCode: { in: khachhangs.map(kh => kh.code).filter((code) => code !== null) },
                    },
                });
                let lichhens = lichhensRaw.map((v) => {
                    const kh = khachhangs.find(kh => kh.code === v.custCode);
                    return {
                        "id": v.id,
                        "custCode": v.custCode,
                        "custName": v.custName,
                        "dateFrom": v.dateFrom,
                        "statusName": v.statusName,
                        "statusTime": v.statusTime,
                        "isCancel": v.isCancel,
                        "branchName": v.branchName,
                        "createdDate": v.createdDate,
                        "modifiedDate": v.modifiedDate,
                        "phone": kh?.phone || null,
                    };
                });
                const lichhen = await this.Synclichhens(lichhens);
                doanhthu = {
                    ...doanhthu,
                    totaldoanhthu: doanhthus.reduce((acc, item) => {
                        return acc + Number(item.amount);
                    }, 0),
                    totaldoanhso: doanhthus.reduce((acc, item) => {
                        return acc + Number(item.totalPaid);
                    }, 0)
                };
                return { lichhen, dichvu, doanhthu };
            }
            return { khachhangs: [], doanhthus: [], dieutris: [], dichvus: [], lichhen: [] };
        }
        catch (error) {
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (where.branchId) {
                where.branchId = {
                    in: where.branchId
                };
            }
            if (isOne) {
                const result = await this.vttechPrisma.customer.findFirst({
                    where,
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.vttechPrisma.customer.findMany({
                    where,
                    skip,
                    take: limit,
                }),
                this.vttechPrisma.customer.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        console.log(id);
        const khachhang = await this.vttechPrisma.customer.findFirst({ where: { OR: [{ phone: id }, { phone2: id }] } });
        const doanhthu = await this.vttechPrisma.revenue.findMany({ where: { custPhone: id } });
        return { khachhang, doanhthu };
    }
    async update(id, data) {
        return this.prisma.khachhang.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.khachhang.delete({ where: { id } });
    }
};
exports.KhachhangService = KhachhangService;
exports.KhachhangService = KhachhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        vttech_prisma_service_1.VttechPrismaService,
        axios_1.HttpService])
], KhachhangService);
//# sourceMappingURL=khachhang.service.js.map