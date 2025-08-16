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
exports.EnhancedUniversalResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_type_json_1 = require("graphql-type-json");
const enhanced_universal_service_1 = require("./enhanced-universal.service");
const dataloader_service_1 = require("./dataloader.service");
let EnhancedUniversalResolver = class EnhancedUniversalResolver {
    constructor(enhancedService, dataLoader) {
        this.enhancedService = enhancedService;
        this.dataLoader = dataLoader;
    }
    async findMany(modelName, info, where, orderBy, skip, take, include, select) {
        const sanitizedArgs = this.sanitizeQueryArgs({
            where,
            orderBy,
            skip: Math.max(0, skip || 0),
            take: Math.min(99999, Math.max(1, take || 50)),
            include,
            select,
        });
        try {
            return await this.enhancedService.findMany(modelName, sanitizedArgs, info);
        }
        catch (error) {
            throw error;
        }
    }
    async findUnique(modelName, where, info, include, select) {
        const sanitizedArgs = {
            where: where || {},
            include,
            select,
        };
        console.log(`🎯 Enhanced findUnique query:`, {
            model: modelName,
            whereKeys: Object.keys(sanitizedArgs.where),
        });
        try {
            return await this.enhancedService.findUnique(modelName, sanitizedArgs, info);
        }
        catch (error) {
            console.error(`❌ Enhanced findUnique error:`, error);
            throw error;
        }
    }
    async createOne(modelName, data, info, include, select) {
        const sanitizedArgs = {
            data: data || {},
            include,
            select,
        };
        console.log(`➕ Enhanced create mutation:`, {
            model: modelName,
            dataKeys: Object.keys(sanitizedArgs.data),
        });
        try {
            return await this.enhancedService.create(modelName, sanitizedArgs, info);
        }
        catch (error) {
            console.error(`❌ Enhanced create error:`, error);
            throw error;
        }
    }
    async updateOne(modelName, where, data, info, include, select) {
        const sanitizedArgs = {
            where: where || {},
            data: data || {},
            include,
            select,
        };
        console.log(`✏️ Enhanced update mutation:`, {
            model: modelName,
            whereKeys: Object.keys(sanitizedArgs.where),
            dataKeys: Object.keys(sanitizedArgs.data),
        });
        try {
            return await this.enhancedService.update(modelName, sanitizedArgs, info);
        }
        catch (error) {
            console.error(`❌ Enhanced update error:`, error);
            throw error;
        }
    }
    async deleteOne(modelName, where) {
        const sanitizedArgs = {
            where: where || {},
        };
        console.log(`🗑️ Enhanced delete mutation:`, {
            model: modelName,
            whereKeys: Object.keys(sanitizedArgs.where),
        });
        try {
            return await this.enhancedService.delete(modelName, sanitizedArgs);
        }
        catch (error) {
            console.error(`❌ Enhanced delete error:`, error);
            throw error;
        }
    }
    async batchCreate(modelName, data) {
        console.log(`📦 Enhanced batch create:`, {
            model: modelName,
            count: data?.length || 0,
        });
        try {
            return await this.enhancedService.batchOperation(modelName, 'create', data);
        }
        catch (error) {
            console.error(`❌ Enhanced batch create error:`, error);
            throw error;
        }
    }
    async batchDelete(modelName, ids) {
        console.log(`🗑️ Enhanced batch delete:`, {
            model: modelName,
            count: ids?.length || 0,
            ids: ids?.slice(0, 5)
        });
        try {
            return await this.enhancedService.batchOperation(modelName, 'delete', ids);
        }
        catch (error) {
            console.error(`❌ Enhanced batch delete error:`, error);
            throw error;
        }
    }
    async modelMetadata(modelName) {
        console.log(`📊 Getting metadata for model: ${modelName}`);
        try {
            return await this.enhancedService.getModelMetadata(modelName);
        }
        catch (error) {
            console.error(`❌ Model metadata error:`, error);
            throw error;
        }
    }
    async aggregate(modelName, aggregations, where) {
        console.log(`🔢 Enhanced aggregate query:`, {
            model: modelName,
            aggregations: Object.keys(aggregations || {}),
            hasWhere: !!where,
        });
        try {
            return await this.enhancedService.aggregate(modelName, aggregations, where);
        }
        catch (error) {
            console.error(`❌ Enhanced aggregate error:`, error);
            throw error;
        }
    }
    async clearDataLoaderCache(modelName) {
        console.log(`🗑️ Clearing DataLoader cache${modelName ? ` for ${modelName}` : ' (all)'}`);
        try {
            if (modelName) {
                this.dataLoader.clearLoaderCache(modelName);
            }
            else {
                this.dataLoader.clearCache();
            }
            return {
                success: true,
                message: `Cache cleared${modelName ? ` for ${modelName}` : ' for all models'}`,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error(`❌ Clear cache error:`, error);
            throw error;
        }
    }
    sanitizeQueryArgs(args) {
        const sanitized = {};
        if (args.where && typeof args.where === 'object') {
            sanitized.where = this.sanitizeWhereConditions(args.where);
        }
        if (args.orderBy) {
            sanitized.orderBy = args.orderBy;
        }
        if (typeof args.skip === 'number' && args.skip >= 0) {
            sanitized.skip = args.skip;
        }
        if (typeof args.take === 'number' && args.take > 0) {
            sanitized.take = Math.min(999999, args.take);
        }
        if (args.include)
            sanitized.include = args.include;
        if (args.select)
            sanitized.select = args.select;
        return sanitized;
    }
    sanitizeWhereConditions(where) {
        if (!where || typeof where !== 'object')
            return {};
        const sanitized = {};
        for (const [key, value] of Object.entries(where)) {
            if (key.includes('__') || key.startsWith('_')) {
                console.warn(`⚠️ Skipping potentially unsafe where condition: ${key}`);
                continue;
            }
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                sanitized[key] = this.sanitizeWhereConditions(value);
            }
            else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
};
exports.EnhancedUniversalResolver = EnhancedUniversalResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'findMany',
        description: 'Enhanced dynamic findMany with intelligent field selection and DataLoader optimization',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Info)()),
    __param(2, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Filter conditions',
    })),
    __param(3, (0, graphql_1.Args)('orderBy', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Sort conditions',
    })),
    __param(4, (0, graphql_1.Args)('skip', {
        type: () => Number,
        nullable: true,
        defaultValue: 0,
        description: 'Records to skip for pagination',
    })),
    __param(5, (0, graphql_1.Args)('take', {
        type: () => Number,
        nullable: true,
        defaultValue: 50,
        description: 'Maximum records to return (max 999999)',
    })),
    __param(6, (0, graphql_1.Args)('include', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Relations to include',
    })),
    __param(7, (0, graphql_1.Args)('select', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Specific fields to select',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object, Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "findMany", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'findUnique',
        description: 'Enhanced dynamic findUnique with field selection optimization',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Unique identifier conditions',
    })),
    __param(2, (0, graphql_1.Info)()),
    __param(3, (0, graphql_1.Args)('include', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Relations to include',
    })),
    __param(4, (0, graphql_1.Args)('select', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Specific fields to select',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "findUnique", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'createOne',
        description: 'Enhanced dynamic create with optimized response',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Args)('data', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Data to create',
    })),
    __param(2, (0, graphql_1.Info)()),
    __param(3, (0, graphql_1.Args)('include', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Relations to include in response',
    })),
    __param(4, (0, graphql_1.Args)('select', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Specific fields to select in response',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "createOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'updateOne',
        description: 'Enhanced dynamic update with optimized response',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Unique identifier conditions',
    })),
    __param(2, (0, graphql_1.Args)('data', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Data to update',
    })),
    __param(3, (0, graphql_1.Info)()),
    __param(4, (0, graphql_1.Args)('include', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Relations to include in response',
    })),
    __param(5, (0, graphql_1.Args)('select', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Specific fields to select in response',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "updateOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'deleteOne',
        description: 'Enhanced dynamic delete operation',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Unique identifier conditions',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "deleteOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'batchCreate',
        description: 'Enhanced batch create for multiple records',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Args)('data', {
        type: () => [graphql_type_json_1.GraphQLJSON],
        description: 'Array of data objects to create',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "batchCreate", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'batchDelete',
        description: 'Enhanced batch delete for multiple records',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Args)('ids', {
        type: () => [String],
        description: 'Array of IDs to delete',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "batchDelete", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'modelMetadata',
        description: 'Get metadata about a model for optimization',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name to get metadata for',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "modelMetadata", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'aggregate',
        description: 'Enhanced aggregate operations for statistical calculations',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        description: 'Model name (case-insensitive)',
    })),
    __param(1, (0, graphql_1.Args)('aggregations', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Aggregation operations to perform (e.g., { _max: { order: true } })',
    })),
    __param(2, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Filter conditions for aggregation',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "aggregate", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'clearDataLoaderCache',
        description: 'Clear DataLoader cache for better performance testing',
    }),
    __param(0, (0, graphql_1.Args)('modelName', {
        type: () => String,
        nullable: true,
        description: 'Specific model to clear cache for (optional)',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnhancedUniversalResolver.prototype, "clearDataLoaderCache", null);
exports.EnhancedUniversalResolver = EnhancedUniversalResolver = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [enhanced_universal_service_1.EnhancedUniversalService,
        dataloader_service_1.DataLoaderService])
], EnhancedUniversalResolver);
//# sourceMappingURL=enhanced-universal.resolver.js.map