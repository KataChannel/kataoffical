import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UniversalService } from './universal.service';
import { GraphQLJSON } from 'graphql-type-json';

@Resolver()
export class UniversalResolver {
  constructor(private readonly universalService: UniversalService) {}

  // Query để lấy danh sách records với pagination
  @Query(() => GraphQLJSON, {
    description: 'Lấy danh sách records của bất kỳ model nào với pagination và filtering'
  })
  async findMany(
    @Args('modelName', { description: 'Tên model (ví dụ: User, Sanpham, Donhang...)' }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Điều kiện lọc (JSON format)'
    }) 
    where?: any,
    
    @Args('orderBy', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Sắp xếp (JSON format)'
    }) 
    orderBy?: any,
    
    @Args('skip', { 
      nullable: true, 
      defaultValue: 0,
      description: 'Số records bỏ qua (pagination)'
    }) 
    skip?: number,
    
    @Args('take', { 
      nullable: true, 
      defaultValue: 10,
      description: 'Số records lấy ra (pagination)'
    }) 
    take?: number,
    
    @Args('include', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Include relations (JSON format)'
    }) 
    include?: any,
    
    @Args('select', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Select specific fields (JSON format)'
    }) 
    select?: any,
  ) {
    return await this.universalService.findMany(modelName, {
      where,
      orderBy,
      skip,
      take,
      include,
      select,
    });
  }

  // Query để lấy một record cụ thể
  @Query(() => GraphQLJSON, {
    description: 'Lấy một record cụ thể của bất kỳ model nào'
  })
  async findUnique(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON,
      description: 'Điều kiện tìm kiếm (JSON format)'
    }) 
    where: any,
    
    @Args('include', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Include relations (JSON format)'
    }) 
    include?: any,
    
    @Args('select', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Select specific fields (JSON format)'
    }) 
    select?: any,
  ) {
    const args: any = { where };
    
    if (select) {
      args.select = select;
    } else if (include) {
      args.include = include;
    }
    
    return await this.universalService.findUnique(modelName, args);
  }

  // Mutation để tạo record mới
  @Mutation(() => GraphQLJSON, {
    description: 'Tạo record mới cho bất kỳ model nào'
  })
  async createRecord(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
    
    @Args('data', { 
      type: () => GraphQLJSON,
      description: 'Dữ liệu tạo record (JSON format)'
    }) 
    data: any,
  ) {
    return await this.universalService.create(modelName, data);
  }

  // Mutation để update record
  @Mutation(() => GraphQLJSON, {
    description: 'Cập nhật record của bất kỳ model nào'
  })
  async updateRecord(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON,
      description: 'Điều kiện tìm record cần update (JSON format)'
    }) 
    where: any,
    
    @Args('data', { 
      type: () => GraphQLJSON,
      description: 'Dữ liệu cập nhật (JSON format)'
    }) 
    data: any,
  ) {
    return await this.universalService.update(modelName, where, data);
  }

  // Mutation để delete record
  @Mutation(() => GraphQLJSON, {
    description: 'Xóa record của bất kỳ model nào'
  })
  async deleteRecord(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON,
      description: 'Điều kiện tìm record cần xóa (JSON format)'
    }) 
    where: any,
  ) {
    return await this.universalService.delete(modelName, where);
  }

  // Mutation để upsert record (update nếu tồn tại, create nếu chưa tồn tại)
  @Mutation(() => GraphQLJSON, {
    description: 'Upsert record (update nếu tồn tại, create nếu chưa tồn tại)'
  })
  async upsertRecord(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON,
      description: 'Điều kiện tìm record (JSON format)'
    }) 
    where: any,
    
    @Args('create', { 
      type: () => GraphQLJSON,
      description: 'Dữ liệu tạo mới nếu chưa tồn tại (JSON format)'
    }) 
    create: any,
    
    @Args('update', { 
      type: () => GraphQLJSON,
      description: 'Dữ liệu cập nhật nếu đã tồn tại (JSON format)'
    }) 
    update: any,
  ) {
    return await this.universalService.upsert(modelName, where, create, update);
  }

  // Query để aggregate dữ liệu
  @Query(() => GraphQLJSON, {
    description: 'Aggregate dữ liệu (count, sum, avg, min, max...)'
  })
  async aggregateRecords(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
    
    @Args('args', { 
      type: () => GraphQLJSON,
      description: 'Arguments cho aggregate (JSON format)'
    }) 
    args: any,
  ) {
    return await this.universalService.aggregate(modelName, args);
  }

  // Query để group by dữ liệu
  @Query(() => GraphQLJSON, {
    description: 'Group by dữ liệu'
  })
  async groupByRecords(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
    
    @Args('args', { 
      type: () => GraphQLJSON,
      description: 'Arguments cho group by (JSON format)'
    }) 
    args: any,
  ) {
    return await this.universalService.groupBy(modelName, args);
  }

  // Query để lấy danh sách tất cả models có sẵn
  @Query(() => [String], {
    description: 'Lấy danh sách tất cả models có sẵn trong hệ thống'
  })
  async getAvailableModels() {
    return this.universalService.getAvailableModels();
  }

  // Query để lấy thông tin về model
  @Query(() => GraphQLJSON, {
    description: 'Lấy thông tin về model (operations có sẵn...)'
  })
  async getModelInfo(
    @Args('modelName', { description: 'Tên model' }) 
    modelName: string,
  ) {
    return await this.universalService.getModelInfo(modelName);
  }
}
