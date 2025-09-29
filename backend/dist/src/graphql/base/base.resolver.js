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
exports.createBaseResolver = createBaseResolver;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../../../prisma/prisma.service");
const bulk_operation_result_type_1 = require("../types/bulk-operation-result.type");
function createBaseResolver(classRef, createInputRef, updateInputRef, whereInputRef, whereUniqueInputRef, modelName) {
    let BaseResolver = class BaseResolver {
        constructor(prisma) {
            this.prisma = prisma;
        }
        get model() {
            return this.prisma[modelName.toLowerCase()];
        }
        async findAll(where, orderBy, skip, take) {
            return this.model.findMany({
                where,
                orderBy,
                skip,
                take,
            });
        }
        async findOne(where) {
            return this.model.findUnique({ where });
        }
        async count(where) {
            return this.model.count({ where });
        }
        async createOne(data) {
            return this.model.create({ data });
        }
        async createBulk(data) {
            try {
                const result = await this.model.createMany({
                    data,
                    skipDuplicates: true
                });
                return {
                    count: result.count,
                    success: true,
                    message: `Successfully created ${result.count} ${modelName.toLowerCase()}(s)`
                };
            }
            catch (error) {
                return {
                    count: 0,
                    success: false,
                    message: `Failed to create bulk ${modelName.toLowerCase()}s: ${error.message}`
                };
            }
        }
        async updateOne(where, data) {
            return this.model.update({ where, data });
        }
        async updateBulk(where, data) {
            try {
                const result = await this.model.updateMany({ where, data });
                return {
                    count: result.count,
                    success: true,
                    message: `Successfully updated ${result.count} ${modelName.toLowerCase()}(s)`
                };
            }
            catch (error) {
                return {
                    count: 0,
                    success: false,
                    message: `Failed to update bulk ${modelName.toLowerCase()}s: ${error.message}`
                };
            }
        }
        async deleteOne(where) {
            return this.model.delete({ where });
        }
        async deleteBulk(where) {
            try {
                const result = await this.model.deleteMany({ where });
                return {
                    count: result.count,
                    success: true,
                    message: `Successfully deleted ${result.count} ${modelName.toLowerCase()}(s)`
                };
            }
            catch (error) {
                return {
                    count: 0,
                    success: false,
                    message: `Failed to delete bulk ${modelName.toLowerCase()}s: ${error.message}`
                };
            }
        }
    };
    __decorate([
        (0, graphql_1.Query)(() => [classRef], { name: `findAll${modelName}s` }),
        __param(0, (0, graphql_1.Args)('where', { type: () => whereInputRef, nullable: true })),
        __param(1, (0, graphql_1.Args)('orderBy', { type: () => String, nullable: true })),
        __param(2, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, nullable: true })),
        __param(3, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Number, Number]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "findAll", null);
    __decorate([
        (0, graphql_1.Query)(() => classRef, { name: `findOne${modelName}`, nullable: true }),
        __param(0, (0, graphql_1.Args)('where', { type: () => whereUniqueInputRef })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "findOne", null);
    __decorate([
        (0, graphql_1.Query)(() => graphql_1.Int, { name: `count${modelName}s` }),
        __param(0, (0, graphql_1.Args)('where', { type: () => whereInputRef, nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "count", null);
    __decorate([
        (0, graphql_1.Mutation)(() => classRef, { name: `createOne${modelName}` }),
        __param(0, (0, graphql_1.Args)('data', { type: () => createInputRef })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "createOne", null);
    __decorate([
        (0, graphql_1.Mutation)(() => bulk_operation_result_type_1.BulkOperationResult, { name: `createBulk${modelName}s` }),
        __param(0, (0, graphql_1.Args)('data', { type: () => [createInputRef] })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "createBulk", null);
    __decorate([
        (0, graphql_1.Mutation)(() => classRef, { name: `updateOne${modelName}` }),
        __param(0, (0, graphql_1.Args)('where', { type: () => whereUniqueInputRef })),
        __param(1, (0, graphql_1.Args)('data', { type: () => updateInputRef })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "updateOne", null);
    __decorate([
        (0, graphql_1.Mutation)(() => bulk_operation_result_type_1.BulkOperationResult, { name: `updateBulk${modelName}s` }),
        __param(0, (0, graphql_1.Args)('where', { type: () => whereInputRef, nullable: true })),
        __param(1, (0, graphql_1.Args)('data', { type: () => updateInputRef })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "updateBulk", null);
    __decorate([
        (0, graphql_1.Mutation)(() => classRef, { name: `deleteOne${modelName}` }),
        __param(0, (0, graphql_1.Args)('where', { type: () => whereUniqueInputRef })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "deleteOne", null);
    __decorate([
        (0, graphql_1.Mutation)(() => bulk_operation_result_type_1.BulkOperationResult, { name: `deleteBulk${modelName}s` }),
        __param(0, (0, graphql_1.Args)('where', { type: () => whereInputRef, nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "deleteBulk", null);
    BaseResolver = __decorate([
        (0, graphql_1.Resolver)(() => classRef, { isAbstract: true }),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService])
    ], BaseResolver);
    return BaseResolver;
}
//# sourceMappingURL=base.resolver.js.map