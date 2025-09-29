import { Type } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PrismaService } from '../../../prisma/prisma.service';
import { BulkOperationResult } from '../types/bulk-operation-result.type';

// Generic interface for all Prisma models
export interface IPrismaDelegate {
  findMany: (args?: any) => Promise<any[]>;
  findUnique: (args: any) => Promise<any>;
  findFirst: (args?: any) => Promise<any>;
  create: (args: any) => Promise<any>;
  createMany: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  updateMany: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
  deleteMany: (args: any) => Promise<any>;
  count: (args?: any) => Promise<number>;
}

// Base class for pagination
export interface PaginationArgs {
  skip?: number;
  take?: number;
}

// Base class for ordering
export interface OrderByArgs {
  [key: string]: 'asc' | 'desc';
}

// Generic filter interface
export interface FilterArgs {
  where?: any;
  orderBy?: OrderByArgs | OrderByArgs[];
  skip?: number;
  take?: number;
}



// Abstract base resolver class
export function createBaseResolver<T, CreateInput, UpdateInput, WhereInput, WhereUniqueInput>(
  classRef: Type<T>,
  createInputRef: Type<CreateInput>,
  updateInputRef: Type<UpdateInput>,
  whereInputRef: Type<WhereInput>,
  whereUniqueInputRef: Type<WhereUniqueInput>,
  modelName: string,
) {
  @Resolver(() => classRef, { isAbstract: true })
  abstract class BaseResolver {
    constructor(public readonly prisma: PrismaService) {}

    // Get the Prisma delegate for the specific model
    public get model(): IPrismaDelegate {
      return (this.prisma as any)[modelName.toLowerCase()];
    }

    @Query(() => [classRef], { name: `findAll${modelName}s` })
    async findAll(
      @Args('where', { type: () => whereInputRef, nullable: true }) where?: any,
      @Args('orderBy', { type: () => String, nullable: true }) orderBy?: any,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
    ): Promise<T[]> {
      return this.model.findMany({
        where,
        orderBy,
        skip,
        take,
      });
    }

    @Query(() => classRef, { name: `findOne${modelName}`, nullable: true })
    async findOne(
      @Args('where', { type: () => whereUniqueInputRef }) where: any,
    ): Promise<T | null> {
      return this.model.findUnique({ where });
    }

    @Query(() => Int, { name: `count${modelName}s` })
    async count(
      @Args('where', { type: () => whereInputRef, nullable: true }) where?: any,
    ): Promise<number> {
      return this.model.count({ where });
    }

    @Mutation(() => classRef, { name: `createOne${modelName}` })
    async createOne(
      @Args('data', { type: () => createInputRef }) data: any,
    ): Promise<T> {
      return this.model.create({ data });
    }

    @Mutation(() => BulkOperationResult, { name: `createBulk${modelName}s` })
    async createBulk(
      @Args('data', { type: () => [createInputRef] }) data: any[],
    ): Promise<BulkOperationResult> {
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
      } catch (error) {
        return {
          count: 0,
          success: false,
          message: `Failed to create bulk ${modelName.toLowerCase()}s: ${error.message}`
        };
      }
    }

    @Mutation(() => classRef, { name: `updateOne${modelName}` })
    async updateOne(
      @Args('where', { type: () => whereUniqueInputRef }) where: any,
      @Args('data', { type: () => updateInputRef }) data: any,
    ): Promise<T> {
      return this.model.update({ where, data });
    }

    @Mutation(() => BulkOperationResult, { name: `updateBulk${modelName}s` })
    async updateBulk(
      @Args('where', { type: () => whereInputRef, nullable: true }) where: any,
      @Args('data', { type: () => updateInputRef }) data: any,
    ): Promise<BulkOperationResult> {
      try {
        const result = await this.model.updateMany({ where, data });
        return {
          count: result.count,
          success: true,
          message: `Successfully updated ${result.count} ${modelName.toLowerCase()}(s)`
        };
      } catch (error) {
        return {
          count: 0,
          success: false,
          message: `Failed to update bulk ${modelName.toLowerCase()}s: ${error.message}`
        };
      }
    }

    @Mutation(() => classRef, { name: `deleteOne${modelName}` })
    async deleteOne(
      @Args('where', { type: () => whereUniqueInputRef }) where: any,
    ): Promise<T> {
      return this.model.delete({ where });
    }

    @Mutation(() => BulkOperationResult, { name: `deleteBulk${modelName}s` })
    async deleteBulk(
      @Args('where', { type: () => whereInputRef, nullable: true }) where: any,
    ): Promise<BulkOperationResult> {
      try {
        const result = await this.model.deleteMany({ where });
        return {
          count: result.count,
          success: true,
          message: `Successfully deleted ${result.count} ${modelName.toLowerCase()}(s)`
        };
      } catch (error) {
        return {
          count: 0,
          success: false,
          message: `Failed to delete bulk ${modelName.toLowerCase()}s: ${error.message}`
        };
      }
    }
  }

  return BaseResolver;
}