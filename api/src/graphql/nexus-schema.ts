import { makeSchema, objectType, queryType, mutationType, arg, nonNull, list } from 'nexus';
import { join } from 'path';
import { GraphQLJSON } from 'graphql-type-json';

/**
 * Nexus Schema Generator for Dynamic GraphQL Schema
 * Automatically generates GraphQL types from Prisma schema
 */

// Define JSON scalar type
const JSONType = GraphQLJSON;

// Dynamic Query Type with universal resolvers
const Query = queryType({
  definition(t) {
    // Enhanced findMany with field selection
    t.field('findMany', {
      type: 'JSON',
      description: 'Dynamic findMany query with intelligent field selection',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        where: arg({ type: 'JSON', description: 'Filter conditions' }),
        orderBy: arg({ type: 'JSON', description: 'Sort conditions' }),
        skip: arg({ type: 'Int', default: 0, description: 'Records to skip' }),
        take: arg({ type: 'Int', default: 50, description: 'Records to take' }),
        include: arg({ type: 'JSON', description: 'Relations to include' }),
        select: arg({ type: 'JSON', description: 'Fields to select' }),
      },
      resolve: async (_, args, context, info) => {
        return context.enhancedService.findMany(
          args.modelName,
          {
            where: args.where,
            orderBy: args.orderBy,
            skip: args.skip,
            take: args.take,
            include: args.include,
            select: args.select,
          },
          info
        );
      },
    });

    // Enhanced findUnique
    t.field('findUnique', {
      type: 'JSON',
      description: 'Dynamic findUnique query with field selection',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        where: nonNull(arg({ type: 'JSON', description: 'Unique conditions' })),
        include: arg({ type: 'JSON', description: 'Relations to include' }),
        select: arg({ type: 'JSON', description: 'Fields to select' }),
      },
      resolve: async (_, args, context, info) => {
        return context.enhancedService.findUnique(
          args.modelName,
          {
            where: args.where,
            include: args.include,
            select: args.select,
          },
          info
        );
      },
    });

    // Model metadata query
    t.field('modelMetadata', {
      type: 'JSON',
      description: 'Get model metadata for optimization',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
      },
      resolve: async (_, args, context) => {
        return context.enhancedService.getModelMetadata(args.modelName);
      },
    });

    // Health check
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

// Dynamic Mutation Type
const Mutation = mutationType({
  definition(t) {
    // Enhanced createOne
    t.field('createOne', {
      type: 'JSON',
      description: 'Dynamic create mutation with optimized response',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        data: nonNull(arg({ type: 'JSON', description: 'Data to create' })),
        include: arg({ type: 'JSON', description: 'Relations to include' }),
        select: arg({ type: 'JSON', description: 'Fields to select' }),
      },
      resolve: async (_, args, context, info) => {
        return context.enhancedService.create(
          args.modelName,
          {
            data: args.data,
            include: args.include,
            select: args.select,
          },
          info
        );
      },
    });

    // Enhanced updateOne
    t.field('updateOne', {
      type: 'JSON',
      description: 'Dynamic update mutation with optimized response',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        where: nonNull(arg({ type: 'JSON', description: 'Where conditions' })),
        data: nonNull(arg({ type: 'JSON', description: 'Data to update' })),
        include: arg({ type: 'JSON', description: 'Relations to include' }),
        select: arg({ type: 'JSON', description: 'Fields to select' }),
      },
      resolve: async (_, args, context, info) => {
        return context.enhancedService.update(
          args.modelName,
          {
            where: args.where,
            data: args.data,
            include: args.include,
            select: args.select,
          },
          info
        );
      },
    });

    // Enhanced deleteOne
    t.field('deleteOne', {
      type: 'JSON',
      description: 'Dynamic delete mutation',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        where: nonNull(arg({ type: 'JSON', description: 'Where conditions' })),
      },
      resolve: async (_, args, context) => {
        return context.enhancedService.delete(args.modelName, {
          where: args.where,
        });
      },
    });

    // Batch operations
    t.field('batchCreate', {
      type: 'JSON',
      description: 'Batch create multiple records',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        data: nonNull(list(nonNull(arg({ type: 'JSON' })))),
      },
      resolve: async (_, args, context) => {
        return context.enhancedService.batchOperation(
          args.modelName,
          'create',
          args.data
        );
      },
    });

    t.field('batchUpdate', {
      type: 'JSON',
      description: 'Batch update multiple records',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        items: nonNull(list(nonNull(arg({ type: 'JSON' })))),
      },
      resolve: async (_, args, context) => {
        return context.enhancedService.batchOperation(
          args.modelName,
          'update',
          args.items
        );
      },
    });

    t.field('batchDelete', {
      type: 'JSON',
      description: 'Batch delete multiple records',
      args: {
        modelName: nonNull(arg({ type: 'String', description: 'Model name' })),
        ids: nonNull(list(nonNull(arg({ type: 'String' })))),
      },
      resolve: async (_, args, context) => {
        return context.enhancedService.batchOperation(
          args.modelName,
          'delete',
          args.ids
        );
      },
    });

    // Cache management
    t.field('clearDataLoaderCache', {
      type: 'JSON',
      description: 'Clear DataLoader cache for performance optimization',
      args: {
        modelName: arg({ type: 'String', description: 'Specific model (optional)' }),
      },
      resolve: async (_, args, context) => {
        if (args.modelName) {
          context.dataLoader.clearLoaderCache(args.modelName);
        } else {
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

// Generate the complete schema
export const nexusSchema = makeSchema({
  types: [Query, Mutation],
  outputs: {
    schema: join(process.cwd(), 'src/generated/schema.graphql'),
    typegen: join(process.cwd(), 'src/generated/nexus-typegen.ts'),
  },
  contextType: {
    module: join(process.cwd(), 'src/graphql/context.ts'),
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

// Export for use in GraphQL module
export { Query, Mutation };
export default nexusSchema;
