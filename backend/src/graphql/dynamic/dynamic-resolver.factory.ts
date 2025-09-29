import { Type } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../../../prisma/prisma.service';
import { BulkOperationResult } from '../types/bulk-operation-result.type';

// Interface for dynamic model configuration
export interface ModelConfig {
  name: string;
  pluralName: string;
  fields: { [key: string]: string }; // field name -> GraphQL type
  requiredFields: string[];
  uniqueFields: string[];
  relations?: { [key: string]: string }; // relation name -> related model
}

// Dynamic where input generator
export function createDynamicWhereInput(modelName: string, fields: { [key: string]: string }) {
  const whereFields: { [key: string]: any } = {};
  
  Object.keys(fields).forEach(fieldName => {
    const fieldType = fields[fieldName];
    whereFields[fieldName] = { type: fieldType, nullable: true };
  });

  return whereFields;
}

// Dynamic input generator
export function createDynamicCreateInput(modelName: string, fields: { [key: string]: string }, requiredFields: string[]) {
  const inputFields: { [key: string]: any } = {};
  
  Object.keys(fields).forEach(fieldName => {
    const fieldType = fields[fieldName];
    const isRequired = requiredFields.includes(fieldName);
    inputFields[fieldName] = { type: fieldType, nullable: !isRequired };
  });

  return inputFields;
}

// Dynamic GraphQL resolver factory
export function createDynamicResolver(config: ModelConfig) {
  @Resolver({ isAbstract: true })
  class DynamicResolver {
    constructor(public readonly prisma: PrismaService) {}

    // Get Prisma delegate dynamically
    public get model(): any {
      const modelName = config.name.toLowerCase();
      return (this.prisma as any)[modelName];
    }

    // Dynamic findAll query
    async findAll(
      where?: any,
      orderBy?: any,
      skip?: number,
      take?: number,
    ): Promise<any[]> {
      return this.model.findMany({
        where,
        orderBy,
        skip,
        take: take || 50, // Default limit
      });
    }

    // Dynamic findOne query
    async findOne(where: any): Promise<any | null> {
      return this.model.findUnique({ where });
    }

    // Dynamic count query
    async count(where?: any): Promise<number> {
      return this.model.count({ where });
    }

    // Dynamic createOne mutation
    async createOne(data: any): Promise<any> {
      return this.model.create({ data });
    }

    // Dynamic createBulk mutation
    async createBulk(data: any[]): Promise<BulkOperationResult> {
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
      } catch (error: any) {
        return {
          count: 0,
          success: false,
          message: `Failed to create bulk ${config.pluralName}: ${error.message}`
        };
      }
    }

    // Dynamic updateOne mutation
    async updateOne(where: any, data: any): Promise<any> {
      return this.model.update({ where, data });
    }

    // Dynamic updateBulk mutation
    async updateBulk(where: any, data: any): Promise<BulkOperationResult> {
      try {
        const result = await this.model.updateMany({ where, data });
        return {
          count: result.count,
          success: true,
          message: `Successfully updated ${result.count} ${config.pluralName}`
        };
      } catch (error: any) {
        return {
          count: 0,
          success: false,
          message: `Failed to update bulk ${config.pluralName}: ${error.message}`
        };
      }
    }

    // Dynamic deleteOne mutation
    async deleteOne(where: any): Promise<any> {
      return this.model.delete({ where });
    }

    // Dynamic deleteBulk mutation
    async deleteBulk(where: any): Promise<BulkOperationResult> {
      try {
        const result = await this.model.deleteMany({ where });
        return {
          count: result.count,
          success: true,
          message: `Successfully deleted ${result.count} ${config.pluralName}`
        };
      } catch (error: any) {
        return {
          count: 0,
          success: false,
          message: `Failed to delete bulk ${config.pluralName}: ${error.message}`
        };
      }
    }
  }

  return DynamicResolver;
}

// Model registry for dynamic resolvers
export class ModelRegistry {
  private static models: Map<string, ModelConfig> = new Map();

  static register(config: ModelConfig) {
    this.models.set(config.name, config);
  }

  static get(modelName: string): ModelConfig | undefined {
    return this.models.get(modelName);
  }

  static getAll(): ModelConfig[] {
    return Array.from(this.models.values());
  }
}

// Decorator for auto-registering models
export function GraphQLModel(config: Omit<ModelConfig, 'name'>) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const modelName = constructor.name;
    ModelRegistry.register({
      name: modelName,
      ...config
    });
    return constructor;
  };
}