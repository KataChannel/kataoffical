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
exports.ModelRegistry = void 0;
exports.createDynamicWhereInput = createDynamicWhereInput;
exports.createDynamicCreateInput = createDynamicCreateInput;
exports.createDynamicResolver = createDynamicResolver;
exports.GraphQLModel = GraphQLModel;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../../../prisma/prisma.service");
function createDynamicWhereInput(modelName, fields) {
    const whereFields = {};
    Object.keys(fields).forEach(fieldName => {
        const fieldType = fields[fieldName];
        whereFields[fieldName] = { type: fieldType, nullable: true };
    });
    return whereFields;
}
function createDynamicCreateInput(modelName, fields, requiredFields) {
    const inputFields = {};
    Object.keys(fields).forEach(fieldName => {
        const fieldType = fields[fieldName];
        const isRequired = requiredFields.includes(fieldName);
        inputFields[fieldName] = { type: fieldType, nullable: !isRequired };
    });
    return inputFields;
}
function createDynamicResolver(config) {
    let DynamicResolver = class DynamicResolver {
        constructor(prisma) {
            this.prisma = prisma;
        }
        get model() {
            const modelName = config.name.toLowerCase();
            return this.prisma[modelName];
        }
        async findAll(where, orderBy, skip, take) {
            return this.model.findMany({
                where,
                orderBy,
                skip,
                take: take || 50,
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
                    message: `Successfully created ${result.count} ${config.pluralName}`
                };
            }
            catch (error) {
                return {
                    count: 0,
                    success: false,
                    message: `Failed to create bulk ${config.pluralName}: ${error.message}`
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
                    message: `Successfully updated ${result.count} ${config.pluralName}`
                };
            }
            catch (error) {
                return {
                    count: 0,
                    success: false,
                    message: `Failed to update bulk ${config.pluralName}: ${error.message}`
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
                    message: `Successfully deleted ${result.count} ${config.pluralName}`
                };
            }
            catch (error) {
                return {
                    count: 0,
                    success: false,
                    message: `Failed to delete bulk ${config.pluralName}: ${error.message}`
                };
            }
        }
    };
    DynamicResolver = __decorate([
        (0, graphql_1.Resolver)({ isAbstract: true }),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService])
    ], DynamicResolver);
    return DynamicResolver;
}
class ModelRegistry {
    static register(config) {
        this.models.set(config.name, config);
    }
    static get(modelName) {
        return this.models.get(modelName);
    }
    static getAll() {
        return Array.from(this.models.values());
    }
}
exports.ModelRegistry = ModelRegistry;
ModelRegistry.models = new Map();
function GraphQLModel(config) {
    return function (constructor) {
        const modelName = constructor.name;
        ModelRegistry.register({
            name: modelName,
            ...config
        });
        return constructor;
    };
}
//# sourceMappingURL=dynamic-resolver.factory.js.map