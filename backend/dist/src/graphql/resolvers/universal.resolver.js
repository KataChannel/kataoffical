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
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const bulk_operation_result_type_1 = require("../types/bulk-operation-result.type");
const model_configs_1 = require("../dynamic/model-configs");
let UniversalResolver = class UniversalResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllUniversal(modelName, where, orderBy, skip, take) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            if (!model) {
                throw new Error(`Prisma model ${config.name.toLowerCase()} not found`);
            }
            const whereClause = where ? JSON.parse(where) : undefined;
            const orderByClause = orderBy ? JSON.parse(orderBy) : undefined;
            const results = await model.findMany({
                where: whereClause,
                orderBy: orderByClause,
                skip,
                take: take || 50,
            });
            return JSON.stringify(results);
        }
        catch (error) {
            throw new Error(`Failed to find ${modelName}: ${error.message}`);
        }
    }
    async findOneUniversal(modelName, where) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const whereClause = JSON.parse(where);
            const result = await model.findUnique({ where: whereClause });
            return result ? JSON.stringify(result) : null;
        }
        catch (error) {
            throw new Error(`Failed to find one ${modelName}: ${error.message}`);
        }
    }
    async countUniversal(modelName, where) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const whereClause = where ? JSON.parse(where) : undefined;
            return await model.count({ where: whereClause });
        }
        catch (error) {
            throw new Error(`Failed to count ${modelName}: ${error.message}`);
        }
    }
    async createOneUniversal(modelName, data) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const dataObject = JSON.parse(data);
            const result = await model.create({ data: dataObject });
            return JSON.stringify(result);
        }
        catch (error) {
            throw new Error(`Failed to create ${modelName}: ${error.message}`);
        }
    }
    async createBulkUniversal(modelName, data) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const dataArray = JSON.parse(data);
            const result = await model.createMany({
                data: dataArray,
                skipDuplicates: true
            });
            return {
                count: result.count,
                success: true,
                message: `Successfully created ${result.count} ${config.pluralName}`
            };
        }
        catch (error) {
            return {
                count: 0,
                success: false,
                message: `Failed to create bulk ${modelName}: ${error.message}`
            };
        }
    }
    async updateOneUniversal(modelName, where, data) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const whereClause = JSON.parse(where);
            const dataObject = JSON.parse(data);
            const result = await model.update({
                where: whereClause,
                data: dataObject
            });
            return JSON.stringify(result);
        }
        catch (error) {
            throw new Error(`Failed to update ${modelName}: ${error.message}`);
        }
    }
    async updateBulkUniversal(modelName, where, data) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const whereClause = where ? JSON.parse(where) : undefined;
            const dataObject = JSON.parse(data);
            const result = await model.updateMany({
                where: whereClause,
                data: dataObject
            });
            return {
                count: result.count,
                success: true,
                message: `Successfully updated ${result.count} ${config.pluralName}`
            };
        }
        catch (error) {
            return {
                count: 0,
                success: false,
                message: `Failed to update bulk ${modelName}: ${error.message}`
            };
        }
    }
    async deleteOneUniversal(modelName, where) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const whereClause = JSON.parse(where);
            const result = await model.delete({ where: whereClause });
            return JSON.stringify(result);
        }
        catch (error) {
            throw new Error(`Failed to delete ${modelName}: ${error.message}`);
        }
    }
    async deleteBulkUniversal(modelName, where) {
        try {
            const config = (0, model_configs_1.getModelConfig)(modelName);
            if (!config) {
                throw new Error(`Model ${modelName} not found`);
            }
            const model = this.prisma[config.name.toLowerCase()];
            const whereClause = where ? JSON.parse(where) : undefined;
            const result = await model.deleteMany({ where: whereClause });
            return {
                count: result.count,
                success: true,
                message: `Successfully deleted ${result.count} ${config.pluralName}`
            };
        }
        catch (error) {
            return {
                count: 0,
                success: false,
                message: `Failed to delete bulk ${modelName}: ${error.message}`
            };
        }
    }
    async getModelConfig(modelName) {
        const config = (0, model_configs_1.getModelConfig)(modelName);
        if (!config) {
            throw new Error(`Model ${modelName} not found`);
        }
        return JSON.stringify(config);
    }
    async getAvailableModels() {
        const { MODEL_CONFIGURATIONS } = await Promise.resolve().then(() => require('../dynamic/model-configs'));
        return MODEL_CONFIGURATIONS.map(config => config.name);
    }
};
exports.UniversalResolver = UniversalResolver;
__decorate([
    (0, graphql_1.Query)(() => String, { name: 'findAllUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)('orderBy', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, nullable: true })),
    __param(4, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "findAllUniversal", null);
__decorate([
    (0, graphql_1.Query)(() => String, { name: 'findOneUniversal', nullable: true }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "findOneUniversal", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int, { name: 'countUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "countUniversal", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'createOneUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createOneUniversal", null);
__decorate([
    (0, graphql_1.Mutation)(() => bulk_operation_result_type_1.BulkOperationResult, { name: 'createBulkUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createBulkUniversal", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'updateOneUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => String })),
    __param(2, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateOneUniversal", null);
__decorate([
    (0, graphql_1.Mutation)(() => bulk_operation_result_type_1.BulkOperationResult, { name: 'updateBulkUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateBulkUniversal", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'deleteOneUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteOneUniversal", null);
__decorate([
    (0, graphql_1.Mutation)(() => bulk_operation_result_type_1.BulkOperationResult, { name: 'deleteBulkUniversal' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteBulkUniversal", null);
__decorate([
    (0, graphql_1.Query)(() => String, { name: 'getModelConfig' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "getModelConfig", null);
__decorate([
    (0, graphql_1.Query)(() => [String], { name: 'getAvailableModels' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "getAvailableModels", null);
exports.UniversalResolver = UniversalResolver = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UniversalResolver);
//# sourceMappingURL=universal.resolver.js.map