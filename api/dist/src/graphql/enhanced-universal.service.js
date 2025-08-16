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
exports.EnhancedUniversalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const dataloader_service_1 = require("./dataloader.service");
const field_selection_service_1 = require("./field-selection.service");
let EnhancedUniversalService = class EnhancedUniversalService {
    constructor(prisma, dataLoader, fieldSelection) {
        this.prisma = prisma;
        this.dataLoader = dataLoader;
        this.fieldSelection = fieldSelection;
        this.modelMapping = {
            'user': 'user',
            'role': 'role',
            'userrole': 'userRole',
            'permission': 'permission',
            'rolepermission': 'rolePermission',
            'menu': 'menu',
            'profile': 'profile',
            'banggia': 'banggia',
            'banggiaKhachhang': 'banggiaKhachhang',
            'banggiasanpham': 'banggiasanpham',
            'khachhang': 'khachhang',
            'khachhangNhom': 'khachhangNhom',
            'nhomkhachhang': 'nhomkhachhang',
            'sanpham': 'sanpham',
            'donhang': 'donhang',
            'donhangsanpham': 'donhangsanpham',
            'nhacungcap': 'nhacungcap',
            'dathang': 'dathang',
            'dathangsanpham': 'dathangsanpham',
            'congty': 'congty',
            'kho': 'kho',
            'sanphamkho': 'sanphamKho',
            'phieukho': 'phieuKho',
            'phieukhosanpham': 'phieuKhoSanpham',
            'tonkho': 'tonKho',
            'chotkho': 'chotkho',
            'auditlog': 'auditLog',
            'filemanager': 'fileManager',
            'chataimessage': 'chatAIMessage',
            'chataihistory': 'chatAIHistory',
            'file': 'file',
            'errorlog': 'errorLog',
            'userguidblock': 'userguidBlock',
            'userguidstep': 'userguidStep',
            'importhistory': 'importHistory'
        };
    }
    synchronizeDateField(fieldName, value) {
        if (!value)
            return null;
        try {
            return new Date(value);
        }
        catch (error) {
            return null;
        }
    }
    toUTC(value) {
        if (!value)
            return null;
        try {
            return new Date(value).toISOString();
        }
        catch (error) {
            console.error('GraphQL toUTC error:', error);
            return null;
        }
    }
    validateAndConvertToUTC(value) {
        return this.toUTC(value);
    }
    async findMany(modelName, args, info) {
        try {
            const model = this.getModel(modelName);
            const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
            const normalizedArgs = { ...args, where: normalizedWhere };
            const queryOptions = await this.buildOptimizedQuery(modelName, normalizedArgs, info);
            const startTime = Date.now();
            const results = await model.findMany(queryOptions);
            const queryTime = Date.now() - startTime;
            console.log(`✅ ${modelName} findMany completed:`, {
                resultCount: results.length,
                queryTime: `${queryTime}ms`,
                isOptimized: !!queryOptions.select || !!queryOptions.include
            });
            return await this.postProcessWithDataLoader(results, modelName, queryOptions, info);
        }
        catch (error) {
            console.error(`❌ Enhanced findMany error for ${modelName}:`, error);
            throw new Error(`Failed to query ${modelName}: ${error.message}`);
        }
    }
    async findUnique(modelName, args, info) {
        console.log(`🎯 Enhanced findUnique for ${modelName}:`, {
            whereFields: Object.keys(args.where || {}),
            hasCustomSelect: !!args.select,
            hasCustomInclude: !!args.include
        });
        try {
            const model = this.getModel(modelName);
            const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
            const normalizedArgs = { ...args, where: normalizedWhere };
            const queryOptions = await this.buildOptimizedQuery(modelName, normalizedArgs, info);
            const startTime = Date.now();
            const result = await model.findUnique(queryOptions);
            const queryTime = Date.now() - startTime;
            return result;
        }
        catch (error) {
            console.error(`❌ Enhanced findUnique error for ${modelName}:`, error);
            throw new Error(`Failed to find ${modelName}: ${error.message}`);
        }
    }
    async create(modelName, args, info) {
        console.log(`➕ Enhanced create for ${modelName}:`, {
            hasData: !!args.data,
            dataFields: Object.keys(args.data || {}),
        });
        try {
            const model = this.getModel(modelName);
            const normalizedData = this.normalizeDateFieldsForModel(modelName, args.data);
            const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
            const createOptions = {
                data: normalizedData,
                ...queryOptions
            };
            const startTime = Date.now();
            const result = await model.create(createOptions);
            const queryTime = Date.now() - startTime;
            this.dataLoader.clearLoaderCache(modelName);
            return result;
        }
        catch (error) {
            console.error(`❌ Enhanced create error for ${modelName}:`, error);
            throw new Error(`Failed to create ${modelName}: ${error.message}`);
        }
    }
    async update(modelName, args, info) {
        console.log(`✏️ Enhanced update for ${modelName}:`, {
            whereFields: Object.keys(args.where || {}),
            dataFields: Object.keys(args.data || {}),
        });
        try {
            const model = this.getModel(modelName);
            const normalizedData = this.normalizeDateFieldsForModel(modelName, args.data);
            const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
            const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
            const updateOptions = {
                where: normalizedWhere,
                data: normalizedData,
                ...queryOptions
            };
            const startTime = Date.now();
            const result = await model.update(updateOptions);
            const queryTime = Date.now() - startTime;
            this.dataLoader.clearLoaderCache(modelName);
            return result;
        }
        catch (error) {
            console.error(`❌ Enhanced update error for ${modelName}:`, error);
            throw new Error(`Failed to update ${modelName}: ${error.message}`);
        }
    }
    async delete(modelName, args) {
        console.log(`🗑️ Enhanced delete for ${modelName}:`, {
            whereFields: Object.keys(args.where || {}),
        });
        try {
            const model = this.getModel(modelName);
            const startTime = Date.now();
            const result = await model.delete({
                where: args.where
            });
            const queryTime = Date.now() - startTime;
            this.dataLoader.clearLoaderCache(modelName);
            return result;
        }
        catch (error) {
            console.error(`❌ Enhanced delete error for ${modelName}:`, error);
            throw new Error(`Failed to delete ${modelName}: ${error.message}`);
        }
    }
    async buildOptimizedQuery(modelName, args, info) {
        const queryOptions = {};
        if (args.where)
            queryOptions.where = args.where;
        if (args.orderBy)
            queryOptions.orderBy = args.orderBy;
        if (args.skip)
            queryOptions.skip = args.skip;
        if (args.take)
            queryOptions.take = args.take;
        let fieldSelection = null;
        if (args.select || args.include) {
            if (args.select)
                queryOptions.select = args.select;
            if (args.include)
                queryOptions.include = args.include;
        }
        else if (info) {
            fieldSelection = this.fieldSelection.getFieldSelection(info);
            if (fieldSelection) {
                fieldSelection = this.fieldSelection.optimizeForModel(modelName, fieldSelection);
                if (fieldSelection.select)
                    queryOptions.select = fieldSelection.select;
                if (fieldSelection.include)
                    queryOptions.include = fieldSelection.include;
            }
        }
        if (fieldSelection || args.select || args.include) {
            this.fieldSelection.logFieldSelection(modelName, queryOptions);
        }
        return queryOptions;
    }
    async postProcessWithDataLoader(results, modelName, queryOptions, info) {
        if (queryOptions.include || (queryOptions.select && this.hasRelationFields(queryOptions.select))) {
            return results;
        }
        return results;
    }
    hasRelationFields(select) {
        if (!select || typeof select !== 'object')
            return false;
        return Object.values(select).some(value => typeof value === 'object' && value !== null);
    }
    getModel(modelName) {
        const normalizedName = modelName.toLowerCase();
        const prismaProperty = this.modelMapping[normalizedName];
        if (!prismaProperty) {
            console.error(`❌ Model mapping not found for: ${modelName}`);
            console.log('Available mappings:', Object.keys(this.modelMapping));
            throw new Error(`Model ${modelName} not found in model mapping`);
        }
        const model = this.prisma[prismaProperty];
        if (!model) {
            console.error(`❌ Prisma model not found for property: ${prismaProperty}`);
            throw new Error(`Model ${modelName} (${prismaProperty}) not found in Prisma client`);
        }
        return model;
    }
    async getModelMetadata(modelName) {
        try {
            const normalizedName = modelName.toLowerCase();
            const prismaProperty = this.modelMapping[normalizedName];
            if (!prismaProperty) {
                return {
                    name: modelName,
                    available: false,
                    supportsOptimization: false,
                    error: 'Model not found in mapping'
                };
            }
            const isAvailable = !!this.prisma[prismaProperty];
            return {
                name: modelName,
                prismaProperty,
                available: isAvailable,
                supportsOptimization: isAvailable,
                normalizedName
            };
        }
        catch (error) {
            console.error(`❌ Failed to get metadata for ${modelName}:`, error);
            return {
                name: modelName,
                available: false,
                supportsOptimization: false,
                error: error.message
            };
        }
    }
    getAvailableModels() {
        return Object.keys(this.modelMapping).filter(modelName => {
            const prismaProperty = this.modelMapping[modelName];
            return !!this.prisma[prismaProperty];
        });
    }
    async batchOperation(modelName, operation, items) {
        console.log(`📦 Batch ${operation} for ${modelName}:`, items.length, 'items');
        try {
            const model = this.getModel(modelName);
            switch (operation) {
                case 'create':
                    return await model.createMany({
                        data: items,
                        skipDuplicates: true
                    });
                case 'update':
                    const updatePromises = items.map(item => model.update({
                        where: { id: item.id },
                        data: item.data
                    }));
                    return await Promise.all(updatePromises);
                case 'delete':
                    const ids = items.map(item => item.id || item);
                    return await model.deleteMany({
                        where: {
                            id: {
                                in: ids
                            }
                        }
                    });
                default:
                    throw new Error(`Unsupported batch operation: ${operation}`);
            }
        }
        catch (error) {
            console.error(`❌ Batch ${operation} error for ${modelName}:`, error);
            throw error;
        }
        finally {
            this.dataLoader.clearLoaderCache(modelName);
        }
    }
    normalizeDateFieldsForModel(modelName, data) {
        if (!data || typeof data !== 'object')
            return data;
        console.log(`🔄 Normalizing date fields for ${modelName}:`, Object.keys(data));
        const dateFieldsMap = {
            donhang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
            dathang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
            tonkho: ['ngaynhan', 'createdAt', 'updatedAt'],
            phieukho: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
            phieugiaohang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
            auditlog: ['createdAt', 'updatedAt'],
            chotkho: ['ngay', 'createdAt', 'updatedAt'],
        };
        const dateFields = dateFieldsMap[modelName.toLowerCase()] || ['createdAt', 'updatedAt'];
        const normalizedData = { ...data };
        dateFields.forEach(field => {
            if (normalizedData[field] !== undefined && normalizedData[field] !== null) {
                try {
                    if (['ngaygiao', 'ngaynhan'].includes(field)) {
                        normalizedData[field] = this.synchronizeDateField(field, normalizedData[field]);
                    }
                    else {
                        const utcValue = this.toUTC(normalizedData[field]);
                        normalizedData[field] = utcValue ? new Date(utcValue) : null;
                    }
                }
                catch (error) {
                    console.error(`❌ Error normalizing ${field} for ${modelName}:`, error);
                    throw new Error(`Failed to normalize ${field}: ${error.message}`);
                }
            }
        });
        return normalizedData;
    }
    normalizeDateFilters(modelName, where) {
        if (!where || typeof where !== 'object')
            return where;
        const normalizedWhere = { ...where };
        const dateFieldsMap = {
            donhang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
            dathang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
            tonkho: ['ngaynhan', 'createdAt', 'updatedAt'],
            phieugiaohang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
            auditlog: ['createdAt', 'updatedAt'],
        };
        const dateFields = dateFieldsMap[modelName.toLowerCase()] || ['createdAt', 'updatedAt'];
        dateFields.forEach(field => {
            if (normalizedWhere[field]) {
                if (typeof normalizedWhere[field] === 'object') {
                    const dateFilter = normalizedWhere[field];
                    if (dateFilter.gte) {
                        dateFilter.gte = new Date(this.validateAndConvertToUTC(dateFilter.gte) || dateFilter.gte);
                    }
                    if (dateFilter.lte) {
                        dateFilter.lte = new Date(this.validateAndConvertToUTC(dateFilter.lte) || dateFilter.lte);
                    }
                    if (dateFilter.gt) {
                        dateFilter.gt = new Date(this.validateAndConvertToUTC(dateFilter.gt) || dateFilter.gt);
                    }
                    if (dateFilter.lt) {
                        dateFilter.lt = new Date(this.validateAndConvertToUTC(dateFilter.lt) || dateFilter.lt);
                    }
                    if (dateFilter.equals) {
                        dateFilter.equals = new Date(this.validateAndConvertToUTC(dateFilter.equals) || dateFilter.equals);
                    }
                }
                else {
                    const utcDate = this.validateAndConvertToUTC(normalizedWhere[field]);
                    if (utcDate) {
                        normalizedWhere[field] = new Date(utcDate);
                    }
                }
            }
        });
        return normalizedWhere;
    }
};
exports.EnhancedUniversalService = EnhancedUniversalService;
exports.EnhancedUniversalService = EnhancedUniversalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        dataloader_service_1.DataLoaderService,
        field_selection_service_1.FieldSelectionService])
], EnhancedUniversalService);
//# sourceMappingURL=enhanced-universal.service.js.map