import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-type-json';
import { UniversalService } from './universal.service';

@Injectable()
@Resolver()
export class UniversalResolver {
  constructor(private readonly universalService: UniversalService) {}

  @Query(() => GraphQLJSON, { 
    name: 'findMany',
    description: 'Generic findMany query with FULL support for select parameter'
  })
  async findMany(
    @Args('modelName', { type: () => String, description: 'Name of the model to query' }) 
    modelName: string,
    
    @Args('where', { type: () => GraphQLJSON, nullable: true, description: 'Where conditions' }) 
    where?: any,
    
    @Args('orderBy', { type: () => GraphQLJSON, nullable: true, description: 'Order by conditions' }) 
    orderBy?: any,
    
    @Args('skip', { type: () => Number, nullable: true, defaultValue: 0, description: 'Number of records to skip' }) 
    skip?: number,
    
    @Args('take', { type: () => Number, nullable: true, defaultValue: 10, description: 'Number of records to take' }) 
    take?: number,
    
    @Args('include', { type: () => GraphQLJSON, nullable: true, description: 'Relations to include' }) 
    include?: any,
    
    // ✅ THÊM SELECT PARAMETER - ĐÂY LÀ ĐIỂM QUAN TRỌNG
    @Args('select', { type: () => GraphQLJSON, nullable: true, description: 'Specific fields to select - SUPPORTS FIELD SELECTION' }) 
    select?: any
  ) {
    // console.log(`🔍 GraphQL findMany called with select support:`, {
    //   modelName,
    //   where: where ? Object.keys(where) : null,
    //   orderBy: orderBy ? Object.keys(orderBy) : null,
    //   skip,
    //   take,
    //   include: include ? Object.keys(include) : null,
    //   select: select ? Object.keys(select) : null, // ✅ LOG SELECT
    //   selectEnabled: !!select
    // });

    try {
      const result = await this.universalService.findMany(modelName, {
        where,
        orderBy,
        skip,
        take,
        include,
        select // ✅ PASS SELECT TO SERVICE
      });

      // console.log(`✅ findMany result for ${modelName}:`, {
      //   dataCount: result.data?.length || 0,
      //   total: result.total,
      //   page: result.page,
      //   selectUsed: !!select,
      //   firstItemFields: result.data?.[0] ? Object.keys(result.data[0]) : []
      // });

      return result;
    } catch (error) {
      console.error(`❌ GraphQL findMany error for ${modelName}:`, error.message);
      throw error;
    }
  }

  @Query(() => GraphQLJSON, { 
    name: 'findUnique',
    description: 'Generic findUnique query with select support'
  })
  async findUnique(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => GraphQLJSON }) where: any,
    @Args('include', { type: () => GraphQLJSON, nullable: true }) include?: any,
    @Args('select', { type: () => GraphQLJSON, nullable: true }) select?: any // ✅ SELECT SUPPORT
  ) {
    // console.log(`🔍 GraphQL findUnique called for ${modelName} with select:`, !!select);
    
    const args: any = { where };
    if (select) {
      args.select = select; // ✅ PRIORITIZE SELECT
    } else if (include) {
      args.include = include;
    }

    return this.universalService.findUnique(modelName, args);
  }

  // Test query để verify select functionality
  @Query(() => GraphQLJSON, { 
    name: 'testSelectQuery',
    description: 'Test query to verify select functionality works'
  })
  async testSelectQuery(
    @Args('modelName', { type: () => String, defaultValue: 'dathang' }) modelName: string
  ) {
    // console.log(`🧪 Testing select functionality for ${modelName}`);
    
    // Test 1: With select (only specific fields)
    const resultWithSelect = await this.universalService.findMany(modelName, {
      select: { title: true, id: true },
      take: 3
    });
    
    // Test 2: Without select (all fields)
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

  @Mutation(() => GraphQLJSON, { name: 'createRecord' })
  async createRecord(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('data', { type: () => GraphQLJSON }) data: any
  ) {
    return this.universalService.create(modelName, data);
  }

  @Mutation(() => GraphQLJSON, { name: 'updateRecord' })
  async updateRecord(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => GraphQLJSON }) where: any,
    @Args('data', { type: () => GraphQLJSON }) data: any
  ) {
    return this.universalService.update(modelName, where, data);
  }

  @Mutation(() => GraphQLJSON, { name: 'deleteRecord' })
  async deleteRecord(
    @Args('modelName', { type: () => String }) modelName: string,
    @Args('where', { type: () => GraphQLJSON }) where: any
  ) {
    return this.universalService.delete(modelName, where);
  }

  @Query(() => [String], { name: 'getAvailableModels' })
  getAvailableModels() {
    return this.universalService.getAvailableModels();
  }
}
