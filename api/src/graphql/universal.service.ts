import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationInput, FilterInput, SortInput } from './types';

@Injectable()
export class UniversalService { // Fix: Rename to avoid conflict
  constructor(private readonly prisma: PrismaService) {}

  /**
   * ✅ Map lowercase model names to PascalCase Prisma model names
   */
  private mapModelName(model: string): string {
    const modelMap: { [key: string]: string } = {
      'tonkho': 'tonKho',           // TonKho -> tonKho in client
      'sanpham': 'sanpham',         // Sanpham -> sanpham in client 
      'khachhang': 'khachhang',     // Khachhang -> khachhang in client
      'nhomkhachhang': 'nhomkhachhang', // Nhomkhachhang -> nhomkhachhang in client
      'nhomncc': 'nhomNcc',         // ✅ ADD: NhomNcc -> nhomNcc in client
      'nhacungcap': 'nhacungcap',   // Nhacungcap -> nhacungcap in client
      'donhang': 'donhang',         // Donhang -> donhang in client
      'dathang': 'dathang',         // Dathang -> dathang in client
      'phieukho': 'phieuKho',       // PhieuKho -> phieuKho in client
      'chotkho': 'chotkho',         // Chotkho -> chotkho in client
      'menu': 'menu',               // Menu -> menu in client
      'user': 'user',               // User -> user in client
      'role': 'role',               // Role -> role in client
      'permission': 'permission',   // Permission -> permission in client
      'congnoncc':'congnoncc',   // ✅ ADD: Congnoncc -> congnoncc in client
      // Add more mappings as needed
    };

    return modelMap[model.toLowerCase()] || model;
  }

  /**
   * ✅ Validate model and get Prisma model instance
   */
  private validateAndGetPrismaModel(model: string) {
    if (!model) {
      throw new Error('Model name is required');
    }

    if (!this.prisma) {
      throw new Error('Prisma service is not initialized');
    }

    // Map to correct case
    const mappedModel = this.mapModelName(model);
    console.log(`🔄 Model mapping: '${model}' -> '${mappedModel}'`);

    // Check if model exists in Prisma
    const prismaModel = (this.prisma as any)[mappedModel];
    if (!prismaModel) {
      throw new Error(`Model '${mappedModel}' does not exist in Prisma schema. Available models: ${Object.keys(this.prisma).filter(key => !key.startsWith('_')).join(', ')}`);
    }

    return { prismaModel, mappedModel };
  }

  /**
   * Generic find all with pagination
   */
  async findAll(
    model: string,
    pagination: PaginationInput = { page: 1, pageSize: 10 },
    filter?: FilterInput,
    sort?: SortInput,
    include?: any
  ) {
    // ✅ Validate and get Prisma model
    const { prismaModel, mappedModel } = this.validateAndGetPrismaModel(model);

    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where = this.buildWhereClause(filter);

    // Build orderBy clause
    const orderBy = sort ? { [sort.field]: sort.direction } : { createdAt: 'desc' };

    try {
      const [data, total] = await Promise.all([
        prismaModel.findMany({
          skip,
          take: pageSize,
          where,
          orderBy,
          include,
        }),
        prismaModel.count({ where }),
      ]);

      const totalPages = Math.ceil(total / pageSize);

      return {
        data,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error querying ${model}: ${error.message}`);
    }
  }
async findMany(modelName: string, options: {
  where?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
  include?: any;
  select?: any;
} = {}) {
  const { where, orderBy, skip = 0, take = 10, include, select } = options;

  try {
    const queryArgs: any = {
      skip,
      take,
      where,
      orderBy: orderBy || { createdAt: 'desc' },
    };

    // ✅ PRIORITIZE SELECT OVER INCLUDE
    if (select) {
      queryArgs.select = select;
    } else if (include) {
      queryArgs.include = include;
    }

    // Execute queries
    const [data, total] = await Promise.all([
      (this.prisma as any)[modelName].findMany(queryArgs),
      (this.prisma as any)[modelName].count({ where: where || {} }),
    ]);

    // Return paginated result
    const totalPages = Math.ceil(total / take);
    const currentPage = Math.floor(skip / take) + 1;

    return {
      data,
      total,
      page: currentPage,
      pageSize: take,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  } catch (error) {
    throw new BadRequestException(`Error in findMany for ${modelName}: ${error.message}`);
  }
}


  async findUnique(modelName: string, options: {
    where: any;
    include?: any;
    select?: any;
  }) {
    const { where, include, select } = options;

    try {
      const queryArgs: any = { where };

      // ✅ PRIORITIZE SELECT OVER INCLUDE
      if (select) {
        queryArgs.select = select;
      } else if (include) {
        queryArgs.include = include;
      }

      const result = await (this.prisma as any)[modelName].findUnique(queryArgs);

      if (!result) {
        throw new NotFoundException(`${modelName} not found with the given criteria`);
      }

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error in findUnique for ${modelName}: ${error.message}`);
    }
  }


