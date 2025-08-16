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
const graphql_type_json_1 = require("graphql-type-json");
const universal_service_1 = require("./universal.service");
let UniversalResolver = class UniversalResolver {
    constructor(universalService) {
        this.universalService = universalService;
    }
    async findMany(modelName, where, orderBy, skip, take, include, select) {
        try {
            const result = await this.universalService.findMany(modelName, {
                where,
                orderBy,
                skip,
                take,
                include,
                select
            });
            return result;
        }
        catch (error) {
            console.error(`❌ GraphQL findMany error for ${modelName}:`, error.message);
            throw error;
        }
    }
    async findUnique(modelName, where, include, select) {
        const args = { where };
        if (select) {
            args.select = select;
        }
        else if (include) {
            args.include = include;
        }
        return this.universalService.findUnique(modelName, args);
    }
    async testSelectQuery(modelName) {
        const resultWithSelect = await this.universalService.findMany(modelName, {
            select: { title: true, id: true },
            take: 3
        });
        const resultWithoutSelect = await this.universalService.findMany(modelName, {
            take: 3
        });
        return {
            testResults: {
                withSelect: {
                    dataCount: resultWithSelect.data?.length || 0,
                    firstItemFields: resultWithSelect.data?.[0] ? Object.keys(resultWithSelect.data[0]) : [],
                    expectedFields: ['title', 'id']
                },
                withoutSelect: {
                    dataCount: resultWithoutSelect.data?.length || 0,
                    firstItemFields: resultWithoutSelect.data?.[0] ? Object.keys(resultWithoutSelect.data[0]) : [],
                    expectedFields: ['all fields']
                },
                selectFunctionality: resultWithSelect.data?.[0] && Object.keys(resultWithSelect.data[0]).length === 2 ? 'WORKING' : 'NOT_WORKING'
            }
        };
    }
    async createRecord(modelName, data) {
        return this.universalService.create(modelName, data);
    }
    async updateRecord(modelName, where, data) {
        return this.universalService.update(modelName, where, data);
    }
    async deleteRecord(modelName, where) {
        return this.universalService.delete(modelName, where);
    }
    getAvailableModels() {
        return this.universalService.getAvailableModels();
    }
};
exports.UniversalResolver = UniversalResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'findMany',
        description: 'Generic findMany query with FULL support for select parameter'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String, description: 'Name of the model to query' })),
    __param(1, (0, graphql_1.Args)('where', { type: () => graphql_type_json_1.GraphQLJSON, nullable: true, description: 'Where conditions' })),
    __param(2, (0, graphql_1.Args)('orderBy', { type: () => graphql_type_json_1.GraphQLJSON, nullable: true, description: 'Order by conditions' })),
    __param(3, (0, graphql_1.Args)('skip', { type: () => Number, nullable: true, defaultValue: 0, description: 'Number of records to skip' })),
    __param(4, (0, graphql_1.Args)('take', { type: () => Number, nullable: true, defaultValue: 10, description: 'Number of records to take' })),
    __param(5, (0, graphql_1.Args)('include', { type: () => graphql_type_json_1.GraphQLJSON, nullable: true, description: 'Relations to include' })),
    __param(6, (0, graphql_1.Args)('select', { type: () => graphql_type_json_1.GraphQLJSON, nullable: true, description: 'Specific fields to select - SUPPORTS FIELD SELECTION' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "findMany", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'findUnique',
        description: 'Generic findUnique query with select support'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => graphql_type_json_1.GraphQLJSON })),
    __param(2, (0, graphql_1.Args)('include', { type: () => graphql_type_json_1.GraphQLJSON, nullable: true })),
    __param(3, (0, graphql_1.Args)('select', { type: () => graphql_type_json_1.GraphQLJSON, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "findUnique", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'testSelectQuery',
        description: 'Test query to verify select functionality works'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String, defaultValue: 'dathang' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "testSelectQuery", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, { name: 'createRecord' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('data', { type: () => graphql_type_json_1.GraphQLJSON })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createRecord", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, { name: 'updateRecord' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => graphql_type_json_1.GraphQLJSON })),
    __param(2, (0, graphql_1.Args)('data', { type: () => graphql_type_json_1.GraphQLJSON })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateRecord", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, { name: 'deleteRecord' }),
    __param(0, (0, graphql_1.Args)('modelName', { type: () => String })),
    __param(1, (0, graphql_1.Args)('where', { type: () => graphql_type_json_1.GraphQLJSON })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteRecord", null);
__decorate([
    (0, graphql_1.Query)(() => [String], { name: 'getAvailableModels' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UniversalResolver.prototype, "getAvailableModels", null);
exports.UniversalResolver = UniversalResolver = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [universal_service_1.UniversalService])
], UniversalResolver);
//# sourceMappingURL=universal.resolver.js.map