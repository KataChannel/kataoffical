"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = exports.Query = exports.nexusSchema = void 0;
const nexus_1 = require("nexus");
const path_1 = require("path");
const graphql_type_json_1 = require("graphql-type-json");
const JSONType = graphql_type_json_1.GraphQLJSON;
const Query = (0, nexus_1.queryType)({
    definition(t) {
        t.field('findMany', {
            type: 'JSON',
            description: 'Dynamic findMany query with intelligent field selection',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                where: (0, nexus_1.arg)({ type: 'JSON', description: 'Filter conditions' }),
                orderBy: (0, nexus_1.arg)({ type: 'JSON', description: 'Sort conditions' }),
                skip: (0, nexus_1.arg)({ type: 'Int', default: 0, description: 'Records to skip' }),
                take: (0, nexus_1.arg)({ type: 'Int', default: 50, description: 'Records to take' }),
                include: (0, nexus_1.arg)({ type: 'JSON', description: 'Relations to include' }),
                select: (0, nexus_1.arg)({ type: 'JSON', description: 'Fields to select' }),
            },
            resolve: async (_, args, context, info) => {
                return context.enhancedService.findMany(args.modelName, {
                    where: args.where,
                    orderBy: args.orderBy,
                    skip: args.skip,
                    take: args.take,
                    include: args.include,
                    select: args.select,
                }, info);
            },
        });
        t.field('findUnique', {
            type: 'JSON',
            description: 'Dynamic findUnique query with field selection',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                where: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'JSON', description: 'Unique conditions' })),
                include: (0, nexus_1.arg)({ type: 'JSON', description: 'Relations to include' }),
                select: (0, nexus_1.arg)({ type: 'JSON', description: 'Fields to select' }),
            },
            resolve: async (_, args, context, info) => {
                return context.enhancedService.findUnique(args.modelName, {
                    where: args.where,
                    include: args.include,
                    select: args.select,
                }, info);
            },
        });
        t.field('modelMetadata', {
            type: 'JSON',
            description: 'Get model metadata for optimization',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
            },
            resolve: async (_, args, context) => {
                return context.enhancedService.getModelMetadata(args.modelName);
            },
        });
        t.field('health', {
            type: 'JSON',
            description: 'GraphQL health check',
            resolve: () => ({
                status: 'ok',
                timestamp: new Date().toISOString(),
                version: '2.0.0-enhanced',
                features: [
                    'dynamic-field-selection',
                    'dataloader-optimization',
                    'nexus-schema-generation',
                    'prisma-integration'
                ]
            }),
        });
    },
});
exports.Query = Query;
const Mutation = (0, nexus_1.mutationType)({
    definition(t) {
        t.field('createOne', {
            type: 'JSON',
            description: 'Dynamic create mutation with optimized response',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'JSON', description: 'Data to create' })),
                include: (0, nexus_1.arg)({ type: 'JSON', description: 'Relations to include' }),
                select: (0, nexus_1.arg)({ type: 'JSON', description: 'Fields to select' }),
            },
            resolve: async (_, args, context, info) => {
                return context.enhancedService.create(args.modelName, {
                    data: args.data,
                    include: args.include,
                    select: args.select,
                }, info);
            },
        });
        t.field('updateOne', {
            type: 'JSON',
            description: 'Dynamic update mutation with optimized response',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                where: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'JSON', description: 'Where conditions' })),
                data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'JSON', description: 'Data to update' })),
                include: (0, nexus_1.arg)({ type: 'JSON', description: 'Relations to include' }),
                select: (0, nexus_1.arg)({ type: 'JSON', description: 'Fields to select' }),
            },
            resolve: async (_, args, context, info) => {
                return context.enhancedService.update(args.modelName, {
                    where: args.where,
                    data: args.data,
                    include: args.include,
                    select: args.select,
                }, info);
            },
        });
        t.field('deleteOne', {
            type: 'JSON',
            description: 'Dynamic delete mutation',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                where: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'JSON', description: 'Where conditions' })),
            },
            resolve: async (_, args, context) => {
                return context.enhancedService.delete(args.modelName, {
                    where: args.where,
                });
            },
        });
        t.field('batchCreate', {
            type: 'JSON',
            description: 'Batch create multiple records',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                data: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'JSON' })))),
            },
            resolve: async (_, args, context) => {
                return context.enhancedService.batchOperation(args.modelName, 'create', args.data);
            },
        });
        t.field('batchUpdate', {
            type: 'JSON',
            description: 'Batch update multiple records',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                items: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'JSON' })))),
            },
            resolve: async (_, args, context) => {
                return context.enhancedService.batchOperation(args.modelName, 'update', args.items);
            },
        });
        t.field('batchDelete', {
            type: 'JSON',
            description: 'Batch delete multiple records',
            args: {
                modelName: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String', description: 'Model name' })),
                ids: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.arg)({ type: 'String' })))),
            },
            resolve: async (_, args, context) => {
                return context.enhancedService.batchOperation(args.modelName, 'delete', args.ids);
            },
        });
        t.field('clearDataLoaderCache', {
            type: 'JSON',
            description: 'Clear DataLoader cache for performance optimization',
            args: {
                modelName: (0, nexus_1.arg)({ type: 'String', description: 'Specific model (optional)' }),
            },
            resolve: async (_, args, context) => {
                if (args.modelName) {
                    context.dataLoader.clearLoaderCache(args.modelName);
                }
                else {
                    context.dataLoader.clearCache();
                }
                return {
                    success: true,
                    message: `Cache cleared${args.modelName ? ` for ${args.modelName}` : ' for all models'}`,
                    timestamp: new Date().toISOString(),
                };
            },
        });
    },
});
exports.Mutation = Mutation;
exports.nexusSchema = (0, nexus_1.makeSchema)({
    types: [Query, Mutation],
    outputs: {
        schema: (0, path_1.join)(process.cwd(), 'src/generated/schema.graphql'),
        typegen: (0, path_1.join)(process.cwd(), 'src/generated/nexus-typegen.ts'),
    },
    contextType: {
        module: (0, path_1.join)(process.cwd(), 'src/graphql/context.ts'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
    features: {
        abstractTypeStrategies: {
            resolveType: false,
            isTypeOf: false,
            __typename: false,
        },
    },
});
exports.default = exports.nexusSchema;
//# sourceMappingURL=nexus-schema.js.map