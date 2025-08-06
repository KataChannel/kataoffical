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
exports.UniversalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UniversalService = class UniversalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMany(modelName, args = {}) {
        const { where = {}, orderBy = [], skip = 0, take = 10, include = {}, select = undefined, } = args;
        try {
            const model = this.getModel(modelName);
            const query = {
                where,
                orderBy,
                skip,
                take,
            };
            if (select) {
                query.select = select;
            }
            else if (Object.keys(include).length > 0) {
                query.include = include;
            }
            const [data, total] = await Promise.all([
                model.findMany(query),
                model.count({ where }),
            ]);
            return {
                data,
                total,
                page: Math.floor(skip / take) + 1,
                pageSize: take,
                totalPages: Math.ceil(total / take),
                hasNextPage: skip + take < total,
                hasPreviousPage: skip > 0,
            };
        }
        catch (error) {
            throw new Error(`Error finding ${modelName}: ${error.message}`);
        }
    }
    async findUnique(modelName, args) {
        try {
            const model = this.getModel(modelName);
            return await model.findUnique(args);
        }
        catch (error) {
            throw new Error(`Error finding unique ${modelName}: ${error.message}`);
        }
    }
    async create(modelName, data) {
        try {
            const model = this.getModel(modelName);
            return await model.create({ data });
        }
        catch (error) {
            throw new Error(`Error creating ${modelName}: ${error.message}`);
        }
    }
    async update(modelName, where, data) {
        try {
            const model = this.getModel(modelName);
            return await model.update({ where, data });
        }
        catch (error) {
            throw new Error(`Error updating ${modelName}: ${error.message}`);
        }
    }
    async delete(modelName, where) {
        try {
            const model = this.getModel(modelName);
            return await model.delete({ where });
        }
        catch (error) {
            throw new Error(`Error deleting ${modelName}: ${error.message}`);
        }
    }
    async upsert(modelName, where, create, update) {
        try {
            const model = this.getModel(modelName);
            return await model.upsert({ where, create, update });
        }
        catch (error) {
            throw new Error(`Error upserting ${modelName}: ${error.message}`);
        }
    }
    async aggregate(modelName, args) {
        try {
            const model = this.getModel(modelName);
            return await model.aggregate(args);
        }
        catch (error) {
            throw new Error(`Error aggregating ${modelName}: ${error.message}`);
        }
    }
    async groupBy(modelName, args) {
        try {
            const model = this.getModel(modelName);
            return await model.groupBy(args);
        }
        catch (error) {
            throw new Error(`Error grouping ${modelName}: ${error.message}`);
        }
    }
    getModel(modelName) {
        const normalizedModelName = this.normalizeModelName(modelName);
        const model = this.prisma[normalizedModelName];
        if (!model) {
            throw new Error(`Model ${modelName} not found in Prisma client`);
        }
        return model;
    }
    normalizeModelName(modelName) {
        return modelName.charAt(0).toLowerCase() + modelName.slice(1);
    }
    getAvailableModels() {
        return [
            'user',
            'role',
            'userRole',
            'permission',
            'rolePermission',
            'menu',
            'profile',
            'banggia',
            'khachhang',
            'nhomkhachhang',
            'sanpham',
            'donhang',
            'donhangsanpham',
            'banggiasanpham',
            'nhacungcap',
            'dathang',
            'dathangsanpham',
            'kho',
            'sanphamKho',
            'phieuKho',
            'phieuKhoSanpham',
            'tonKho',
            'chotkho',
            'auditLog',
        ];
    }
    async getModelInfo(modelName) {
        const model = this.getModel(modelName);
        return {
            modelName,
            availableOperations: [
                'findMany',
                'findUnique',
                'create',
                'update',
                'delete',
                'upsert',
                'aggregate',
                'groupBy'
            ]
        };
    }
};
exports.UniversalService = UniversalService;
exports.UniversalService = UniversalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UniversalService);
//# sourceMappingURL=universal.service.js.map