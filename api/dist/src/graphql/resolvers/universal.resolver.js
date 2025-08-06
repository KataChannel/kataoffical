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
exports.UniversalResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const universal_service_1 = require("../services/universal.service");
const graphql_type_json_1 = require("graphql-type-json");
const types_1 = require("../types");
let UniversalResolver = class UniversalResolver {
    constructor(universalService) {
        this.universalService = universalService;
    }
    async getAvailableModels() {
        return this.universalService.getAvailableModels();
    }
    async findMany(modelName, where, orderBy, skip, take, include) {
        const safeSkip = skip ?? 0;
        const safeTake = take ?? 10;
        const page = Math.floor(safeSkip / safeTake) + 1;
        const pagination = { page, pageSize: safeTake };
        const sort = orderBy ? {
            field: Object.keys(orderBy)[0],
            direction: (Object.values(orderBy)[0] === 'desc' ? 'desc' : 'asc')
        } : undefined;
        return await this.universalService.findAll(modelName, pagination, where, sort, include);
    }
    async users(pagination, filter, sort) {
        const include = {
            profile: true,
            roles: {
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                },
            },
        };
        return await this.universalService.findAll('user', pagination, filter, sort, include);
    }
    async user(id) {
        const include = {
            profile: true,
            roles: {
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                },
            },
        };
        return await this.universalService.findById('user', id, include);
    }
    async createUser(input) {
        return await this.universalService.create('user', input);
    }
    async updateUser(input) {
        const { id, ...data } = input;
        return await this.universalService.update('user', id, data);
    }
    async deleteUser(id) {
        return await this.universalService.delete('user', id);
    }
    async sanphams(pagination, filter, sort) {
        const include = {
            banggia: {
                include: {
                    banggia: true,
                },
            },
            Nhacungcap: true,
        };
        let customFilter = filter;
        if (filter) {
            const where = {};
            if (filter.search) {
                where.OR = [
                    { title: { contains: filter.search, mode: 'insensitive' } },
                    { masp: { contains: filter.search, mode: 'insensitive' } },
                    { subtitle: { contains: filter.search, mode: 'insensitive' } },
                ];
            }
            if (filter.isActive !== undefined)
                where.isActive = filter.isActive;
            if (filter.dvt)
                where.dvt = { contains: filter.dvt, mode: 'insensitive' };
            if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
                where.giaban = {};
                if (filter.minPrice !== undefined)
                    where.giaban.gte = filter.minPrice;
                if (filter.maxPrice !== undefined)
                    where.giaban.lte = filter.maxPrice;
            }
            customFilter = where;
        }
        return await this.universalService.findAll('sanpham', pagination, customFilter, sort, include);
    }
    async sanpham(id) {
        const include = {
            banggia: {
                include: {
                    banggia: true,
                },
            },
            Nhacungcap: true,
        };
        return await this.universalService.findById('sanpham', id, include);
    }
    async createSanpham(input) {
        return await this.universalService.create('sanpham', input);
    }
    async updateSanpham(input) {
        const { id, ...data } = input;
        return await this.universalService.update('sanpham', id, data);
    }
    async deleteSanpham(id) {
        return await this.universalService.delete('sanpham', id);
    }
    async khachhangs(pagination, filter, sort) {
        const include = {
            banggia: true,
            nhomkhachhang: true,
            donhang: {
                take: 5,
                orderBy: { createdAt: 'desc' },
            },
        };
        let customFilter = filter;
        if (filter) {
            const where = {};
            if (filter.search) {
                where.OR = [
                    { name: { contains: filter.search, mode: 'insensitive' } },
                    { makh: { contains: filter.search, mode: 'insensitive' } },
                    { tenkh: { contains: filter.search, mode: 'insensitive' } },
                    { diachi: { contains: filter.search, mode: 'insensitive' } },
                    { sdt: { contains: filter.search, mode: 'insensitive' } },
                ];
            }
            if (filter.isActive !== undefined)
                where.isActive = filter.isActive;
            if (filter.loaikh)
                where.loaikh = filter.loaikh;
            if (filter.quan)
                where.quan = { contains: filter.quan, mode: 'insensitive' };
            if (filter.hiengia !== undefined)
                where.hiengia = filter.hiengia;
            customFilter = where;
        }
        return await this.universalService.findAll('khachhang', pagination, customFilter, sort, include);
    }
    async khachhang(id) {
        const include = {
            banggia: true,
            nhomkhachhang: true,
            donhang: {
                include: {
                    sanpham: {
                        include: {
                            sanpham: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            },
        };
        return await this.universalService.findById('khachhang', id, include);
    }
    async createKhachhang(input) {
        return await this.universalService.create('khachhang', input);
    }
    async updateKhachhang(input) {
        const { id, ...data } = input;
        return await this.universalService.update('khachhang', id, data);
    }
    async deleteKhachhang(id) {
        return await this.universalService.delete('khachhang', id);
    }
    async donhangs(pagination, filter, sort) {
        const include = {
            khachhang: true,
            sanpham: {
                include: {
                    sanpham: true,
                },
            },
        };
        let customFilter = filter;
        if (filter) {
            const where = {};
            if (filter.search) {
                where.OR = [
                    { madonhang: { contains: filter.search, mode: 'insensitive' } },
                    { title: { contains: filter.search, mode: 'insensitive' } },
                    { ghichu: { contains: filter.search, mode: 'insensitive' } },
                ];
            }
            if (filter.status)
                where.status = filter.status;
            if (filter.statuses && filter.statuses.length > 0)
                where.status = { in: filter.statuses };
            if (filter.khachhangId)
                where.khachhangId = filter.khachhangId;
            if (filter.isActive !== undefined)
                where.isActive = filter.isActive;
            if (filter.isshowvat !== undefined)
                where.isshowvat = filter.isshowvat;
            if (filter.startDate && filter.endDate) {
                where.ngaygiao = {
                    gte: filter.startDate,
                    lte: filter.endDate,
                };
            }
            if (filter.minTongtien !== undefined || filter.maxTongtien !== undefined) {
                where.tongtien = {};
                if (filter.minTongtien !== undefined)
                    where.tongtien.gte = filter.minTongtien;
                if (filter.maxTongtien !== undefined)
                    where.tongtien.lte = filter.maxTongtien;
            }
            customFilter = where;
        }
        return await this.universalService.findAll('donhang', pagination, customFilter, sort, include);
    }
    async donhang(id) {
        const include = {
            khachhang: true,
            sanpham: {
                include: {
                    sanpham: true,
                },
            },
        };
        return await this.universalService.findById('donhang', id, include);
    }
    async createDonhang(input) {
        if (!input.title) {
            const orderCount = await this.universalService.prisma.donhang.count();
            input.title = `DH${String(orderCount + 1).padStart(6, '0')}`;
        }
        return await this.universalService.create('donhang', input);
    }
    async updateDonhang(input) {
        const { id, ...data } = input;
        return await this.universalService.update('donhang', id, data);
    }
    async deleteDonhang(id) {
        return await this.universalService.delete('donhang', id);
    }
    async khos(pagination, filter, sort) {
        const include = {
            congty: true,
            sanphamKho: {
                include: {
                    sanpham: true,
                },
            },
        };
        return await this.universalService.findAll('kho', pagination, filter, sort, include);
    }
    async kho(id) {
        const include = {
            congty: true,
            sanphamKho: {
                include: {
                    sanpham: true,
                },
            },
            phieukho: {
                take: 10,
                orderBy: { createdAt: 'desc' },
            },
        };
        return await this.universalService.findById('kho', id, include);
    }
    async createKho(input) {
        return await this.universalService.create('kho', input);
    }
    async updateKho(input) {
        const { id, ...data } = input;
        return await this.universalService.update('kho', id, data);
    }
    async deleteKho(id) {
        return await this.universalService.delete('kho', id);
    }
    async phieukhos(pagination, filter, sort) {
        const include = {
            kho: true,
            donhang: true,
            sanpham: {
                include: {
                    sanpham: true,
                },
            },
        };
        return await this.universalService.findAll('phieuKho', pagination, filter, sort, include);
    }
    async phieukho(id) {
        const include = {
            kho: true,
            donhang: true,
            sanpham: {
                include: {
                    sanpham: true,
                },
            },
        };
        return await this.universalService.findById('phieuKho', id, include);
    }
    async createPhieuKho(input) {
        return await this.universalService.create('phieuKho', input);
    }
    async updatePhieuKho(input) {
        const { id, ...data } = input;
        return await this.universalService.update('phieuKho', id, data);
    }
    async deletePhieuKho(id) {
        return await this.universalService.delete('phieuKho', id);
    }
    async tonkhos(pagination, filter, sort) {
        const include = {
            sanpham: true,
        };
        return await this.universalService.findAll('tonKho', pagination, filter, sort, include);
    }
    async tonkho(id) {
        const include = {
            sanpham: true,
        };
        return await this.universalService.findById('tonKho', id, include);
    }
    async universalSearch(model, searchTerm, searchFields, pagination) {
        const result = await this.universalService.search(model, searchTerm, searchFields, pagination);
        return JSON.stringify(result);
    }
    async getModelStats(model) {
        const stats = await this.universalService.getStats(model);
        return JSON.stringify(stats);
    }
    async bulkCreate(model, data) {
        const parsedData = JSON.parse(data);
        const result = await this.universalService.bulkCreate(model, parsedData);
        return JSON.stringify(result);
    }
    async bulkDelete(model, ids) {
        await this.universalService.bulkDelete(model, ids);
        return true;
    }
};
exports.UniversalResolver = UniversalResolver;
__decorate([
    (0, graphql_1.Query)(() => [String], {
        description: 'Lấy danh sách tất cả models có sẵn trong hệ thống'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "getAvailableModels", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Lấy danh sách records của bất kỳ model nào với pagination và filtering'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model (ví dụ: user, sanpham, donhang...)' })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Điều kiện lọc (JSON format)'
    })),
    __param(2, (0, graphql_1.Args)('orderBy', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Sắp xếp (JSON format)'
    })),
    __param(3, (0, graphql_1.Args)('skip', {
        nullable: true,
        defaultValue: 0,
        description: 'Số records bỏ qua (pagination)'
    })),
    __param(4, (0, graphql_1.Args)('take', {
        nullable: true,
        defaultValue: 10,
        description: 'Số records lấy ra (pagination)'
    })),
    __param(5, (0, graphql_1.Args)('include', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Include relations (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "findMany", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.UserPaginated),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        types_1.UserFilterInput,
        types_1.SortInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.User),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.User),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.SanphamPaginated),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        types_1.SanphamFilterInput,
        types_1.SortInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "sanphams", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.Sanpham),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "sanpham", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Sanpham),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CreateSanphamInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createSanpham", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Sanpham),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateSanphamInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateSanpham", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteSanpham", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.KhachhangPaginated),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        types_1.KhachhangFilterInput,
        types_1.SortInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "khachhangs", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.Khachhang),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "khachhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Khachhang),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CreateKhachhangInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createKhachhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Khachhang),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateKhachhangInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateKhachhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteKhachhang", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.DonhangPaginated),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        types_1.DonhangFilterInput,
        types_1.SortInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "donhangs", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.Donhang),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "donhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Donhang),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CreateDonhangInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createDonhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Donhang),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateDonhangInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateDonhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteDonhang", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.KhoPaginated),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        types_1.KhoFilterInput,
        types_1.SortInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "khos", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.Kho),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "kho", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Kho),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CreateKhoInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createKho", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Kho),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateKhoInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateKho", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteKho", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.PhieuKhoPaginated),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        types_1.PhieuKhoFilterInput,
        types_1.SortInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "phieukhos", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.PhieuKho),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "phieukho", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.PhieuKho),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CreatePhieuKhoInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createPhieuKho", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.PhieuKho),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdatePhieuKhoInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updatePhieuKho", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deletePhieuKho", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.TonKhoPaginated),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput,
        types_1.TonKhoFilterInput,
        types_1.SortInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "tonkhos", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.TonKho),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "tonkho", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('model')),
    __param(1, (0, graphql_1.Args)('searchTerm')),
    __param(2, (0, graphql_1.Args)('searchFields', { type: () => [String] })),
    __param(3, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, types_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "universalSearch", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('model')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "getModelStats", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('model')),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "bulkCreate", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('model')),
    __param(1, (0, graphql_1.Args)('ids', { type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "bulkDelete", null);
exports.UniversalResolver = UniversalResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [universal_service_1.UniversalGraphQLService])
], UniversalResolver);
//# sourceMappingURL=universal.resolver.js.map