  /**
   * Generic find by ID
   */
  async findById(model: string, id: string, include?: any) {
    try {
      const result = await (this.prisma as any)[model].findUnique({
        where: { id },
        include,
      });

      if (!result) {
        throw new NotFoundException(`${model} with ID ${id} not found`);
      }

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error finding ${model}: ${error.message}`);
    }
  }

  /**
   * Generic create
   */
  async create(model: string, data: any, include?: any) {
    try {
      // ✅ Validate and get Prisma model
      const { prismaModel, mappedModel } = this.validateAndGetPrismaModel(model);

      // ✅ Check if create method exists
      if (typeof prismaModel.create !== 'function') {
        throw new Error(`Create method does not exist on model '${mappedModel}'`);
      }

      console.log(`🔍 Creating ${mappedModel} with:`, { data, include });

      const result = await prismaModel.create({
        data,
        include,
      });

      console.log(`✅ Create result for ${mappedModel}:`, result);
      
      return result;
    } catch (error) {
      console.error(`❌ Error creating ${model}:`, error);
      throw new BadRequestException(`Error creating ${model}: ${error.message}`);
    }
  }

  /**
   * Generic update with where clause
   */
  async update(model: string, where: any, data: any, include?: any, select?: any) {
    try {
      // ✅ Validate and get Prisma model
      const { prismaModel, mappedModel } = this.validateAndGetPrismaModel(model);

      // ✅ Check if update method exists
      if (typeof prismaModel.update !== 'function') {
        throw new Error(`Update method does not exist on model '${mappedModel}'`);
      }

      console.log(`🔍 Updating ${mappedModel} with:`, {
        where,
        dataKeys: Object.keys(data),
        include,
        select
      });

      // Special handling for user updates
      if (mappedModel.toLowerCase() === 'user') {
        console.log(`👤 User update data preview:`, {
          id: data.id,
          email: data.email,
          hasRoles: !!data.roles,
          rolesCount: data.roles ? (Array.isArray(data.roles) ? data.roles.length : 'not array') : 0,
          hasPermissions: !!data.permissions,
          otherFields: Object.keys(data).filter(k => !['id', 'email', 'roles', 'permissions'].includes(k))
        });
      }

      // Validate data for relations to prevent "Required exactly one parent ID" error
      const cleanData = this.validateAndCleanRelationData(data);
      
      const updateOptions: any = {
        where,
        data: cleanData
      };

      if (include) {
        updateOptions.include = include;
      }

      if (select) {
        updateOptions.select = select;
      }

      console.log(`📤 Final update options for ${mappedModel}:`, updateOptions);

      const result = await prismaModel.update(updateOptions);
      
      console.log(`✅ Update result for ${mappedModel}:`, result);
      
      return result;
    } catch (error) {
      console.error(`❌ Error updating ${model}:`, error);
      throw new BadRequestException(`Error updating ${model}: ${error.message}`);
    }
  }

  /**
   * Validate and clean relation data to prevent Prisma errors
   */
  private validateAndCleanRelationData(data: any): any {
    if (!data || typeof data !== 'object') return data;
    
    const cleanData = { ...data };
    
    // Define fields that should be excluded from updates because they are complex relations
    const excludeFromUpdates = [
      'roles', 'permissions', 'profile', 'userRoles', 'rolePermissions',
      'user', 'role', 'permission', 'khachhang', 'nhomkhachhang'
    ];
    
    // Remove complex relation fields that cause Prisma errors
    excludeFromUpdates.forEach(field => {
      if (cleanData[field]) {
        // Check if it's an array of objects with nested relations
        if (Array.isArray(cleanData[field])) {
          console.log(`🚫 Removing complex relation array field '${field}' from update data`);
          delete cleanData[field];
        }
        // Check if it's a nested object with complex structure
        else if (typeof cleanData[field] === 'object' && cleanData[field] !== null) {
          const nestedKeys = Object.keys(cleanData[field]);
          const hasComplexNesting = nestedKeys.some(key => 
            typeof cleanData[field][key] === 'object' && cleanData[field][key] !== null
          );
          if (hasComplexNesting) {
            console.log(`🚫 Removing complex nested relation field '${field}' from update data`);
            delete cleanData[field];
          }
        }
      }
    });
    
    // Recursive validation for relation fields
    Object.keys(cleanData).forEach(key => {
      const value = cleanData[key];
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Handle connect/disconnect operations
        if (value.connect) {
          cleanData[key].connect = this.validateConnectArray(value.connect);
        }
        if (value.disconnect) {
          cleanData[key].disconnect = this.validateConnectArray(value.disconnect);
        }
        
        // Clean empty operations
        if (value.connect && value.connect.length === 0) {
          delete cleanData[key].connect;
        }
        if (value.disconnect && value.disconnect.length === 0) {
          delete cleanData[key].disconnect;
        }
        
        // Remove empty relation object
        if (Object.keys(cleanData[key]).length === 0) {
          delete cleanData[key];
        }
      }
    });
    
    return cleanData;
  }

  /**
   * Validate connect/disconnect array items
   */
  private validateConnectArray(items: any[]): any[] {
    if (!Array.isArray(items)) return [];
    
    return items.filter(item => {
      // Ensure item has valid id
      return item && 
             typeof item === 'object' && 
             item.id && 
             typeof item.id === 'string' && 
             item.id.trim() !== '';
    }).map(item => ({ id: item.id.trim() }));
  }

  /**
   * Generic update by ID (legacy method)
   */
  async updateById(model: string, id: string, data: any, include?: any) {
    try {
      // Check if record exists
      await this.findById(model, id);

      return await (this.prisma as any)[model].update({
        where: { id },
        data,
        include,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error updating ${model}: ${error.message}`);
    }
  }

  /**
   * Generic delete
   */
  async delete(model: string, id: string) {
    try {
      // Check if record exists
      await this.findById(model, id);

      await (this.prisma as any)[model].delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error deleting ${model}: ${error.message}`);
    }
  }

  /**
   * Bulk operations
   */
  async bulkCreate(model: string, data: any[]) {
    try {
      return await (this.prisma as any)[model].createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      throw new BadRequestException(`Error bulk creating ${model}: ${error.message}`);
    }
  }

  async bulkUpdate(model: string, updates: { id: string; data: any }[]) {
    try {
      const results = await Promise.all(
        updates.map(({ id, data }) =>
          (this.prisma as any)[model].update({
            where: { id },
            data,
          })
        )
      );
      return results;
    } catch (error) {
      throw new BadRequestException(`Error bulk updating ${model}: ${error.message}`);
    }
  }

  async bulkDelete(model: string, ids: string[]) {
    try {
      return await (this.prisma as any)[model].deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(`Error bulk deleting ${model}: ${error.message}`);
    }
  }

  /**
   * Search functionality
   */
  async search(
    model: string,
    searchTerm: string,
    searchFields: string[],
    pagination: PaginationInput = { page: 1, pageSize: 10 },
    include?: any
  ) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;

    // Build search where clause
    const where = {
      OR: searchFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    };

    try {
      const [data, total] = await Promise.all([
        (this.prisma as any)[model].findMany({
          skip,
          take: pageSize,
          where,
          include,
          orderBy: { createdAt: 'desc' },
        }),
        (this.prisma as any)[model].count({ where }),
      ]);

      const totalPages = Math.ceil(total / pageSize);

      return {
        data,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error searching ${model}: ${error.message}`);
    }
  }

  /**
   * Get statistics
   */
  async getStats(model: string) {
    try {
      const total = await (this.prisma as any)[model].count();
      const active = await (this.prisma as any)[model].count({
        where: { isActive: true },
      });
      const inactive = total - active;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const createdToday = await (this.prisma as any)[model].count({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      const createdThisWeek = await (this.prisma as any)[model].count({
        where: {
          createdAt: {
            gte: lastWeek,
          },
        },
      });

      return {
        total,
        active,
        inactive,
        createdToday,
        createdThisWeek,
      };
    } catch (error) {
      throw new BadRequestException(`Error getting stats for ${model}: ${error.message}`);
    }
  }

  /**
   * Method để lấy danh sách tất cả models
   */
  getAvailableModels(): string[] {
    return [
      'user',
      'role', 
      'userRole',
      'permission',
      'rolePermission',
      'menu',
      'profile',
      'banggia',
      'khachhang',
      'nhomkhachhang',
      'nhomncc',       // ✅ ADD: nhom nha cung cap
      'sanpham',
      'donhang',
      'donhangsanpham',
      'banggiasanpham',
      'nhacungcap',
      'dathang',
      'dathangsanpham',
      'kho',
      'sanphamKho',
      'phieuKho',
      'phieuKhoSanpham',
      'tonKho',
      'chotkho',
      'auditLog',
      'congnoncc',  // ✅ ADD: congnoncc
    ];
  }

  /**
   * Private helper methods
   */
  private buildWhereClause(filter?: FilterInput) {
    if (!filter) return {};

    const where: any = {};

    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { name: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    if (filter.startDate && filter.endDate) {
      where.createdAt = {
        gte: filter.startDate,
        lte: filter.endDate,
      };
    } else if (filter.startDate) {
      where.createdAt = { gte: filter.startDate };
    } else if (filter.endDate) {
      where.createdAt = { lte: filter.endDate };
    }

    if (filter.ids && filter.ids.length > 0) {
      where.id = { in: filter.ids };
    }

    if (filter.isActive !== undefined) {
      where.isActive = filter.isActive;
    }

    return where;
  }
}
