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
const redis_service_1 = require("../redis/redis.service");
let EnhancedUniversalService = class EnhancedUniversalService {
    constructor(prisma, dataLoader, fieldSelection, redisService) {
        this.prisma = prisma;
        this.dataLoader = dataLoader;
        this.fieldSelection = fieldSelection;
        this.redisService = redisService;
        this.modelMapping = {
            'user': 'user',
            'role': 'role',
            'userrole': 'userRole',
            'permission': 'permission',
            'userpermission': 'userPermission',
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
            'nhomncc': 'nhomNcc',
            'dathang': 'dathang',
            'dathangsanpham': 'dathangsanpham',
            'congty': 'congty',
            'kho': 'kho',
            'sanphamkho': 'sanphamKho',
            'phieukho': 'phieuKho',
            'phieukhosanpham': 'phieuKhoSanpham',
            'tonkho': 'tonKho',
            'chotkho': 'chotkho',
            'chotkhodetail': 'chotkhodetail',
            'auditlog': 'auditLog',
            'filemanager': 'fileManager',
            'chataimessage': 'chatAIMessage',
            'chataihistory': 'chatAIHistory',
            'file': 'file',
            'errorlog': 'errorLog',
            'userguidblock': 'userguidBlock',
            'userguidstep': 'userguidStep',
            'importhistory': 'importHistory',
            'congnoncc': 'congnoncc',
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
            const cacheKey = this.generateCacheKey('findMany', modelName, args);
            if (!this.isWriteOperation(args)) {
                const cachedResult = await this.redisService.read(cacheKey);
                if (cachedResult) {
                    console.log(`🔥 Cache hit for ${modelName} findMany`);
                    return cachedResult;
                }
            }
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
                isOptimized: !!queryOptions.select || !!queryOptions.include,
                cached: false
            });
            const processedResults = await this.postProcessWithDataLoader(results, modelName, queryOptions, info);
            if (!this.isWriteOperation(args) && processedResults) {
                const ttl = this.getCacheTTL(modelName);
                await this.redisService.create(cacheKey, processedResults, ttl);
                console.log(`💾 Cached ${modelName} findMany for ${ttl}s`);
            }
            return processedResults;
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
            const cacheKey = this.generateCacheKey('findUnique', modelName, args);
            const cachedResult = await this.redisService.read(cacheKey);
            if (cachedResult) {
                console.log(`🎯 GraphQL cache hit for findUnique ${modelName}`);
                return cachedResult;
            }
            const model = this.getModel(modelName);
            const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
            const normalizedArgs = { ...args, where: normalizedWhere };
            const queryOptions = await this.buildOptimizedQuery(modelName, normalizedArgs, info);
            const startTime = Date.now();
            const result = await model.findUnique(queryOptions);
            const queryTime = Date.now() - startTime;
            if (result) {
                const ttl = this.getCacheTTL(modelName);
                await this.redisService.create(cacheKey, result, ttl);
                console.log(`💾 GraphQL cached findUnique ${modelName} for ${ttl}s`);
            }
            return result;
        }
        catch (error) {
            console.error(`❌ Enhanced findUnique error for ${modelName}:`, error);
            throw new Error(`Failed to find ${modelName}: ${error.message}`);
        }
    }
    async findFirst(modelName, args, info) {
        console.log(`🥇 Enhanced findFirst for ${modelName}:`, {
            hasWhere: !!args.where,
            hasOrderBy: !!args.orderBy,
            whereFields: args.where ? Object.keys(args.where) : [],
            hasCustomSelect: !!args.select,
            hasCustomInclude: !!args.include
        });
        try {
            const cacheKey = this.generateCacheKey('findFirst', modelName, args);
            const cachedResult = await this.redisService.read(cacheKey);
            if (cachedResult) {
                console.log(`🥇 GraphQL cache hit for findFirst ${modelName}`);
                return cachedResult;
            }
            const model = this.getModel(modelName);
            const normalizedWhere = args.where ? this.normalizeDateFilters(modelName, args.where) : undefined;
            const normalizedArgs = { ...args, where: normalizedWhere };
            const queryOptions = await this.buildOptimizedQuery(modelName, normalizedArgs, info);
            const startTime = Date.now();
            const result = await model.findFirst(queryOptions);
            const queryTime = Date.now() - startTime;
            if (result) {
                const ttl = this.getCacheTTL(modelName);
                await this.redisService.create(cacheKey, result, ttl);
                console.log(`💾 GraphQL cached findFirst ${modelName} for ${ttl}s`);
            }
            console.log(`✅ ${modelName} findFirst completed:`, {
                found: !!result,
                queryTime: `${queryTime}ms`,
                hasOrderBy: !!args.orderBy
            });
            return result;
        }
        catch (error) {
            console.error(`❌ Enhanced findFirst error for ${modelName}:`, error);
            throw new Error(`Failed to find first ${modelName}: ${error.message}`);
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
            const finalData = this.normalizeRelationFieldsForModel(modelName, normalizedData);
            const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
            const createOptions = {
                data: finalData,
                ...queryOptions
            };
            const startTime = Date.now();
            console.log('createOptions', createOptions);
            const result = await model.create(createOptions);
            const queryTime = Date.now() - startTime;
            this.dataLoader.clearLoaderCache(modelName);
            await this.invalidateCache(modelName);
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
            let cleanedData = { ...args.data };
            const excludeFromUpdates = [
                'roles', 'permissions', 'profile', 'userRoles', 'rolePermissions',
                'user', 'role', 'permission', 'khachhang', 'nhomkhachhang'
            ];
            excludeFromUpdates.forEach(field => {
                if (cleanedData[field]) {
                    if (Array.isArray(cleanedData[field])) {
                        console.log(`🚫 Enhanced service removing complex relation array field '${field}' from update data`);
                        delete cleanedData[field];
                    }
                    else if (typeof cleanedData[field] === 'object' && cleanedData[field] !== null) {
                        const nestedKeys = Object.keys(cleanedData[field]);
                        const hasComplexNesting = nestedKeys.some(key => typeof cleanedData[field][key] === 'object' && cleanedData[field][key] !== null);
                        if (hasComplexNesting) {
                            console.log(`🚫 Enhanced service removing complex nested relation field '${field}' from update data`);
                            delete cleanedData[field];
                        }
                    }
                }
            });
            const normalizedData = this.normalizeDateFieldsForModel(modelName, cleanedData);
            const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
            const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
            const updateOptions = {
                where: normalizedWhere,
                data: normalizedData,
                ...(queryOptions.select && { select: queryOptions.select }),
                ...(queryOptions.include && { include: queryOptions.include })
            };
            console.log(`📤 Final update options for ${modelName}:`, {
                whereKeys: Object.keys(updateOptions.where || {}),
                dataKeys: Object.keys(updateOptions.data || {}),
                hasSelect: !!updateOptions.select,
                hasInclude: !!updateOptions.include
            });
            const startTime = Date.now();
            const result = await model.update(updateOptions);
            const queryTime = Date.now() - startTime;
            this.dataLoader.clearLoaderCache(modelName);
            await this.invalidateCache(modelName);
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
            let result;
            if (this.needsFindFirstDelete(modelName, args.where)) {
                const recordToDelete = await model.findFirst({
                    where: args.where
                });
                if (!recordToDelete) {
                    throw new Error(`No ${modelName} record found with provided criteria`);
                }
                result = await model.delete({
                    where: { id: recordToDelete.id }
                });
            }
            else {
                result = await model.delete({
                    where: args.where
                });
            }
            const queryTime = Date.now() - startTime;
            this.dataLoader.clearLoaderCache(modelName);
            await this.invalidateCache(modelName);
            return result;
        }
        catch (error) {
            if (error.code === 'P2025' || error.message.includes('No record was found for a delete')) {
                this.dataLoader.clearLoaderCache(modelName);
                await this.invalidateCache(modelName);
                console.log(`✅ Delete operation handled gracefully - Record not found in ${modelName}:`, {
                    where: args.where,
                    message: 'Record already deleted or not found, goal achieved'
                });
                return { id: args.where.id || null, deleted: true, message: 'Record not found, but deletion goal achieved' };
            }
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
    async aggregate(modelName, aggregations, where) {
        try {
            const model = this.getModel(modelName);
            const normalizedWhere = where ? this.normalizeDateFilters(modelName, where) : undefined;
            const startTime = Date.now();
            const result = await model.aggregate({
                ...aggregations,
                ...(normalizedWhere && { where: normalizedWhere })
            });
            const queryTime = Date.now() - startTime;
            console.log(`🔢 ${modelName} aggregate completed:`, {
                operations: Object.keys(aggregations),
                queryTime: `${queryTime}ms`,
                hasWhere: !!normalizedWhere
            });
            return result;
        }
        catch (error) {
            console.error(`❌ Enhanced aggregate error for ${modelName}:`, error);
            throw new Error(`Aggregate operation failed: ${error.message}`);
        }
    }
    generateCacheKey(operation, modelName, args) {
        const argsHash = JSON.stringify(args);
        return this.redisService.generateKey('graphql', operation, modelName, argsHash);
    }
    isWriteOperation(args) {
        return !!(args.where?.id || args.where?.createdAt || args.where?.updatedAt);
    }
    getCacheTTL(modelName) {
        const cacheConfig = {
            sanpham: 1800,
            khachhang: 1800,
            donhang: 600,
            banggia: 3600,
            menu: 3600,
            user: 1200,
            role: 3600,
            permission: 3600,
        };
        return cacheConfig[modelName.toLowerCase()] || 600;
    }
    async invalidateCache(modelName) {
        const pattern = this.redisService.generateKey('graphql', '*', modelName, '*');
        await this.redisService.deletePattern(pattern);
        console.log(`🗑️ Invalidated GraphQL cache for ${modelName}`);
    }
    normalizeRelationFieldsForModel(modelName, data) {
        if (!data || typeof data !== 'object')
            return data;
        const normalizedData = { ...data };
        switch (modelName.toLowerCase()) {
            case 'userpermission':
                if (normalizedData.user && !normalizedData.userId) {
                    normalizedData.userId = normalizedData.user.connect?.id || normalizedData.user.id;
                    delete normalizedData.user;
                }
                if (normalizedData.permission && !normalizedData.permissionId) {
                    normalizedData.permissionId = normalizedData.permission.connect?.id || normalizedData.permission.id;
                    delete normalizedData.permission;
                }
                break;
            case 'userrole':
                if (normalizedData.user && !normalizedData.userId) {
                    normalizedData.userId = normalizedData.user.connect?.id || normalizedData.user.id;
                    delete normalizedData.user;
                }
                if (normalizedData.role && !normalizedData.roleId) {
                    normalizedData.roleId = normalizedData.role.connect?.id || normalizedData.role.id;
                    delete normalizedData.role;
                }
                break;
            case 'rolepermission':
                if (normalizedData.role && !normalizedData.roleId) {
                    normalizedData.roleId = normalizedData.role.connect?.id || normalizedData.role.id;
                    delete normalizedData.role;
                }
                if (normalizedData.permission && !normalizedData.permissionId) {
                    normalizedData.permissionId = normalizedData.permission.connect?.id || normalizedData.permission.id;
                    delete normalizedData.permission;
                }
                break;
            case 'chotkhodetail':
                if (normalizedData.chotkhoId && !normalizedData.chotkho) {
                    normalizedData.chotkho = {
                        connect: { id: normalizedData.chotkhoId }
                    };
                    delete normalizedData.chotkhoId;
                }
                if (normalizedData.sanphamId && !normalizedData.sanpham) {
                    normalizedData.sanpham = {
                        connect: { id: normalizedData.sanphamId }
                    };
                    delete normalizedData.sanphamId;
                }
                if (normalizedData.userId && !normalizedData.user) {
                    normalizedData.user = {
                        connect: { id: normalizedData.userId }
                    };
                    delete normalizedData.userId;
                }
                break;
            default:
                break;
        }
        return normalizedData;
    }
    needsFindFirstDelete(modelName, whereClause) {
        const modelsNeedingFindFirst = [
            'RolePermission',
            'UserPermission',
            'UserRole'
        ];
        if (!modelsNeedingFindFirst.includes(modelName)) {
            return false;
        }
        if (whereClause.id) {
            return false;
        }
        if (modelName === 'RolePermission') {
            return whereClause.roleId && whereClause.permissionId && !whereClause.id;
        }
        if (modelName === 'UserPermission') {
            return whereClause.userId && whereClause.permissionId && !whereClause.id;
        }
        if (modelName === 'UserRole') {
            return whereClause.userId && whereClause.roleId && !whereClause.id;
        }
        return false;
    }
};
exports.EnhancedUniversalService = EnhancedUniversalService;
exports.EnhancedUniversalService = EnhancedUniversalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        dataloader_service_1.DataLoaderService,
        field_selection_service_1.FieldSelectionService,
        redis_service_1.RedisService])
], EnhancedUniversalService);
//# sourceMappingURL=enhanced-universal.service.js.map