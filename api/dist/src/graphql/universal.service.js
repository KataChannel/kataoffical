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
    mapModelName(model) {
        const modelMap = {
            'tonkho': 'tonKho',
            'sanpham': 'sanpham',
            'khachhang': 'khachhang',
            'nhomkhachhang': 'nhomkhachhang',
            'nhomncc': 'nhomNcc',
            'nhacungcap': 'nhacungcap',
            'donhang': 'donhang',
            'dathang': 'dathang',
            'phieukho': 'phieuKho',
            'chotkho': 'chotkho',
            'menu': 'menu',
            'user': 'user',
            'role': 'role',
            'permission': 'permission',
            'congnoncc': 'congnoncc',
        };
        return modelMap[model.toLowerCase()] || model;
    }
    validateAndGetPrismaModel(model) {
        if (!model) {
            throw new Error('Model name is required');
        }
        if (!this.prisma) {
            throw new Error('Prisma service is not initialized');
        }
        const mappedModel = this.mapModelName(model);
        console.log(`🔄 Model mapping: '${model}' -> '${mappedModel}'`);
        const prismaModel = this.prisma[mappedModel];
        if (!prismaModel) {
            throw new Error(`Model '${mappedModel}' does not exist in Prisma schema. Available models: ${Object.keys(this.prisma).filter(key => !key.startsWith('_')).join(', ')}`);
        }
        return { prismaModel, mappedModel };
    }
    async findAll(model, pagination = { page: 1, pageSize: 10 }, filter, sort, include) {
        const { prismaModel, mappedModel } = this.validateAndGetPrismaModel(model);
        const { page, pageSize } = pagination;
        const skip = (page - 1) * pageSize;
        const where = this.buildWhereClause(filter);
        const orderBy = sort ? { [sort.field]: sort.direction } : { createdAt: 'desc' };
        try {
            const [data, total] = await Promise.all([
                prismaModel.findMany({
                    skip,
                    take: pageSize,
                    where,
                    orderBy,
                    include,
                }),
                prismaModel.count({ where }),
            ]);
            const totalPages = Math.ceil(total / pageSize);
            return {
                data,
                pagination: {
                    total,
                    page,
                    pageSize,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error querying ${model}: ${error.message}`);
        }
    }
    async findMany(modelName, options = {}) {
        const { where, orderBy, skip = 0, take = 10, include, select } = options;
        try {
            const queryArgs = {
                skip,
                take,
                where,
                orderBy: orderBy || { createdAt: 'desc' },
            };
            if (select) {
                queryArgs.select = select;
            }
            else if (include) {
                queryArgs.include = include;
            }
            const [data, total] = await Promise.all([
                this.prisma[modelName].findMany(queryArgs),
                this.prisma[modelName].count({ where: where || {} }),
            ]);
            const totalPages = Math.ceil(total / take);
            const currentPage = Math.floor(skip / take) + 1;
            return {
                data,
                total,
                page: currentPage,
                pageSize: take,
                totalPages,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error in findMany for ${modelName}: ${error.message}`);
        }
    }
    async findUnique(modelName, options) {
        const { where, include, select } = options;
        try {
            const queryArgs = { where };
            if (select) {
                queryArgs.select = select;
            }
            else if (include) {
                queryArgs.include = include;
            }
            const result = await this.prisma[modelName].findUnique(queryArgs);
            if (!result) {
                throw new common_1.NotFoundException(`${modelName} not found with the given criteria`);
            }
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Error in findUnique for ${modelName}: ${error.message}`);
        }
    }
    async findById(model, id, include) {
        try {
            const result = await this.prisma[model].findUnique({
                where: { id },
                include,
            });
            if (!result) {
                throw new common_1.NotFoundException(`${model} with ID ${id} not found`);
            }
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Error finding ${model}: ${error.message}`);
        }
    }
    async create(model, data, include) {
        try {
            const { prismaModel, mappedModel } = this.validateAndGetPrismaModel(model);
            if (typeof prismaModel.create !== 'function') {
                throw new Error(`Create method does not exist on model '${mappedModel}'`);
            }
            console.log(`🔍 Creating ${mappedModel} with:`, { data, include });
            const result = await prismaModel.create({
                data,
                include,
            });
            console.log(`✅ Create result for ${mappedModel}:`, result);
            return result;
        }
        catch (error) {
            console.error(`❌ Error creating ${model}:`, error);
            throw new common_1.BadRequestException(`Error creating ${model}: ${error.message}`);
        }
    }
    async update(model, where, data, include, select) {
        try {
            const { prismaModel, mappedModel } = this.validateAndGetPrismaModel(model);
            if (typeof prismaModel.update !== 'function') {
                throw new Error(`Update method does not exist on model '${mappedModel}'`);
            }
            console.log(`🔍 Updating ${mappedModel} with:`, {
                where,
                dataKeys: Object.keys(data),
                include,
                select
            });
            if (mappedModel.toLowerCase() === 'user') {
                console.log(`👤 User update data preview:`, {
                    id: data.id,
                    email: data.email,
                    hasRoles: !!data.roles,
                    rolesCount: data.roles ? (Array.isArray(data.roles) ? data.roles.length : 'not array') : 0,
                    hasPermissions: !!data.permissions,
                    otherFields: Object.keys(data).filter(k => !['id', 'email', 'roles', 'permissions'].includes(k))
                });
            }
            const cleanData = this.validateAndCleanRelationData(data);
            console.log(`🧹 [CLEAN] Original data keys:`, Object.keys(data));
            console.log(`🧹 [CLEAN] Cleaned data keys:`, Object.keys(cleanData));
            console.log(`🧹 [CLEAN] Original khachhang:`, data.khachhang);
            console.log(`🧹 [CLEAN] Cleaned khachhang:`, cleanData.khachhang);
            const updateOptions = {
                where,
                data: cleanData
            };
            if (include) {
                updateOptions.include = include;
            }
            if (select) {
                updateOptions.select = select;
            }
            console.log(`📤 Final update options for ${mappedModel}:`, JSON.stringify(updateOptions, null, 2));
            const result = await prismaModel.update(updateOptions);
            console.log(`✅ Update result for ${mappedModel}:`, result);
            return result;
        }
        catch (error) {
            console.error(`❌ Error updating ${model}:`, error);
            throw new common_1.BadRequestException(`Error updating ${model}: ${error.message}`);
        }
    }
    validateAndCleanRelationData(data) {
        if (!data || typeof data !== 'object')
            return data;
        const cleanData = { ...data };
        const excludeFromUpdates = [
            'roles', 'permissions', 'profile', 'userRoles', 'rolePermissions',
            'user', 'role', 'permission'
        ];
        excludeFromUpdates.forEach(field => {
            if (cleanData[field]) {
                if (Array.isArray(cleanData[field])) {
                    console.log(`🚫 Removing complex relation array field '${field}' from update data`);
                    delete cleanData[field];
                }
                else if (typeof cleanData[field] === 'object' && cleanData[field] !== null) {
                    const nestedKeys = Object.keys(cleanData[field]);
                    const hasComplexNesting = nestedKeys.some(key => typeof cleanData[field][key] === 'object' && cleanData[field][key] !== null);
                    if (hasComplexNesting) {
                        console.log(`🚫 Removing complex nested relation field '${field}' from update data`);
                        delete cleanData[field];
                    }
                }
            }
        });
        Object.keys(cleanData).forEach(key => {
            const value = cleanData[key];
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (value.connect) {
                    cleanData[key].connect = this.validateConnectArray(value.connect);
                    console.log(`✅ [RELATION] Validated connect for '${key}':`, cleanData[key].connect);
                    console.log(`✅ [RELATION] Connect count for '${key}':`, cleanData[key].connect.length);
                }
                if (value.disconnect) {
                    cleanData[key].disconnect = this.validateConnectArray(value.disconnect);
                    console.log(`✅ [RELATION] Validated disconnect for '${key}':`, cleanData[key].disconnect);
                    console.log(`✅ [RELATION] Disconnect count for '${key}':`, cleanData[key].disconnect.length);
                }
                if (value.set !== undefined) {
                    if (Array.isArray(value.set)) {
                        cleanData[key].set = this.validateConnectArray(value.set);
                        console.log(`✅ [RELATION] Validated set for '${key}':`, cleanData[key].set);
                        console.log(`✅ [RELATION] Set count for '${key}':`, cleanData[key].set.length);
                    }
                }
                if (value.connect && value.connect.length === 0) {
                    console.log(`🧹 [RELATION] Removing empty connect for '${key}'`);
                    delete cleanData[key].connect;
                }
                if (value.disconnect && value.disconnect.length === 0) {
                    console.log(`🧹 [RELATION] Removing empty disconnect for '${key}'`);
                    delete cleanData[key].disconnect;
                }
                if (value.set !== undefined && Array.isArray(value.set) && value.set.length === 0) {
                    console.log(`🧹 [RELATION] Removing empty set for '${key}'`);
                    delete cleanData[key].set;
                }
                if (Object.keys(cleanData[key]).length === 0) {
                    delete cleanData[key];
                }
            }
        });
        console.log(`📋 Final cleaned data:`, Object.keys(cleanData));
        return cleanData;
    }
    validateConnectArray(items) {
        if (!Array.isArray(items))
            return [];
        return items.filter(item => {
            return item &&
                typeof item === 'object' &&
                item.id &&
                typeof item.id === 'string' &&
                item.id.trim() !== '';
        }).map(item => ({ id: item.id.trim() }));
    }
    async updateById(model, id, data, include) {
        try {
            await this.findById(model, id);
            return await this.prisma[model].update({
                where: { id },
                data,
                include,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Error updating ${model}: ${error.message}`);
        }
    }
    async delete(model, id) {
        try {
            await this.findById(model, id);
            await this.prisma[model].delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Error deleting ${model}: ${error.message}`);
        }
    }
    async bulkCreate(model, data) {
        try {
            return await this.prisma[model].createMany({
                data,
                skipDuplicates: true,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error bulk creating ${model}: ${error.message}`);
        }
    }
    async bulkUpdate(model, updates) {
        try {
            const results = await Promise.all(updates.map(({ id, data }) => this.prisma[model].update({
                where: { id },
                data,
            })));
            return results;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error bulk updating ${model}: ${error.message}`);
        }
    }
    async bulkDelete(model, ids) {
        try {
            return await this.prisma[model].deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error bulk deleting ${model}: ${error.message}`);
        }
    }
    async search(model, searchTerm, searchFields, pagination = { page: 1, pageSize: 10 }, include) {
        const { page, pageSize } = pagination;
        const skip = (page - 1) * pageSize;
        const where = {
            OR: searchFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        };
        try {
            const [data, total] = await Promise.all([
                this.prisma[model].findMany({
                    skip,
                    take: pageSize,
                    where,
                    include,
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma[model].count({ where }),
            ]);
            const totalPages = Math.ceil(total / pageSize);
            return {
                data,
                pagination: {
                    total,
                    page,
                    pageSize,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error searching ${model}: ${error.message}`);
        }
    }
    async getStats(model) {
        try {
            const total = await this.prisma[model].count();
            const active = await this.prisma[model].count({
                where: { isActive: true },
            });
            const inactive = total - active;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const createdToday = await this.prisma[model].count({
                where: {
                    createdAt: {
                        gte: today,
                        lt: tomorrow,
                    },
                },
            });
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            const createdThisWeek = await this.prisma[model].count({
                where: {
                    createdAt: {
                        gte: lastWeek,
                    },
                },
            });
            return {
                total,
                active,
                inactive,
                createdToday,
                createdThisWeek,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error getting stats for ${model}: ${error.message}`);
        }
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
            'nhomncc',
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
            'congnoncc',
        ];
    }
    buildWhereClause(filter) {
        if (!filter)
            return {};
        const where = {};
        if (filter.search) {
            where.OR = [
                { title: { contains: filter.search, mode: 'insensitive' } },
                { name: { contains: filter.search, mode: 'insensitive' } },
                { description: { contains: filter.search, mode: 'insensitive' } },
            ];
        }
        if (filter.startDate && filter.endDate) {
            where.createdAt = {
                gte: filter.startDate,
                lte: filter.endDate,
            };
        }
        else if (filter.startDate) {
            where.createdAt = { gte: filter.startDate };
        }
        else if (filter.endDate) {
            where.createdAt = { lte: filter.endDate };
        }
        if (filter.ids && filter.ids.length > 0) {
            where.id = { in: filter.ids };
        }
        if (filter.isActive !== undefined) {
            where.isActive = filter.isActive;
        }
        return where;
    }
};
exports.UniversalService = UniversalService;
exports.UniversalService = UniversalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UniversalService);
//# sourceMappingURL=universal.service.js.map