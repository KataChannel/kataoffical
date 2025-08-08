import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-type-json';
import { GraphQLResolveInfo } from 'graphql';
import { EnhancedUniversalService } from './enhanced-universal.service';
import { DataLoaderService } from './dataloader.service';

/**
 * Enhanced Universal GraphQL Resolver with dynamic field selection,
 * DataLoader optimization, and comprehensive CRUD operations
 */
@Injectable()
@Resolver()
export class EnhancedUniversalResolver {
  constructor(
    private readonly enhancedService: EnhancedUniversalService,
    private readonly dataLoader: DataLoaderService
  ) {}

  @Query(() => GraphQLJSON, { 
    name: 'findMany',
    description: 'Enhanced dynamic findMany with intelligent field selection and DataLoader optimization'
  })
  async findMany(
    @Args('modelName', { 
      type: () => String, 
      description: 'Model name (case-insensitive)' 
    }) 
    modelName: string,

    @Info() info: GraphQLResolveInfo,
    
    @Args('where', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Filter conditions' 
    }) 
    where?: any,
    
    @Args('orderBy', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Sort conditions' 
    }) 
    orderBy?: any,
    
    @Args('skip', { 
      type: () => Number, 
      nullable: true, 
      defaultValue: 0,
      description: 'Records to skip for pagination' 
    }) 
    skip?: number,
    
    @Args('take', { 
      type: () => Number, 
      nullable: true, 
      defaultValue: 50,
      description: 'Maximum records to return (max 1000)' 
    }) 
    take?: number,
    
    @Args('include', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Relations to include' 
    }) 
    include?: any,
    
    @Args('select', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Specific fields to select' 
    }) 
    select?: any
  ) {
    // Validate and sanitize inputs
    const sanitizedArgs = this.sanitizeQueryArgs({
      where,
      orderBy,
      skip: Math.max(0, skip || 0),
      take: Math.min(1000, Math.max(1, take || 50)),
      include,
      select
    });

    console.log(`🚀 Enhanced findMany query:`, {
      model: modelName,
      args: {
        ...sanitizedArgs,
        take: sanitizedArgs.take,
        skip: sanitizedArgs.skip
      },
      hasGraphQLInfo: !!info
    });

    try {
      return await this.enhancedService.findMany(
        modelName,
        sanitizedArgs,
        info
      );
    } catch (error) {
      console.error(`❌ Enhanced findMany error:`, error);
      throw error;
    }
  }

  @Query(() => GraphQLJSON, { 
    name: 'findUnique',
    description: 'Enhanced dynamic findUnique with field selection optimization'
  })
  async findUnique(
    @Args('modelName', { 
      type: () => String, 
      description: 'Model name (case-insensitive)' 
    }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON, 
      description: 'Unique identifier conditions' 
    }) 
    where: any,

    @Info() info: GraphQLResolveInfo,
    
    @Args('include', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Relations to include' 
    }) 
    include?: any,
    
    @Args('select', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Specific fields to select' 
    }) 
    select?: any
  ) {
    const sanitizedArgs = {
      where: where || {},
      include,
      select
    };

    console.log(`🎯 Enhanced findUnique query:`, {
      model: modelName,
      whereKeys: Object.keys(sanitizedArgs.where)
    });

    try {
      return await this.enhancedService.findUnique(
        modelName,
        sanitizedArgs,
        info
      );
    } catch (error) {
      console.error(`❌ Enhanced findUnique error:`, error);
      throw error;
    }
  }

  @Mutation(() => GraphQLJSON, { 
    name: 'createOne',
    description: 'Enhanced dynamic create with optimized response'
  })
  async createOne(
    @Args('modelName', { 
      type: () => String, 
      description: 'Model name (case-insensitive)' 
    }) 
    modelName: string,
    
    @Args('data', { 
      type: () => GraphQLJSON, 
      description: 'Data to create' 
    }) 
    data: any,

    @Info() info: GraphQLResolveInfo,
    
    @Args('include', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Relations to include in response' 
    }) 
    include?: any,
    
    @Args('select', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Specific fields to select in response' 
    }) 
    select?: any
  ) {
    const sanitizedArgs = {
      data: data || {},
      include,
      select
    };

    console.log(`➕ Enhanced create mutation:`, {
      model: modelName,
      dataKeys: Object.keys(sanitizedArgs.data)
    });

    try {
      return await this.enhancedService.create(
        modelName,
        sanitizedArgs,
        info
      );
    } catch (error) {
      console.error(`❌ Enhanced create error:`, error);
      throw error;
    }
  }

  @Mutation(() => GraphQLJSON, { 
    name: 'updateOne',
    description: 'Enhanced dynamic update with optimized response'
  })
  async updateOne(
    @Args('modelName', { 
      type: () => String, 
      description: 'Model name (case-insensitive)' 
    }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON, 
      description: 'Unique identifier conditions' 
    }) 
    where: any,
    
    @Args('data', { 
      type: () => GraphQLJSON, 
      description: 'Data to update' 
    }) 
    data: any,

    @Info() info: GraphQLResolveInfo,
    
    @Args('include', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Relations to include in response' 
    }) 
    include?: any,
    
    @Args('select', { 
      type: () => GraphQLJSON, 
      nullable: true, 
      description: 'Specific fields to select in response' 
    }) 
    select?: any
  ) {
    const sanitizedArgs = {
      where: where || {},
      data: data || {},
      include,
      select
    };

    console.log(`✏️ Enhanced update mutation:`, {
      model: modelName,
      whereKeys: Object.keys(sanitizedArgs.where),
      dataKeys: Object.keys(sanitizedArgs.data)
    });

    try {
      return await this.enhancedService.update(
        modelName,
        sanitizedArgs,
        info
      );
    } catch (error) {
      console.error(`❌ Enhanced update error:`, error);
      throw error;
    }
  }

  @Mutation(() => GraphQLJSON, { 
    name: 'deleteOne',
    description: 'Enhanced dynamic delete operation'
  })
  async deleteOne(
    @Args('modelName', { 
      type: () => String, 
      description: 'Model name (case-insensitive)' 
    }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON, 
      description: 'Unique identifier conditions' 
    }) 
    where: any
  ) {
    const sanitizedArgs = {
      where: where || {}
    };

    console.log(`🗑️ Enhanced delete mutation:`, {
      model: modelName,
      whereKeys: Object.keys(sanitizedArgs.where)
    });

    try {
      return await this.enhancedService.delete(
        modelName,
        sanitizedArgs
      );
    } catch (error) {
      console.error(`❌ Enhanced delete error:`, error);
      throw error;
    }
  }

  @Mutation(() => GraphQLJSON, { 
    name: 'batchCreate',
    description: 'Enhanced batch create for multiple records'
  })
  async batchCreate(
    @Args('modelName', { 
      type: () => String, 
      description: 'Model name (case-insensitive)' 
    }) 
    modelName: string,
    
    @Args('data', { 
      type: () => [GraphQLJSON], 
      description: 'Array of data objects to create' 
    }) 
    data: any[]
  ) {
    console.log(`📦 Enhanced batch create:`, {
      model: modelName,
      count: data?.length || 0
    });

    try {
      return await this.enhancedService.batchOperation(
        modelName,
        'create',
        data
      );
    } catch (error) {
      console.error(`❌ Enhanced batch create error:`, error);
      throw error;
    }
  }

  @Query(() => GraphQLJSON, { 
    name: 'modelMetadata',
    description: 'Get metadata about a model for optimization'
  })
  async modelMetadata(
    @Args('modelName', { 
      type: () => String, 
      description: 'Model name to get metadata for' 
    }) 
    modelName: string
  ) {
    console.log(`📊 Getting metadata for model: ${modelName}`);

    try {
      return await this.enhancedService.getModelMetadata(modelName);
    } catch (error) {
      console.error(`❌ Model metadata error:`, error);
      throw error;
    }
  }

  @Mutation(() => GraphQLJSON, { 
    name: 'clearDataLoaderCache',
    description: 'Clear DataLoader cache for better performance testing'
  })
  async clearDataLoaderCache(
    @Args('modelName', { 
      type: () => String, 
      nullable: true,
      description: 'Specific model to clear cache for (optional)' 
    }) 
    modelName?: string
  ) {
    console.log(`🗑️ Clearing DataLoader cache${modelName ? ` for ${modelName}` : ' (all)'}`);

    try {
      if (modelName) {
        this.dataLoader.clearLoaderCache(modelName);
      } else {
        this.dataLoader.clearCache();
      }
      
      return {
        success: true,
        message: `Cache cleared${modelName ? ` for ${modelName}` : ' for all models'}`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`❌ Clear cache error:`, error);
      throw error;
    }
  }

  /**
   * Sanitize and validate query arguments
   */
  private sanitizeQueryArgs(args: any): any {
    const sanitized: any = {};

    // Sanitize where conditions
    if (args.where && typeof args.where === 'object') {
      sanitized.where = this.sanitizeWhereConditions(args.where);
    }

    // Sanitize orderBy
    if (args.orderBy) {
      sanitized.orderBy = args.orderBy;
    }

    // Sanitize pagination
    if (typeof args.skip === 'number' && args.skip >= 0) {
      sanitized.skip = args.skip;
    }

    if (typeof args.take === 'number' && args.take > 0) {
      sanitized.take = Math.min(1000, args.take); // Max 1000 records
    }

    // Include and select
    if (args.include) sanitized.include = args.include;
    if (args.select) sanitized.select = args.select;

    return sanitized;
  }

  /**
   * Sanitize where conditions to prevent injection
   */
  private sanitizeWhereConditions(where: any): any {
    if (!where || typeof where !== 'object') return {};

    const sanitized: any = {};

    for (const [key, value] of Object.entries(where)) {
      // Skip dangerous operations
      if (key.includes('__') || key.startsWith('_')) {
        console.warn(`⚠️ Skipping potentially unsafe where condition: ${key}`);
        continue;
      }

      // Recursively sanitize nested objects
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        sanitized[key] = this.sanitizeWhereConditions(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }
}
