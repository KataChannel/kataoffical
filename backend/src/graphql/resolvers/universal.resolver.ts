import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BulkOperationResult } from '../types/bulk-operation-result.type';
import { getModelConfig } from '../dynamic/model-configs';

@Injectable()
@Resolver()
export class UniversalResolver {
  constructor(private readonly prisma: PrismaService) {}

  // Universal findAll query
  @Query(() => String, { name: 'findAllUniversal' })
  async findAllUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => String, nullable: true }) where?: string,
    @Args('orderBy', { type: () => String, nullable: true }) orderBy?: string,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<string> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
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
    } catch (error: any) {
      throw new Error(`Failed to find ${modelName}: ${error.message}`);
    }
  }

  // Universal findOne query
  @Query(() => String, { name: 'findOneUniversal', nullable: true })
  async findOneUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => String }) where: string,
  ): Promise<string | null> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
      const whereClause = JSON.parse(where);

      const result = await model.findUnique({ where: whereClause });
      return result ? JSON.stringify(result) : null;
    } catch (error: any) {
      throw new Error(`Failed to find one ${modelName}: ${error.message}`);
    }
  }

  // Universal count query
  @Query(() => Int, { name: 'countUniversal' })
  async countUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => String, nullable: true }) where?: string,
  ): Promise<number> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
      const whereClause = where ? JSON.parse(where) : undefined;

      return await model.count({ where: whereClause });
    } catch (error: any) {
      throw new Error(`Failed to count ${modelName}: ${error.message}`);
    }
  }

  // Universal createOne mutation
  @Mutation(() => String, { name: 'createOneUniversal' })
  async createOneUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('data', { type: () => String }) data: string,
  ): Promise<string> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
      const dataObject = JSON.parse(data);

      const result = await model.create({ data: dataObject });
      return JSON.stringify(result);
    } catch (error: any) {
      throw new Error(`Failed to create ${modelName}: ${error.message}`);
    }
  }

  // Universal createBulk mutation
  @Mutation(() => BulkOperationResult, { name: 'createBulkUniversal' })
  async createBulkUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('data', { type: () => String }) data: string,
  ): Promise<BulkOperationResult> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
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
    } catch (error: any) {
      return {
        count: 0,
        success: false,
        message: `Failed to create bulk ${modelName}: ${error.message}`
      };
    }
  }

  // Universal updateOne mutation
  @Mutation(() => String, { name: 'updateOneUniversal' })
  async updateOneUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => String }) where: string,
    @Args('data', { type: () => String }) data: string,
  ): Promise<string> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
      const whereClause = JSON.parse(where);
      const dataObject = JSON.parse(data);

      const result = await model.update({ 
        where: whereClause, 
        data: dataObject 
      });
      return JSON.stringify(result);
    } catch (error: any) {
      throw new Error(`Failed to update ${modelName}: ${error.message}`);
    }
  }

  // Universal updateBulk mutation
  @Mutation(() => BulkOperationResult, { name: 'updateBulkUniversal' })
  async updateBulkUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => String, nullable: true }) where: string,
    @Args('data', { type: () => String }) data: string,
  ): Promise<BulkOperationResult> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
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
    } catch (error: any) {
      return {
        count: 0,
        success: false,
        message: `Failed to update bulk ${modelName}: ${error.message}`
      };
    }
  }

  // Universal deleteOne mutation
  @Mutation(() => String, { name: 'deleteOneUniversal' })
  async deleteOneUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => String }) where: string,
  ): Promise<string> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
      const whereClause = JSON.parse(where);

      const result = await model.delete({ where: whereClause });
      return JSON.stringify(result);
    } catch (error: any) {
      throw new Error(`Failed to delete ${modelName}: ${error.message}`);
    }
  }

  // Universal deleteBulk mutation
  @Mutation(() => BulkOperationResult, { name: 'deleteBulkUniversal' })
  async deleteBulkUniversal(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => String, nullable: true }) where?: string,
  ): Promise<BulkOperationResult> {
    try {
      const config = getModelConfig(modelName);
      if (!config) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = (this.prisma as any)[config.name.toLowerCase()];
      const whereClause = where ? JSON.parse(where) : undefined;

      const result = await model.deleteMany({ where: whereClause });

      return {
        count: result.count,
        success: true,
        message: `Successfully deleted ${result.count} ${config.pluralName}`
      };
    } catch (error: any) {
      return {
        count: 0,
        success: false,
        message: `Failed to delete bulk ${modelName}: ${error.message}`
      };
    }
  }

  // Get model configuration
  @Query(() => String, { name: 'getModelConfig' })
  async getModelConfig(
    @Args('modelName', { type: () => String }) modelName: string,
  ): Promise<string> {
    const config = getModelConfig(modelName);
    if (!config) {
      throw new Error(`Model ${modelName} not found`);
    }
    return JSON.stringify(config);
  }

  // Get all available models
  @Query(() => [String], { name: 'getAvailableModels' })
  async getAvailableModels(): Promise<string[]> {
    const { MODEL_CONFIGURATIONS } = await import('../dynamic/model-configs');
    return MODEL_CONFIGURATIONS.map(config => config.name);
  }
}